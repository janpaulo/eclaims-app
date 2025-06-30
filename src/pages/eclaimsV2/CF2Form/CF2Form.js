import React, {
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Divider,
} from "@mui/material";
import PartI_HCI from "./PartI_HCI";
import PartII_Confinement from "./PartII_Confinement";
import PartIII_ConsumptionForm from "./PartIII_ConsumptionForm";

import APRForm from "./APRForm";

import ProfessionalTables from "../ProfessionalTables";
const defaultConsumption = {
  pEnoughBenefits: "N",
  BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES: [
    {
      BENEFITS: {
        pTotalHCIFees: "",
        pTotalProfFees: "",
        pGrandTotal: "",
      },
    },
    {
      HCIFEES: {
        pTotalActualCharges: "",
        pDiscount: "",
        pPhilhealthBenefit: "",
        pTotalAmount: "",
        pMemberPatient: "N",
        pHMO: "N",
        pOthers: "N",
      },
    },
    {
      PROFFEES: {
        pTotalActualCharges: "",
        pDiscount: "",
        pPhilhealthBenefit: "",
        pTotalAmount: "",
        pMemberPatient: "N",
        pHMO: "N",
        pOthers: "N",
      },
    },
    {
      PURCHASES: {
        pDrugsMedicinesSupplies: "N",
        pDMSTotalAmount: "",
        pExaminations: "N",
        pExamTotalAmount: "",
      },
    },
  ],
};

const initial = {
  pPatientReferred: "N",
  pReferredIHCPAccreCode: "",
  pAdmissionDate: "",
  pAdmissionTime: "",
  pDischargeDate: "",
  pDischargeTime: "",
  pDisposition: "",
  pExpiredDate: "",
  pExpiredTime: "",
  pReferralIHCPAccreCode: "",
  pReferralReasons: "",
  pAccommodationType: "",
  pHasAttachedSOA: "N",
  pan: "",
  hciName: "",
  hciAddress: "",
  DIAGNOSIS: [],
  specialConsiderations: {
    Hemodialysis: false,
    "Peritoneal Dialysis": false,
    "Radiotherapy (LINAC)": false,
    "Radiotherapy (COBALT)": false,
    "Blood Transfusion": false,
    Brachytherapy: false,
    Chemotherapy: false,
    "Simple Debridement": false,
    "Intensive Phase": false,
    "Maintenance Phase": false,
    "Essential Newborn Care": false,
    "Newborn Hearing Screening Test": false,
    "Newborn Screening Test": false,
    "Immediate drying of newborn": false,
    "Early skin-to-skin contact": false,
    "Timely cord clamping": false,
    "Eye Prophylaxis": false,
    "Vitamin K administration": false,
    "BCG vaccination": false,
    "Hepatitis B vaccination": false,
    "Non-separation of mother/baby for early breastfeeding initiation": false,
    zBenefitPackageCode: "",
    mcpDate1: "",
    mcpDate2: "",
    mcpDate3: "",
    mcpDate4: "",
    "Day 0 ARV": "",
    "Day 3 ARV": "",
    "Day 7 ARV": "",
    RIG: "",
    pABPOthers: "",
    pABPSpecify: "",
    ICD10orRVSCode: "",
    firstCaseRate: "",
    secondCaseRate: "",
    pCataractPreAuth: "",
    pLeftEyeIOLStickerNumber: "",
    pLeftEyeIOLExpiryDate: "",
    pRightEyeIOLStickerNumber: "",
    pRightEyeIOLExpiryDate: "",
    isCataract: false,
  },
  pLaboratoryNumber: "",
  PROFESSIONALS: [
    {
      pDoctorAccreCode: "",
      pDoctorLastName: "",
      pDoctorFirstName: "",
      pDoctorMiddleName: "",
      pDoctorSuffix: "",
      pWithCoPay: "",
      pDoctorCoPay: "",
      pDoctorSignDate: "",
    },
  ],
  CONSUMPTION: defaultConsumption,
};
// <!ELEMENT SPECIAL (PROCEDURES?, MCP?, TBDOTS?, ABP?, NCP?, HIVAIDS?, CATARACTINFO?)>
const reducer = (state, action) =>
  typeof action === "function" ? action(state) : { ...state, ...action };

const CF2Form = forwardRef((props, ref) => {
  const { prefillData, packageType, authUser } = props;
  const [data, setForm] = useReducer(reducer, initial);

  const aprFormRef = useRef();
   const diagnosisRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ [name]: type === "checkbox" ? checked : value });
  };
  const handleDiagnosisSelectChange = (e) => {
    const selectedCode = e.target.value;
    const selectedDiagnosis = data.DIAGNOSIS?.find(
      (item) => item.pitemCode === selectedCode
    );

    setForm({
      ICD10orRVSCode: selectedCode,
      firstCaseRate: selectedDiagnosis?.amount?.[0]?.pprimaryCaseRate || "",
      secondCaseRate: selectedDiagnosis?.amount?.[0]?.psecondaryCaseRate || "",
    });
  };

  const validate = () =>
    data.pan && data.patientLast && data.pAdmissionDate && data.pDischargeDate;

  useImperativeHandle(ref, () => ({
    validateForm: validate,
    getFormData: () => {
      const aprData = aprFormRef.current?.getFormData?.() || {};
      const diagData = diagnosisRef.current?.getFormData?.() || {};
      return {
        ...JSON.parse(JSON.stringify(data)),
        ...aprData,
        ...diagData,
      };
    },
  }));

  return (
    <Box sx={{ p: 2 }}>
      {/* <PartI_HCI data={data} onChange={handleChange} /> */}

      <PartII_Confinement
        form={data}
        handleChange={handleChange}
        setForm={(partial) => setForm(partial)}
        prefillData={prefillData}
        packageType={packageType}
        ref={diagnosisRef}
      />

      <PartIII_ConsumptionForm data={data} onChange={setForm} />
      {/* <Grid item xs={12} sm={12}> */}
      <ProfessionalTables
        formData={data.PROFESSIONALS}
        setFormData={(updated) =>
          setForm((prev) => ({
            ...prev,
            PROFESSIONALS: updated,
          }))
        }
        authUser={authUser}
      />
      {/* </Grid> */}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom mt={3}>
        PhilHealth Benefits:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="ICD10orRVSCode"
            label="ICD 10 or RVS Code"
            fullWidth
            value={data.ICD10orRVSCode || ""}
            onChange={handleDiagnosisSelectChange}
            disabled={!(data.DIAGNOSIS?.length > 0 || data.ICD10orRVSCode)} // Enable if DIAGNOSIS array has values or ICD10orRVSCode is selected
          >
            {data.DIAGNOSIS?.map((item) => (
              <MenuItem key={item.pitemCode} value={item.pitemCode}>
                {item.pitemCode} - {item.pcaseRateDescription}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="firstCaseRate"
            label="First Case Rate"
            fullWidth
            value={data.firstCaseRate || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="secondCaseRate"
            label="Second Case Rate"
            fullWidth
            value={data.secondCaseRate || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />

      <APRForm ref={aprFormRef} />
    </Box>
  );
});

export default CF2Form;
