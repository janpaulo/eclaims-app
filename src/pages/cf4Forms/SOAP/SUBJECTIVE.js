import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

const defaultSubjectiveEntry = {
  pChiefComplaint: "",
  pIllnessHistory: "",
  pOtherComplaint: "",
  pSignsSymptoms: "",
  pPainSite: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const SUBJECTIVE = ({ formData, setFormData }) => {
  const subjectiveEntries = formData.SUBJECTIVE || [];

  useEffect(() => {
    // Ensure at least one entry is displayed initially
    if (subjectiveEntries.length === 0) {
      setFormData((prev) => ({
        ...prev,
        SUBJECTIVE: [defaultSubjectiveEntry],
      }));
    }
  }, [subjectiveEntries, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...subjectiveEntries];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, SUBJECTIVE: updated }));
  };

  const handleAdd = () => {
    setFormData((prev) => ({
      ...prev,
      SUBJECTIVE: [...subjectiveEntries, { ...defaultSubjectiveEntry }],
    }));
  };

  const handleRemove = (index) => {
    const updated = subjectiveEntries.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, SUBJECTIVE: updated }));
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
          SUBJECTIVE Entries
        </Typography>

        <Button variant="contained" onClick={handleAdd}>
          Add SUBJECTIVE Entry
        </Button>
      </Box>

      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />

      {subjectiveEntries.map((entry, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Chief Complaint"
                fullWidth
                value={entry.pChiefComplaint}
                onChange={(e) =>
                  handleChange(index, "pChiefComplaint", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Illness History"
                fullWidth
                value={entry.pIllnessHistory}
                onChange={(e) =>
                  handleChange(index, "pIllnessHistory", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Other Complaint"
                fullWidth
                value={entry.pOtherComplaint}
                onChange={(e) =>
                  handleChange(index, "pOtherComplaint", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Signs & Symptoms"
                fullWidth
                value={entry.pSignsSymptoms}
                onChange={(e) =>
                  handleChange(index, "pSignsSymptoms", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pain Site"
                fullWidth
                value={entry.pPainSite}
                onChange={(e) =>
                  handleChange(index, "pPainSite", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Report Status"
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
            <Grid item xs={12}>
              <TextField
                label="Deficiency Remarks"
                fullWidth
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

export default SUBJECTIVE;
