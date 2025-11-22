import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Divider,
  Typography,
} from "@mui/material";

function ProfessionalTables({ formData = [], setFormData, authUser }) {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [errorMsgs, setErrorMsgs] = useState({});

  // Initialize with one row if empty
  useEffect(() => {
    if (formData.length === 0) {
      setFormData([
        {
          pDoctorAccreCode: "",
          pDoctorLastName: "",
          pDoctorFirstName: "",
          pDoctorMiddleName: "",
          pDoctorSuffix: "",
          pWithCoPay: "N",
          pDoctorCoPay: "",
          pDoctorSignDate: "",
        },
      ]);
    }
  }, [formData, setFormData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...formData];
    updated[index][name] = value;
    setFormData(updated);
  };

  const handleValidate = async (index) => {
    const doctor = formData[index];
    const updatedErrors = { ...errorMsgs };
    delete updatedErrors[index];

    if (!doctor?.pDoctorAccreCode) return;

    setLoadingIndex(index);

    const formattedForm = {
      pDoctorAccreCode: doctor.pDoctorAccreCode || "",
      pDoctorLastName: doctor.pDoctorLastName || "",
      pDoctorFirstName: doctor.pDoctorFirstName || "",
      pDoctorMiddleName: doctor.pDoctorMiddleName || "",
      pDoctorSuffix: doctor.pDoctorSuffix || "",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/IsDoctorAccredited`,
        formattedForm,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.username_code,
            "Content-Type": "text/plain",
          },
        }
      );

      if (response.data?.isEligible === true) {
        // Optional: success action
      } else {
        updatedErrors[index] = "Doctor is not eligible.";
      }
    } catch (error) {
      updatedErrors[index] = "Validation request failed.";
    }

    setErrorMsgs(updatedErrors);
    setLoadingIndex(null);
  };

  const handleDelete = (index) => {
    if (index === 0) return;
    const updated = [...formData];
    updated.splice(index, 1);
    setFormData(updated);
  };

  const handleAddRow = () => {
    setFormData([
      ...formData,
      {
        pDoctorAccreCode: "",
        pDoctorLastName: "",
        pDoctorFirstName: "",
        pDoctorMiddleName: "",
        pDoctorSuffix: "",
        pWithCoPay: "N",
        pDoctorCoPay: "",
        pDoctorSignDate: "",
      },
    ]);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom mt={3} style={{ marginLeft: 15 }}>
        Professional Fees / Charges
        <Button
          variant="contained"
          onClick={handleAddRow}
          style={{ marginBottom: 10, marginLeft: 10 }}
        >
          Add Doctor
        </Button>
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Accre Code</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Middle Name</TableCell>
              <TableCell align="center">Suffix</TableCell>
              <TableCell align="center">With Co-Pay</TableCell>
              <TableCell align="center">Co-Pay Amount</TableCell>
              <TableCell align="center">Sign Date</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((val, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <TextField
                    name="pDoctorAccreCode"
                    value={val.pDoctorAccreCode || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorLastName"
                    value={val.pDoctorLastName || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorFirstName"
                    value={val.pDoctorFirstName || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorMiddleName"
                    value={val.pDoctorMiddleName || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorSuffix"
                    value={val.pDoctorSuffix || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                <input
                  type="checkbox"
                  checked={val.pWithCoPay === "Y"}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updated = [...formData];
                    updated[i].pWithCoPay = isChecked ? "Y" : "N";

                    // Optional: clear co-pay if unchecked
                    if (!isChecked) {
                      updated[i].pDoctorCoPay = "";
                    }

                    setFormData(updated);
                  }}
                />

                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorCoPay"
                    value={val.pDoctorCoPay || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="pDoctorSignDate"
                    type="date"
                    value={val.pDoctorSignDate || ""}
                    onChange={(e) => handleChange(e, i)}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    {/* <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => handleValidate(i)}
                      disabled={
                        loadingIndex === i ||
                        !val.pDoctorAccreCode ||
                        !val.pDoctorLastName ||
                        !val.pDoctorFirstName ||
                        !val.pDoctorMiddleName
                      }
                    >
                      {loadingIndex === i ? "Validating..." : "Validate"}
                    </Button> */}
                    {i !== 0 && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </Button>
                    )}
                    {errorMsgs[i] && (
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errorMsgs[i]}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProfessionalTables;
