import React, {useState} from "react";
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
  Checkbox,
  FormGroup,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DiagnosisCode from "./DiagnosisCode";
import SpecialConsiderations from "./SpecialConsiderations";
export default function PartII_PatientConfinement({ form, handleChange,setForm }) {

  const [formData, setFormData] = useState({
    // Initialize all checkbox fields with false
    Hemodialysis: false,
    'Peritoneal Dialysis': false,
    'Radiotherapy (LINAC)': false,
    'Radiotherapy (COBALT)': false,
    'Blood Transfusion': false,
    Brachytherapy: false,
    Chemotherapy: false,
    'Simple Debridement': false,
    'Intensive Phase': false,
    'Maintenance Phase': false,
    'Essential Newborn Care': false,
    'Newborn Hearing Screening Test': false,
    'Newborn Screening Test': false,
    'Immediate drying of newborn': false,
    'Early skin-to-skin contact': false,
    'Timely cord clamping': false,
    'Eye Prophylaxis': false,
    'Vitamin K administration': false,
    'BCG vaccination': false,
    'Hepatitis B vaccination': false,
    'Non-separation of mother/baby for early breastfeeding initiation': false,
  
    // Initialize text fields with empty strings
    zBenefitPackageCode: '',
    mcpDate1: '',
    mcpDate2: '',
    mcpDate3: '',
    mcpDate4: '',
    'Day 0 ARV': '',
    'Day 3 ARV': '',
    'Day 7 ARV': '',
    RIG: '',
    OthersSpecify: '',
    ICD10orRVSCode: '',
    firstCaseRate: '',
    secondCaseRate: '',
  });

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography >
          Part II – Patient Confinement Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* 1. Name of Patient */}
          <Grid item xs={12}>
            <Typography>1. Name of Patient:</Typography>
          </Grid>
          {["lastName", "firstName", "nameExt", "middleName"].map(
            (field, idx) => (
              <Grid item xs={12} md={3} key={field}>
                <TextField
                  label={field}
                  name={field}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            )
          )}

          {/* 2. Referred by other HCI */}
          <Grid item xs={12}>
            <Typography>
              2. Was patient referred by another Health Care Institution (HCI)?
            </Typography>
            <RadioGroup row name="referredHCI" onChange={handleChange}>
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Grid>
          {/* Referring HCI Details */}
          {form.referredHCI === "yes" && (
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
            <Typography>3. Confinement Period:</Typography>
          </Grid>
          {[
            ["Date Admitted", "dateAdmitted", "date"],
            ["Time Admitted", "timeAdmitted", "time"],
            ["Date Discharged", "dateDischarged", "date"],
            ["Time Discharged", "timeDischarged", "time"],
          ].map(([label, name, type]) => (
            <Grid item xs={12} md={3} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          ))}

          {/* 4. Patient Disposition */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">4. Patient Disposition</Typography>
            <RadioGroup
              name="patientDisposition"
              value={form.patientDisposition}
              onChange={handleChange}
            >
              <Grid container spacing={2}>
                {[
                  "Improved",
                  "Recovered",
                  "Home/Discharged Against Medical Advice",
                  "Absconded",
                  "Expired",
                  "Transferred/Referred",
                ].map((label, i) => (
                  <Grid item xs={12} sm={6} key={label}>
                    <FormControlLabel
                      value={label}
                      control={<Radio />}
                      label={`${String.fromCharCode(97 + i)}. ${label}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Conditional: If Expired */}
          {form.patientDisposition === "Expired" && (
            <>
              <Grid item xs={6} md={3}>
                <TextField
                  name="dateExpired"
                  label="Date Expired"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.dateExpired}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  name="timeExpired"
                  label="Time Expired"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={form.timeExpired}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </>
          )}

          {/* Conditional: If Transferred/Referred */}
          {form.patientDisposition === "Transferred/Referred" && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  name="referralHCIName"
                  label="Name of Referral Health Care Institution"
                  value={form.referralHCIName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="referralReason"
                  label="Reason for Referral/Transfer"
                  value={form.referralReason}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="referralCity"
                  label="City/Municipality"
                  value={form.referralCity}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
            </>
          )}

          {/* 5. Type of Accommodation */}
          <Grid item xs={12}>
            <Typography>5. Type of Accommodation:</Typography>
            <RadioGroup row name="accommodation" onChange={handleChange}>
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="nonPrivate"
                control={<Radio />}
                label="Non-Private (Charity/Service)"
              />
            </RadioGroup>
          </Grid>

          {/* 6. Admission Diagnosis/es */}
          <Grid item xs={12}>
            <TextField
              label="6. Admission Diagnosis/es"
              name="admissionDiagnosis"
              fullWidth
              multiline
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <DiagnosisCode diagnosCodeData={form.diagnosisCodes} onDataChange={(newData) => setForm({ ...form, diagnosisCodes: newData })} />
          </Grid>

            {/* {console.log(form.diagnosisCodes)} */}
          
          <Grid item xs={12}>
            <SpecialConsiderations formData={formData}  setFormData={setFormData} dateAdmitted={form.dateAdmitted} dateDischarged={form.dateDischarged}/>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
