import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const EmployerValidation = ({
  searchEmployer,
  updateEmployerData,
  authUser,
  setForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [searchText, setSearchText] = useState(searchEmployer || {});
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleInputChange = (e) => {
    setSearchText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setIsData(false);
    setLoading(true);
    const item = {
      philhealthno: searchText.pPen || "",
      employername: searchText.employerName || "",
    };

    axios
      .post(`${process.env.REACT_APP_NEW_PHIC_URL}/SearchEmployer`, item, {
        headers: {
          accreno: authUser.hospital.accreditation_num,
          softwarecertid: authUser.hospital.username_code,
          "Content-Type": "text/plain",
        },
      })
      .then((resp) => {
        const employerList = resp.data?.result?.employers || [];
        setResults(employerList);
        setIsData(employerList.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsData(true);
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h5>Search Employer</h5>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            name="pPen"
            label="PhilHealth Employer No.(PEN)"
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            name="employerName"
            label="Employer Name"
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>
      </Grid>

      {loading && (
        <Grid container justifyContent="center" sx={{ my: 2 }}>
          <CircularProgress size={24} />
        </Grid>
      )}

      {isData && (
        <Typography variant="body2" color="error">
          ⚠ No record found. Please check your input and try again.
        </Typography>
      )}

      {results.length > 0 && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>PEN</TableCell>
                <TableCell>Employer Name</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, idx) => (
                <TableRow
                  key={idx}
                  hover
                  selected={selectedIndex === idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setForm((prev) => ({
                      ...prev,
                      pPEN: row.philhealthno,
                      pEmployerName: row.name,
                    }));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{row.philhealthno || "-"}</TableCell>
                  <TableCell>{row.name || "-"}</TableCell>
                  <TableCell>{row.address || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EmployerValidation;
