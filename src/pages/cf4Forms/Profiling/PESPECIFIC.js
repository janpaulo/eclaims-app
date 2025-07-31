import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";

const PESPECIFIC = ({ formData, setFormData }) => {
  const pespecifics = formData.PESPECIFIC || [];

  // Ensure one initial entry on first load
  useEffect(() => {
    if (!formData.PESPECIFIC || formData.PESPECIFIC.length === 0) {
      setFormData({
        ...formData,
        PESPECIFIC: [
          {
            pSkinRem: "",
            pHeentRem: "",
            pChestRem: "",
            pHeartRem: "",
            pAbdomenRem: "",
            pNeuroRem: "",
            pRectalRem: "",
            pGuRem: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...pespecifics];
    updated[index][field] = value;
    setFormData({ ...formData, PESPECIFIC: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      PESPECIFIC: [
        ...pespecifics,
        {
          pSkinRem: "",
          pHeentRem: "",
          pChestRem: "",
          pHeartRem: "",
          pAbdomenRem: "",
          pNeuroRem: "",
          pRectalRem: "",
          pGuRem: "",
          pReportStatus: "U",
          pDeficiencyRemarks: "",
        },
      ],
    });
  };

  const handleRemove = (index) => {
    const updated = pespecifics.filter((_, i) => i !== index);
    setFormData({ ...formData, PESPECIFIC: updated });
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
          PESPECIFIC - Physical Examination Remarks
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add PESPECIFIC Entry
        </Button>
      </Box>

      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />

      {pespecifics.map((entry, index) => (
        <Box
          key={index}
          sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Grid container spacing={2}>
            {[
              ["pSkinRem", "Skin Remark"],
              ["pHeentRem", "HEENT Remark"],
              ["pChestRem", "Chest Remark"],
              ["pHeartRem", "Heart Remark"],
              ["pAbdomenRem", "Abdomen Remark"],
              ["pNeuroRem", "Neuro Remark"],
              ["pRectalRem", "Rectal Remark"],
              ["pGuRem", "GU Remark"],
              ["pDeficiencyRemarks", "Deficiency Remarks"],
            ].map(([field, label]) => (
              <Grid item xs={12} sm={3} key={field}>
                <TextField
                  fullWidth
                  label={label}
                  value={entry[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
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

export default PESPECIFIC;
