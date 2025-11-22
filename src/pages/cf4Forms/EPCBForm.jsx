import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper
} from "@mui/material";

import EnlistmentsForm from "./EnlistmentsForm";
import ProfilingForm from "./Profiling/ProfilingForm";
import SoapsForm from "./SOAP/SoapsForm";
import MedicinesForm from "./MedicinesForm";
// import CoursewardsForm from "./CoursewardsForm";
// import LabResultsForm from "./LabResultsForm";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function EPCBForm({ authUser }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="EPCB Tabs"
        >
          <Tab label="Enlistments" />
          <Tab label="Profiling" />
          <Tab label="SOAPS" />
          <Tab label="Medicines" />
          {/* <Tab label="Coursewards" />
          <Tab label="Lab Results" /> */}
        </Tabs>

        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 2 }}>
          <TabPanel value={tabIndex} index={0}>
            <EnlistmentsForm
              authUser={authUser}
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ProfilingForm
              authUser={authUser}
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <SoapsForm
              authUser={authUser} 
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            <MedicinesForm
              authUser={authUser}
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel>
          {/* <TabPanel value={tabIndex} index={4}>
            <CoursewardsForm
              authUser={authUser}
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={5}>
            <LabResultsForm
              authUser={authUser}
              formData={formData}
              setFormData={setFormData}
            />
          </TabPanel> */}
        </Box>
      </Paper>
    </Box>
  );
}
