// ClaimSignatureForm.jsx
import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// --- initial form model ---------------------------------------------------
const initialState = {
  // PART I – Member / Patient
  member: {
    pin: '',
    lastName: '',
    firstName: '',
    ext: '',
    middleName: '',
    dob: null,
  },
  dependentPin: '',
  patient: {
    lastName: '',
    firstName: '',
    ext: '',
    middleName: '',
    relationship: '',
    dob: null,
  },
  confinement: { admitted: null, discharged: null },

  memberCertification: {
    signedByRepresentative: false,
    representativeName: '',
    representativeRelationship: '',
    representativeReason: '',
    date: null,
  },

  // PART II – Employer (if employed)
  employer: {
    pen: '',
    contact: '',
    businessName: '',
    repName: '',
    repDesignation: '',
    date: null,
  },

  // PART III – Consent
  consent: {
    signedByRepresentative: false,
    representativeName: '',
    representativeRelationship: '',
    representativeReason: '',
    date: null,
  },

  // PART IV – Health‑care Professionals (up to three rows on the PDF)
  professionals: [
    { accreditationNo: '', name: '', date: null },
    { accreditationNo: '', name: '', date: null },
    { accreditationNo: '', name: '', date: null },
  ],

  // PART V – Provider
  provider: {
    firstCaseRate: '',
    secondCaseRate: '',
    hciRepName: '',
    hciRepDesignation: '',
    date: null,
  },
};

