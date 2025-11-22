import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";

const DIAGNOSTIC = ({ formData, setFormData }) => {
  const diagnostics = formData.DIAGNOSTIC || [];
  useEffect(() => {
    if (!formData.DIAGNOSTIC || formData.DIAGNOSTIC.length === 0) {
      setFormData({
        ...formData,
        DIAGNOSTIC: [
          {
            pDiagnosticId: "",
            pOthRemarks: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, [formData, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...diagnostics];
    updated[index][field] = value;
    setFormData({ ...formData, DIAGNOSTIC: updated });
  };

  const handleAdd = () => {
    const newDiagnostic = {
      pDiagnosticId: "",
      pOthRemarks: "",
      pReportStatus: "U",
      pDeficiencyRemarks: "",
    };
    setFormData({
      ...formData,
      DIAGNOSTIC: [...diagnostics, newDiagnostic],
    });
  };

  const handleRemove = (index) => {
    const updated = diagnostics.filter((_, i) => i !== index);
    setFormData({ ...formData, DIAGNOSTIC: updated });
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
          DIAGNOSTIC Entries
        </Typography>

        <Button variant="contained" onClick={handleAdd}>
          Add DIAGNOSTIC Entry
        </Button>
      </Box>
      {diagnostics.map((entry, index) => (
        <Box
          key={index}
          sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Diagnostic ID"
                value={entry.pDiagnosticId}
                onChange={(e) =>
                  handleChange(index, "pDiagnosticId", e.target.value)
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

export default DIAGNOSTIC;
