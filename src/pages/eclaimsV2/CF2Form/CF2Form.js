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
import moment from "moment";
import APRForm from "./APRForm";
import AllCaseRate from "./AllCaseRate";

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

const formatDatesToMMDDYYYY = (obj) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}(T[\d:.Z+-]*)?$/; // Matches ISO-like dates

  if (Array.isArray(obj)) {
    return obj.map(formatDatesToMMDDYYYY);
  } else if (obj && typeof obj === "object") {
    const formatted = {};
    for (const key in obj) {
      const value = obj[key];

      if (
        typeof value === "string" &&
        datePattern.test(value) &&
        moment(value, moment.ISO_8601, true).isValid()
      ) {
        formatted[key] = moment(value).format("MM-DD-YYYY");
      } else if (typeof value === "object") {
        formatted[key] = formatDatesToMMDDYYYY(value);
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  }
  return obj;
};

const convertAllTimesTo12Hour = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertAllTimesTo12Hour);
  } else if (obj && typeof obj === 'object') {
    const formatted = {};
    for (const key in obj) {
      const value = obj[key];

      if (
        typeof value === 'string' &&
        moment(value, ["HH:mm:ss", "H:mm:ss"], true).isValid()
      ) {
        formatted[key] = moment(value, "HH:mm:ss").format("hh:mm:ssA");
      } else if (typeof value === 'object') {
        formatted[key] = convertAllTimesTo12Hour(value);
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  }
  return obj;
};



const initial = {
  pPatientReferred: "N",
  pPatientType: "I",
  pIsEmergency: "N",
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
      pWithCoPay: "N",
      pDoctorCoPay: "0.00",
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
  const allCaseRateRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ [name]: type === "checkbox" ? checked : value });
  };

  const ALLCASERATE = {
    ALLCASERATE: {
      CASERATE: [
        ...(allCaseRate.ICD10orRVSCode1
          ? [
              {
                pCaseRateCode: allCaseRate.ICD10orRVSCode1,
                pICDCode: allCaseRate.ICD10orRVSCode1 || "",
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
    },
  };

  const ZBENEFIT = {
    ZBENEFIT: {
      pzBenefitCode: data.specialConsiderations.pZBenefitCode,
      pPreAuthDate: data.specialConsiderations.pPreAuthDate
        ? moment(data.specialConsiderations.pPreAuthDate).format("MM-DD-YYYY")
        : "",
    },
  };

  console.log(data);
  // const validate = () =>
  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isValid =
        // data.patientLast?.trim() &&
        data.pAdmissionDate?.trim() && data.pDischargeDate?.trim();
      // &&
      // data.patientLast?.trim() &&
      // data.patientLast?.trim()
      console.log("CF2 valid:", !!isValid);
      return !!isValid;
    },
    // validateForm: validate,

    getFormData: () => {
      const aprData = aprFormRef.current?.getFormData?.() || {};
      const diagData = diagnosisRef.current?.getFormData?.() || {};

      const updatedData = JSON.parse(JSON.stringify(data));

      // Convert BENEFITS to array if it exists and is an object
      if (
        updatedData.CONSUMPTION &&
        updatedData.CONSUMPTION.BENEFITS &&
        !Array.isArray(updatedData.CONSUMPTION.BENEFITS)
      ) {
        const benefitsObj = updatedData.CONSUMPTION.BENEFITS;

        updatedData.CONSUMPTION.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES = [
          { BENEFITS: benefitsObj },
        ];

        // Optionally remove the old BENEFITS key
        delete updatedData.CONSUMPTION.BENEFITS;
      }

      // Merge additional form data
      let merged = {
        ...updatedData,
        ...aprData,
        ...diagData,
      };

      // 🔄 Format all date strings in merged object
      merged = formatDatesToMMDDYYYY(merged);
      merged = convertAllTimesTo12Hour(merged);

      return merged;
    },

    getALLCASERATEOrZBENEFIT: () => {
      const allCaseRateData = allCaseRateRef.current?.getFormData?.() || {};
      const ALLCASERATEOrZBENEFIT =
        packageType === "All Case Rate"
          ? {ALLCASERATEOrZBENEFIT : allCaseRateData.ALLCASERATEOrZBENEFIT}
          : ZBENEFIT;
      return {
        ...ALLCASERATEOrZBENEFIT,
      };
    },
    getCF5: () => {
      return {
        ...ALLCASERATE,
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
      pCaseRateCode: selectedItem?.ICDCODE?.pCaseRateCode || "",
      pICDCode: selectedItem?.ICDCODE?.pICDCode || "",
      pRVSCode: selectedItem?.RVSCODES?.pRVSCode || "",
      pCaseRateAmount: caseRateAmount, // optional fallback
    }));
  };


  console.log(storeDataDischarge)
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
      <AllCaseRate ref={allCaseRateRef} setStoreDataDischarge={storeDataDischarge[0]?.ICDCODEOrRVSCODES}/>

      <Divider sx={{ my: 3 }} />

      <APRForm ref={aprFormRef} />
    </Box>
  );
});

export default CF2Form;
