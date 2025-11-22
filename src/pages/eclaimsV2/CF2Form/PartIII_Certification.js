import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function PartIII_Certification({ data, onChange }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}><Typography>Part III – Patient/Representative Certification</Typography></AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient / Representative Signature"
              name="patientSig"
              value={data.patientSig}
              onChange={onChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="date"
              label="Date Signed"
              name="patientSigDate"
              value={data.patientSigDate}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Relation to Patient"
              name="patientRelation"
              value={data.patientRelation}
              onChange={onChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="thumbmark"
                  checked={data.thumbmark}
                  onChange={onChange}
                />
              }
              label="Thumbmark (if unable to sign)"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
