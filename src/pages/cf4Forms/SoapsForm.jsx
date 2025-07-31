import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Paper,
} from "@mui/material";

const SoapsForm = ({ formData, setFormData }) => {
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      SOAPS: {
        ...prev.SOAPS,
        [section]: {
          ...prev.SOAPS?.[section],
          [field]: value,
        },
      },
    }));
  };

  const handleICDChange = (index, field, value) => {
    const updatedICDs = [...(formData.SOAPS?.ICDS || [])];
    updatedICDs[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      SOAPS: {
        ...prev.SOAPS,
        ICDS: updatedICDs,
      },
    }));
  };

  const addICD = () => {
    setFormData((prev) => ({
      ...prev,
      SOAPS: {
        ...prev.SOAPS,
        ICDS: [...(prev.SOAPS?.ICDS || []), { code: "", description: "" }],
      },
    }));
  };

  const removeICD = (index) => {
    const updated = [...(formData.SOAPS?.ICDS || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      SOAPS: {
        ...prev.SOAPS,
        ICDS: updated,
      },
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        SOAPS
      </Typography>

      {/* SUBJECTIVE */}
      <Box mb={2}>
        <Typography variant="subtitle1">SUBJECTIVE</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Subjective Notes"
          value={formData.SOAPS?.SUBJECTIVE?.notes || ""}
          onChange={(e) => handleChange("SUBJECTIVE", "notes", e.target.value)}
        />
      </Box>

      {/* PEPERT */}
      <Box mb={2}>
        <Typography variant="subtitle1">PEPERT</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Physical Exam & Pertinent Findings"
          value={formData.SOAPS?.PEPERT?.findings || ""}
          onChange={(e) => handleChange("PEPERT", "findings", e.target.value)}
        />
      </Box>

      {/* ICDS */}
      <Box>
        <Typography variant="subtitle1">ICD Codes</Typography>
        {formData.SOAPS?.ICDS?.map((icd, index) => (
          <Grid container spacing={2} key={index} mb={1}>
            <Grid item xs={4}>
              <TextField
                label="Code"
                fullWidth
                value={icd.code}
                onChange={(e) => handleICDChange(index, "code", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description"
                fullWidth
                value={icd.description}
                onChange={(e) => handleICDChange(index, "description", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button color="error" onClick={() => removeICD(index)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button variant="outlined" onClick={addICD}>
          Add ICD
        </Button>
      </Box>
    </Paper>
  );
};

export default SoapsForm;
