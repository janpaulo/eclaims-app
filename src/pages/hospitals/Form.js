import React, { useState, useEffect } from "react";
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
    hospital_code: hospitalToEdit?.hospital_code || "",
    accreditation_num: hospitalToEdit?.accreditation_num || "",
    cypher_key: hospitalToEdit?.cypher_key || "",
    software_cert: hospitalToEdit?.software_cert || "",
    username_code: hospitalToEdit?.username_code || "",
    is_active: hospitalToEdit?.is_active || "active",
    created_by: authUser?.userId || "",
    users: hospitalToEdit?.users?.length
      ? hospitalToEdit.users.map((u) => ({ ...u, password: "" }))
      : [{ email: "", password: "", role_id: "" }],
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch users for editing hospital
  useEffect(() => {
    const fetchUsers = async () => {
      if (hospitalToEdit?.accreditation_num) {
        try {
          const res = await axios.get(
            `http://localhost:5001/hospitals/users/${hospitalToEdit.accreditation_num}`,
            {
              headers: { Authorization: `Bearer ${authUser.access_token}` },
            }
          );
          setFormData((prev) => ({
            ...prev,
            users: res.data.users.map((u) => ({
              ...u,
              password: "", // clear password for security
            })),
          }));
        } catch (err) {
          console.error("Failed to fetch hospital users:", err);
        }
      }
    };

    fetchUsers();
  }, [hospitalToEdit?.accreditation_num]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserChange = (index, field, value) => {
    const updatedUsers = [...formData.users];
    updatedUsers[index][field] = value;
    setFormData((prev) => ({ ...prev, users: updatedUsers }));
  };

  const handleEmailBlur = (index) => {
    const currentEmail = formData.users[index].email.trim().toLowerCase();
    if (!currentEmail) return;

    const duplicateCount = formData.users.filter(
      (u, i) => i !== index && u.email.trim().toLowerCase() === currentEmail
    ).length;

    if (duplicateCount > 0) {
      alert("This email is already used by another user.");
    }
  };

  const handleAddUser = () => {
    const existingEmails = formData.users.map((u) =>
      u.email.trim().toLowerCase()
    );
    const emailSet = new Set(existingEmails);
    if (emailSet.size !== existingEmails.length) {
      alert("Duplicate email found in the user list.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      users: [...prev.users, { email: "", password: "", role_id: "" }],
    }));
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...formData.users];
    updatedUsers.splice(index, 1);
    setFormData((prev) => ({ ...prev, users: updatedUsers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalUrl = hospitalToEdit
      ? `${process.env.REACT_APP_API_CLAIMS}hospitals/${hospitalToEdit.hos_id}`
      : `${process.env.REACT_APP_API_CLAIMS}hospitals`;

    const method = hospitalToEdit ? axios.put : axios.post;

    try {
      const { users, ...hospitalData } = formData;

      // Submit hospital data
      await method(hospitalUrl, hospitalData, {
        headers: { Authorization: `Bearer ${authUser.access_token}` },
      });

      // Register or update users
      for (const user of users) {
        const userPayload = {
          email: user.email,
          hci_no: formData.accreditation_num,
          role_id: user.role_id,
        };

        // Only include password if it's newly provided
        if (user.password && user.password.trim() !== "") {
          userPayload.password = user.password;
        }

        if (user.userId) {
          await axios.put(
            `http://localhost:5001/users/${user.userId}`,
            userPayload,
            {
              headers: {
                Authorization: `Bearer ${authUser.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          await axios.post("http://localhost:5001/register", userPayload, {
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      setOpenSnackbar(true);
      onSuccess?.();
      handleClose();
    } catch (err) {
      console.error("Error saving hospital or users:", err);
      setError("Failed to save hospital or user accounts.");
    }
  };

  const handleAlertClose = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = () => {
    const {
      hospital_name,
      hospital_code,
      accreditation_num,
      cypher_key,
      software_cert,
      username_code,
      is_active,
      users,
    } = formData;

    const hasAllHospitalFields =
      hospital_name.trim() &&
      hospital_code.trim() &&
      accreditation_num.trim() &&
      cypher_key.trim() &&
      software_cert.trim() &&
      username_code.trim() &&
      is_active;

    const areAllUsersValid =
      users.length > 0 &&
      users.every((u) => u.email.trim() && (u.userId || u.password.trim()));

    return hasAllHospitalFields && areAllUsersValid;
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

          <Grid item xs={6}>
            <TextField
              label="Hospital Code"
              name="hospital_code"
              fullWidth
              variant="outlined"
              value={formData.hospital_code}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Accreditation Number"
              name="accreditation_num"
              fullWidth
              variant="outlined"
              value={formData.accreditation_num}
              onChange={handleChange}
              disabled={!!hospitalToEdit}
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

          <Grid item xs={12}>
            <TextField
              label="Software Certificate"
              name="software_cert"
              fullWidth
              variant="outlined"
              value={formData.software_cert}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Username Code"
              name="username_code"
              fullWidth
              variant="outlined"
              value={formData.username_code}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
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

          <Grid item xs={4}>
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
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h4">User Accounts</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleAddUser}>
              Add User
            </Button>
          </Grid>

          {formData.users.map((user, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <TextField
                  label={`Email`}
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={user.email}
                  onChange={(e) =>
                    handleUserChange(index, "email", e.target.value)
                  }
                  onBlur={() => handleEmailBlur(index)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label={!!hospitalToEdit? `Change Password`: `Password`}
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={user.password}
                  onChange={(e) =>
                    handleUserChange(index, "password", e.target.value)
                  }
                  required={!user.userId}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveUser(index)}
                  disabled={formData.users.length === 1}
                  sx={{ mt: 1 }}
                >
                  Remove
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid()}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
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