// --------------------------------------------------------------------------
export default function CSForm() {
  const [form, setForm] = useState(initialState);

  // generic text/checkbox/radio change handler
  const handleChange = (path) => (e) => {
    const { value, type, checked } = e.target;
    setForm((prev) => {
      const copy = structuredClone(prev);
      // drill down to the correct nested property
      const keys = path.split('.');
      let obj = copy;
      keys.slice(0, -1).forEach((k) => (obj = obj[k]));
      obj[keys.at(-1)] = type === 'checkbox' ? checked : value;
      return copy;
    });
  };

  // date change (returns dayjs | null)
  const handleDateChange = (path) => (newVal) => {
    setForm((prev) => {
      const copy = structuredClone(prev);
      const keys = path.split('.');
      let obj = copy;
      keys.slice(0, -1).forEach((k) => (obj = obj[k]));
      obj[keys.at(-1)] = newVal;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for demo only – replace with API call / PDF render etc.
    console.log('CSF payload', {
      ...form,
      // convert dayjs objects to ISO for transport
      member: { ...form.member, dob: toISO(form.member.dob) },
      patient: { ...form.patient, dob: toISO(form.patient.dob) },
      confinement: {
        admitted: toISO(form.confinement.admitted),
        discharged: toISO(form.confinement.discharged),
      },
      memberCertification: {
        ...form.memberCertification,
        date: toISO(form.memberCertification.date),
      },
      employer: { ...form.employer, date: toISO(form.employer.date) },
      consent: { ...form.consent, date: toISO(form.consent.date) },
      professionals: form.professionals.map((p) => ({
        ...p,
        date: toISO(p.date),
      })),
      provider: { ...form.provider, date: toISO(form.provider.date) },
    });
  };

  const toISO = (d) => (dayjs.isDayjs(d) ? d.format('YYYY-MM-DD') : null);

  // ------------------------------------------------------------------------
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 900, mx: 'auto', p: 2 }}
      >
        {/* HEADER / REMINDERS */}
        <Typography variant="h6" gutterBottom>
          CLAIM SIGNATURE FORM (CSF) — Revised September 2018
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          PLEASE WRITE IN CAPITAL LETTERS AND CHECK THE APPROPRIATE BOXES.
        </Typography>

        {/* ─────────────────────────────────────────────────────────── PART I */}
        <Section title="PART I – MEMBER AND PATIENT INFORMATION & CERTIFICATION">
          <Grid container spacing={2}>
            {/* 1 – Member PIN */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="1. Member PIN"
                fullWidth
                value={form.member.pin}
                onChange={handleChange('member.pin')}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>

            {/* 2 – Member Name */}
            <NameFields
              labelPrefix="2. Member Name"
              basePath="member"
              data={form.member}
              onChange={handleChange}
            />

            {/* 3 – Member DOB */}
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="3. Member Date of Birth"
                value={form.member.dob}
                onChange={handleDateChange('member.dob')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* 4 – Dependent PIN */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="4. Dependent PIN"
                fullWidth
                value={form.dependentPin}
                onChange={handleChange('dependentPin')}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>

            {/* 5 – Patient Name */}
            <NameFields
              labelPrefix="5. Patient Name"
              basePath="patient"
              data={form.patient}
              onChange={handleChange}
            />

            {/* 6 – Relationship */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>6. Relationship to Member</FormLabel>
                <RadioGroup
                  row
                  value={form.patient.relationship}
                  onChange={handleChange('patient.relationship')}
                >
                  {['child', 'parent', 'spouse'].map((opt) => (
                    <FormControlLabel
                      key={opt}
                      value={opt}
                      control={<Radio />}
                      label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* 7 – Confinement Period */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                7. Confinement Period
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date Admitted"
                value={form.confinement.admitted}
                onChange={handleDateChange('confinement.admitted')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date Discharged"
                value={form.confinement.discharged}
                onChange={handleDateChange('confinement.discharged')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* 8 – Patient DOB */}
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="8. Patient Date of Birth"
                value={form.patient.dob}
                onChange={handleDateChange('patient.dob')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* CERTIFICATION check‑box */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.memberCertification.signedByRepresentative}
                    onChange={handleChange(
                      'memberCertification.signedByRepresentative'
                    )}
                  />
                }
                label="Signed by Member’s Representative (tick if NOT the member)"
              />
            </Grid>

            {form.memberCertification.signedByRepresentative && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Representative Name"
                    fullWidth
                    value={form.memberCertification.representativeName}
                    onChange={handleChange(
                      'memberCertification.representativeName'
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Relationship to Member"
                    fullWidth
                    value={form.memberCertification.representativeRelationship}
                    onChange={handleChange(
                      'memberCertification.representativeRelationship'
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason (e.g. Member is incapacitated)"
                    fullWidth
                    value={form.memberCertification.representativeReason}
                    onChange={handleChange(
                      'memberCertification.representativeReason'
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Certification Date"
                value={form.memberCertification.date}
                onChange={handleDateChange('memberCertification.date')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </Section>

        {/* ────────────────────────────────────────────────────────── PART II */}
        <Section title="PART II – EMPLOYER’S CERTIFICATION (for employed members only)">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="1. Employer PEN"
                fullWidth
                value={form.employer.pen}
                onChange={handleChange('employer.pen')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="2. Employer Contact No."
                fullWidth
                value={form.employer.contact}
                onChange={handleChange('employer.contact')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="3. Business Name"
                fullWidth
                value={form.employer.businessName}
                onChange={handleChange('employer.businessName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Authorized Representative"
                fullWidth
                value={form.employer.repName}
                onChange={handleChange('employer.repName')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Designation / Capacity"
                fullWidth
                value={form.employer.repDesignation}
                onChange={handleChange('employer.repDesignation')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Date Signed"
                value={form.employer.date}
                onChange={handleDateChange('employer.date')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </Section>

        {/* ───────────────────────────────────────────────────────── PART III */}
        <Section title="PART III – CONSENT TO ACCESS PATIENT RECORD/S">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.consent.signedByRepresentative}
                    onChange={handleChange(
                      'consent.signedByRepresentative'
                    )}
                  />
                }
                label="Signed by Patient’s Representative (tick if NOT the patient)"
              />
            </Grid>

            {form.consent.signedByRepresentative && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Representative Name"
                    fullWidth
                    value={form.consent.representativeName}
                    onChange={handleChange(
                      'consent.representativeName'
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Relationship to Patient"
                    fullWidth
                    value={form.consent.representativeRelationship}
                    onChange={handleChange(
                      'consent.representativeRelationship'
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason"
                    fullWidth
                    value={form.consent.representativeReason}
                    onChange={handleChange(
                      'consent.representativeReason'
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Date Signed"
                value={form.consent.date}
                onChange={handleDateChange('consent.date')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </Section>

        {/* ───────────────────────────────────────────────────────── PART IV */}
        <Section title="PART IV – HEALTH CARE PROFESSIONAL INFORMATION">
          {form.professionals.map((prof, idx) => (
            <Grid container spacing={2} key={idx} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Accreditation No. (${idx + 1})`}
                  fullWidth
                  value={prof.accreditationNo}
                  onChange={(e) =>
                    updateArrayField(
                      'professionals',
                      idx,
                      'accreditationNo',
                      e.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Signature Over Printed Name"
                  fullWidth
                  value={prof.name}
                  onChange={(e) =>
                    updateArrayField('professionals', idx, 'name', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Date"
                  value={prof.date}
                  onChange={(newVal) =>
                    updateArrayField('professionals', idx, 'date', newVal)
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </Grid>
          ))}
        </Section>

        {/* ───────────────────────────────────────────────────────── PART V */}
        <Section title="PART V – PROVIDER INFORMATION & CERTIFICATION">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Case Rate (ICD10 / RVS)"
                fullWidth
                value={form.provider.firstCaseRate}
                onChange={handleChange('provider.firstCaseRate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Second Case Rate (if any)"
                fullWidth
                value={form.provider.secondCaseRate}
                onChange={handleChange('provider.secondCaseRate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Authorized HCI Representative"
                fullWidth
                value={form.provider.hciRepName}
                onChange={handleChange('provider.hciRepName')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Designation / Capacity"
                fullWidth
                value={form.provider.hciRepDesignation}
                onChange={handleChange('provider.hciRepDesignation')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Date Signed"
                value={form.provider.date}
                onChange={handleDateChange('provider.date')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </Section>

        {/* ───────────────────────────────────────────────────────── ACTIONS */}
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );

  // helpers ---------------------------------------------------------------
  function updateArrayField(arrPath, index, field, value) {
    setForm((prev) => {
      const copy = structuredClone(prev);
      copy[arrPath][index][field] = value;
      return copy;
    });
  }
}

// Tiny helper component for section wrappers
function Section({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );
}

// Re‑usable “Name” field quartet
function NameFields({ labelPrefix, basePath, data, onChange }) {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle2">{labelPrefix}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Last Name"
          fullWidth
          value={data.lastName}
          onChange={onChange(`${basePath}.lastName`)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="First Name"
          fullWidth
          value={data.firstName}
          onChange={onChange(`${basePath}.firstName`)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Extension (JR/SR/III)"
          fullWidth
          value={data.ext}
          onChange={onChange(`${basePath}.ext`)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Middle Name"
          fullWidth
          value={data.middleName}
          onChange={onChange(`${basePath}.middleName`)}
        />
      </Grid>
    </>
  );
}
