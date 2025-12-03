import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  IconButton,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";

const MHSPECIFIC = ({ formData, setFormData }) => {
  useEffect(() => {
    if (!formData.MHSPECIFIC || formData.MHSPECIFIC.length === 0) {
      setFormData({
        ...formData,
        MHSPECIFIC: [
          {
            specificdesc: "",
          },
        ],
      });
    }
  }, [formData, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...(formData.MHSPECIFIC || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, MHSPECIFIC: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      MHSPECIFIC: [...(formData.MHSPECIFIC || []), { specificdesc: "" }],
    });
  };

  const handleRemove = (index) => {
    const updated = [...formData.MHSPECIFIC];
    updated.splice(index, 1);
    setFormData({ ...formData, MHSPECIFIC: updated });
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 1,
          mt: 3
        }}
      >
        <Typography variant="h6">
          Patient Specific Disease Description in Medical History
        </Typography>
        <Button variant="outlined" onClick={handleAdd}>
          Add Fields
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />
      {(formData.MHSPECIFIC || []).map((entry, index) => (
        <Box key={index} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10}>
              <TextField
                label="Specific Description"
                fullWidth
                value={entry.specificdesc}
                onChange={(e) =>
                  handleChange(index, "specificdesc", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={1}>
              <Button
                onClick={() => handleRemove(index)}
                color="error"
                variant="outlined"
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MHSPECIFIC;
