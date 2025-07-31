import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
} from "@mui/material";

const CoursewardsForm = ({ formData, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...(formData.COURSEWARDS || [])];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      COURSEWARDS: updated,
    }));
  };

  const addCourseward = () => {
    setFormData((prev) => ({
      ...prev,
      COURSEWARDS: [...(prev.COURSEWARDS || []), { date: "", notes: "" }],
    }));
  };

  const removeCourseward = (index) => {
    const updated = [...(formData.COURSEWARDS || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      COURSEWARDS: updated,
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Coursewards
      </Typography>

      {formData.COURSEWARDS?.map((entry, index) => (
        <Grid container spacing={2} key={index} mb={1}>
          <Grid item xs={4}>
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={entry.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Notes"
              fullWidth
              value={entry.notes}
              onChange={(e) => handleChange(index, "notes", e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button color="error" onClick={() => removeCourseward(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addCourseward}>
        Add Courseward
      </Button>
    </Paper>
  );
};


export default CoursewardsForm;