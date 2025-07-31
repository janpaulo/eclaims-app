import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  Grid,
  Button,
  Divider,MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SURGHIST = ({ formData, setFormData }) => {
  // Initialize SURGHIST with one empty entry if undefined or not an array
  useEffect(() => {
    if (!Array.isArray(formData.SURGHIST)) {
      setFormData((prev) => ({
        ...prev,
        SURGHIST: [
          {
            pSurgDesc: "",
            pSurgDate: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      }));
    }
  }, [formData, setFormData]);

  const handleChange = (index, e) => {
    const updatedList = [...formData.SURGHIST];
    updatedList[index] = {
      ...updatedList[index],
      [e.target.name]: e.target.value,
    };
    setFormData({ ...formData, SURGHIST: updatedList });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      SURGHIST: [
        ...formData.SURGHIST,
        {
          pSurgDesc: "",
          pSurgDate: "",
          pReportStatus: "U",
          pDeficiencyRemarks: "",
        },
      ],
    });
  };

  const handleRemove = (index) => {
    const updatedList = [...formData.SURGHIST];
    updatedList.splice(index, 1);
    setFormData({ ...formData, SURGHIST: updatedList });
  };

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">Surgical History (SURGHIST)</Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Surgical History
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {Array.isArray(formData.SURGHIST) &&
        formData.SURGHIST.map((entry, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="pSurgDesc"
                  label="Surgery Description"
                  fullWidth
                  value={entry.pSurgDesc}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="pSurgDate"
                  label="Surgery Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={entry.pSurgDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="pReportStatus"
                  label="Report Status"
                  select
                  fullWidth
                  value={entry.pReportStatus}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="U">Unvalidated</MenuItem>
                  <MenuItem value="V">Validated</MenuItem>
                  <MenuItem value="F">Failed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={11}>
                <TextField
                  name="pDeficiencyRemarks"
                  label="Deficiency Remarks"
                  fullWidth
                  value={entry.pDeficiencyRemarks}
                  onChange={(e) => handleChange(index, e)}
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

export default SURGHIST;
