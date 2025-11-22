import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";

const MANAGEMENT = ({ formData, setFormData }) => {
  const managementEntries = formData.MANAGEMENT || [];

  // 👇 Initialize at least one entry on first render
  useEffect(() => {
    if (!formData.MANAGEMENT || formData.MANAGEMENT.length === 0) {
      setFormData({
        ...formData,
        MANAGEMENT: [
          {
            pManagementId: "",
            pOthRemarks: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, [formData, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...managementEntries];
    updated[index][field] = value;
    setFormData({ ...formData, MANAGEMENT: updated });
  };

  const handleAdd = () => {
    const newEntry = {
      pManagementId: "",
      pOthRemarks: "",
      pReportStatus: "U",
      pDeficiencyRemarks: "",
    };
    setFormData({
      ...formData,
      MANAGEMENT: [...managementEntries, newEntry],
    });
  };

  const handleRemove = (index) => {
    const updated = managementEntries.filter((_, i) => i !== index);
    setFormData({ ...formData, MANAGEMENT: updated });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          MANAGEMENT Entries
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add MANAGEMENT Entry
        </Button>
      </Box>

      {managementEntries.map((entry, index) => (
        <Box
          key={index}
          sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Management ID"
                value={entry.pManagementId}
                onChange={(e) =>
                  handleChange(index, "pManagementId", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                fullWidth
                label="Other Remarks"
                value={entry.pOthRemarks}
                onChange={(e) =>
                  handleChange(index, "pOthRemarks", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                select
                fullWidth
                label="Report Status"
                value={entry.pReportStatus}
                onChange={(e) =>
                  handleChange(index, "pReportStatus", e.target.value)
                }
              >
                <MenuItem value="U">Unvalidated</MenuItem>
                <MenuItem value="V">Validated</MenuItem>
                <MenuItem value="F">Failed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                fullWidth
                label="Deficiency Remarks"
                value={entry.pDeficiencyRemarks}
                onChange={(e) =>
                  handleChange(index, "pDeficiencyRemarks", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(index)}
              >
                Remove Entry
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MANAGEMENT;
