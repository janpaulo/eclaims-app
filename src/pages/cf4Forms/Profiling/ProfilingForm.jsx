import React from "react";
import { Grid } from "@mui/material";
import OInfo from "./OINFO";
import MedHist from "./MEDHIST";
import MHSpecific from "./MHSPECIFIC";
import SurgHist from "./SURGHIST";
import FamHist from "./FAMHIST";
import FHSpecific from "./FHSPECIFIC";
import SocHist from "./SOCHIST";
import Immunization from "./IMMUNIZATION";
import MensHist from "./MENSHIST";
import PregHist from "./PREGHIST";
import Pepert from "./PEPERT";
import BloodType from "./BLOODTYPE";
import PegEnSurvey from "./PEGENSURVEY";
import PeMisc from "./PEMISC";
import PeSpecific from "./PESPECIFIC";
import Diagnostic from "./DIAGNOSTIC";
import Management from "./MANAGEMENT";
import Advice from "./ADVICE";
import NCDQans from "./NCDQANS";

const ProfilingForm = ({ authUser, formData, setFormData }) => {
  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OInfo formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <MedHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <MHSpecific formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <SurgHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <FamHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <FHSpecific formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <SocHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Immunization formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <MensHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PregHist formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Pepert formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <BloodType formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PegEnSurvey formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PeMisc formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PeSpecific formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Diagnostic formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Management formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Advice formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <NCDQans formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
    </Grid>
  );
};

export default ProfilingForm;
