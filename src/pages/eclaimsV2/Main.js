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
} from "@mui/material";

import axios from "axios";
import ClaimForm1 from "./ClaimForm1";
import ClaimForm2 from "./CF2Form/CF2Form";
import ClaimFormValidation from "./ClaimFormValidation";

function Main({ authUser }) {
  const [tab, setTab] = useState(0);
  const [cf1Valid, setCf1Valid] = useState(false);
  const [cf2Valid, setCf2Valid] = useState(false);
  const [isPbef, setIsPbef] = useState(false);
  const [pbefData, setPbefData] = useState({});
  const [pbefResultData, setPbefResultData] = useState({});
  const [showTabs, setShowTabs] = useState(false); // NEW

  useEffect(() => {
    if (isPbef) {
      const timer = setTimeout(() => {
        setShowTabs(true);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer); // cleanup
    }
  }, [isPbef]);

  const cf1Ref = useRef();
  const cf2Ref = useRef();

  const handleSubmitAll = () => {
    const valid1 = cf1Ref.current?.validateForm?.();
    const valid2 = cf2Ref.current?.validateForm?.();

    setCf1Valid(valid1);
    setCf2Valid(valid2);

    if (valid1 && valid2) {
      cf1Ref.current.handleSubmit();
      cf2Ref.current.handleSubmit();
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
      window.URL.revokeObjectURL(url); // cleanup
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

            {/* {console.log(pbefResultData)} */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label="CF1" />
                <Tab label="CF2" />
                <Tab label="Attachment" />
              </Tabs>
            </Box>

            {tab === 0 && (
              <ClaimForm1
                ref={cf1Ref}
                prefillData={pbefData}
                authUser={authUser}
                pbefResultData={pbefResultData}
              />
            )}
            {tab === 1 && (
              <ClaimForm2 ref={cf2Ref} pbefResultData={pbefResultData} />
            )}

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
