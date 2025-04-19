import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import api from "../../api"; // your Axios instance

export default function RolePermissionForm() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [assignedPermissions, setAssignedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (selectedRole) fetchRolePermissions(selectedRole);
  }, [selectedRole]);

  const fetchRoles = async () => {
    const res = await api.get("/roles");
    setRoles(res.data.result || res.data); // adapt to your response shape
  };

  const fetchPermissions = async () => {
    const res = await api.get("/permissions");
    setPermissions(res.data.result || res.data);
  };

  const fetchRolePermissions = async (roleId) => {
    setLoading(true);
    try {
      const res = await api.get(`/roles/${roleId}/permissions`);
      setAssignedPermissions(res.data.map(p => p.id));
    } catch (error) {
      console.error("Failed to fetch role permissions", error);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (permissionId) => {
    setAssignedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/roles/${selectedRole}/permissions`, {
        permissions: assignedPermissions,
      });
      alert("Permissions updated successfully!");
    } catch (error) {
      console.error("Failed to update permissions", error);
      alert("Failed to update permissions.");
    }
  };

  return (
    <Box p={3} maxWidth="500px" mx="auto">
      <Typography variant="h5" gutterBottom>
        Set Role Permissions
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Role</InputLabel>
        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          label="Select Role"
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <FormGroup>
          {permissions.map((perm) => (
            <FormControlLabel
              key={perm.id}
              control={
                <Checkbox
                  checked={assignedPermissions.includes(perm.id)}
                  onChange={() => handleCheckboxChange(perm.id)}
                />
              }
              label={perm.name}
            />
          ))}
        </FormGroup>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedRole}
          onClick={handleSubmit}
        >
          Save Permissions
        </Button>
      </Box>
    </Box>
  );
}
