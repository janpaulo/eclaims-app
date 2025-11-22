import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, TextField } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function PartI_HCI({ data, onChange }) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}><Typography>Part I – Health Care Institution</Typography></AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {[
            { label: "PAN", name: "pan" },
            { label: "Institution Name", name: "hciName" },
            { label: "Institution Address", name: "hciAddress" }
          ].map(({ label, name }) => (
            <Grid item xs={12} sm={4} key={name}>
              <TextField
                label={label}
                name={name}
                value={data[name]}
                onChange={onChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
