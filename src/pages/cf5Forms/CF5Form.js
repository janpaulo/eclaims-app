import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";

const Cf5Form = () => {
  const [form, setForm] = useState({
    pHospitalCode: "",
    ClaimNumber: "",
    PrimaryCode: "",
    NewBornAdmWeight: "",
    Remarks: "",
    SecondaryDiags: [],
    Procedures: [],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...form[arrayName]];
    updatedArray[index][field] = value;
    setForm((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const addArrayItem = (arrayName, emptyObj) => {
    setForm((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], emptyObj],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = [...form[arrayName]];
    updatedArray.splice(index, 1);
    setForm((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleSubmit = async () => {
    const payload = {
      cf5: {
        pHospitalCode: form.pHospitalCode,
        DRGCLAIM: {
          ClaimNumber: form.ClaimNumber,
          PrimaryCode: form.PrimaryCode,
          NewBornAdmWeight: form.NewBornAdmWeight,
          Remarks: form.Remarks,
          SECONDARYDIAGS: {
            SECONDARYDIAG: form.SecondaryDiags,
          },
          PROCEDURES: {
            PROCEDURE: form.Procedures,
          },
        },
      },
    };
    console.log("Submitted successfully:", payload);
    // try {
    //   const response = await axios.post("https://your-api-endpoint/api/cf5", payload);
    //   console.log("Submitted successfully:", response.data);
    //   alert("Form submitted successfully!");
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   alert("Failed to submit form.");
    // }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">CF5 Form</Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Hospital Code"
            value={form.pHospitalCode}
            onChange={(e) => handleChange("pHospitalCode", e.target.value)}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Claim Number"
            value={form.ClaimNumber}
            onChange={(e) => handleChange("ClaimNumber", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Primary Code"
            value={form.PrimaryCode}
            onChange={(e) => handleChange("PrimaryCode", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Newborn Admission Weight"
            value={form.NewBornAdmWeight}
            onChange={(e) => handleChange("NewBornAdmWeight", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Remarks"
            value={form.Remarks}
            onChange={(e) => handleChange("Remarks", e.target.value)}
          />
        </Grid>

        {/* Secondary Diagnoses */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Secondary Diagnoses</Typography>
          {form.SecondaryDiags.map((diag, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label={`Secondary Code #${index + 1}`}
                    value={diag.SecondaryCode}
                    onChange={(e) =>
                      handleArrayChange(
                        "SecondaryDiags",
                        index,
                        "SecondaryCode",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Remarks"
                    value={diag.Remarks}
                    onChange={(e) =>
                      handleArrayChange(
                        "SecondaryDiags",
                        index,
                        "Remarks",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => removeArrayItem("SecondaryDiags", index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() =>
              addArrayItem("SecondaryDiags", { SecondaryCode: "", Remarks: "" })
            }
          >
            Add Diagnosis
          </Button>
        </Grid>

        {/* Procedures */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Procedures</Typography>
          {form.Procedures.map((proc, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="RVS Code"
                    value={proc.RvsCode}
                    onChange={(e) =>
                      handleArrayChange(
                        "Procedures",
                        index,
                        "RvsCode",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Laterality"
                    value={proc.Laterality}
                    onChange={(e) =>
                      handleArrayChange(
                        "Procedures",
                        index,
                        "Laterality",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Ext1"
                    value={proc.Ext1}
                    onChange={(e) =>
                      handleArrayChange(
                        "Procedures",
                        index,
                        "Ext1",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Ext2"
                    value={proc.Ext2}
                    onChange={(e) =>
                      handleArrayChange(
                        "Procedures",
                        index,
                        "Ext2",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Remarks"
                    value={proc.Remarks}
                    onChange={(e) =>
                      handleArrayChange(
                        "Procedures",
                        index,
                        "Remarks",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => removeArrayItem("Procedures", index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() =>
              addArrayItem("Procedures", {
                RvsCode: "",
                Laterality: "",
                Ext1: "",
                Ext2: "",
                Remarks: "",
              })
            }
          >
            Add Procedure
          </Button>
        </Grid>

        {/* Submit */}
        <Grid item xs={12} mt={4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Form
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Cf5Form;
