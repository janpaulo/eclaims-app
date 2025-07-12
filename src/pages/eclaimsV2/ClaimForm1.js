import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import EmployerValidation from "./EmployerValidation";

const ClaimForm1 = forwardRef(({ prefillData, authUser }, ref) => {
  const [form, setForm] = useState({
    pMemberPIN: "",
    pMemberLastName: "",
    pMemberFirstName: "",
    pMemberSuffix: "",
    pMemberMiddleName: "",
    pMemberBirthDate: "",
    pMemberShipType: "",
    pMailingAddress: "",
    pZipCode: "",
    pMemberSex: "",
    pLandlineNo: "",
    pMobileNo: "",
    pEmailAddress: "",
    pPatientIs: "M",
    pPatientPIN: "",
    pPatientLastName: "",
    pPatientFirstName: "",
    pPatientSuffix: "",
    pPatientMiddleName: "",
    pPatientBirthDate: "",
    pPatientSex: "",
    pPEN: "",
    pEmployerName: "",
    pClaimNumber: "",
    pTrackingNumber: "",
  });

  useEffect(() => {
    if (prefillData && Object.keys(prefillData).length > 0) {
      const rawDOB = prefillData.memberBasicInformation?.dateOfBirth || "";
      const formattedDOB = rawDOB ? moment(rawDOB).format("YYYY-MM-DD") : "";

      const newForm = {
        pMemberPIN: prefillData.memberPIN || "",
        pMemberLastName: prefillData.memberBasicInformation?.lastname || "",
        pMemberFirstName: prefillData.memberBasicInformation?.firstname || "",
        pMemberMiddleName: prefillData.memberBasicInformation?.middlename || "",
        pMemberSuffix: prefillData.memberBasicInformation?.nameExtension || "",
        pMemberBirthDate: formattedDOB,
        pMemberSex: prefillData.memberBasicInformation?.sex || "",
        pMailingAddress: prefillData.memberAddress?.address || "",
        pMobileNo: prefillData.memberContactInfo?.mobileNo || "",
        pEmailAddress: prefillData.memberContactInfo?.email || "",
        pPatientIs: prefillData.patientIs || "",
      };

      if (prefillData.patientIs === "M") {
        newForm.pPatientPIN = prefillData.memberPIN || "";
        newForm.pPatientLastName =
          prefillData.patientBasicInformation?.lastname || "";
        newForm.pPatientFirstName =
          prefillData.patientBasicInformation?.firstname || "";
        newForm.pPatientSuffix =
          prefillData.patientBasicInformation?.suffix || "";
        newForm.pPatientMiddleName =
          prefillData.patientBasicInformation?.middlename || "";
        newForm.pPatientBirthDate = formattedDOB || "";
        newForm.pPatientSex = prefillData.patientBasicInformation?.sex || "";
      }

      setForm((prev) => ({
        ...prev,
        ...newForm,
      }));
    }
  }, [prefillData]);

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isValid =
        form.pMemberPIN?.trim() &&
        form.pMemberFirstName?.trim() &&
        form.pMemberLastName?.trim() &&
        form.pMemberMiddleName?.trim() &&
        form.pMemberBirthDate?.trim() &&
        form.pPatientSex?.trim() &&
        form.pPatientIs?.trim() &&
        form.pClaimNumber?.trim() &&
        form.pMemberShipType?.trim() &&
        form.pTrackingNumber?.trim();
      console.log("CF1 valid:", !!isValid);
      return !!isValid;
    },
    getFormData: () => form,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pPatientIs") {
      if (value === "M") {
        // Autofill patient with member data
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          pPatientPIN: prevForm.pMemberPIN || "",
          pPatientLastName: prevForm.pMemberLastName || "",
          pPatientFirstName: prevForm.pMemberFirstName || "",
          pPatientSuffix: prevForm.pMemberSuffix || "",
          pPatientMiddleName: prevForm.pMemberMiddleName || "",
          pPatientBirthDate: prevForm.pMemberBirthDate || "",
          pPatientSex: prevForm.pMemberSex || "",
        }));
      } else if (value === "D") {
        // Clear patient fields
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          pPatientPIN: "",
          pPatientLastName: "",
          pPatientFirstName: "",
          pPatientSuffix: "",
          pPatientMiddleName: "",
          pPatientBirthDate: "",
          pPatientSex: "",
        }));
      } else {
        // Just update value if needed
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      }
    } else {
      // Normal form change
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Claim Number *"
            name="pClaimNumber"
            value={form.pClaimNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Tracking Number *"
            name="pTrackingNumber"
            value={form.pTrackingNumber}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
      <Divider  sx={{
          margin:2
        }}>
        <Typography variant="h6">Member Information</Typography>
      </Divider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="PhilHealth Identification Number (PIN) *"
            name="pMemberPIN"
            value={form.pMemberPIN}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Name Fields */}
        {[
          { name: "pMemberLastName", label: "Last Name", required: true },
          { name: "pMemberFirstName", label: "First Name", required: true },
          { name: "pMemberMiddleName", label: "Middle Name", required: true },
          { name: "pMemberSuffix", label: "Suffix" },
        ].map(({ name, label, required }) => (
          <Grid item xs={12} md={3} key={name}>
            <TextField
              label={label}
              required={required}
              name={name}
              value={form[name]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}

        <Grid item xs={12} md={4}>
          <TextField
            label="Date of Birth *"
            name="pMemberBirthDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.pMemberBirthDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mailing Address"
            name="pMailingAddress"
            value={form.pMailingAddress}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Zip Code"
            name="pZipCode"
            value={form.pZipCode}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography>Sex *</Typography>
          <RadioGroup
            row
            name="pMemberSex"
            required
            value={form.pMemberSex}
            onChange={handleChange}
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>
        </Grid>

        {/* Contact Info */}
        {[
          { name: "pLandlineNo", label: "Landline No" },
          { name: "pMobileNo", label: "Mobile No" },
          { name: "pEmailAddress", label: "Email Address" },
        ].map(({ name, label }) => (
          <Grid item xs={12} md={4} key={name}>
            <TextField
              label={label}
              name={name}
              value={form[name]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}

        {/* <Grid item xs={4}>
          <Typography>Is the patient the member? *</Typography>
          <RadioGroup
            row
            name="pPatientIs"
            value={form.pPatientIs}
            onChange={handleChange}
          >
            <FormControlLabel value="M" control={<Radio />} label="Yes" />
            <FormControlLabel value="D" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid> */}

        <Grid item xs={6}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Relationship to Member *
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="pPatientIs"
              value={form.pPatientIs}
              onChange={handleChange}
            >
              <FormControlLabel value="M" control={<Radio />} label="Member" />
              <FormControlLabel value="C" control={<Radio />} label="Child" />
              <FormControlLabel value="P" control={<Radio />} label="Parent" />
              <FormControlLabel value="S" control={<Radio />} label="Spouse" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography>Select Membership Type *</Typography>
          <FormControl fullWidth>
            <TextField
              select
              name="pMemberShipType"
              size="small"
              value={form.pMemberShipType}
              onChange={handleChange}
              // label="Select Membership Type"
              required
            >
              <MenuItem value="S">Employed Private</MenuItem>
              <MenuItem value="G">Employer Government</MenuItem>
              <MenuItem value="I">Indigent</MenuItem>
              <MenuItem value="NS">Individually Paying</MenuItem>
              <MenuItem value="NO">OFW</MenuItem>
              <MenuItem value="PS">Non Paying Private</MenuItem>
              <MenuItem value="PG">Non Paying Government</MenuItem>
              <MenuItem value="P">Lifetime member</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        {/* Dependent Section */}
        {form.pPatientIs !== "M" && (
          <>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="h6">Patient (Dependent)</Typography>
              </Divider>
            </Grid>
            {[
              { name: "pPatientPIN", label: "PIN" },
              { name: "pPatientLastName", label: "Last Name" },
              { name: "pPatientFirstName", label: "First Name" },
              { name: "pPatientMiddleName", label: "Middle Name" },
              { name: "pPatientSuffix", label: "Suffix" },
            ].map(({ name, label }) => (
              <Grid item xs={12} md={3} key={name}>
                <TextField
                  label={label}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <TextField
                label="Date of Birth"
                name="pPatientBirthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.pPatientBirthDate}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>Sex *</Typography>
              <RadioGroup
                row
                name="pPatientSex"
                value={form.pPatientSex}
                onChange={handleChange}
              >
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
          </>
        )}

        {/* Employer Certification */}

        <Grid item xs={12}>
          <EmployerValidation authUser={authUser} setForm={setForm} />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="h6">Employer’s Certification</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="PhilHealth Employer Number (PEN)"
            name="pPEN"
            value={form.pPEN}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Employer Name"
            name="pEmployerName"
            value={form.pEmployerName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
});

export default ClaimForm1;
