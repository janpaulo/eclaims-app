import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import Select from "react-select";
import axios from "axios";
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

const documentTypes = ["CSF", "COE", "ITB", "ESA", "OTH", "CF4", "CF5"];

const AttachmentForm = forwardRef((props, ref) => {
  const authUser = props.authUser;
  const [formData, setFormData] = useState(initialData);
  const [openEncryptModal, setOpenEncryptModal] = useState(false);
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptInputError, setEncryptInputError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [referenceNo, setReferenceNo] = useState("");
  const [referenceNoError, setReferenceNoError] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [fileOptions, setFileOptions] = useState([]);
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_CLAIMS}file-browser/list`
      );
      setFileOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const encryptOptions = ["CSF", "COE", "ITB", "OTH"];
  const [encryptSelect, setEncryptSelect] = useState("");

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

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isValid = formData.DOCUMENTS.DOCUMENT.every(
        (doc) => doc.pDocumentType?.trim() && doc.pDocumentURL?.trim()
      );
      // console.log("ATTACHMENT valid:", isValid);
      return isValid;
    },
    getFormData: () => formData,
    handleSubmit: () => {
      // console.log("Attachment submitted:", formData);
    },
  }));

  const getAvailableTypes = (index) => {
    const selectedTypes = formData.DOCUMENTS.DOCUMENT.map((doc, i) =>
      i !== index ? doc.pDocumentType : null
    ).filter(Boolean);
    return documentTypes.filter((type) => !selectedTypes.includes(type));
  };

  // Handle modal open/close
  const handleOpenEncryptModal = () => {
    setOpenEncryptModal(true);
  };

  const handleCloseEncryptModal = () => {
    setOpenEncryptModal(false);
    setEncryptInput("");
    setReferenceNo("");
    setSelectedFile(null);
  };

  const handleEncryptSubmit = async () => {
    let hasError = false;

    if (!encryptInput.trim()) {
      setEncryptInputError(true);
      hasError = true;
    }

    if (encryptSelect === "COE" && !referenceNo.trim()) {
      setReferenceNoError(true);
      hasError = true;
    }

    if (!encryptSelect || !selectedFile) {
      alert("Please complete all required fields.");
      hasError = true;
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("document", encryptSelect);
    if (encryptSelect === "COE") {
      formData.append("referenceno", referenceNo);
    } else {
      formData.append("referenceno", "");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/encryptPDF?filename=${encryptInput}`,
        formData,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
          },
        }
      );
      fetchFiles();
      setSnackbar({
        open: true,
        message: "Encryption successful!",
        severity: "success",
      });

      handleCloseEncryptModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Encryption failed.";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <Box p={2}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Upload Attachment
          </Typography>
          <Button
            variant="contained"
            startIcon={<EnhancedEncryptionIcon />}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpenEncryptModal();
            }}
          >
            Encrypt File
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          {formData.DOCUMENTS.DOCUMENT.map((doc, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }} variant="outlined">
              <Typography variant="subtitle1">
                Document No. {index + 1}
              </Typography>
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
                {/* <Grid item xs={12}>
                  <Select
                    placeholder="Select Document URL"
                    isClearable
                    options={fileOptions
                      .filter((file) => {
                        const docType = doc.pDocumentType?.toUpperCase();
                        if (!docType) return false;

                        const suffixMap = {
                          COE: "-coe.enc",
                          ECLAIMS: "-eclaims.enc",
                          ESA: "-esoa.enc",
                          OTH: "-oth.enc",
                        };

                        const suffix = suffixMap[docType];
                        if (!suffix) return false;

                        return file.name.toLowerCase().endsWith(suffix);
                      })
                      .map((file) => ({
                        value: file.path,
                        label: file.path,
                      }))}
                    value={
                      fileOptions
                        .filter((file) => {
                          const suffix =
                            {
                              COE: "-coe.enc",
                              ECLAIMS: "-eclaims.enc",
                              ESA: "-esoa.enc",
                              OTH: "-oth.enc",
                            }[doc.pDocumentType?.toUpperCase()] || "";

                          return file.name.toLowerCase().endsWith(suffix);
                        })
                        .map((file) => ({
                          value: file.path,
                          label: file.path,
                        }))
                        .find((option) => option.value === doc.pDocumentURL) ||
                      null
                    }
                    onChange={(selectedOption) =>
                      handleChange(
                        index,
                        "pDocumentURL",
                        selectedOption?.value || ""
                      )
                    }
                  />
                </Grid> */}
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

      {/* 🔐 Encrypt Modal */}
      <Dialog
        open={openEncryptModal}
        onClose={handleCloseEncryptModal}
        maxWidth="md" // Options: 'xs', 'sm', 'md', 'lg', 'xl'
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            minHeight: 300, // ✅ Increase height
            padding: 2,
          },
        }}
      >
        <DialogTitle>Encrypt File</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Select Document to Encrypt"
            value={encryptSelect}
            onChange={(e) => {
              setEncryptSelect(e.target.value);
              if (e.target.value !== "COE") setReferenceNo("");
            }}
            margin="dense"
          >
            {encryptOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Show reference number if COE */}
          {encryptSelect === "COE" && (
            <TextField
              margin="dense"
              fullWidth
              label="Reference Number"
              value={referenceNo}
              required
              error={referenceNoError}
              helperText={
                referenceNoError ? "Reference Number is required for COE." : ""
              }
              onChange={(e) => {
                setReferenceNo(e.target.value);
                if (e.target.value.trim() !== "") {
                  setReferenceNoError(false);
                }
              }}
            />
          )}

          {/* Text to encrypt */}
          <TextField
            margin="dense"
            label="Enter desired filename"
            fullWidth
            placeholder="2025-01-OTH"
            value={encryptInput}
            required
            error={encryptInputError}
            helperText={encryptInputError ? "Filename is required." : ""}
            onChange={(e) => {
              setEncryptInput(e.target.value);
              if (e.target.value.trim() !== "") {
                setEncryptInputError(false);
              }
            }}
          />

          {/* Upload file */}
          <Box mt={2}>
            <Button variant="outlined" component="label" fullWidth>
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setSelectedFile(file);
                }}
              />
            </Button>

            {selectedFile && (
              <Typography variant="body2" mt={1}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEncryptModal}>Cancel</Button>
          <Button variant="contained" onClick={handleEncryptSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default AttachmentForm;
