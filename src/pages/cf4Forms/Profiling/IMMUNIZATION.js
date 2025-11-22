import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  Divider,
  Grid,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const IMMUNIZATION = ({ formData, setFormData }) => {
  const immunizations = formData.IMMUNIZATION || [];

  // Inject one initial row if empty on first render
  useEffect(() => {
    if (!formData.IMMUNIZATION || formData.IMMUNIZATION.length === 0) {
      setFormData({
        ...formData,
        IMMUNIZATION: [
          {
            pChildImmcode: "",
            pYoungwImmcode: "",
            pPregwImmcode: "",
            pElderlyImmcode: "",
            pOtherImm: "",
            pReportStatus: "",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...immunizations];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setFormData({ ...formData, IMMUNIZATION: updated });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      IMMUNIZATION: [
        ...immunizations,
        {
          pChildImmcode: "",
          pYoungwImmcode: "",
          pPregwImmcode: "",
          pElderlyImmcode: "",
          pOtherImm: "",
          pReportStatus: "",
          pDeficiencyRemarks: "",
        },
      ],
    });
  };

  const handleRemove = (index) => {
    const updated = immunizations.filter((_, i) => i !== index);
    setFormData({ ...formData, IMMUNIZATION: updated });
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
        <Typography variant="h6">Patient Immunization Record</Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add IMMUNIZATION
        </Button>
      </Box>

      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />

      {immunizations.map((entry, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Child Imm Code"
                fullWidth
                value={entry.pChildImmcode || ""}
                onChange={(e) =>
                  handleChange(index, "pChildImmcode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Young Women Imm Code"
                fullWidth
                value={entry.pYoungwImmcode || ""}
                onChange={(e) =>
                  handleChange(index, "pYoungwImmcode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Pregnant Women Imm Code"
                fullWidth
                value={entry.pPregwImmcode || ""}
                onChange={(e) =>
                  handleChange(index, "pPregwImmcode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Elderly Imm Code"
                fullWidth
                value={entry.pElderlyImmcode || ""}
                onChange={(e) =>
                  handleChange(index, "pElderlyImmcode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Other Imm"
                fullWidth
                value={entry.pOtherImm || ""}
                onChange={(e) =>
                  handleChange(index, "pOtherImm", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Deficiency Remarks"
                fullWidth
                value={entry.pDeficiencyRemarks || ""}
                onChange={(e) =>
                  handleChange(index, "pDeficiencyRemarks", e.target.value)
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
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

export default IMMUNIZATION;
