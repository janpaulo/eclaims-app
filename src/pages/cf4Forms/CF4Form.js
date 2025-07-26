// CF4Form.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Divider,
  FormGroup,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

// ---------- constant helpers ----------
const initialDoctorOrderRow = { date: "", order: "" };
const initialDrugRow = {
  genericName: "",
  dosage: "",
  totalCost: "",
  genericNameCont: "",
  dosageCont: "",
  totalCostCont: "",
};
const signSymptomsList = [
  "Altered mental sensorium",
  "Abdominal cramp/pain",
  "Anorexia",
  "Bleeding gums",
  "Body weakness",
  "Blurring of vision",
  "Chest pain/discomfort",
  "Constipation",
  "Cough",
  "Diarrhea",
  "Dizziness",
  "Dysphagia",
  "Dyspnea",
  "Dysuria",
  "Epistaxis",
  "Fever",
  "Frequency of urination",
  "Headache",
  "Hematemesis",
  "Hematuria",
  "Hemoptysis",
  "Irritability",
  "Jaundice",
  "Lower extremity edema",
  "Myalgia",
  "Orthopnea",
  "Palpitations",
  "Pain (specify site)",
  "Seizures",
  "Skin rashes",
  "Stool, bloody/black tarry/mucoid",
  "Sweating",
  "Urgency",
  "Vomiting",
  "Weight loss",
  "Others",
];

const initialPEState = {
  Heent: {
    essentiallyNormal: false,
    abnormalPupillaryReaction: false,
    cervicalLymphadenopathy: false,
    dryMcousMembrane: false,
    ictericSclerae: false,
    paleConjunctivae: false,
    sunkenEyeballs: false,
    sunkenFontanelle: false,
    others: "",
  },
  "CHEST / LUNGS": {
    essentiallyNormal: false,
    asymmetricalChestExpansion: false,
    decreasedBreathSounds: false,
    wheezes: false,
    "lump/sOverBreast(s)": false,
    "Rales/crackles/rhonch": false,
    "IntercostalRib/clavicularRetraction": false,
    others: "",
  },
  CVS: {
    essentiallyNormal: false,
    displacedApex: false,
    heavesThrill: false,
    pericardialBulge: false,
    irregularRhythm: false,
    muffledHeartSounds: false,
    murmur: false,
    others: "",
  },
  ABDOMEN: {
    essentiallyNormal: false,
    rigidity: false,
    tenderness: false,
    hyperBowel: false,
    palpableMass: false,
    tympanicAbdomen: false,
    uterineContraction: false,
    others: "",
  },
  "GU (IE)": {
    essentiallyNormal: false,
    bloodStained: false,
    cervicalDilatation: false,
    abnormalDischarge: false,
    others: "",
  },
  "SKIN / EXTREMITIES": {
    essentiallyNormal: false,
    clubbing: false,
    edema: false,
    decreasedMobility: false,
    rash: false,
    weakPulses: false,
    coldSkin: false,
    cyanosis: false,
    paleNailbeds: false,
    poorSkinTurgor: false,
    others: "",
  },
  "NEURO-EXAM": {
    essentiallyNormal: false,
    abnormalGait: false,
    abnormalReflex: false,
    abnormalSense: false,
    poorTone: false,
    poorCoordination: false,
    others: "",
  },
};

