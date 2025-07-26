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
  Divider,
} from "@mui/material";
import axios from "axios";
import PositionedSnackbar from "../../shared/alerts/PositionedSnackbar";

export function Form({ authUser, handleClose, onSuccess, hospitalToEdit }) {
  const [formData, setFormData] = useState({
    hospital_name: hospitalToEdit?.hospital_name || "",
    accreditation_num: hospitalToEdit?.accreditation_num || "",
    cypher_key: hospitalToEdit?.cypher_key || "",
    is_active: hospitalToEdit?.is_active || "active",
    created_by: authUser?.userId || "",
    username: hospitalToEdit?.username || "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = hospitalToEdit
      ? `${process.env.REACT_APP_API_CLAIMS}hospitals/${hospitalToEdit.hos_id}`
      : `${process.env.REACT_APP_API_CLAIMS}hospitals`;

    const method = hospitalToEdit ? axios.put : axios.post;

    try {
      await method(url, formData, {
        headers: { Authorization: `Bearer ${authUser.access_token}` },
      });

      setOpenSnackbar(true);
      onSuccess?.();
      handleClose();
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
              name="hospital_name"
              fullWidth
              variant="outlined"
              value={formData.hospital_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Accreditation Number"
              name="accreditation_num"
              fullWidth
              variant="outlined"
              value={formData.accreditation_num}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Cypher Key"
              name="cypher_key"
              fullWidth
              variant="outlined"
              value={formData.cypher_key}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="is_active"
                value={formData.is_active}
                onChange={handleChange}
                label="Status"
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Created By"
              name="created_by"
              fullWidth
              variant="outlined"
              value={formData.created_by}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 3 }}>User Credentials</Divider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required={!hospitalToEdit} // password required only on create
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
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
