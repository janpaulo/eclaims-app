import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// const CF3FormNew = () => {
const CF3FormNew = forwardRef((props, ref) => {
  const { disabled = false } = props;

  const [formData, setFormData] = useState({
    ADMITREASON: {
      pBriefHistory: "",
      pReferredReason: "",
      pIntensive: "N",
      pMaintenance: "N",
      CLINICAL: [{ pCriteria: "" }],
      LABDIAG: [{ pCriteria: "" }],
      PHEX: {
        pBP: "",
        pCR: "",
        pRR: "",
        pTemp: "",
        pHEENT: "",
        pChestLungs: "",
        pCVS: "",
        pAbdomen: "",
        pGUIE: "",
        pSkinExtremities: "",
        pNeuroExam: "",
      },
    },
    COURSE: {
      WARD: [{ pCourseDate: "", pFindings: "", pAction: "" }],
    },
  });

  const handleChange = (path, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      let pointer = updated;
      const keys = path.split(".");
      keys.slice(0, -1).forEach((k) => {
        if (!pointer[k]) pointer[k] = {};
        pointer = pointer[k];
      });
      pointer[keys.at(-1)] = value;
      return updated;
    });
  };

  const handleArrayChange = (section, index, key, value) => {
    const updated = { ...formData };
    updated.ADMITREASON[section][index][key] = value;
    setFormData(updated);
  };

  const handleCourseChange = (index, key, value) => {
    const updated = { ...formData };
    updated.COURSE.WARD[index][key] = value;
    setFormData(updated);
  };

  const addItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      ADMITREASON: {
        ...prev.ADMITREASON,
        [section]: [...prev.ADMITREASON[section], { pCriteria: "" }],
      },
    }));
  };


  useImperativeHandle(ref, () => ({
    getFormData: () => ({ CF3_NEW: formData }),
  }));
  
  const removeItem = (section, index) => {
    setFormData((prev) => {
      const updatedSection = [...prev.ADMITREASON[section]];
      if (updatedSection.length > 1) {
        updatedSection.splice(index, 1);
      }
      return {
        ...prev,
        ADMITREASON: {
          ...prev.ADMITREASON,
          [section]: updatedSection,
        },
      };
    });
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      COURSE: {
        WARD: [
          ...prev.COURSE.WARD,
          { pCourseDate: "", pFindings: "", pAction: "" },
        ],
      },
    }));
  };

  const removeCourse = (index) => {
    setFormData((prev) => {
      const updatedWARD = [...prev.COURSE.WARD];
      if (updatedWARD.length > 1) {
        updatedWARD.splice(index, 1);
      }
      return {
        ...prev,
        COURSE: {
          WARD: updatedWARD,
        },
      };
    });
  };

  const handleCheckbox = (field) => {
    setFormData((prev) => ({
      ...prev,
      ADMITREASON: {
        ...prev.ADMITREASON,
        [field]: prev.ADMITREASON[field] === "Y" ? "N" : "Y",
      },
    }));
  };

  return (
    <Box p={2}>
      <fieldset disabled={disabled} style={{ border: 0, padding: 0 }}>
        <Typography variant="h6">Admit Reason</Typography>

        <TextField
          fullWidth
          margin="dense"
          label="Brief History"
          value={formData.ADMITREASON.pBriefHistory}
          onChange={(e) =>
            handleChange("ADMITREASON.pBriefHistory", e.target.value)
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Referred Reason"
          value={formData.ADMITREASON.pReferredReason}
          onChange={(e) =>
            handleChange("ADMITREASON.pReferredReason", e.target.value)
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.ADMITREASON.pIntensive === "Y"}
              onChange={() => handleCheckbox("pIntensive")}
            />
          }
          label="Intensive"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.ADMITREASON.pMaintenance === "Y"}
              onChange={() => handleCheckbox("pMaintenance")}
            />
          }
          label="Maintenance"
        />

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Clinical Criteria</Typography>
        {formData.ADMITREASON.CLINICAL.map((item, i) => (
          <Box display="flex" gap={1} key={i}>
            <TextField
              fullWidth
              margin="dense"
              label={`Clinical Criteria ${i + 1}`}
              value={item.pCriteria}
              onChange={(e) =>
                handleArrayChange("CLINICAL", i, "pCriteria", e.target.value)
              }
            />
            <IconButton
              onClick={() => removeItem("CLINICAL", i)}
              disabled={formData.ADMITREASON.CLINICAL.length === 1}
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={() => addItem("CLINICAL")} sx={{ mt: 1 }}>
          Add Clinical Criteria
        </Button>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Laboratory/Diagnostic Criteria
        </Typography>
        {formData.ADMITREASON.LABDIAG.map((item, i) => (
          <Box display="flex" gap={1} key={i}>
            <TextField
              fullWidth
              margin="dense"
              label={`Lab/Diag Criteria ${i + 1}`}
              value={item.pCriteria}
              onChange={(e) =>
                handleArrayChange("LABDIAG", i, "pCriteria", e.target.value)
              }
            />
            <IconButton
              onClick={() => removeItem("LABDIAG", i)}
              disabled={formData.ADMITREASON.LABDIAG.length === 1}
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={() => addItem("LABDIAG")} sx={{ mt: 1 }}>
          Add Lab/Diag Criteria
        </Button>

        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1">Physical Exam (PHEX)</Typography>

        <Grid container spacing={2}>
          {Object.entries(formData.ADMITREASON.PHEX).map(([key, val]) => {
            const labelMap = {
              pBP: "Blood Pressure",
              pCR: "Cardiac Rate",
              pRR: "Respiratory Rate",
              pTemp: "Temperature",
              pHEENT: "HEENT",
              pChestLungs: "Chest/Lungs",
              pCVS: "Cardiovascular System",
              pAbdomen: "Abdomen",
              pGUIE: "GU/IE",
              pSkinExtremities: "Skin/Extremities",
              pNeuroExam: "Neurological Exam",
            };

            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <TextField
                  fullWidth
                  margin="dense"
                  label={labelMap[key] || key}
                  value={val}
                  onChange={(e) => {
                    const updated = { ...formData };
                    updated.ADMITREASON.PHEX[key] = e.target.value;
                    setFormData(updated);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Course - WARD</Typography>

        <Button onClick={addCourse} sx={{ mt: 1 }}>
          Add Ward Course
        </Button>
        {formData.COURSE.WARD.map((item, i) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={i}
            sx={{ mb: 1, pb: 1, borderBottom: "1px solid #eee" }}
          >
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Course Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                margin="dense"
                value={item.pCourseDate}
                onChange={(e) =>
                  handleCourseChange(i, "pCourseDate", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Findings"
                margin="dense"
                value={item.pFindings}
                onChange={(e) =>
                  handleCourseChange(i, "pFindings", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Action"
                margin="dense"
                value={item.pAction}
                onChange={(e) =>
                  handleCourseChange(i, "pAction", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <IconButton
                onClick={() => removeCourse(i)}
                disabled={formData.COURSE.WARD.length === 1}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="textSecondary">
        Final JSON (for review/debug):
      </Typography>
      <pre style={{ background: "#eee", padding: 10, borderRadius: 4 }}>
        {JSON.stringify({ CF3_NEW: formData }, null, 2)}
      </pre> */}
      </fieldset>
    </Box>
  );
});

export default CF3FormNew;