// MAIN COMPONENT
export default function CF4Form() {
  // ---------- STATE ----------

  const [pe, setPE] = useState(initialPEState);
  const [formData, setFormData] = useState({
    /* PART I */
    hciName: "",
    accreditationNo: "",
    hciAddress: "",
    /* PART II */
    patientLast: "",
    patientFirst: "",
    patientMiddle: "",
    pin: "",
    age: "",
    sex: "",
    chiefComplaint: "",
    admittingDx: "",
    dischargeDx: "",
    caseRate1: "",
    caseRate2: "",
    dateAdmitted: "",
    timeAdmitted: "",
    ampmAdmit: "AM",
    dateDischarged: "",
    timeDischarged: "",
    ampmDischarge: "AM",
    /* PART III  – single‑value items */
    historyPresentIllness: "",
    pastMedicalHistory: "",
    obGyn_G: "",
    obGyn_P: "",
    obGyn_LMP: "",
    referred: "No",
    referringHCI: "",
    referringReason: "",
    /* Height/weight & Vitals */
    height: "",
    weight: "",
    bp: "",
    hr: "",
    rr: "",
    temp: "",
    /* System PE checkboxes (only the “abnormal” boxes; omit “essentially normal” to shorten) */
    pe: { heent: "", chest: "", cvs: "", abd: "", gu: "", skin: "", neuro: "" },
    /* Signs & symptoms check‑group */
    symptoms: {},
    /* PART IV & V – tables */
    wardCourse: [initialDoctorOrderRow],
    drugs: [initialDrugRow],
    /* PART VI */
    outcome: [],
    /* PART VII */
    physicianName: "",
    dateSigned: "",
  });

  // ---------- UNIVERSAL CHANGE HANDLER ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOutcomeChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => {
      const newOutcome = checked
        ? [...prev.outcome, name]
        : prev.outcome.filter((item) => item !== name);
      return { ...prev, outcome: newOutcome };
    });
  };

  // separate handler for nested symptom checkboxes
  const handleSymptomChange = (symptom) => (e) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: e.target.checked },
    }));
  };

  // ---------- DYNAMIC ROW HANDLERS ----------
  const addWardRow = () =>
    setFormData((prev) => ({
      ...prev,
      wardCourse: [...prev.wardCourse, initialDoctorOrderRow],
    }));

  const removeWardRow = (idx) =>
    setFormData((prev) => ({
      ...prev,
      wardCourse: prev.wardCourse.filter((_, i) => i !== idx),
    }));

  const handleWardRowChange = (idx, field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const next = [...prev.wardCourse];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, wardCourse: next };
    });
  };

  const addDrugRow = () =>
    setFormData((prev) => ({
      ...prev,
      drugs: [...prev.drugs, initialDrugRow],
    }));

  const removeDrugRow = (idx) =>
    setFormData((prev) => ({
      ...prev,
      drugs: prev.drugs.filter((_, i) => i !== idx),
    }));

  const handleDrugRowChange = (idx, field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const next = [...prev.drugs];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, drugs: next };
    });
  };
  const handlePEChange = (system, field) => (e) => {
    if (!e?.target) return;
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPE((prev) => ({
      ...prev,
      [system]: {
        ...prev[system],
        [field]: v,
      },
    }));
  };

  const renderCheckbox = (system, field, label) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={pe[system][field] || false}
          onChange={handlePEChange(system, field)}
        />
      }
      label={label}
    />
  );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("CF4 SUBMIT", { ...formData, physicalExam: pe });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Map formData.drugs keys to DTD keys
    const transformedDrugs = formData.drugs.map((drug) => ({
      pHciCaseNo: drug.pHciCaseNo || "", // or map from another key if needed
      pHciTransNo: drug.pHciTransNo || "",
      pDrugCode: drug.pDrugCode || "",
      pGenericName: drug.genericName || "", // example if your state uses genericName
      pGenericCode: drug.pGenericCode || "",
      pSaltCode: drug.pSaltCode || "",
      pStrengthCode: drug.pStrengthCode || "",
      pFormCode: drug.pFormCode || "",
      pUnitCode: drug.pUnitCode || "",
      pPackageCode: drug.pPackageCode || "",
      pRoute: drug.route || "",
      pQuantity: drug.quantity || "",
      pActualUnitPrice: drug.actualUnitPrice || "",
      pCoPayment: drug.coPayment || "",
      pTotalAmtPrice: drug.totalAmtPrice || "",
      pInstructionQuantity: drug.instructionQuantity || "",
      pInstructionStrength: drug.instructionStrength || "",
      pInstructionFrequency: drug.instructionFrequency || "",
      pPrescPhysician: drug.prescPhysician || "",
      pIsApplicable: drug.isApplicable || "Y",
      pDateAdded: drug.dateAdded || "",
      pModule: drug.module || "",
      pReportStatus: drug.reportStatus || "U",
      pDeficiencyRemarks: drug.deficiencyRemarks || "",
    }));
    const payload = {
      ENLISTMENTS: {
        pHciCaseNo: formData.caseNumber || "",
        pHciTransNo: formData.transNumber || "",
        pHciAccreCode: formData.accreditationNo || "",
        pHciName: formData.hciName || "",
        pHciAddress: formData.hciAddress || "",
        pReportStatus: "U",
      },
      PROFILING: {
        pPIN: formData.pin || "",
        pLastName: formData.patientLast || "",
        pFirstName: formData.patientFirst || "",
        pMiddleName: formData.patientMiddle || "",
        pSex: formData.sex || "",
        pAge: formData.age || "",
        pDateAdmitted: formData.dateAdmitted || "",
        pTimeAdmitted: `${formData.timeAdmitted} ${formData.ampmAdmit}`,
        pDateDischarged: formData.dateDischarged || "",
        pTimeDischarged: `${formData.timeDischarged} ${formData.ampmDischarge}`,
        pAdmittingDiagnosis: formData.admittingDx || "",
        pDischargeDiagnosis: formData.dischargeDx || "",
        pCaseType: "", // Optional or derived
        pCaseRate1: formData.caseRate1 || "",
        pCaseRate2: formData.caseRate2 || "",
        pChiefComplaint: formData.chiefComplaint || "",
        pHistoryPresentIllness: formData.historyPresentIllness || "",
        pPastMedicalHistory: formData.pastMedicalHistory || "",
        pObstetricalScore: `G${formData.obGyn_G}P${formData.obGyn_P}`,
        pLMP: formData.obGyn_LMP || "",
        pReferredFrom: formData.referringHCI || "",
        pReasonReferral: formData.referringReason || "",
        pReportStatus: "U",
      },
      SOAPS: {
        pHciCaseNo: formData.caseNumber || "",
        pHciTransNo: formData.transNumber || "",
        pBP: formData.bp || "",
        pHR: formData.hr || "",
        pRR: formData.rr || "",
        pTemp: formData.temp || "",
        pHeight: formData.height || "",
        pWeight: formData.weight || "",
        pSymptoms: Object.entries(formData.symptoms)
          .filter(([_, checked]) => checked)
          .map(([symptom]) => symptom)
          .join(", "),
        pHeent: formData.pe.heent || "",
        pChest: formData.pe.chest || "",
        pCVS: formData.pe.cvs || "",
        pAbdomen: formData.pe.abd || "",
        pGU: formData.pe.gu || "",
        pSkin: formData.pe.skin || "",
        pNeuro: formData.pe.neuro || "",
        pReportStatus: "U",
      },
      DOCTORORDER: formData.wardCourse.map((row) => ({
        pHciCaseNo: formData.caseNumber || "",
        pHciTransNo: formData.transNumber || "",
        pDate: row.date,
        pOrder: row.order,
        pReportStatus: "U",
      })),
      DRUGS: transformedDrugs,
      OUTCOME: formData.outcome.map((item) => ({
        pHciCaseNo: formData.caseNumber || "",
        pHciTransNo: formData.transNumber || "",
        pOutcome: item,
        pReportStatus: "U",
      })),
      PHYSICIAN: {
        pHciCaseNo: formData.caseNumber || "",
        pHciTransNo: formData.transNumber || "",
        pPhysician: formData.physicianName || "",
        pDate: formData.dateSigned || "",
        pReportStatus: "U",
      },
    };

    console.log("CF4 SUBMIT", payload);

    // Here you can send payload to API or further process
  };

  // ---------- RENDER ----------
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>
        PhilHealth Claim Form 4 (CF4)
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        {/* PART I – HCI INFORMATION ------------------------------------------------ */}
        <Typography variant="h6">
          I. Health Care Institution Information
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="1. Name of HCI"
              name="hciName"
              value={formData.hciName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="2. Accreditation No."
              name="accreditationNo"
              value={formData.accreditationNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="3. HCI Address"
              name="hciAddress"
              value={formData.hciAddress}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* PART II – PATIENT DATA --------------------------------------------------- */}
        <Typography variant="h6" mt={4}>
          II. Patient’s Data
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              name="patientLast"
              value={formData.patientLast}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              name="patientFirst"
              value={formData.patientFirst}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Middle Name"
              fullWidth
              name="patientMiddle"
              value={formData.patientMiddle}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="PIN"
              fullWidth
              name="pin"
              value={formData.pin}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Age"
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="sex-label">Sex</InputLabel>
              <Select
                labelId="sex-label"
                name="sex"
                label="Sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Chief Complaint"
              fullWidth
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Admitting Diagnosis"
              fullWidth
              multiline
              name="admittingDx"
              value={formData.admittingDx}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Discharge Diagnosis"
              fullWidth
              multiline
              name="dischargeDx"
              value={formData.dischargeDx}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="1st Case Rate Code"
              fullWidth
              name="caseRate1"
              value={formData.caseRate1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="2nd Case Rate Code"
              fullWidth
              name="caseRate2"
              value={formData.caseRate2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Date Admitted"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dateAdmitted"
              value={formData.dateAdmitted}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <TextField
              label="Time"
              fullWidth
              name="timeAdmitted"
              value={formData.timeAdmitted}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <FormControl fullWidth>
              <InputLabel>AM/PM</InputLabel>
              <Select
                name="ampmAdmit"
                value={formData.ampmAdmit}
                label="AM/PM"
                onChange={handleChange}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Date Discharged"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dateDischarged"
              value={formData.dateDischarged}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <TextField
              label="Time"
              fullWidth
              name="timeDischarged"
              value={formData.timeDischarged}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <FormControl fullWidth>
              <InputLabel>AM/PM</InputLabel>
              <Select
                name="ampmDischarge"
                value={formData.ampmDischarge}
                label="AM/PM"
                onChange={handleChange}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* PART III – REASON FOR ADMISSION --------------------------------------- */}
        <Typography variant="h6" mt={4}>
          III. Reason for Admission
        </Typography>

        {/* 1 & 2 */}
        <TextField
          label="1. History of Present Illness"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 2 }}
          name="historyPresentIllness"
          value={formData.historyPresentIllness}
          onChange={handleChange}
        />
        <TextField
          label="2.a Pertinent Past Medical History"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 2 }}
          name="pastMedicalHistory"
          value={formData.pastMedicalHistory}
          onChange={handleChange}
        />

        {/* 2.b OB/GYN */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={4} sm={2}>
            <TextField
              label="G"
              fullWidth
              name="obGyn_G"
              value={formData.obGyn_G}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              label="P"
              fullWidth
              name="obGyn_P"
              value={formData.obGyn_P}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              label="LMP"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="obGyn_LMP"
              value={formData.obGyn_LMP}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* 3. Sign & symptoms check‑list */}
        <Box mt={3}>
          <Typography variant="subtitle1">
            3. Pertinent Signs and Symptoms on Admission (check all that apply)
          </Typography>
          <Grid container>
            {signSymptomsList.map((symptom) => (
              <Grid item xs={12} sm={3} key={symptom}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formData.symptoms[symptom]}
                      onChange={handleSymptomChange(symptom)}
                    />
                  }
                  label={symptom}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 4. Referral */}
        <Box mt={2}>
          <Typography>4. Referred from another HCI?</Typography>
          <RadioGroup
            row
            name="referred"
            value={formData.referred}
            onChange={handleChange}
          >
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          </RadioGroup>
          {formData.referred === "Yes" && (
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name of Originating HCI"
                  fullWidth
                  name="referringHCI"
                  value={formData.referringHCI}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reason for Referral"
                  fullWidth
                  name="referringReason"
                  value={formData.referringReason}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        {/* 5. Physical Exam (height/weight/vitals only here for brevity) */}
        <Typography variant="subtitle1" mt={3}>
          5. Physical Examination – Height, Weight & Vital Signs
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Height (cm)"
              fullWidth
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Weight (kg)"
              fullWidth
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="BP"
              fullWidth
              name="bp"
              value={formData.bp}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="HR"
              fullWidth
              name="hr"
              value={formData.hr}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="RR"
              fullWidth
              name="rr"
              value={formData.rr}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Temp"
              fullWidth
              name="temp"
              value={formData.temp}
              onChange={handleChange}
            />
          </Grid>

          <Grid container spacing={2} p={2}>
            {Object.entries(pe).map(([system, fields]) => (
              <React.Fragment key={system}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Divider textAlign="left">{system}</Divider>
                  </Typography>
                </Grid>
                {Object.entries(fields)
                  .filter(([f]) => f !== "others")
                  .map(([f]) => (
                    <Grid item xs={6} sm={3} key={f}>
                      {renderCheckbox(
                        system,
                        f,
                        f
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                      )}
                    </Grid>
                  ))}
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Others (specify)"
                    value={pe[system].others}
                    onChange={handlePEChange(system, "others")}
                    name={`${system}_others`}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>

        {/* PART IV – COURSE IN THE WARD ----------------------------------------- */}
        <Typography variant="h6" mt={4}>
          IV. Course in the Ward
        </Typography>
        <Paper variant="outlined" sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width="25%">Date</TableCell>
                <TableCell>Doctor’s Order / Action</TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.wardCourse.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <TextField
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={row.date}
                      onChange={handleWardRowChange(idx, "date")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={row.order}
                      onChange={handleWardRowChange(idx, "order")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => removeWardRow(idx)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Button startIcon={<Add />} onClick={addWardRow}>
                    Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* PART V – DRUGS / MEDICINES ------------------------------------------- */}
        <Typography variant="h6" mt={4}>
          V. Drugs / Medicines
        </Typography>
        <Paper variant="outlined" sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Generic Name</TableCell>
                <TableCell>Qty / Dose / Route / Frequency</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Generic Name (cont)</TableCell>
                <TableCell>Qty / Dose / Route / Frequency (cont)</TableCell>
                <TableCell>Total Cost (cont)</TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.drugs.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.genericName}
                      onChange={handleDrugRowChange(idx, "genericName")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.dosage}
                      onChange={handleDrugRowChange(idx, "dosage")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.totalCost}
                      onChange={handleDrugRowChange(idx, "totalCost")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.genericNameCont}
                      onChange={handleDrugRowChange(idx, "genericNameCont")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.dosageCont}
                      onChange={handleDrugRowChange(idx, "dosageCont")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.totalCostCont}
                      onChange={handleDrugRowChange(idx, "totalCostCont")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => removeDrugRow(idx)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Button startIcon={<Add />} onClick={addDrugRow}>
                    Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* PART VI – OUTCOME OF TREATMENT --------------------------------------- */}
        <Typography variant="h6" mt={4}>
          VI. Outcome of Treatment
        </Typography>
        <FormControl component="fieldset" variant="standard" sx={{ mt: 1 }}>
          <FormGroup row>
            {[
              "Improved",
              "Recovered",
              "HAMA / DAMA",
              "Expired",
              "Absconded",
              "Transferred",
            ].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={formData.outcome.includes(option)}
                    onChange={handleOutcomeChange}
                    name={option}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>

          {/* Show this if no outcome is selected */}
          {formData.outcome.length === 0 && (
            <TextField
              fullWidth
              label="Specify reason"
              name="otherOutcomeReason"
              value={formData.otherOutcomeReason || ""}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          )}
        </FormControl>

        <Divider sx={{ my: 4 }} />
        {/* PART VII – CERTIFICATION --------------------------------------------- */}
        <Typography variant="h6" mt={4}>
          VII. Certification of Health‑Care Professional
        </Typography>

        <Typography fontStyle="italic" sx={{ mt: 3 }}>
          I certify that the above information given in this form are true and
          correct.
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Signature / Printed Name"
              name="physicianName"
              value={formData.physicianName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date Signed"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dateSigned"
              value={formData.dateSigned}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* SUBMIT BUTTON -------------------------------------------------------- */}
        <Button type="submit" variant="contained" size="large" sx={{ mt: 4 }}>
          Submit CF4
        </Button>
      </Paper>
    </Box>
  );
}
