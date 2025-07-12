import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";

// Initial values
const initialData = {
  DOCUMENTS: {
    DOCUMENT: [
      {
        pDocumentType: "",
        pDocumentURL: "",
      },
    ],
  },
};

const documentTypes = ["CF5", "CF4", "CSF", "ITB", "ESA"];

// ✅ Wrap in forwardRef
const AttachmentForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (index, key, value) => {
    const updated = { ...formData };
    updated.DOCUMENTS.DOCUMENT[index][key] = value;
    setFormData(updated);
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      DOCUMENTS: {
        DOCUMENT: [
          ...prev.DOCUMENTS.DOCUMENT,
          {
            pDocumentType: "",
            pDocumentURL: "",
          },
        ],
      },
    }));
  };

  const removeDocument = (index) => {
    const updated = { ...formData };
    updated.DOCUMENTS.DOCUMENT.splice(index, 1);
    setFormData(updated);
  };

  // ✅ Expose methods to parent
  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
    handleSubmit: () => {
      console.log("Attachment submitted:", formData);
    },
  }));

  const getAvailableTypes = (index) => {
    const selectedTypes = formData.DOCUMENTS.DOCUMENT
      .map((doc, i) => (i !== index ? doc.pDocumentType : null))
      .filter(Boolean);
    return documentTypes.filter((type) => !selectedTypes.includes(type));
  };

  return (
    <Box p={2}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Upload Attachment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {formData.DOCUMENTS.DOCUMENT.map((doc, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }} variant="outlined">
              <Typography variant="subtitle1">Document No. {index + 1}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Document Type"
                    value={doc.pDocumentType}
                    onChange={(e) =>
                      handleChange(index, "pDocumentType", e.target.value)
                    }
                  >
                    {getAvailableTypes(index).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document URL"
                    value={doc.pDocumentURL}
                    onChange={(e) =>
                      handleChange(index, "pDocumentURL", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
              <Box mt={1}>
                <Button
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => removeDocument(index)}
                >
                  Remove
                </Button>
              </Box>
            </Paper>
          ))}
          <Button variant="outlined" startIcon={<Add />} onClick={addDocument}>
            Add Document
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default AttachmentForm;
