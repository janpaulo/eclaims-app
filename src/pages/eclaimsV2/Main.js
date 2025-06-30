// Main.js
import React, { useState, useRef, useEffect } from "react";
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

function removeEmptyFields(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const hasAnyValue = Object.values(value).some((v) =>
        typeof v === "object"
          ? Object.keys(removeEmptyFields(v)).length > 0
          : v !== ""
      );
      if (hasAnyValue) {
        cleaned[key] = value;
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        cleaned[key] = value;
      }
    } else if (value !== "") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function Main({ authUser }) {
  const [tab, setTab] = useState(0);
  const [cf1Valid, setCf1Valid] = useState(false);
  const [cf2Valid, setCf2Valid] = useState(false);
  const [isPbef, setIsPbef] = useState(false);
  const [pbefData, setPbefData] = useState({});
  const [pbefResultData, setPbefResultData] = useState({});
  const [showTabs, setShowTabs] = useState(false);
  const [form, setForm] = useState({
    packageType: "All Case Rate",
    isCF3Old: false,
    isCF3New: false,
    isCF5: false,
  });

  const cf1Ref = useRef();
  const cf2Ref = useRef();
  const cf3Ref = useRef();
  const cf3NewRef = useRef();
  const attachRef = useRef();
  const tabSectionRef = useRef();

  const TAB_INDEX = {
    CF1: 0,
    CF2: 1,
    CF3_OLD: 2,
    CF3_NEW: 3,
    PARTICULARS_RECEIPTS: 4,
    ATTACHMENT: 5,
  };

  useEffect(() => {
    if (isPbef) {
      const timer = setTimeout(() => {
        setShowTabs(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPbef]);

  const handleSubmitAll = () => {
    const valid1 = cf1Ref.current?.validateForm?.();
    const valid2 = cf2Ref.current?.validateForm?.();

    const formData1 = cf1Ref.current?.getFormData?.();
    const formData2 = cf2Ref.current?.getFormData?.();
    const formDataCF3Old = cf3Ref.current?.getFormData?.();
    const AttachmentData = attachRef.current?.getFormData?.();

    const parentJson = {
      pUserName: authUser.hospital.username_code,
      pUserPassword: "",
      pHospitalCode: authUser.hospital.accreditation_num,
      pHospitalEmail: authUser.email,
      pServiceProvider: "",
    };

    const eTRANSMITTAL = {
      eTRANSMITTAL: {
        pHospitalTransmittalNo: "",
        pTotalClaims: "",
      },
    };

    const CF1 = { CF1: formData1 };
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
      ...cf2Cleaned
    } = cf2WithoutSpecial;

    const { SPECIAL } = transformSpecialConsiderationsToSPECIAL(
      specialConsiderations
    );
    const cleanedSPECIAL = cleanSpecialSection(SPECIAL);

    const CF2 = {
      CF2: {
        ...cf2Cleaned,
        SPECIAL: cleanedSPECIAL,
      },
    };

    const CF3 = { CF3: formDataCF3Old };
    const AttachmentFormData = { AttachmentForm: AttachmentData };

    const finalPayload = {
      ...parentJson,
      ...eTRANSMITTAL,
      ...CF1,
      ...CF2,
      ...CF3,
      ...AttachmentFormData,
    };

    console.log("✅ Final JSON Payload:", finalPayload.CF2);

    setCf1Valid(valid1);
    setCf2Valid(valid2);

    if (valid1 && valid2) {
      cf1Ref.current?.handleSubmit?.();
      cf2Ref.current?.handleSubmit?.();
      cf3Ref.current?.handleSubmit?.();
      attachRef.current?.handleSubmit?.();
      alert("Both CF1 and CF2 submitted successfully!");
    } else {
      alert("Please complete both CF1 and CF2 forms before submitting.");
    }
  };

  const handleGeneratePDF = async (referenceno) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEW_PHIC_URL}/GeneratePBEFPDF?referenceno=${referenceno}`,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.username_code,
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
      <Container maxWidth="lg" sx={{ my: 4 }}>
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
              <Grid item xs={12} sm={3}>
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
                            tabSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Claim Form 3 (Old)?"}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
                            tabSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                    />
                  }
                  label={"Include Claim Form 3 (New)?"}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isCF5"
                      checked={form.isCF5}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, isCF5: e.target.checked }))
                      }
                    />
                  }
                  label={"Do you Want to generate XML Claim Form 5?"}
                />
              </Grid>
            </Grid>

            <Box ref={tabSectionRef} sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label="CF1" />
                <Tab label="CF2" />
                <Tab label="CF3 OLD" />
                <Tab label="CF3 New" />
                <Tab label="Particular and Receipts" />
                <Tab label="Attachment" />
              </Tabs>
            </Box>

            <Box hidden={tab !== 0}>
              <ClaimForm1 ref={cf1Ref} prefillData={pbefData} authUser={authUser} pbefResultData={pbefResultData} />
            </Box>
            <Box hidden={tab !== 1}>
              <ClaimForm2 ref={cf2Ref} prefillData={pbefData} pbefResultData={pbefResultData} packageType={form.packageType} authUser={authUser} />
            </Box>
            <Box hidden={tab !== 2}>
              <CF3FormOld  disabled={!form.isCF3Old} ref={cf3Ref} prefillData={pbefData} pbefResultData={pbefResultData} packageType={form.packageType} authUser={authUser} />
            </Box>
            <Box hidden={tab !== 3}>
              <CF3FormNew  disabled={!form.isCF3New} ref={cf3NewRef} prefillData={pbefData} pbefResultData={pbefResultData} packageType={form.packageType} authUser={authUser} />
            </Box>
            <Box hidden={tab !== 4}>
              <ParticularsForm ref={cf3Ref} prefillData={pbefData} pbefResultData={pbefResultData} packageType={form.packageType} authUser={authUser} />
                 <Divider sx={{ my: 3 }} />
              <ReceiptForm prefillData={pbefData} pbefResultData={pbefResultData} packageType={form.packageType} authUser={authUser} />
            </Box>
            <Box hidden={tab !== 5}>
              <AttachmentForm ref={attachRef} pbefResultData={pbefResultData} />
            </Box>

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button variant="contained" onClick={handleSubmitAll}>
                Submit Both Forms
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default Main;
