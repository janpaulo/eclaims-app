import React, { useEffect, useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SharedAppBar from "../../shared/SharedAppBar";
import moment from "moment";
import { Container, CircularProgress } from "@mui/material";
import api from "../../api";
import axios from "axios";
import { useSnackbar } from "notistack";

const TableList = ({ authUser }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [title] = useState("Claims");
  const [items, setItems] = useState([]);
  const [references, setReferences] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // -----------------------
  // Fetch All Claims
  // -----------------------
  const fetchAllClaims = async () => {
    try {
      if (!authUser?.hci_no || !authUser?.access_token) {
        setItems([]);
        setError("Missing credentials. Please log in again.");
        setLoading(false);
        return [];
      }

      const response = await api.get(`/claims/${authUser.hci_no}`, {
        headers: {
          Authorization: `Bearer ${authUser.access_token}`,
        },
      });

      return response.data.claims || [];
    } catch (err) {
      console.error("Error fetching claims:", err);
      throw new Error("Failed to fetch claims");
    }
  };

  // -----------------------
  // Fetch Claim Details Per Series
  // -----------------------
  const fetchClaimDetails = async (series_no) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/getUploadedClaimsMap?receiptticketnumber=${series_no}`,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data.result;
      if (result?.mapping) {
        const updatedMapping = result.mapping.map((claim) => ({
          ...claim,
          preceiptTicketNumber: result.preceiptTicketNumber,
        }));

        setReferences((prev) => {
          const updated = [...prev, ...updatedMapping];
          return removeDuplicates(updated);
        });
      }

      return result;
    } catch (error) {
      console.error(`Error fetching details for ${series_no}:`, error);
      throw new Error(`Failed to fetch claim details for ${series_no}`);
    }
  };

  // -----------------------
  // Remove Duplicates
  // -----------------------
  const removeDuplicates = (array) => {
    const seen = new Set();
    return array.filter((item) => {
      if (!seen.has(item.pclaimSeriesLhio)) {
        seen.add(item.pclaimSeriesLhio);
        return true;
      }
      return false;
    });
  };

  // -----------------------
  // Extract LHIO Series
  // -----------------------
  const extractPclaimSeriesLhio = (result) => {
    const mapping = result?.mapping || [];
    return mapping.map((item) => item.pclaimSeriesLhio).filter(Boolean);
  };

  // -----------------------
  // Get Claim Status
  // -----------------------
  const getClaimStatus = async (seriesList) => {
    if (seriesList.length === 0) return [];

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/getClaimStatus`,
        { seriesnos: seriesList },
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.result.claim.map((claim) => ({
        pclaimSeriesLhio: claim.pclaimSeriesLhio,
        ppin: claim.ppin,
        pstatus: claim.pstatus,
      }));
    } catch (err) {
      console.error("Error fetching claim status:", err);
      throw new Error("Failed to fetch claim status");
    }
  };

  // -----------------------
  // MAIN PROCESS
  // -----------------------
  const handleGetClaims = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Get all claims
      const claims = await fetchAllClaims();

      let allReferences = [];
      let lhioList = [];

      // 2. Fetch details for every claim
      for (let claim of claims) {
        const details = await fetchClaimDetails(claim.series_no);

        const mapping = details?.mapping || [];
        const updatedMapping = mapping.map((item) => ({
          ...item,
          preceiptTicketNumber: details.preceiptTicketNumber,
        }));

        allReferences.push(...updatedMapping);
        lhioList.push(...extractPclaimSeriesLhio(details));
      }

      // Remove duplicates
      allReferences = removeDuplicates(allReferences);

      // 3. Fetch claim status
      const statusResults = await getClaimStatus(lhioList);

      // 4. Merge results
      const updatedClaims = claims.map((claim) => {
        const ref = allReferences.find(
          (reference) => reference.preceiptTicketNumber === claim.series_no
        );

        if (!ref) {
          return { ...claim, status: "No Status" };
        }

        const status = statusResults.find(
          (s) => s.pclaimSeriesLhio === ref.pclaimSeriesLhio
        );

        return {
          ...claim,
          status: status?.pstatus || "No Status",
          series_no: status?.pclaimSeriesLhio || claim.series_no,
        };
      });

      // Save values
      setItems(updatedClaims);
      setReferences(allReferences);
      setError(null);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // -----------------------
  // RUN ONCE
  // -----------------------
  useEffect(() => {
    handleGetClaims();
  }, []);

  return (
    <Container maxWidth="full" sx={{ my: 4 }}>
      <SharedAppBar titleName={title} esoaLink="/claims_registration" />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Series No</TableCell>
              <TableCell align="center">PAN No.</TableCell>
              <TableCell align="center">Member PIN</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date Admitted</TableCell>
              <TableCell align="center">Date Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" style={{ color: "red" }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.series_no}>
                  <TableCell align="center">{item.series_no}</TableCell>
                  <TableCell align="center">{item.hci_no}</TableCell>
                  <TableCell align="center">{item.member_pin}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    {moment(item.date_admited).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.date_created).format("MM/DD/YYYY")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No claims available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableList;
