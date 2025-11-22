import React, { useState, useEffect, forwardRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DiagnosisCode from "./DiagnosisCode";
import SpecialConsiderations from "./SpecialConsiderations";

const PartII_PatientConfinement = forwardRef(
  (
    {
      form,
      handleChange,
      setForm,
      prefillData,
      packageType,
      setStoreDataDischarge,
    },
    ref
  ) => {
    const [formData, setFormData] = useState({
      ICD10orRVSCode: "",
      firstCaseRate: "",
      secondCaseRate: "",
    });

    // Prefill form when data is available
    useEffect(() => {
      if (prefillData && Object.keys(prefillData).length > 0) {
        setForm({
          lastName: prefillData.patientBasicInformation?.lastname || "",
          firstName: prefillData.patientBasicInformation?.firstname || "",
          middleName: prefillData.patientBasicInformation?.middlename || "",
          nameExt: prefillData.patientBasicInformation?.nameExtension || "",
        });
      }
    }, [prefillData]);

    useEffect(() => {
      const stillExists = form.DIAGNOSIS?.some(
        (item) => item.pitemCode === formData.ICD10orRVSCode
      );

      if (!stillExists && formData.ICD10orRVSCode) {
        // Reset selection because selected item was removed
        setFormData((prev) => ({
          ...prev,
          ICD10orRVSCode: "",
          firstCaseRate: "",
          secondCaseRate: "",
        }));
      }
    }, [form.DIAGNOSIS]);

    return (
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>PATIENT CONFINEMENT INFORMATION</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* 1. Name of Patient */}
            <Grid item xs={12}>
              <Typography  fontWeight="bold"> Name of Patient:</Typography>
            </Grid>
            {/* {["lastName", "firstName", "nameExt", "middleName"].map((field) => ( */}
              {[
                { name: "lastName", label: "Last Name",required:true },
                { name: "firstName", label: "First Name" ,required:true },
                { name: "middleName", label: "Middle Name" ,required:true },
                { name: "nameExt", label: "Suffix" },
              ].map(({ name, label,required }) => (
              <Grid item xs={12} md={3} key={name}>
                <TextField
                  label={label}
                  name={name}
                  required={required}
                  value={form[name] || ""}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            ))}

            {/* 2. Referred by other HCI */}
            <Grid item xs={6}>
              <Typography  fontWeight="bold"> 
                Was patient referred by another Health Care Institution
                (HCI)?
              </Typography>
              <RadioGroup row name="pPatientReferred" onChange={handleChange} 
                value={form.pPatientReferred}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <b>Emergency Case * :</b>
              </Typography>
              <RadioGroup
                row
                name="pIsEmergency"
                value={form.pIsEmergency}
                onChange={handleChange}
              >
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <b>Patient Type *:</b>
              </Typography>
              <RadioGroup
                row
                name="pPatientType"
                value={form.pPatientType}
                onChange={handleChange}
              >
                <FormControlLabel value="I" control={<Radio />} label="Inpatient" />
                <FormControlLabel value="O" control={<Radio />} label="Outpatient" />
              </RadioGroup>
            </Grid>

            {/* Referring HCI Details */}
            {form.pPatientReferred === "Y" && (
              <>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Name of referring HCI"
                    name="referringHCIName"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Street Name"
                    name="referringStreet"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="City"
                    name="referringCity"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Zip"
                    name="referringZip"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            {/* 3. Confinement Period */}
            <Grid item xs={12}>
              <Typography  fontWeight="bold"> Confinement Period:</Typography>
            </Grid>
            {[
              ["Date Admitted", "pAdmissionDate", "date"],
              ["Time Admitted", "pAdmissionTime", "time"],
              ["Date Discharged", "pDischargeDate", "date"],
              ["Time Discharged", "pDischargeTime", "time"],
            ].map(([label, name, type]) => (
              <Grid item xs={12} md={3} key={name}>
                <TextField
                  label={label}
                  name={name}
                  required
                  type={type}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            ))}

            {/* 4. Patient Disposition */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Patient Disposition
              </Typography>
              <RadioGroup
                name="pDisposition"
                value={form.pDisposition}
                onChange={handleChange}
              >
                <Grid container spacing={2}>
                  {[
                    ["Improved", "I", "date"],
                    ["Recovered", "R", "date"],
                    ["Home/Discharged Against Medical Advice", "H", "date"],
                    ["Absconded", "A", "date"],
                    ["Transferred/Referred", "T", "date"],
                    ["Expired", "E", "date"],
                  ].map(([label, value]) => (
                    <Grid item xs={12} sm={6} key={value}>
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </Grid>

            {/* Conditional: If Expired */}
            {form.pDisposition === "E" && (
              <>
                <Grid item xs={6} md={3}>
                  <TextField
                    name="pExpiredDate"
                    label="Date Expired"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={form.pExpiredDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    name="pExpiredTime"
                    label="Time Expired"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={form.pExpiredTime}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </>
            )}

            {/* Conditional: If Transferred/Referred */}
            {form.pDisposition === "T" && (
              <>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="pReferralIHCPAccreCode"
                    label="Accreditation number of Referral Health Care Institution"
                    value={form.pReferralIHCPAccreCode}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="pReferralReasons"
                    label="Reason for Referral/Transfer"
                    value={form.pReferralReasons}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12} md={4}>
                <TextField
                  name="referralCity"
                  label="City/Municipality"
                  value={form.referralCity}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid> */}
                {/* <Grid item xs={12} md={4}>
                <TextField
                  name="referralProvince"
                  label="Province"
                  value={form.referralProvince}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="referralZip"
                  label="Zip Code"
                  value={form.referralZip}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid> */}
              </>
            )}

            {/* 5. Type of Accommodation */}
            <Grid item xs={12}>
              <Typography fontWeight="bold">Type of Accommodation*</Typography>
              <RadioGroup row name="pAccommodationType" onChange={handleChange}>
                <FormControlLabel
                  value="P"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="N"
                  control={<Radio />}
                  label="Non-Private (Charity/Service)"
                />
              </RadioGroup>
            </Grid>

            {/* 6. Admission Diagnosis/es */}
            {/* <Grid item xs={12}>
            <TextField
              label="6. Admission Diagnosis/es"
              name="admissionDiagnosis"
              fullWidth
              multiline
              onChange={handleChange}
            />
          </Grid> */}

            <Grid item xs={12}>
              {/* <DiagnosisCode
              diagnosCodeData={form.DIAGNOSIS}
              onDataChange={(newData) =>
                setForm({ ...form, DIAGNOSIS: newData })
              }
            /> */}
              <DiagnosisCode
                ref={ref}
                setStoreDataDischarge={setStoreDataDischarge}
              />
            </Grid>

            {/* {console.log(form.specialConsiderations)} */}
            {/* {console.log(form.DIAGNOSIS)} */}

            <Grid item xs={12}>
              <SpecialConsiderations
                formData={form.specialConsiderations}
                setFormData={(updated) =>
                  setForm((prev) => ({
                    ...prev,
                    specialConsiderations: {
                      ...prev.specialConsiderations,
                      ...updated,
                    },
                  }))
                }
                dateAdmitted={form.pAdmissionDate}
                dateDischarged={form.pDischargeDate}
                packageType={packageType}
              />

              {/* <SpecialConsiderations
              formData={form.specialConsiderations}
              setFormData={(updated) =>
                setForm((prev) => ({
                  ...prev,
                  specialConsiderations: updated,
                }))
              }
              dateAdmitted={form.pAdmissionDate}
              dateDischarged={form.pDischargeDate}
            /> */}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
);

export default PartII_PatientConfinement;
