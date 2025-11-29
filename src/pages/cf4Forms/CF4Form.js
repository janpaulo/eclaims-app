// CF4Form.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
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
  FormLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import MedicineForm from "./MedicineForm";
import PhysicalExamForm from "./SOAP/PEMISC";
import EnlistmentForm from "./EnlistmentForm";

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
export default function CF4Form({ authUser }) {
  // ---------- STATE ----------

  const [pe, setPE] = useState(initialPEState);

  const [medicines, setMedicines] = useState([
    {
      pDrugCode: "",
      pGenericCode: "",
      pSaltCode: "",
      pStrengthCode: "",
      pFormCode: "",
      pUnitCode: "",
      pPackageCode: "",
      pRoute: "",
      pQuantity: "",
      pActualUnitPrice: "",
      pCoPayment: "",
      pTotalAmtPrice: "",
      pInstructionQuantity: "",
      pInstructionStrength: "",
      pInstructionFrequency: "",
      pInstructionDuration: "",
      pReportStatus: "U",
      pDeficiencyRemarks: "",
    },
  ]);

  const [pemics, setPemics] = useState([
    {
      pSkinId: "",
      pHeentId: "",
      pChestId: "",
      pHeartId: "",
      pAbdomenId: "",
      pNeuroId: "",
      pGuId: "",
    },
  ]);

  const [enlistment, setEnlistment] = useState([
    {
      eclaimid: "",
      enlistdate: "",
      enliststat: "",
      hcicaseno: "", 
      hcitransno: "", 
      transdate: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    /* PART I */
    hciName: authUser.hospital.hospital_name,
    accreditationNo: authUser.hospital.accreditation_num,
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
    hcicaseno: "",
    hcitransno: "",
    patienttype: "MM",
    gensurveyid: "1",
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

  const requiredFields = [
    "hciName",
    "accreditationNo",
    "hciAddress",
    "patientLast",
    "patientFirst",
    "patienttype",
    "pin",
    "sex",
    "admittingDx",
    "hcicaseno",
    "hcitransno",
    "effyear",
    "caseRate1",
    "dateAdmitted",
    "timeAdmitted",
    "ampmAdmit",
    "dateDischarged",
    "timeDischarged",
    "ampmDischarge",
    "historyPresentIllness",
    "pastMedicalHistory",
    "gensurveyid",
    "height",
    "weight",
    // Add any other required field names...
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for missing required fields
    // const missingFields = requiredFields.filter(
    //   (field) => !formData[field] || formData[field] === ""
    // );

    // if (missingFields.length > 0) {
    //   alert(
    //     `The following required fields are missing: ${missingFields.join(", ")}`
    //   );
    //   return; // Prevent form submission
    // }

    // // If all required fields are filled, proceed with form submission logic
    // console.log("Form data is valid, proceeding with submission", formData);
    // MEDICINES JSON DONE
    const mediciness = {
      medicines: {
        medicine: medicines.map((item) => ({
          instructionfrequency: item.pInstructionFrequency,
          module: "CF4",
          quantity: item.pQuantity,
          route: item.pRoute,
          totalamtprice: item.pTotalAmtPrice,
        })),
      },
    };

    const coursewardss = {
      coursewards: {
        courseward: formData.wardCourse.map((row) => ({
          dateaction: row.date, // Mapping `date` to `dateaction`
          doctorsaction: row.order, // Mapping `order` to `doctorsaction`
        })),
      },
    };
    

    const enlistmentss = {
      enlistments: {
        enlistment: [
          {
            createdby: formData.createdBy || "",
            eclaimid: formData.eClaimId || "",
            effyear: formData.effYear || "",
            enlistdate: formData.enlistDate || "",
            enliststat: formData.enlistStat || "1",
            hcicaseno: formData.hcicaseno || "",
            hcitransno: formData.hcitransno || "",
            patientcontactno: formData.contactNo || "",
            patientdob: formData.patientDob || "",
            patientfname: formData.memFirstName || "",
            patientlname: formData.memLastName || "",
            patientpin: formData.memPin || "",
            patienttype: formData.patientType || "",
            transdate: formData.transDate || "",
          },
        ],
      },
    };

    const soapPayload = {
      soaps: {
        soap: [
          {
            effyear: formData.effyear,
            hcicaseno: formData.hcicaseno,
            hcitransno: formData.hcitransno,

            icds: [
              {
                icdcode: formData.caseRate1 || "",
              },
              {
                icdcode: formData.caseRate2 || "",
              },
            ],

            patientpin: formData.pin,
            patienttype: formData.patienttype,
            soapatc: "CF4", // static or change if needed
            soapdate: formData.dateAdmitted,

            subjective: [
              {
                illnesshistory: formData.historyPresentIllness || "",
              },
              {
                illnesshistory: formData.pastMedicalHistory || "",
              },
            ],
          },
        ],
      },
    };

    const profilingJson = {
      profiling: {
        profile: [
          {
            effyear: formData.effyear,
            hcicaseno: formData.hcicaseno,
            hcitransno: formData.hcitransno,
            gensurvey: {
              gensurveyid: formData.gensurveyid || "",
            },
            patientpin: formData.pin,
            pemisc: pemics.map((row) => {
              // Convert all values of each row to string
              return Object.keys(row).reduce((acc, key) => {
                acc[key] = String(row[key] || ""); // Convert each value to string (or empty string if falsy)
                return acc;
              }, {});
            }),
            pepert: {
              height: formData.height,
              weight: formData.weight,
            },
            profileatc: "CF4",
            profdate: formData.dateAdmitted,
          },
        ],
      },
    };

    const finalPayLoad = {
      username: authUser.hospital.software_cert,
      accreno: authUser.hospital.accreditation_num,
      certificationid: authUser.hospital.software_cert,
      profiling: profilingJson.profiling,
      medicines: mediciness.medicines,
      coursewards: coursewardss.coursewards,
      enlistments: enlistmentss.enlistments,
      soaps: soapPayload.soaps,
    };

    console.log("Submitting formData setEnlistment:", enlistment);

    const claimsJsonSave = {
      series_no: "sasasasas",
      member_pin: formData.pin || "N/A", // Fallback if pPatientPIN is undefined
      date_admited: formData.dateAdmitted,
      status: "pending",
      xml_data: JSON.stringify(finalPayLoad || {}),
      hci_no: authUser.hospital.accreditation_num || "Unknown",
      // hci_code: authUser.hospital.hospital_code || "Unknown",
      // date_created: new Date().toISOString(), // Current date and time in ISO format
    };

    await sendClaim4Request(claimsJsonSave);
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

    // const payload = {
    //   ENLISTMENTS: {
    //     pEClaimId: formData.eClaimId || "250506152005",
    //     pEClaimsTransmittalId: formData.eClaimsTransmittalId || "250506152005",
    //     pHciCaseNo: formData.caseNumber || "C280501202503000004",
    //     pHciTransNo: formData.transNumber || "C280501202503000004",
    //     pHciAccreCode: formData.accreditationNo || "",
    //     pHciName: formData.hciName || "",
    //     pHciAddress: formData.hciAddress || "",
    //     pEffYear: formData.effYear || "2025",
    //     pEnlistStat: formData.enlistStat || "1",
    //     pEnlistDate: formData.enlistDate || "2025-03-10",
    //     pPackageType: formData.packageType || "A",
    //     // Member info
    //     pMemPin: formData.memPin || "",
    //     pMemFname: formData.memFirstName || "",
    //     pMemMname: formData.memMiddleName || "",
    //     pMemLname: formData.memLastName || "",
    //     pMemExtname: formData.memExtName || "",
    //     pMemDob: formData.memDob || "",
    //     pMemCat: formData.memCat || "",
    //     pMemNcat: formData.memNcat || "",

    //     // Patient info
    //     pPatientPin: formData.memPin || "190270594763",
    //     pPatientFname: formData.memFirstName || "IHOMISPLUS FN FORTY FOUR",
    //     pPatientMname: formData.memMiddleName || "IHOMISPLUS MN FORTY FOUR",
    //     pPatientLname: formData.memLastName || "IHOMISPLUS LN FORTY FOUR",
    //     pPatientExtname: formData.memExtName || "",
    //     pPatientType: formData.patientType || "MM",
    //     pPatientSex: formData.sex || "F",
    //     pPatientContactno: formData.contactNo || "NA",
    //     pPatientDob: formData.patientDob || "1974-02-14",
    //     pPatientAddbrgy: formData.addressBrgy || "",
    //     pPatientAddmun: formData.addressMun || "",
    //     pPatientAddprov: formData.addressProv || "",
    //     pPatientAddreg: formData.addressReg || "",
    //     pPatientAddzipcode: formData.addressZip || "",

    //     // Others
    //     pCivilStatus: formData.civilStatus || "U",
    //     pWithConsent: formData.withConsent || "X",
    //     pWithLoa: formData.withLoa || "X",
    //     pWithDisability: formData.withDisability || "X",
    //     pDependentType: formData.dependentType || "X",
    //     pTransDate: formData.transDate || "2025-03-10",
    //     pCreatedBy: formData.createdBy || "TCP",
    //     pReportStatus: "U",
    //     pDeficiencyRemarks: formData.deficiencyRemarks || "",
    //     pAvailFreeService: formData.availFreeService || "X",
    //   },

    //   PROFILING: {
    //     pPIN: formData.pin || "",
    //     pLastName: formData.patientLast || "",
    //     pFirstName: formData.patientFirst || "",
    //     pMiddleName: formData.patientMiddle || "",
    //     pSex: formData.sex || "",
    //     pAge: formData.age || "",
    //     pDateAdmitted: formData.dateAdmitted || "",
    //     pTimeAdmitted: `${formData.timeAdmitted} ${formData.ampmAdmit}`,
    //     pDateDischarged: formData.dateDischarged || "",
    //     pTimeDischarged: `${formData.timeDischarged} ${formData.ampmDischarge}`,
    //     pAdmittingDiagnosis: formData.admittingDx || "",
    //     pDischargeDiagnosis: formData.dischargeDx || "",
    //     pCaseType: "", // Optional or derived
    //     pCaseRate1: formData.caseRate1 || "",
    //     pCaseRate2: formData.caseRate2 || "",
    //     pChiefComplaint: formData.chiefComplaint || "",
    //     pHistoryPresentIllness: formData.historyPresentIllness || "",
    //     pPastMedicalHistory: formData.pastMedicalHistory || "",
    //     pObstetricalScore: `G${formData.obGyn_G}P${formData.obGyn_P}`,
    //     pLMP: formData.obGyn_LMP || "",
    //     pReferredFrom: formData.referringHCI || "",
    //     pReasonReferral: formData.referringReason || "",
    //     pReportStatus: "U",
    //   },
    //   SOAPS: {
    //     pHciCaseNo: formData.caseNumber || "",
    //     pHciTransNo: formData.transNumber || "",
    //     pBP: formData.bp || "",
    //     pHR: formData.hr || "",
    //     pRR: formData.rr || "",
    //     pTemp: formData.temp || "",
    //     pHeight: formData.height || "",
    //     pWeight: formData.weight || "",
    //     pSymptoms: Object.entries(formData.symptoms)
    //       .filter(([_, checked]) => checked)
    //       .map(([symptom]) => symptom)
    //       .join(", "),
    //     pHeent: formData.pe.heent || "",
    //     pChest: formData.pe.chest || "",
    //     pCVS: formData.pe.cvs || "",
    //     pAbdomen: formData.pe.abd || "",
    //     pGU: formData.pe.gu || "",
    //     pSkin: formData.pe.skin || "",
    //     pNeuro: formData.pe.neuro || "",
    //     pReportStatus: "U",
    //   },
    //   COURSEWARD: formData.wardCourse.map((row) => ({
    //     pHciCaseNo: formData.caseNumber || "",
    //     pHciTransNo: formData.transNumber || "",
    //     pDateAction: row.date,
    //     pDoctorsAction: row.order,
    //     pReportStatus: "U",
    //     pDeficiencyRemarks: "",
    //   })),
    //   MEDICINE: transformedDrugs,
    //   OUTCOME: formData.outcome.map((item) => ({
    //     pHciCaseNo: formData.caseNumber || "",
    //     pHciTransNo: formData.transNumber || "",
    //     pOutcome: item,
    //     pReportStatus: "U",
    //   })),
    //   PHYSICIAN: {
    //     pHciCaseNo: formData.caseNumber || "",
    //     pHciTransNo: formData.transNumber || "",
    //     pPhysician: formData.physicianName || "",
    //     pDate: formData.dateSigned || "",
    //     pReportStatus: "U",
    //   },
    // };

    // console.log("CF4 SUBMIT", payload);

    // Here you can send payload to API or further process
  };

  const sendClaim4Request = async (dataJson) => {
    setLoading(true); // Set loading to true when the request starts

    try {
      // Send POST request to the API
      const response = await axios.post(
        `${process.env.REACT_APP_API_CLAIMS}claims-form4`, // API endpoint
        dataJson, // Payload data passed to the function
        {
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
            Authorization: `Bearer ${authUser.access_token}`, // Bearer token for authentication
          },
        }
      );

      // If the response is successful, extract the data and set it to state
      const { data } = response.data; // Destructure the response data
      // console.log("Response data:", data); // Log the response data to the console (optional)
    } catch (err) {
      console.error("Error occurred:", err);
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
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
          Health Care Institution Information
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
          Patient’s Data
        </Typography>
        <Grid container spacing={2} mt={1} mb={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              name="patientLast"
              value={formData.patientLast}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              name="patientFirst"
              value={formData.patientFirst}
              onChange={handleChange}
              required
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
          <Grid item xs={2}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Patient Type</FormLabel>
              <RadioGroup
                row
                name="patienttype"
                value={formData.patienttype}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="MM"
                  control={<Radio />}
                  label="Member"
                />
                <FormControlLabel
                  value="DD"
                  control={<Radio />}
                  label="Dependent"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="PIN"
              fullWidth
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              label="Age"
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel id="sex-label">Sex</InputLabel>
              <Select
                labelId="sex-label"
                name="sex"
                label="Sex"
                value={formData.sex}
                onChange={handleChange}
                required
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
              required
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
          {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="hcicaseno"
              label="HCI Case No"
              value={formData.hcicaseno}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="hcitransno"
              label="HCI Trans No"
              value={formData.hcitransno}
              required
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Effectivity year"
              fullWidth
              multiline
              name="effyear"
              value={formData.effyear}
              onChange={handleChange}
              required
            />
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="1st Case Rate Code"
              fullWidth
              name="caseRate1"
              value={formData.caseRate1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              required
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <TextField
              label="Time"
              fullWidth
              name="timeAdmitted"
              value={formData.timeAdmitted}
              onChange={handleChange}
              required
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
                required
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
              required
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <TextField
              label="Time"
              fullWidth
              name="timeDischarged"
              value={formData.timeDischarged}
              onChange={handleChange}
              required
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
          Reason for Admission
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
          required
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
          required
        />
        {/* <SoapForm /> */}

        {/* 2.b OB/GYN */}
        {/* <Typography variant="subtitle1">2.b. OB/GYN History</Typography>
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
        </Grid> */}

        {/* 3. Sign & symptoms check‑list */}
        {/* <Box mt={3}>
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
        </Box> */}

        {/* 4. Referral */}
        {/* <Box mt={2}>
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
        </Box> */}

        {/* 5. Physical Exam (height/weight/vitals only here for brevity) */}

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Physical Exam Form
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6} sm={2}>
            <Typography style={{ fontWeight: "bold" }}>
              General Survey
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <RadioGroup
              row
              name="gensurveyid"
              value={formData.gensurveyid}
              onChange={handleChange}
              required
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Awake and alert"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Altered sensorium"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Height (cm)"
              fullWidth
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Weight (kg)"
              fullWidth
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* <Grid item xs={6} sm={2}>
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
          </Grid> */}
          {/* <Grid item xs={6} sm={2}>
            <TextField
              label="Temp"
              fullWidth
              name="temp"
              value={formData.temp}
              onChange={handleChange}
            />
          </Grid> */}

          {/* <Grid container spacing={2} p={2}>
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
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <PhysicalExamForm
              formData={pemics}
              setFormData={setPemics}
              authUser={authUser}
            />
          </Grid>
        </Grid>



        {/* PART IV – EnlistmentForm ----------------------------------------- */}
        <EnlistmentForm
          formData={enlistment}
          setFormData={setEnlistment}
          authUser={authUser}
           mt={4}
        />


        {/* PART IV – COURSE IN THE WARD ----------------------------------------- */}
        <Typography variant="h6" mt={4}>
          Course in the Ward
        </Typography>
        <Button
          variant="outlined"
          // startIcon={<Add />}
          onClick={addWardRow}
        >
          Add fields
        </Button>
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
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeWardRow(idx)}
                    >
                      {/* <Delete  */} Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={3} align="center">
                  <Button startIcon={<Add />} onClick={addWardRow}>
                    Add Row
                  </Button>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </Paper>

        {/* PART V – DRUGS / MEDICINES ------------------------------------------- */}
        <Typography variant="h6" mt={4}>
          Drugs / Medicines
        </Typography>
        <MedicineForm
          authUser={authUser}
          medicines={medicines}
          setMedicines={setMedicines}
        />

        {/* PART VI – OUTCOME OF TREATMENT --------------------------------------- */}
        {/* <Typography variant="h6" mt={4}>
          Outcome of Treatment
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
        </FormControl> */}

        <Divider sx={{ my: 4 }} />
        {/* PART VII – CERTIFICATION --------------------------------------------- */}
        {/* <Typography variant="h6" mt={4}>
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
        </Grid> */}

        {/* SUBMIT BUTTON -------------------------------------------------------- */}
        <Button type="submit" variant="contained" size="large" sx={{ mt: 4 }}>
          Submit CF4
        </Button>
      </Paper>
    </Box>
  );
}
