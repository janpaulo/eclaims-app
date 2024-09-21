import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";

import Divider from "@mui/material/Divider";


class professional extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    const {summaryOfFee} = this.props
    const {professionalInfo} = this.props
    return (
      <>
        <Divider>
          {" "}
          <Typography variant="h5" component="h5">
            {" "}
            PROFESSIONAL FEES{" "}
          </Typography>
        </Divider>
        <Box id="fullWidth">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>
                <b>Professional Info</b>
              </InputLabel>{" "}
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="PAN NO."
                fullWidth
                name="pPAN"
                size="small"
                value={professionalInfo.pPAN}
                onChange={this.props.handleDataChangeProf}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="First Name"
                fullWidth
                name="pFirstName"
                value={professionalInfo.pFirstName}
                size="small"
                onChange={this.props.handleDataChangeProf}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Middle Name"
                fullWidth
                name="pMiddleName"
                value={professionalInfo.pMiddleName}
                size="small"
                onChange={this.props.handleDataChangeProf}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Name"
                fullWidth
                name="pLastName"
                value={professionalInfo.pLastName}
                size="small"
                onChange={this.props.handleDataChangeProf}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Suffix Name"
                fullWidth
                name="pSuffixName"
                value={professionalInfo.pSuffixName}
                size="small"
                onChange={this.props.handleDataChangeProf}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>
                <b>Summary of Fees</b>
              </InputLabel>{" "}
            </Grid>

            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Senior Citizen Discount"
                fullWidth
                name="pSeniorCitizenDiscount"
                value={summaryOfFee.pSeniorCitizenDiscount}
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="PWD Discount"
                value={summaryOfFee.handleDataChangeProfSumary}
                fullWidth
                name="pPWDDiscount"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="PCSO"
                value={summaryOfFee.pPCSO}
                fullWidth
                name="pPCSO"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="DSWD"
                value={summaryOfFee.pDSWD}
                fullWidth
                name="pDSWD"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="outlined-multiline-flexible"
                label="DOH MAP"
                value={summaryOfFee.pDOHMAP}
                fullWidth
                name="pDOHMAP"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="outlined-multiline-flexible"
                label="HMO"
                value={summaryOfFee.pHMO}
                fullWidth
                name="pHMO"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Actual Charges"
                value={summaryOfFee.pActualCharges}
                fullWidth
                name="pActualCharges"
                size="small"
                onChange={this.props.handleDataChangeProfSumary}
              />
            </Grid>
            
        

            <Grid item xs={2}>
              <InputLabel>
                <b>PHILHEALTH</b>
              </InputLabel>{" "}
            </Grid>

            <Grid item xs={6}></Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-flexible"
                label="Total Case Rate Amount"
                fullWidth
                name="pTotalCaseRateAmount"
                size="small"
                onChange={this.props.handleDataChangeprofPhilHealth}
              />
            </Grid>
            <Grid item xs={2}>
              <InputLabel>
                <b>BALANCE</b>
              </InputLabel>{" "}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-flexible"
                label="Amount"
                fullWidth
                name="pAmount"
                size="small"
                onChange={this.props.handleDataChangeprofPhilHealth}
              />
            </Grid>
          </Grid>

          <br />
          
        </Box>
      </>
    );
  }
}

export default professional;
