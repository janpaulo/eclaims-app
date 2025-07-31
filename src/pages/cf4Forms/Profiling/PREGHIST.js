import React from "react";
import { Typography, TextField, Box, Grid, MenuItem } from "@mui/material";

const PREGHIST = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      PREGHIST: {
        ...prev.PREGHIST,
        [name]: value,
      },
    }));
  };

  const data = formData.PREGHIST || {};

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Patient Pregnancy History (For Female Patient Only)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            name="pPregCnt"
            label="Pregnancy Count"
            fullWidth
            value={data.pPregCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pDeliveryCnt"
            label="Delivery Count"
            fullWidth
            value={data.pDeliveryCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pDeliveryTyp"
            label="Delivery Type"
            fullWidth
            value={data.pDeliveryTyp || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pFullTermCnt"
            label="Full Term Count"
            fullWidth
            value={data.pFullTermCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pPrematureCnt"
            label="Premature Count"
            fullWidth
            value={data.pPrematureCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pAbortionCnt"
            label="Abortion Count"
            fullWidth
            value={data.pAbortionCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pLivChildrenCnt"
            label="Living Children Count"
            fullWidth
            value={data.pLivChildrenCnt || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pWPregIndhyp"
            label="With Pregnancy Induced Hypertension"
            fullWidth
            value={data.pWPregIndhyp || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="pWFamPlan"
            label="With Family Planning"
            fullWidth
            value={data.pWFamPlan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Report Status"
            name="pReportStatus"
            value={data.pReportStatus || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="pDeficiencyRemarks"
            label="Deficiency Remarks"
            fullWidth
            multiline
            value={data.pDeficiencyRemarks || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PREGHIST;
