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
import DeleteIcon from "@mui/icons-material/Delete";

const MHSPECIFIC = ({ formData, setFormData }) => {
  useEffect(() => {
    if (!formData.MHSPECIFIC || formData.MHSPECIFIC.length === 0) {
      setFormData({
        ...formData,
        MHSPECIFIC: [
          {
            pMdiseaseCode: "",
            pSpecificDesc: "",
            pReportStatus: "",
            pDeficiencyRemarks: "",
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
      MHSPECIFIC: [
        ...(formData.MHSPECIFIC || []),
        {
          pMdiseaseCode: "",
          pSpecificDesc: "",
          pReportStatus: "",
          pDeficiencyRemarks: "",
        },
      ],
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">
          Patient Specific Disease Description in Medical History
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Specific Medical History
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />
      {(formData.MHSPECIFIC || []).map((entry, index) => (
        <Box key={index} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Disease Code"
                fullWidth
                value={entry.pMdiseaseCode}
                onChange={(e) =>
                  handleChange(index, "pMdiseaseCode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Specific Description"
                fullWidth
                value={entry.pSpecificDesc}
                onChange={(e) =>
                  handleChange(index, "pSpecificDesc", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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

export default MHSPECIFIC;
