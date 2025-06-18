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
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import xml2js from "xml2js";

const CIPHER_KEY_LEN = 32;
const passphrase = "PHilheaLthDuMmyciPHerKeyS";

const EmployerValidation = ({ searchEmployer, updateEmployerData }) => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [searchText, setSearchText] = useState(searchEmployer || {});
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setSearchText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setIsData(false);
    setLoading(true);
    setResults(null);

    const item = {
      ...searchText,
      pUserName: process.env.REACT_APP_USERNAME,
      pUserPassword: "",
      pHospitalCode: process.env.REACT_APP_HOSPITALCODE,
    };

    axios
      .post(`${process.env.REACT_APP_NEW_PHIC_URL}/SearchEmployer`, item, {
        headers: { "Content-Type": "text/plain" },
      })
      .then((resp) => {
        setResults(resp.data)
      })
      .catch((error) => {
        setLoading(false);
        setIsData(true);
        console.error("Error:", error);
      });
  };


  return (
    <div>
      <h5>Make sure member details are correct before proceeding</h5>
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

      {results && (
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
                <TableRow key={idx}>
                  <TableCell>{row.epmlist?.pPen || "-"}</TableCell>
                  <TableCell>{row.epmlist?.employerName || "-"}</TableCell>
                  <TableCell>{row.epmlist?.employerAddress || "-"}</TableCell>
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
