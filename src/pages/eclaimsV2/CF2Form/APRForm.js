import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

const APRForm = forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    pDateSigned: "",
    pRelCode: "",
    pRelDesc: "",
    pReasonCode: "",
    pReasonDesc: "",
    pThumbmarkedBy: "",
  });

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      let payload = {};

      if (selectedOption === "APRBYPATSIG") {
        payload = {
          APRBYPATSIGOrAPRBYPATREPSIGOrAPRBYTHUMBMARK:[ {
            APRBYPATSIG: {
              pDateSigned: formData.pDateSigned,
            },
          }],
        };
      } else if (selectedOption === "APRBYPATREPSIG") {
        const rel =
          formData.pRelCode === "O"
            ? { OTHERPATREPREL: { pRelCode: "O", pRelDesc: formData.pRelDesc } }
            : { DEFINEDPATREPREL: { pRelCode: formData.pRelCode } };

        const reason =
          formData.pReasonCode === "O"
            ? {
                OTHERREASONFORSIGNING: {
                  pReasonCode: "O",
                  pReasonDesc: formData.pReasonDesc,
                },
              }
            : { DEFINEDREASONFORSIGNING: { pReasonCode: "I" } };

        payload = {
          APRBYPATSIGOrAPRBYPATREPSIGOrAPRBYTHUMBMARK: [{
            APRBYPATREPSIG: {
              pDateSigned: formData.pDateSigned,
              ...rel,
              ...reason,
            },
          }],
        };
      } else if (selectedOption === "APRBYTHUMBMARK") {
        payload = {
          APRBYPATSIGOrAPRBYPATREPSIGOrAPRBYTHUMBMARK: [{
            APRBYTHUMBMARK: {
              pThumbmarkedBy: formData.pThumbmarkedBy,
            },
          }],
        };
      }

      return {
        APR: payload,
      };
    },
  }));

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  return (
    <Box>
      <Typography variant="h6">Authorization to Release (APR)</Typography>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel>Select Authorization Type</FormLabel>
        <RadioGroup
          row
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setFormData({
              pDateSigned: "",
              pRelCode: "",
              pRelDesc: "",
              pReasonCode: "",
              pReasonDesc: "",
              pThumbmarkedBy: "",
            });
          }}
        >
          <FormControlLabel
            value="APRBYPATSIG"
            control={<Radio />}
            label="Patient Signature"
          />
          <FormControlLabel
            value="APRBYPATREPSIG"
            control={<Radio />}
            label="Representative Signature"
          />
          <FormControlLabel
            value="APRBYTHUMBMARK"
            control={<Radio />}
            label="Thumbmark"
          />
        </RadioGroup>
      </FormControl>

      {selectedOption === "APRBYPATSIG" && (
        <Box mt={2}>
          <TextField
            label="Date Signed"
            type="date"
            value={formData.pDateSigned}
            onChange={handleChange("pDateSigned")}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      )}

      {selectedOption === "APRBYPATREPSIG" && (
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date Signed"
                type="date"
                value={formData.pDateSigned}
                onChange={handleChange("pDateSigned")}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Relationship Code"
                value={formData.pRelCode}
                onChange={handleChange("pRelCode")}
                fullWidth
              >
                <MenuItem value="S">Spouse</MenuItem>
                <MenuItem value="C">Child</MenuItem>
                <MenuItem value="P">Parent</MenuItem>
                <MenuItem value="I">Sibling</MenuItem>
                <MenuItem value="O">Others</MenuItem>
              </TextField>
            </Grid>

            {formData.pRelCode === "O" && (
              <Grid item xs={12}>
                <TextField
                  label="Specify Relationship"
                  value={formData.pRelDesc}
                  onChange={handleChange("pRelDesc")}
                  fullWidth
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Reason for Signing"
                value={formData.pReasonCode}
                onChange={handleChange("pReasonCode")}
                fullWidth
              >
                <MenuItem value="I">Incapacitated</MenuItem>
                <MenuItem value="O">Other Reason</MenuItem>
              </TextField>
            </Grid>

            {formData.pReasonCode === "O" && (
              <Grid item xs={12}>
                <TextField
                  label="Specify Reason"
                  value={formData.pReasonDesc}
                  onChange={handleChange("pReasonDesc")}
                  fullWidth
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {selectedOption === "APRBYTHUMBMARK" && (
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel>Thumbmarked By</FormLabel>
            <RadioGroup
              row
              value={formData.pThumbmarkedBy}
              onChange={handleChange("pThumbmarkedBy")}
            >
              <FormControlLabel
                value="P"
                control={<Radio />}
                label="Patient/Member"
              />
              <FormControlLabel
                value="R"
                control={<Radio />}
                label="Representative"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
{/* 
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit
        </Button>
      </Box> */}
    </Box>
  );
});

export default APRForm;
