import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

// import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

// import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import Divider from "@mui/material/Divider";

class certification extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              A. CERTIFICATION OF CONSUMPTION OF BENEFITS{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox 
                        value={"Y"}
                        name="pEnoughBenefits"
                      />}
                      //   label={`${""} ${<br/>} (${"PhilHealth Benefits is enough to cover HCI and FF charges."})`}
                      label={
                        <>
                          <div>
                            PhilHealth Benefits is enough to cover HCI and FF
                            charges.
                          </div>
                          <div>
                            No purchase of Drug/Medicines, supplies, Diagnostics
                            and co-pay for Professional fees by the
                            member/patient
                          </div>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        // className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                              TOTAL ACTUAL CHARGES
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="">
                              <b>Total Health Care Institution Fees</b>
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalHCIFees"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="">
                              <b>Total Professional Fees</b>
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalProfFees"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="">
                              <b>Grand Total</b>
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pGrandTotal"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox 
                        value={"N"}
                        name="pEnoughBenefits"
                        />}
                      label={
                        <>
                          <div>
                            the benefits of the member/patient was completely
                            consumed prior to co-pay OR the benefits of the
                            member/patient is not completely consumed BUT with
                            purchases/expenses for drugs/medicine, supplies,
                            diagnostics and others.
                          </div>
                          <div>a. The total co-pay for the following are:</div>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        // className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                              TOTAL ACTUAL CHARGES
                            </TableCell>
                            <TableCell align="center">
                              Amount after applications of Sicount(i.e.,
                              personal discount, Senior Citizen/PWD)
                            </TableCell>
                            <TableCell align="center">
                              PhilHealt Benefits
                            </TableCell>
                            <TableCell align="center">
                              Amount after PhilHealth Deduction
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="">
                              <b>Total Health Care Institution Fees</b>
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalActualCharges"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pDiscount"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pPhilhealthBenefit"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalAmount "
                                size="small"
                                onChange={this.props.onchange}
                              />

                              {"Paid by (Check all that applies)"}
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox 
                                    name="pMemberPatient"/>}
                                    label="Member/ patient "
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox 
                                    name="pHMO"
                                    />}
                                    label="HMO"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox
                                      value={"Y"}
                                      name="pOthers" />}
                                    label="Others(i.e., PCSO, Priomissory note, etc)"
                                  />
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="">
                              <b>
                                Total Professional Fees(For accredited and
                                non-accredited professionals)
                              </b>
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalActualCharges"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pDiscount"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pPhilhealthBenefit"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {""}
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pTotalAmount"
                                size="small"
                                onChange={this.props.onchange}
                              />
                              {"Paid by (Check all that applies)"}
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox
                                      name="pMemberPatient" />}
                                    label="Member/ patient "
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox
                                      name="pHMO"
                                      />}
                                    label="HMO"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  {" "}
                                  <FormControlLabel
                                    control={<Checkbox
                                      value={"Y"}
                                      name="pOthers " />}
                                    label="Others(i.e., PCSO, Priomissory note, etc)"
                                  />
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        // className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="" colSpan={4}>
                              b. Purchase/Expenses NOT included in the Health
                              Care Institution Charges
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="">
                              <b>
                                Total cost of purchase/s for drugs/medicines
                                and/or medical supplies bought by the<br/>
                                patient/member within/outside the HCI during
                                confinement
                              </b>
                            </TableCell>
                            <TableCell align="">
                              {" "}
                            
                            </TableCell>
                            <TableCell align="">
                              <FormControlLabel
                                control={<Checkbox 
                                  name="pDrugsMedicinesSupplies"/>}
                                label="YES ?"
                              />
                            </TableCell>
                            <TableCell align="">
                              {" "}
                              <Typography>
                              Total Amount
                              </Typography>
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pDMSTotalAmount"
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="">
                              <b>
                                Total cost of diagnostic/laboratory examinations
                                paid for by the patient/member done<br/>
                                within/outside the HCI during confinement
                              </b>
                            </TableCell>
                            <TableCell align="">
                              {" "}
                            </TableCell>
                            <TableCell align="">
                              <FormControlLabel
                                control={<Checkbox 
                                  name="pExaminations"/>}
                                label="YES ?"
                              />
                            </TableCell>
                            <TableCell align="">
                              {" "}
                              <Typography>
                              Total Amount
                              </Typography>
                              <TextField
                                id="outlined-multiline-flexible"
                                // label="Multiline"
                                // multiline
                                // maxRows={4}
                                fullWidth
                                name="pExamTotalAmount "
                                size="small"
                                onChange={this.props.onchange}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          </Grid>



{/* babalikan ko bukas */}
          <Grid item xs={12}>
            <Typography>B. CONSENT TO ACCESS PATIENT RECORD/</Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography>
              <b>With signiture of the patient?</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              YES?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                label="Date Signed"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberPIN"
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>With signature of the Authorized representative? </b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              YES?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                label="Date Signed"
                // multiline
                // maxRows={4}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                name="pMemberPIN"
                size="small"
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>Relationship of the Representative of the patient </b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              YES?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                label="Specify"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberPIN"
                size="small"
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>Reason for Signing on Behalf of the Patient </b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              Patient is Incapacitated
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              Other Reasons
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                // label="Date Signed"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberPIN"
                size="small"
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>With thumbmark of the patient/representative </b>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              YES?
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Divider>
          {" "}
          <Typography variant="h5" component="h5">
            {" "}
            CERTIFICATION OF HEALTH CARE INSTITUTION{" "}
          </Typography>
        </Divider>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>
              <b> With signature of the authorized HCI representative? </b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Switch
                name=""
                // checked={value === 1}
                // onChange={handleChecked}
                inputProps={{ "aria-label": "switch" }}
              />
              YES?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                label="Date Signed"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberPIN"
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>Official Capacity/Designation</b>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                // label="Date Signed"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberPIN"
                size="small"
                // type="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.props.onchange}
              />
            </Typography>
          </Grid>
        </Grid>
        <br/>
      </>
    );
  }
}

export default certification;
