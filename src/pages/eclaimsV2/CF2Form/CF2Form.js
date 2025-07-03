import React, {
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
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
import moment from 'moment'
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
    pZBenefitCode: "",
    pPreAuthDate: "",
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
    ICD10orRVSCode1: "",
    ICD10orRVSCode2: "",
    pCaseRateAmount1: "",
    pCaseRateAmount2: "",
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
  const [storeDataDischarge, setStoreDataDischarge] = useState([]);

  const [allCaseRate, setAllCaseRate] = useState({
    pCaseRateCode: "",
    pICDCode: "",
    pRVSCode: "",
    pCaseRateAmount: "",

    ICD10orRVSCode1: "",
    ICD10orRVSCode2: "",
    pCaseRateAmount1: "",
    pCaseRateAmount2: "",
  });

  const aprFormRef = useRef();
  const diagnosisRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ [name]: type === "checkbox" ? checked : value });
  };

  const ALLCASERATE ={ ALLCASERATE:{
    CASERATE: [
      ...(allCaseRate.ICD10orRVSCode1
        ? [
            {
              pCaseRateCode: allCaseRate.ICD10orRVSCode1,
              pICDCode: allCaseRate.pICDCode1 || "",
              pRVSCode: allCaseRate.pRVSCode1 || "",
              pCaseRateAmount: allCaseRate.pCaseRateAmount1 || "",
            },
          ]
        : []),
      ...(allCaseRate.ICD10orRVSCode2
        ? [
            {
              pCaseRateCode: allCaseRate.ICD10orRVSCode2,
              pICDCode: allCaseRate.pICDCode2 || "",
              pRVSCode: allCaseRate.pRVSCode2 || "",
              pCaseRateAmount: allCaseRate.pCaseRateAmount2 || "",
            },
          ]
        : []),
    ],
  }
  };

  const ZBENEFIT = {ZBENEFIT :{
    pzBenefitCode: data.specialConsiderations.pZBenefitCode,
    pPreAuthDate:  data.specialConsiderations.pPreAuthDate ? moment(data.specialConsiderations.pPreAuthDate).format("MM-DD-YYYY") :"",
  }};

  // moment(item.pServiceDate).format("MM-DD-YYYY")
  // console.log(data.specialConsiderations);
  // console.log(ZBENEFIT);
  // console.log(ALLCASERATE);

  const validate = () =>
    data.pan && data.patientLast && data.pAdmissionDate && data.pDischargeDate;

  useImperativeHandle(ref, () => ({
    validateForm: validate,
    getFormData: () => {
      const aprData = aprFormRef.current?.getFormData?.() || {};
      const diagData = diagnosisRef.current?.getFormData?.() || {};
      const ALLCASERATEOrZBENEFIT = packageType=== "All Case Rate"? ALLCASERATE :ZBENEFIT

      return {
        ...JSON.parse(JSON.stringify(data)),
        ...aprData,
        ...diagData,
        ...ALLCASERATEOrZBENEFIT
      };
    },
  }));

  const diagnosisData = () => {
    return (
      storeDataDischarge?.flatMap?.((group) => group.ICDCODEOrRVSCODES || []) ||
      []
    );
  };

  const handleCaseRateChange = (e) => {
    const { name, value } = e.target;
    const isFirst = name === "ICD10orRVSCode1";

    const selectedItem = diagnosisData().find(
      (item) =>
        item?.ICDCODE?.pICDCode === value || item?.RVSCODES?.pRVSCode === value
    );

    const caseRateAmount =
      selectedItem?.ICDCODE?.amount?.[0]?.pCaseRateAmount ||
      selectedItem?.RVSCODES?.amount?.[0]?.pCaseRateAmount ||
      selectedItem?.ICDCODE?.amount?.[0]?.pprimaryCaseRate ||
      selectedItem?.RVSCODES?.amount?.[0]?.pprimaryCaseRate ||
      "";

    // Update `data` (main form state)
    setForm((prev) => ({
      ...prev,
      [name]: value,
      [isFirst ? "pCaseRateAmount1" : "pCaseRateAmount2"]: caseRateAmount,
    }));

    // Update `allCaseRate` state
    setAllCaseRate((prev) => ({
      ...prev,
      [name]: value,
      [isFirst ? "pCaseRateAmount1" : "pCaseRateAmount2"]: caseRateAmount,
      [isFirst ? "pCaseRateCode1" : "pCaseRateCode2"]: value,
      pICDCode: selectedItem?.ICDCODE?.pICDCode || "",
      pRVSCode: selectedItem?.RVSCODES?.pRVSCode || "",
      pCaseRateAmount: caseRateAmount, // optional fallback
    }));
  };

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
        setStoreDataDischarge={setStoreDataDischarge}
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
        {/* First Case Rate */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="ICD10orRVSCode1"
            label="ICD 10 or RVS Code (First)"
            fullWidth
            value={data.ICD10orRVSCode1 || ""}
            onChange={handleCaseRateChange}
            disabled={diagnosisData().length === 0}
          >
            {/* Unselect option */}
            <MenuItem value="">Unselect</MenuItem>

            {diagnosisData()
              .filter((item) => {
                const code =
                  item.ICDCODE?.pICDCode || item.RVSCODES?.pRVSCode || "";
                return code !== data.ICD10orRVSCode2;
              })
              .map((item, index) => {
                if (item.ICDCODE) {
                  return (
                    <MenuItem
                      key={`ICD-${index}`}
                      value={item.ICDCODE.pICDCode}
                    >
                      ICD: {item.ICDCODE.pICDCode}
                    </MenuItem>
                  );
                } else if (item.RVSCODES) {
                  return (
                    <MenuItem
                      key={`RVS-${index}`}
                      value={item.RVSCODES.pRVSCode}
                    >
                      RVS: {item.RVSCODES.pRVSCode} –{" "}
                      {item.RVSCODES.pRelatedProcedure}
                    </MenuItem>
                  );
                }
                return null;
              })}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="pCaseRateAmount1"
            label="First Case Rate Amount"
            fullWidth
            value={data.pCaseRateAmount1 || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Second Case Rate */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="ICD10orRVSCode2"
            label="ICD 10 or RVS Code (Second)"
            fullWidth
            value={data.ICD10orRVSCode2 || ""}
            onChange={handleCaseRateChange}
            disabled={diagnosisData().length === 0}
          >
            {/* Unselect option */}
            <MenuItem value="">-- Unselect --</MenuItem>

            {diagnosisData()
              .filter((item) => {
                const code =
                  item.ICDCODE?.pICDCode || item.RVSCODES?.pRVSCode || "";
                return code !== data.ICD10orRVSCode1;
              })
              .map((item, index) => {
                if (item.ICDCODE) {
                  return (
                    <MenuItem
                      key={`ICD2-${index}`}
                      value={item.ICDCODE.pICDCode}
                    >
                      ICD: {item.ICDCODE.pICDCode}
                    </MenuItem>
                  );
                } else if (item.RVSCODES) {
                  return (
                    <MenuItem
                      key={`RVS2-${index}`}
                      value={item.RVSCODES.pRVSCode}
                    >
                      RVS: {item.RVSCODES.pRVSCode}
                    </MenuItem>
                  );
                }
                return null;
              })}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="pCaseRateAmount2"
            label="Second Case Rate Amount"
            fullWidth
            value={data.pCaseRateAmount2 || ""}
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
