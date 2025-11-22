import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem } from "@mui/material";

const MedHist = ({ formData, setFormData }) => {
  // Ensure there's at least one initial entry on first render
  useEffect(() => {
    if (!formData.MEDHIST || formData.MEDHIST.length === 0) {
      setFormData((prevData) => ({
        ...prevData,
        MEDHIST: [
          {
            pMdiseaseCode: "",
            pReportStatus: "",
            pDeficiencyRemarks: "",
          },
        ],
      }));
    }
  }, [formData, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...(formData.MEDHIST || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, MEDHIST: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      MEDHIST: [
        ...(formData.MEDHIST || []),
        {
          pMdiseaseCode: "",
          pReportStatus: "",
          pDeficiencyRemarks: "",
        },
      ],
    });
  };

  const handleRemove = (index) => {
    const updated = [...formData.MEDHIST];
    updated.splice(index, 1);
    setFormData({ ...formData, MEDHIST: updated });
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
          Patient Medical History
        </Typography>
        <Button onClick={handleAdd} variant="contained">
          Add Medical History
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {(formData.MEDHIST || []).map((entry, index) => (
        <Box key={index} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Disease Code"
                fullWidth
                value={entry.pMdiseaseCode}
                onChange={(e) =>
                  handleChange(index, "pMdiseaseCode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pReportStatus"
                label="Report Status"
                select
                fullWidth
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
            <Grid item xs={12} sm={11}>
              <TextField
                label="Deficiency Remarks"
                fullWidth
                value={entry.pDeficiencyRemarks}
                onChange={(e) =>
                  handleChange(index, "pDeficiencyRemarks", e.target.value)
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

export default MedHist;
