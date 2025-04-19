import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import api from "../../api";

const AssignPermissionsForm = ({ handleClose, authUser, hospitalToEdit, onSuccess }) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const isEditMode = !!hospitalToEdit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permRes = await api.get("/permissions");
        const allPermissions = permRes.data;

        // If in edit mode, find the current role and assign permissions
        if (isEditMode) {
          setRoleName(hospitalToEdit.name || "");
          setDescription(hospitalToEdit.description || "");

          // Set selected permissions based on the role
          const selectedPerms = hospitalToEdit.permissions || [];
          setSelectedPermissions(selectedPerms);

          // Filter out selected permissions from available permissions
          const selectedIds = selectedPerms.map((p) => p.id);
          const remainingPerms = allPermissions.filter(
            (p) => !selectedIds.includes(p.id)
          );
          setPermissions(remainingPerms);
        } else {
          setPermissions(allPermissions);
        }
      } catch (err) {
        console.error("Error fetching permissions:", err);
      }
    };

    fetchData();
  }, [hospitalToEdit, isEditMode]);

  const handlePermissionChange = (permissionId, isChecked) => {
    // Get permission object by ID from available permissions list
    const perm = permissions.find((p) => p.id === permissionId);

    if (!perm) return;

    // Update the selected permissions based on checkbox state
    if (isChecked) {
      // Add permission to selected list and remove from available
      setSelectedPermissions((prev) => [...prev, perm]);
      setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
    } else {
      // Remove permission from selected list and add back to available
      setSelectedPermissions((prev) => prev.filter((p) => p.id !== permissionId));
      setPermissions((prev) => [...prev, perm]);
    }
  };

  const handleDeletePermission = (permissionId) => {
    // Find the permission to remove from selected list
    const perm = selectedPermissions.find((p) => p.id === permissionId);
    if (!perm) return;

    // Remove permission from selected list and add it back to available permissions
    setSelectedPermissions((prev) => prev.filter((p) => p.id !== permissionId));
    setPermissions((prev) => [...prev, perm]);
  };

  const handleSubmit = async () => {
    if (!roleName || !description || selectedPermissions.length === 0) {
      return alert("Please fill out all fields and select at least one permission.");
    }

    try {
      const payload = {
        name: roleName,
        description,
        created_by: authUser?.username || "admin",
        permissionIds: selectedPermissions.map((p) => p.id),
      };

      if (isEditMode) {
        // Update role in edit mode
        await api.put(`/roles/${hospitalToEdit.id}`, payload);
        alert("✅ Role updated successfully.");
      } else {
        // Create new role
        await api.post("/roles", payload);
        alert("✅ Role created and permissions assigned.");
      }

      // Clear form fields and reset state
      setRoleName("");
      setDescription("");
      setSelectedPermissions([]);

      // Refresh permissions data
      const permRes = await api.get("/permissions");
      setPermissions(permRes.data);

      onSuccess(); // Trigger success handler to refresh the table
    } catch (err) {
      console.error("❌ Failed to save role:", err);
      alert("❌ Failed to save role.");
    }
  };

  return (
    <Box>
      <TextField
        label="Role Name"
        fullWidth
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Selected Permissions Displayed as Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {selectedPermissions.map((perm) => (
          <Chip
            key={perm.id}
            label={perm.name}
            onDelete={() => handleDeletePermission(perm.id)}
            color="primary"
          />
        ))}
      </Box>

      <Typography variant="h6">Available Permissions</Typography>
      {permissions.length > 0 ? (
        permissions.map((perm) => (
          <FormControlLabel
            key={perm.id}
            control={
              <Checkbox
                checked={selectedPermissions.some((p) => p.id === perm.id)}
                onChange={(e) =>
                  handlePermissionChange(perm.id, e.target.checked)
                }
              />
            }
            label={perm.name}
          />
        ))
      ) : (
        <Typography variant="body2">No available permissions.</Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? "Update Role" : "Create Role"}
        </Button>
      </Box>
    </Box>
  );
};

export default AssignPermissionsForm;
