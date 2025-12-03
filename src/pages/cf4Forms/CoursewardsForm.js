import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

const CoursewardsForm = ({ formData, setFormData }) => {
  const coursewards = formData.COURSEWARDS || [];

  useEffect(() => {
    if (!formData.COURSEWARDS || formData.COURSEWARDS.length === 0) {
      setFormData({
        ...formData,
        COURSEWARDS: [
          {
            pHciCaseNo: "",
            pHciTransNo: "",
            pDateAction: "",
            pDoctorsAction: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...coursewards];
    updated[index][field] = value;
    setFormData({ ...formData, COURSEWARDS: updated });
  };

  const handleAdd = () => {
    const newEntry = {
      pHciCaseNo: "",
      pHciTransNo: "",
      pDateAction: "",
      pDoctorsAction: "",
      pReportStatus: "U",
      pDeficiencyRemarks: "",
    };
    setFormData({
      ...formData,
      COURSEWARDS: [...coursewards, newEntry],
    });
  };

  const handleRemove = (index) => {
    const updated = coursewards.filter((_, i) => i !== index);
    setFormData({ ...formData, COURSEWARDS: updated });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        COURSEWARDS
      </Typography>

      <Button variant="contained" onClick={handleAdd}>
        Add COURSEWARD Entry
      </Button>
      {coursewards.map((entry, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="HCI Case No"
                value={entry.pHciCaseNo}
                onChange={(e) => handleChange(index, "pHciCaseNo", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="HCI Trans No"
                value={entry.pHciTransNo}
                onChange={(e) => handleChange(index, "pHciTransNo", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Action"
                InputLabelProps={{ shrink: true }}
                value={entry.pDateAction}
                onChange={(e) => handleChange(index, "pDateAction", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor's Action"
                value={entry.pDoctorsAction}
                onChange={(e) => handleChange(index, "pDoctorsAction", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Report Status"
                value={entry.pReportStatus}
                onChange={(e) => handleChange(index, "pReportStatus", e.target.value)}
              >
                              <MenuItem value="U">Unvalidated</MenuItem>
                              <MenuItem value="V">Validated</MenuItem>
                              <MenuItem value="F">Failed</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
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

export default CoursewardsForm;
