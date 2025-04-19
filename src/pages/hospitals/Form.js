import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import PositionedSnackbar from "../../shared/alerts/PositionedSnackbar"; // ✅ Snackbar component

export function Form({ authUser, handleClose, onSuccess ,hospitalToEdit }) {
  const [hospitalName, setHospitalName] = useState(hospitalToEdit?.hospital_name || "");
  const [accreditationNum, setAccreditationNum] = useState(hospitalToEdit?.accreditation_num || "");
  const [cypherKey, setCypherKey] = useState(hospitalToEdit?.cypher_key || "");
  const [isActive, setIsActive] = useState(hospitalToEdit?.is_active || "active");
  const [createdBy] = useState(authUser?.userId || "");

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalData = {
      hospital_name: hospitalName,
      accreditation_num: accreditationNum,
      cypher_key: cypherKey,
      is_active: isActive,
      created_by: createdBy,
    };

    try {
      if (hospitalToEdit) {
        await axios.put(
          `${process.env.REACT_APP_API_CLAIMS}hospitals/${hospitalToEdit.hos_id}`,
          hospitalData,
          {
            headers: { Authorization: `Bearer ${authUser.access_token}` },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_CLAIMS}hospitals`,
          hospitalData,
          {
            headers: { Authorization: `Bearer ${authUser.access_token}` },
          }
        );
      }

      setOpenSnackbar(true);
      onSuccess?.(); // refresh table
      handleClose(); // close modal
    } catch (err) {
      console.error("Error saving hospital:", err);
      setError("Failed to save hospital.");
    }
  };

  const handleAlertClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Hospital Name"
              fullWidth
              variant="outlined"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Accreditation Number"
              fullWidth
              variant="outlined"
              value={accreditationNum}
              onChange={(e) => setAccreditationNum(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Cypher Key"
              fullWidth
              variant="outlined"
              value={cypherKey}
              onChange={(e) => setCypherKey(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
                label="Status"
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Created By"
              fullWidth
              variant="outlined"
              value={createdBy}
              disabled
            />
          </Grid>
        </Grid>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 120 }}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: 120 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </form>

      <PositionedSnackbar
        open={openSnackbar}
        handleAlertClose={handleAlertClose}
      />
    </Container>
  );
}
