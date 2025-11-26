// Main.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ClaimForm1 from "./ClaimForm1";
import ClaimForm2 from "./CF2Form/CF2Form";
import ClaimFormValidation from "./ClaimFormValidation";
import CF3FormOld from "./CF3Form/CF3FormOld";
import CF3FormNew from "./CF3Form/CF3FormNew";
import AttachmentForm from "./AttachmentForm";
import ParticularsForm from "./ParticularsForm";
import ReceiptForm from "./ReceiptForms";
import { transformSpecialConsiderationsToSPECIAL } from "./CF2Form/transformSpecialConsiderationsToSPECIAL";
import moment from "moment";
import SharedAlertDialog from "../../shared/DialogBox/SharedAlertDialog";
function cleanSpecialSection(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (key === "NCP") {
      const {
        pEssentialNewbornCare,
        pNewbornHearingScreeningTest,
        pNewbornScreeningTest,
        pFilterCardNo,
        ESSENTIAL = {},
      } = value || {};
      const allValues = [
        pEssentialNewbornCare,
        pNewbornHearingScreeningTest,
        pNewbornScreeningTest,
        ...Object.values(ESSENTIAL || {}),
      ];
      const isAllN = allValues.every((v) => v === "N" || v === "");
      if (!isAllN || (pFilterCardNo && pFilterCardNo !== "")) {
        cleaned[key] = value;
      }
      continue;
    }

    if (typeof value === "object" && value !== null) {
      const hasAnyValue = Object.values(value).some((v) => {
        if (Array.isArray(v)) return v.length > 0;
        if (typeof v === "object")
          return Object.keys(cleanSpecialSection(v)).length > 0;
        return v !== "";
      });
      if (hasAnyValue) {
        cleaned[key] = value;
      }
    } else if (value !== "") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

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

function Main({ authUser }) {
  const [tab, setTab] = useState(0);
  const [cf1Valid, setCf1Valid] = useState(false);
  const [cf2Valid, setCf2Valid] = useState(false);
  const [isPbef, setIsPbef] = useState(false);
  const [pbefData, setPbefData] = useState({});
  const [pbefResultData, setPbefResultData] = useState({});
  const [showTabs, setShowTabs] = useState(false);
  const [claimsNum, setClaimsNum] = useState("");
  const [claimsJsonData, setClaimsJsonData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEclaimsPassed, setIsEclaimsPassed] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    packageType: "All Case Rate",
    isCF3Old: false,
    isCF3New: false,
    isCF5: false,
    isParticular: false,
    isReceipt: false,
  });

  const cf1Ref = useRef();
  const cf2Ref = useRef();
  const cf3Ref = useRef();
  const cf3NewRef = useRef();
  const attachRef = useRef();
  const tabSectionRef = useRef();
  const particularRef = useRef();
  const receiptRef = useRef();

  const TAB_INDEX = {
    CF1: 0,
    CF2: 1,
    CF3_OLD: 2,
    CF3_NEW: 3,
    PARTICULARS_RECEIPTS: 4,
    ATTACHMENT: 5,
  };

  const getClaimNumber = async () => {
    try {
      const hospitalCode = authUser?.hospital?.hospital_code; // Correct the spelling here

      if (!hospitalCode) throw new Error("Missing hospital code.");

      const response = await axios.get(
        `${process.env.REACT_APP_API_CLAIMS}claims-number/${hospitalCode}`,
        {
          headers: {
            Authorization: `Bearer ${authUser?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Validate response before setting the claim number
      if (response.data && response.data.reference) {
        setClaimsNum(response.data.reference);
      } else {
        throw new Error("Invalid response structure: reference not found.");
      }
    } catch (error) {
      // Log error with more details
      console.error("Claim number generation failed:", error);

      // Show a more specific error message
      alert(
        error.response?.data?.message ||
          "Unable to generate claim number. Please try again."
      );
    }
  };

  useEffect(() => {
    if (isPbef) {
      const timer = setTimeout(() => {
        setShowTabs(true);
        getClaimNumber();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPbef]);

  const handleSubmitAll = async () => {
    setLoading(true);
    const valid1 = cf1Ref.current?.validateForm?.();
    const valid2 = cf2Ref.current?.validateForm?.();
    const validAttach = attachRef.current?.validateForm?.();

    // console.log("valid1", authUser);
    // console.log("valid2", valid2);
    // console.log("validAttach", validAttach);

    const formData1 = cf1Ref.current?.getFormData?.();
    const formData2 = cf2Ref.current?.getFormData?.();
    const formDataCF3Old = cf3Ref.current?.getFormData?.();
    const formDataCF3New = cf3NewRef.current?.getFormData?.();
    const AttachmentData = attachRef.current?.getFormData?.();
    const particularData = particularRef.current?.getFormData?.();
    const receiptData = receiptRef.current?.getFormData?.();

    const parentJson = {
      pUserName: ":" + authUser.hospital.software_cert,
      pUserPassword: "",
      pHospitalCode: authUser.hospital.hospital_code, //authUser.hospital.accreditation_num,
      pHospitalEmail: authUser.email,
      pServiceProvider: "",
    };

    // const CF1 = { CF1: formData1 };

    const { pClaimNumber, pTrackingNumber, ...cleanedData } = formData1;
    const CF1 = { CF1: cleanedData };
    const { specialConsiderations, ...cf2WithoutSpecial } = formData2;

    const {
      firstName,
      lastName,
      middleName,
      nameExt,
      pan,
      hciName,
      hciAddress,
      pLaboratoryNumber,
      ICD10orRVSCode1,
      ICD10orRVSCode2,
      pCaseRateAmount1,
      pCaseRateAmount2,
      pPatientType,
      pIsEmergency,
      ...cf2Cleaned
    } = cf2WithoutSpecial;

    const { SPECIAL } = transformSpecialConsiderationsToSPECIAL(
      specialConsiderations
    );
    const cleanedSPECIAL = cleanSpecialSection(SPECIAL);

    let CF2 = {
      CF2: {
        ...cf2Cleaned,
        SPECIAL: cleanedSPECIAL,
      },
    };

    // Convert all date fields in CF2 to MM-DD-YYYY
    CF2 = formatDatesToMMDDYYYY(CF2);

    let CF3 = {};
    if (form.isCF3Old || form.isCF3New) {
      CF3 = {
        CF3: {
          ...(form.isCF3Old ? formDataCF3Old : {}),
          ...(form.isCF3New ? formDataCF3New : {}),
        },
      };
    }

    CF3 = formatDatesToMMDDYYYY(CF3);
    const AttachmentFormData = AttachmentData;

    const claimDetails = {
      pClaimNumber: claimsNum || "",
      pTrackingNumber: formData1.pTrackingNumber || "",
      pPhilhealthClaimType:
        form.packageType === "All Case Rate" ? "ALL-CASE-RATE" : "Z-BENEFIT",
      pPatientType: formData2.pPatientType || "",
      pIsEmergency: formData2.pIsEmergency || "",
    };

    const getALLCASERATEOrZBENEFIT =
      cf2Ref.current?.getALLCASERATEOrZBENEFIT?.();

    const finalPayload = {
      // ...parentJson,
      // ...eTRANSMITTAL,
      ...claimDetails,
      ...CF1,
      ...CF2,
      ...getALLCASERATEOrZBENEFIT,
      ...CF3, // will be empty if both flags are false
      ...(form.isParticular ? formatDatesToMMDDYYYY(particularData) : {}),
      ...(form.isReceipt ? formatDatesToMMDDYYYY(receiptData) : {}),
      // ...receiptData,
      ...AttachmentFormData,
    };

    const eTRANSMITTAL = {
      ...parentJson,
      eTRANSMITTAL: {
        pHospitalTransmittalNo: claimsNum,
        pTotalClaims: "1",
        CLAIM: [finalPayload],
      },
    };

    // console.log("✅ eTRANSMITTAL JSON Payload:", eTRANSMITTAL);
    // console.log("✅ formData1 JSON Payload:", formData1);

    const getCF5Data = cf2Ref.current?.getCF5?.();

    const firstCaseRate =
      getCF5Data?.ALLCASERATEOrZBENEFIT?.[0]?.ALLCASERATE?.CASERATE?.[0];

    const secondCaseRate =
      getCF5Data?.ALLCASERATEOrZBENEFIT?.[0]?.ALLCASERATE?.CASERATE?.[1];

    const secondaryDiags = secondCaseRate
      ? [
          {
            SecondaryCode:
              secondCaseRate?.pICDCode || secondCaseRate?.pRVSCode || "",
            Remarks: "",
          },
        ]
      : [
          {
            SecondaryCode: "",
            Remarks: "",
          },
        ];

    // Extract all RVSCODES from DISCHARGE
    const extractProcedures = (dischargeArray) => {
      const procedures = [];

      dischargeArray?.forEach((discharge) => {
        discharge?.ICDCODEOrRVSCODES?.forEach((entry) => {
          if (entry?.RVSCODES) {
            const rvs = entry.RVSCODES;
            procedures.push({
              RvsCode: rvs.pRVSCode || "",
              Laterality: rvs.pLaterality || "",
              Ext1: "", // Optional: map another field if needed
              Ext2: "", // Optional: map another field if needed
              Remarks: "" || "", //rvs.pRelatedProcedure || "",
            });
          }
        });
      });

      return procedures;
    };

    // Use extracted procedures from DISCHARGE if available
    const extractedProcedures = extractProcedures(
      getCF5Data?.DIAGNOSIS?.DISCHARGE || []
    );

    // Final CF5 JSON
    const generateCF5 = {
      cf5: {
        pHospitalCode: authUser.hospital.accreditation_num,
        DRGCLAIM: {
          ClaimNumber: claimsNum || "",
          PrimaryCode:
            firstCaseRate?.pICDCode || firstCaseRate?.pCaseRateCode || "",
          NewBornAdmWeight: form.NewBornAdmWeight || "",
          Remarks: "",
          SECONDARYDIAGS: {
            SECONDARYDIAG: secondaryDiags,
          },
          PROCEDURES: {
            PROCEDURE:
              extractedProcedures.length > 0
                ? extractedProcedures
                : [{ RvsCode: "", Laterality: "", Ext1: "", Remarks: "" }],
          },
        },
      },
    };
    // console.log("✅ CF5 and eclaims JSON Payload:", eTRANSMITTAL);
    const cf5Payload = {
      eclaims: eTRANSMITTAL,
      cf5: generateCF5.cf5,
    };

    // console.log("✅ CF5 and eclaims JSON cf5Payload:", cf5Payload);
    setCf1Valid(valid1);
    setCf2Valid(valid2);

    // Submission to PHIC
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/validateeClaims`,
        eTRANSMITTAL,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "text/plain",
          },
          validateStatus: () => true, // prevent auto-rejection for 4xx/5xx
        }
      );

      // console.log("HTTP Status:",eTRANSMITTAL);

      if (res.status === 200) {
        setIsEclaimsPassed(true);
        setOpen(true);
        setErrorMessage(res.data.message);
        setClaimsJsonData(eTRANSMITTAL);

        enqueueSnackbar("Both CF1, CF2 and attachment submitted successfully", {
          variant: "success",
        });
        try {
          // Encrypt claims data only on success
          await encrypClaims(eTRANSMITTAL);
        } catch (error) {
          console.error("Encryption failed:", error);
          setOpen(true);
          setIsEclaimsPassed(false);
          setOpen(true);
          setErrorMessage(
            "Error occurred during claim encryption. Please try again."
          );
        }
        // console.log("✅ Success:", res.data);
      } else if (res.status === 422) {
        setOpen(true);
        setIsEclaimsPassed(false);
        setErrorMessage(res.data.message);
      } else if (res.status === 303) {
        setOpen(true);
        enqueueSnackbar("Please try to submit again", { variant: "error" });
        // setErrorMessage("Please try to submit again");
      } else {
        console.warn("Unhandled status:", res.status, res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(" Request Error:", err.message);
    } finally {
      // setIsLoading(false);
    }

    if (valid1 && valid2 && validAttach) {
      cf1Ref.current?.handleSubmit?.();
      cf2Ref.current?.handleSubmit?.();
      cf3Ref.current?.handleSubmit?.();
      attachRef.current?.handleSubmit?.();
    } else {
      setIsEclaimsPassed(false);
      enqueueSnackbar(
        "Please complete both CF1, CF2 and attachment forms before submitting",
        { variant: "error" }
      );
    }
  };

  const encrypClaims = async (claimsJSONData) => {
    try {
      // Get current date in mm-dd-yyyy format
      const currentDate = new Date();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");
      const year = currentDate.getFullYear();

      const formattedDate = `${month}-${day}-${year}`;

      // Get and increment the filename counter from localStorage
      let increment = localStorage.getItem("increment") || 1;
      increment = parseInt(increment, 10) + 1; // Increment the value
      localStorage.setItem("increment", increment); // Store the updated value back to localStorage

      // Build the filename dynamically
      const filename = `${authUser.hospital.hospital_code}-${formattedDate}-${increment}`;

      // Make the API request with the dynamically generated filename
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/encrypteClaims?filename=${filename}`,
        claimsJSONData, // Directly pass the data in the body of the POST request
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "application/json", // Change to 'application/json' for sending JSON data
          },
        }
      );

      // Handle the response
      if (response.status === 200) {
        // console.log("Successfully encrypted claims:", response.data);
      } else {
        console.error("Failed to encrypt claims:", response.data);
      }
    } catch (error) {
      console.error("Encryption failed:", error.response || error.message);
      alert("Unable to generate PBEF PDF. Please try again.");
    }
  };

  const navigate = useNavigate(); // Initialize useNavigate
  const uploadClaims = async (uploadClaimsJSONData) => {
    try {
      // Make the API request with the dynamically generated filename
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/uploadeClaims`,
        uploadClaimsJSONData, // Directly pass the data in the body of the POST request
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "application/json", // Change to 'application/json' for sending JSON data
          },
        }
      );

      // Handle the response status
      if (response.status >= 200 && response.status < 300) {
        // console.log("Successfully uploaded claims:", response.data);

        enqueueSnackbar("Successfully uploaded claims", { variant: "success" });
        const claim = claimsJsonData.eTRANSMITTAL.CLAIM[0]; // Assuming this is the correct data structure

        const admissionDateTime =
          claim.CF2?.pAdmissionDate && claim.CF2?.pAdmissionTime
            ? formatDateForDB(
                claim.CF2.pAdmissionDate,
                claim.CF2.pAdmissionTime
              )
            : new Date().toISOString();

        const claimsJsonSave = {
          series_no: response.data.result.preceiptTicketNumber,
          member_pin: claim.CF1?.pPatientPIN || "N/A", // Fallback if pPatientPIN is undefined
          date_admited: admissionDateTime,
          status: "pending",
          xml_data: JSON.stringify(claimsJsonData || {}),
          hci_no: authUser.hospital.accreditation_num || "Unknown",
          hci_code: authUser.hospital.hospital_code || "Unknown",
          date_created: new Date().toISOString(), // Current date and time in ISO format
        };

        await sendClaimRequest(claimsJsonSave);
        // **Redirect to /claims after successful upload**
        navigate("/claims"); // Use navigate to redirect to /claims
      } else {
        enqueueSnackbar("Failed to upload claims:", { variant: "error" });
        // console.error(
        //   "Failed to upload claims:",
        //   response.status,
        //   response.data
        // );
      }
    } catch (error) {
      // Log detailed error message
      console.error(
        "Encryption failed:",
        error.response?.data || error.message
      );

      // Display user-friendly alert
      alert("Unable to generate PBEF PDF. Please try again.");
    }
  };

  const sendClaimRequest = async (dataJson) => {
    setLoading(true); // Set loading to true when the request starts

    try {
      // Send POST request to the API
      const response = await axios.post(
        `${process.env.REACT_APP_API_CLAIMS}claims`, // API endpoint
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

  const formatDateForDB = (dateString, timeString) => {
    // Example: "11-05-2025" (MM-DD-YYYY) and "22:47" (HH:mm)
    if (!dateString || !timeString) {
      return null; // Return null if either date or time is missing
    }

    const [month, day, year] = dateString.split("-"); // MM-DD-YYYY
    const [hour, minute] = timeString.split(":"); // HH:mm
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:00`; // MySQL format: YYYY-MM-DD HH:MM:SS

    return formattedDate;
  };

  const handleConfirm = async () => {
    if (isEclaimsPassed) {
      await uploadClaims(claimsJsonData);
    }
    handleClose();
  };

  const handleGeneratePDF = async (referenceno) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/generatePBEFPDF?referenceno=${referenceno}`,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "text/plain",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PBEF_${referenceno}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Unable to generate PBEF PDF. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="full" sx={{ my: 4 }}>
        {!showTabs && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Validate Claim Eligibility
            </Typography>
            <Divider />
            <ClaimFormValidation
              setIsPbef={setIsPbef}
              setPbefData={setPbefData}
              authUser={authUser}
              setPbefResultData={setPbefResultData}
            />
          </>
        )}

        {showTabs && (
          <>
            <Typography sx={{ mb: 2 }}>
              Do you want to generate the PBEF PDF file?{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => handleGeneratePDF(pbefResultData.referenceno)}
              >
                click here
              </span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormGroup row>
                  {["All Case Rate", "Z-Benefits"].map((label) => (
                    <FormControlLabel
                      key={label}
                      control={
                        <Checkbox
                          checked={form.packageType === label}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              packageType: e.target.checked ? label : "",
                            }))
                          }
                        />
                      }
                      label={label}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isCF3Old"
                      checked={form.isCF3Old}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({ ...prev, isCF3Old: checked }));
                        if (checked) {
                          setTab(TAB_INDEX.CF3_OLD);
                          setTimeout(() => {
                            tabSectionRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Claim Form 3 (Old)?"}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isCF3New"
                      checked={form.isCF3New}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({ ...prev, isCF3New: checked }));
                        if (checked) {
                          setTab(TAB_INDEX.CF3_NEW);
                          setTimeout(() => {
                            tabSectionRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Claim Form 3 (New)?"}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isParticular"
                      checked={form.isParticular}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({ ...prev, isParticular: checked }));
                        if (checked) {
                          setTab(TAB_INDEX.PARTICULARS_RECEIPTS);
                          setTimeout(() => {
                            tabSectionRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Particular ?"}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isReceipt"
                      checked={form.isReceipt}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({ ...prev, isReceipt: checked }));
                        if (checked) {
                          setTab(TAB_INDEX.PARTICULARS_RECEIPTS);
                          setTimeout(() => {
                            tabSectionRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Receipt ?"}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isCF5"
                      checked={form.isCF5}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          isCF5: e.target.checked,
                        }))
                      }
                    />
                  }
                  label={"Do you Want to generate XML Claim Form 5?"}
                />
              </Grid>
            </Grid>

            <Box
              ref={tabSectionRef}
              sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label="CF1 *" />
                <Tab label="CF2 *" />
                <Tab label="CF3 OLD" />
                <Tab label="CF3 New" />
                <Tab label="Particular and Receipts" />
                <Tab label="Attachment *" />
              </Tabs>
            </Box>

            <Box hidden={tab !== 0}>
              <ClaimForm1
                ref={cf1Ref}
                prefillData={pbefData}
                authUser={authUser}
                pbefResultData={pbefResultData}
              />
            </Box>
            <Box hidden={tab !== 1}>
              <ClaimForm2
                ref={cf2Ref}
                prefillData={pbefData}
                pbefResultData={pbefResultData}
                packageType={form.packageType}
                authUser={authUser}
              />
            </Box>
            <Box hidden={tab !== 2}>
              <CF3FormOld
                disabled={!form.isCF3Old}
                ref={cf3Ref}
                prefillData={pbefData}
                pbefResultData={pbefResultData}
                packageType={form.packageType}
                authUser={authUser}
              />
            </Box>
            <Box hidden={tab !== 3}>
              <CF3FormNew
                disabled={!form.isCF3New}
                ref={cf3NewRef}
                prefillData={pbefData}
                pbefResultData={pbefResultData}
                packageType={form.packageType}
                authUser={authUser}
              />
            </Box>
            <Box hidden={tab !== 4}>
              <ParticularsForm
                disabled={!form.isParticular}
                ref={particularRef}
                prefillData={pbefData}
                pbefResultData={pbefResultData}
                packageType={form.packageType}
                authUser={authUser}
              />
              <Divider sx={{ my: 3 }} />
              <ReceiptForm
                disabled={!form.isReceipt}
                ref={receiptRef}
                prefillData={pbefData}
                pbefResultData={pbefResultData}
                packageType={form.packageType}
                authUser={authUser}
              />
            </Box>
            <Box hidden={tab !== 5}>
              <AttachmentForm
                ref={attachRef}
                pbefResultData={pbefResultData}
                authUser={authUser}
              />
            </Box>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmitAll}
                endIcon={
                  loading ? (
                    <CircularProgress color="inherit" size="30px" />
                  ) : (
                    <SendIcon />
                  )
                }
                disabled={loading}
              >
                Validate Claim
              </Button>
            </Box>
          </>
        )}

        {/* <Button variant="contained" color="error" onClick={handleOpen}>
          Delete
        </Button> */}
        <SharedAlertDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Message"
          description={errorMessage}
          confirmText={isEclaimsPassed ? "Submit" : "Yes"}
          cancelText="Cancel"
          showCancel={!isEclaimsPassed}
          showConfirm={isEclaimsPassed}
          confirmColor="success"
          cancelColor="error"
        />
      </Container>
    </>
  );
}

export default Main;
