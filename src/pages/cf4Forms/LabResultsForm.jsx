import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
} from "@mui/material";

const LabResultsForm = ({ formData, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...(formData.LABRESULTS || [])];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      LABRESULTS: updated,
    }));
  };

  const addLabResult = () => {
    setFormData((prev) => ({
      ...prev,
      LABRESULTS: [...(prev.LABRESULTS || []), { test: "", result: "", date: "" }],
    }));
  };

  const removeLabResult = (index) => {
    const updated = [...(formData.LABRESULTS || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      LABRESULTS: updated,
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lab Results
      </Typography>

      {formData.LABRESULTS?.map((entry, index) => (
        <Grid container spacing={2} key={index} mb={1}>
          <Grid item xs={4}>
            <TextField
              label="Test"
              fullWidth
              value={entry.test}
              onChange={(e) => handleChange(index, "test", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Result"
              fullWidth
              value={entry.result}
              onChange={(e) => handleChange(index, "result", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={entry.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button color="error" onClick={() => removeLabResult(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addLabResult}>
        Add Lab Result
      </Button>
    </Paper>
  );
};


export default LabResultsForm;