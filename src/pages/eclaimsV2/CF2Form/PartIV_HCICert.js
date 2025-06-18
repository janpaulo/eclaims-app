import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, TextField } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function PartIV_HCICert({ data, onChange }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}><Typography>Part IV – HCI Certification</Typography></AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {[
            ["certName", "Name of Certifying Official"],
            ["certPosition", "Official’s Position"],
            ["certSignature", "Signature of HCI Certifier"],
            ["certDate", "Date"]
          ].map(([name, label], i) => (
            <Grid item xs={12} sm={i < 3 ? 8 : 4} key={name}>
              <TextField
                fullWidth
                label={label}
                name={name}
                type={i === 3 ? "date" : "text"}
                value={data[name]}
                onChange={onChange}
                InputLabelProps={i === 3 ? { shrink: true } : undefined}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
