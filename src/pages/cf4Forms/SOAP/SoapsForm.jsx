import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Paper,
} from "@mui/material";
import Pepert from "./PEPERT";
import PeMisc from "./PEMISC1";
import PeSpecific from "./PESPECIFIC";
import Diagnostic from "./DIAGNOSTIC";
import Management from "./MANAGEMENT";
import Advice from "./ADVICE";
import Subjective from "./SUBJECTIVE";
import Icd from "./ICDS";


const SoapsForm = ({ authUser, formData, setFormData }) => {
  
  return (
    <Grid container spacing={2}>
     
      <Grid item xs={12}>
        <Subjective formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Pepert formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PeMisc formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <PeSpecific formData={formData} setFormData={setFormData}  authUser={authUser} />
      </Grid>
      <Grid item xs={12}>
        <Icd formData={formData} setFormData={setFormData}  authUser={authUser} />
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
    </Grid>
  );
};

export default SoapsForm;
