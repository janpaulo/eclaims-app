import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Grid,
  Typography,
  FormGroup,
  Divider,
} from "@mui/material";

import EmployerValidation from "./EmployerValidation";


const ClaimForm1 = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
      // all fields here...
    });
  
  const [form, setForm] = useState({
    pinMember: "",
    memberLastName: "",
    firstName: "",
    nameExt: "",
    middleName: "",
    dobMember: "",
    address: "",
    sexMember: "",
    landline: "",
    mobile: "",
    email: "",
    isPatientMember: "yes",
    pinDependent: "",
    depLastName: "",
    depFirstName: "",
    depNameExt: "",
    depMiddleName: "",
    dobDependent: "",
    sexDependent: "",
    relationship: "",
    memberSignature: "",
    memberSignDate: "",
    repSignature: "",
    repSignDate: "",
    repRelationship: "",
    repReason: "",
    pen: "",
    employerContact: "",
    employerName: "",
    empSignName: "",
    empCapacity: "",
    empSignDate: "",
  });

  // Validation logic
  const validateForm = () => {
    // Replace with real validation
    const isValid = formData.name && formData.birthdate; // example
    return !!isValid;
  };

  const handleSubmit = () => {
    console.log("Submitting CF1 form data:", formData);
  };

  // Expose to parent
  useImperativeHandle(ref, () => ({
    validateForm,
    handleSubmit
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Part I – Member Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField
            label="PhilHealth Identification Number (PIN)"
            name="pinMember"
            value={form.pinMember}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Name inputs: Last, First, Middle, Extension */}
        {["LastName", "FirstName", "MiddleName", "NameExt"].map(
          (field, idx) => (
            <Grid item xs={12} md={3} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field.toLowerCase()}
                value={form[field.toLowerCase()]}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          )
        )}
        <Grid item xs={12} md={4}>
          <TextField
            label="Date of Birth"
            name="dobMember"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.dobMember}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mailing Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Sex</Typography>
          <RadioGroup
            row
            name="sexMember"
            value={form.sexMember}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </Grid>
        {/* Contact info */}
        {["landline", "mobile", "email"].map((key) => (
          <Grid item xs={12} md={4} key={key}>
            <TextField
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={form[key]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography>Is the patient the member?</Typography>
          <RadioGroup
            row
            name="isPatientMember"
            value={form.isPatientMember}
            onChange={handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>

        {form.isPatientMember === "no" && (
          <>
            <Grid item xs={12} md={12}>
              <Divider>
                <Typography variant="h6">
                  Part II – Patient (Dependent)
                </Typography>
              </Divider>
            </Grid>
            {[
              "pinDependent",
              "depLastName",
              "depFirstName",
              "depNameExt",
              "depMiddleName",
              "dobDependent",
            ].map((field) => (
              <Grid item xs={12} md={field.includes("dob") ? 4 : 3} key={field}>
                <TextField
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/dep /, "")
                    .trim()}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  type={field.includes("dob") ? "date" : "text"}
                  InputLabelProps={
                    field.includes("dob") ? { shrink: true } : undefined
                  }
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12} md={6}>
              <TextField
                label="Relationship to Member"
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Sex of Dependent</Typography>
              <RadioGroup
                row
                name="sexDependent"
                value={form.sexDependent}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
          </>
        )}

        <Grid item xs={12} md={12}>
          <Divider>
            <Typography variant="h6">
              Part III – Member Certification
            </Typography>
          </Divider>
          <br />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Member Signature (over printed name)"
            name="memberSignature"
            value={form.memberSignature}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date Signed"
            name="memberSignDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.memberSignDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Representative Signature"
            name="repSignature"
            value={form.repSignature}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date Signed (Rep)"
            name="repSignDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.repSignDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Representative Relationship to Member</Typography>
          <TextField
            name="repRelationship"
            value={form.repRelationship}
            onChange={handleChange}
            fullWidth
          />
          <Typography>Reason for Signing</Typography>
          <TextField
            name="repReason"
            value={form.repReason}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Divider>
            <Typography variant="h6">
              Part IV – Employer’s Certification (Employed Only)
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={12}>
          <EmployerValidation />
        </Grid>
      </Grid>
    </form>
  );
});

export default ClaimForm1;
