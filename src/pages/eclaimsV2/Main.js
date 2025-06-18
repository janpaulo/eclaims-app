// Main.js

import React, { useState, useRef } from 'react';
import {
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  Button,
  Typography
} from '@mui/material';
import ClaimForm1 from './ClaimForm1';
import ClaimForm2 from './CF2Form/CF2Form';

function Main() {
  const [tab, setTab] = useState(0);
  const [cf1Valid, setCf1Valid] = useState(false);
  const [cf2Valid, setCf2Valid] = useState(false);

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

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab label="CF1" />
            <Tab label="CF2" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tab === 0 && <ClaimForm1 ref={cf1Ref} />}
        {tab === 1 && <ClaimForm2 ref={cf2Ref} />}

        {/* Submit Button */}
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button variant="contained" onClick={handleSubmitAll}>
            Submit Both Forms
          </Button>
        </Box>

        {/* Optional Validation Feedback */}
        {/* {(!cf1Valid || !cf2Valid) && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            Please ensure all required fields are filled out correctly in both forms.
          </Typography>
        )} */}
      </Container>
    </>
  );
}

export default Main;
