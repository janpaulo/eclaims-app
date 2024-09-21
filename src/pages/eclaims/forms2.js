import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";

// import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import InputBase from "@mui/material/InputBase";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

import Divider from "@mui/material/Divider";

// import Paper from "@mui/material/Paper";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Forms2Table from "./forms2Table";
import ProfessionalTables from "./ProfessionalTables";
import Certification from "./certification";
import DiagnosCode from "./DiagnosCode";
import URLUploader from "./URLUploader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

// import { styled } from "@mui/material/styles";
// import Stack from "@mui/material/Stack";

class forms2 extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      time: "",
    };
  }

  render() {
    const totaldDayAdmited = this.props.dateAdmitedCount;
    const startDayAdmit = this.props.startDayAdmited;
    const startMonthAdmit = this.props.startMonthAdmited;
    const startYearAdmit = this.props.startYearAdmited;
    // console.log(this.state.totaldDayAdmited);
    const { options } = this.props;
    const { selectedOption } = this.props;
    const { options2 } = this.props;
    const { selectedTypeOfAccomodation } = this.props;
    const { options3 } = this.props;
    const { pTBType } = this.props;

    const { handleCheckboxChangeHemodialysis } = this.props;
    const { handleCheckboxChangeBloodTransfusion } = this.props;
    const { handleCheckboxChangePeritoneal } = this.props;
    const { handleCheckboxChangeBrachytherapy } = this.props;
    const { handleCheckboxChangeRadiotherapyLINAC } = this.props;
    const { handleCheckboxChangeChemotherapy } = this.props;
    const { handleCheckboxChangeRadiotherapyCOBALT } = this.props;
    const { handleCheckboxChangeDebridement } = this.props;
    const { handleCheckboxChangeRadiotherapyIMRT } = this.props;
    const { selectedClaimsTypes } = this.props;

    // const { value } = this.state;
    // console.log(this.props.itemcf.pReferralIHCPAccreCode);
    console.log(this.props.patientDisposition);
    return (
      <>
        <Box id="fullWidth">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* First row */}
                <Grid item xs={4}>
                  <b>Claims Type</b>
                  {options.slice(0, 2).map((option) => (
                    <div key={option.value}>
                      <Checkbox
                        id={option.value}
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={() =>
                          this.props.handleCheckboxChange(option.value)
                        }
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}
                </Grid>
                {/* Second row */}
                <Grid item xs={4}>
                  <b>Claims Cases</b>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="confinementAbroad"
                          checked={selectedClaimsTypes.includes(
                            "confinementAbroad"
                          )}
                          onChange={() =>
                            this.props.handleClickCheckBoxClaimsType(
                              "confinementAbroad"
                            )
                          }
                        />
                      }
                      label="Confinement Abroad"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="emergencyCase"
                          checked={selectedClaimsTypes.includes(
                            "emergencyCase"
                          )}
                          onChange={() =>
                            this.props.handleClickCheckBoxClaimsType(
                              "emergencyCase"
                            )
                          }
                        />
                      }
                      label="Emergency Case"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="opdCase"
                          checked={selectedClaimsTypes.includes("opdCase")}
                          onChange={() =>
                            this.props.handleClickCheckBoxClaimsType("opdCase")
                          }
                        />
                      }
                      label="OPD Case"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="others"
                          checked={selectedClaimsTypes.includes("others")}
                          onChange={() =>
                            this.props.handleClickCheckBoxClaimsType("others")
                          }
                        />
                      }
                      label="Others"
                    />
                  </FormGroup>
                </Grid>
                {/* Third row */}
                <Grid item xs={4}>
                  <b>Tag if applicable</b>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="posAudit"
                          checked={selectedClaimsTypes.includes("posAudit")}
                          onChange={() =>
                            this.props.handleClickCheckBoxClaimsType("posAudit")
                          }
                        />
                      }
                      label="For Post Audit"
                      name=""
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <br />

          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Part I - Health Care Institution(HCI) Information{" "}
            </Typography>
          </Divider>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel>
                Philhealth Accreditation No. (PAN) of health Care Institution :
              </InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                fullWidth
                value={this.props.itemCf.pReferredIHCPAccreCode}
                name="pReferredIHCPAccreCode"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Name of health Care Institution</InputLabel>{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                fullWidth
                // value={this.props.itemCf.pReferredIHCPAccreCode}
                name="pHCIName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Address</InputLabel>{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                fullWidth
                // value={this.props.itemCf.pReferredIHCPAccreCode}
                name="pHCIAddress"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
          </Grid>
          <br />

          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Part II - Patient Confinement Information{" "}
            </Typography>
          </Divider>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <b>Confinement Period :</b>
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Date Admited"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.props.itemCf.pAdmissionDate}
                    name="pAdmissionDate"
                    size="small"
                    onChange={this.props.handleDate}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Time Admited"
                    value={this.props.itemCf.pAdmissionTime}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    name="pAdmissionTime"
                    size="small"
                    onChange={this.props.handleTimeChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Switch
                      name=""
                      // checked={value === 1}
                      // onChange={handleChecked}
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Admission time is not indicated
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Date Discharge"
                    // multiline
                    // maxRows={4}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="date"
                    value={this.props.itemCf.pDischargeDate}
                    name="pDischargeDate"
                    size="small"
                    onChange={this.props.handleDate}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Time Discharged"
                    value={this.props.itemCf.pDischargeTime}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    name="pDischargeTime"
                    size="small"
                    onChange={this.props.handleTimeChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Switch
                      name=""
                      // checked={value === 1}
                      // onChange={handleChecked}
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Discharge time is not indicated
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <b>Patient Disposition :</b>
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.improved}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon("improved")
                      }
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Improved
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.expired}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon("expired")
                      }
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Expired
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Date"
                    // multiline
                    // maxRows={4}
                    required={
                      this.props.patientDisposition === "E" ? true : false
                    }
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="pExpiredDate"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Time"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    required={
                      this.props.patientDisposition === "E" ? true : false
                    }
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    name="pExpiredTime"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </Grid>

                <Grid item xs={3}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      size="small"
                      // checked={checkboxState.improved}
                      // onChange={this.props.handleClickCheckBoxPatientCon}
                      // checked={value === 1}
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Expired time is not indicated
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.recovered}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon("recovered")
                      }
                      // checked={value === 1}
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Recovered
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={6}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.homeDischarged}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon(
                          "homeDischarged"
                        )
                      }
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Home/Discharged Againts Medical Advise
                  </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.abscorded}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon("abscorded")
                      }
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Abscorded
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <Typography>
                    <Switch
                      name=""
                      checked={this.props.patienCon.transfered}
                      onChange={() =>
                        this.props.handleClickCheckBoxPatientCon("transfered")
                      }
                      inputProps={{ "aria-label": "switch" }}
                    />
                    Transferred/Referred
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>

                {/* if  Transferred/Referred is True Display */}
                {this.props.patienCon.transfered ? (
                  <Grid item xs={12}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel>
                              <b>Refererral Health Care Institution</b>
                            </InputLabel>{" "}
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel>Accreditation Code:</InputLabel>
                            <TextField
                              id="outlined-multiline-flexible"
                              value={this.props.itemCf.pReferralIHCPAccreCode}
                              required={
                                this.props.patientDisposition === "T"
                                  ? true
                                  : false
                              }
                              fullWidth
                              name="pReferralIHCPAccreCode"
                              size="small"
                              onChange={this.props.onchange}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            {" "}
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel>
                              Name of health Care Institution
                            </InputLabel>{" "}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="outlined-multiline-flexible"
                              // value={this.props.itemCf.pReferralIHCPAccreCode}
                              fullWidth
                              name="pReferralAddress"
                              size="small"
                              onChange={this.props.onchange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel>Address</InputLabel>{" "}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="outlined-multiline-flexible"
                              // label="First Name"
                              // multiline
                              // maxRows={4}
                              fullWidth
                              // value={this.props.itemCf.pReferralReasons}
                              name="pReferralReasons"
                              size="small"
                              onChange={this.props.onchange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel>
                              Reason/s for referral/transfer
                            </InputLabel>{" "}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="outlined-multiline-flexible"
                              value={this.props.itemCf.pReferralReasons}
                              fullWidth
                              name="pReferralReasons"
                              size="small"
                              onChange={this.props.onchange}
                            />
                          </Grid>
                        </Grid>
                        <br />
                      </CardContent>
                      <CardActions>
                        {/* <Button size="small">Learn More</Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ) : (
                  ""
                )}

                <Grid item xs={12}>
                  {" "}
                  <Typography>
                    <b>Type of Accommodation :</b>
                  </Typography>
                  <br />
                </Grid>
                <Grid container spacing={2}>
                  {options2.map((option) => (
                    <Grid item xs={3} key={option.value}>
                      <Switch
                        id={option.value}
                        value={option.value}
                        checked={selectedTypeOfAccomodation === option.value}
                        onChange={() =>
                          this.props.handleCheckboxChangeAccomondation(
                            option.value
                          )
                        }
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <b>Patient Type :</b>
                  </Typography>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      {" "}
                      {/* Relationship to Member */}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="pPatientType"
                      value={this.props.claim.pPatientType}
                      onChange={this.props.handleInputChangeclaim}
                    >
                      {/* <FormControlLabel value="M" control={<Radio />} label="member" /> */}
                      <FormControlLabel
                        value="O"
                        control={<Radio />}
                        label="Outpatient"
                      />
                      <FormControlLabel
                        value="I"
                        control={<Radio />}
                        label="Inpatient"
                      />
                      {/* <FormControlLabel value="S" control={<Radio />} label="Spouse" /> */}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <b> Emergency Case :</b>
                  </Typography>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      {" "}
                      {/* Relationship to Member */}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="pIsEmergency"
                      value={this.props.claim.pIsEmergency}
                      onChange={this.props.handleInputChangeclaim}
                    >
                      {/* <FormControlLabel value="M" control={<Radio />} label="member" /> */}
                      <FormControlLabel
                        value="Y"
                        control={<Radio />}
                        label="YES"
                      />
                      <FormControlLabel
                        value="N"
                        control={<Radio />}
                        label="NO"
                      />
                      {/* <FormControlLabel value="S" control={<Radio />} label="Spouse" /> */}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={4}></Grid>
              </Grid>
            </Grid>
          </Grid>

          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Diagnosis{" "}
            </Typography>
          </Divider>
          <br />
          <Grid container spacing={2}>
            <Typography>
              <b>Admission Diagnosis/es :</b>
            </Typography>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label=""
                name="pAdmissionDiagnosis"
                multiline
                fullWidth
                rows={5}
              />
            </Grid>
          </Grid>

          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Discharge Diagnosis{" "}
            </Typography>
          </Divider>
          <br />

          {/* //DiagnosCode component */}
          <DiagnosCode
            itemCodes={""}
            diagnosCodeData={this.props.diagnosCodeData}
            onDataChange={this.props.handleDataChange}
          />

          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Special Considarations{" "}
            </Typography>
          </Divider>
          <br />
          <Grid container spacing={2}>
            <Typography>
              <b>
                a. For the following repetitive procedures, check box that
                applies and emunerate the procedure/session dates{" "}
              </b>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    name="specialCon"
                    checked={this.props.isSpecialCon}
                    onClick={(e) => this.props.handleClickCheckBox(e)}
                  />
                }
                label="Check all if applicable"
              /> */}
            </Typography>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isHemodialysis"
                  checked={this.props.specialConsideration.isHemodialysis}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Hemodialysis
              </Typography>
              {this.props.specialConsideration.isHemodialysis &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesHemodialysis.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeHemodialysis(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isBloodTrans"
                  checked={this.props.specialConsideration.isBloodTrans}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Blood Transfusion
              </Typography>
              {this.props.specialConsideration.isBloodTrans &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesBloodTransfusion.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeBloodTransfusion(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isPentoneal"
                  checked={this.props.specialConsideration.isPentoneal}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Peritoneal
              </Typography>
              {this.props.specialConsideration.isPentoneal &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesPeritoneal.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangePeritoneal(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isBracy"
                  checked={this.props.specialConsideration.isBracy}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Brachytherapy
              </Typography>
              {this.props.specialConsideration.isBracy &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesBrachytherapy.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeBrachytherapy(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isRadioLinac"
                  checked={this.props.specialConsideration.isRadioLinac}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Radiotherapy (LINAC)
              </Typography>
              {this.props.specialConsideration.isRadioLinac &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesRadiotherapyLINAC.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeRadiotherapyLINAC(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isChemotherapy"
                  checked={this.props.specialConsideration.isChemotherapy}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Chemotherapy
              </Typography>
              {this.props.specialConsideration.isChemotherapy &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesChemotherapy.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeChemotherapy(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isRadioCobalt"
                  checked={this.props.specialConsideration.isRadioCobalt}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Radiotherapy (COBALT)
              </Typography>
              {this.props.specialConsideration.isRadioCobalt &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesRadiotherapyCOBALT.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeRadiotherapyCOBALT(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isSimpleDeb"
                  checked={this.props.specialConsideration.isSimpleDeb}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Simple Debridement
              </Typography>
              {this.props.specialConsideration.isSimpleDeb &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesDebridement.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeDebridement(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name="isRadioIMRT"
                  checked={this.props.specialConsideration.isRadioIMRT}
                  onClick={(e) =>
                    this.props.handleClickCheckBoxSpeConsideration(e)
                  }
                  inputProps={{ "aria-label": "switch" }}
                />
                Radiotherapy (IMRT)
              </Typography>
              {this.props.specialConsideration.isRadioIMRT &&
                totaldDayAdmited !== undefined && (
                  <>
                    <b>Please Check if Session Date is Applicable :</b> <br />
                    {Array.from({ length: totaldDayAdmited }, (value, key) => {
                      const date = `${startMonthAdmit}/${
                        startDayAdmit + key
                      }/${startYearAdmit}`;
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={date}
                              checked={this.props.checkedDatesRadiotherapyIMRT.includes(
                                date
                              )}
                              onClick={(e) =>
                                handleCheckboxChangeRadiotherapyIMRT(e, date)
                              }
                            />
                          }
                          label={date}
                        />
                      );
                    })}
                  </>
                )}
            </Grid>
          </Grid>
          <br />
          <Typography>
            <b>b. For Z-Benefits Package </b>
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  // checked={this.props.isSpecialCon}
                  // onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check all if applicable"
            /> */}
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Z-Benefits Package Group:"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Z-Benefits Package Code:"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>

            {/* comment Pre-Authorization Type: */}
            {/* <Grid item xs={3}>
              <Typography>
                Pre-Authorization Type:
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      name="specialCon"
                      // checked={this.props.isSpecialCon}
                      // onClick={(e) => this.props.handleClickCheckBox(e)}
                    />
                  }
                  label="Check all if applicable"
                /> */}
            {/* </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Manual
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Electronic
              </Typography>
            </Grid> */}
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Pre-Authorization Date:"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Pre-Authorizztion Number"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="For Additional Data"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
          </Grid>
          <br />
          <Typography>
            <b>
              c. For MCP Package, emunerate four dates of pre-natal check-ups{" "}
            </b>
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  checked={this.props.isSpecialCon}
                  onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check all if applicable"
            /> */}
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="1 :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                name="pCheckUpDate1"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="2 :"
                type="date"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pCheckUpDate2"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="3 :"
                type="date"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pCheckUpDate3"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="4 :"
                type="date"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pCheckUpDate4"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                With O.R. Attached?
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Yes
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-multiline-flexible"
                label="O.R. Amount"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Menstrual Period :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <br />
          <Typography>
            <b>d. For TB DOTS PAckage :</b>
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  // checked={this.props.isSpecialCon}
                  // onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check if applicable"
            /> */}
          </Typography>
          <br />

          <Grid container spacing={2}>
            {options3.map((option) => (
              <Grid item xs={4} key={option.value}>
                <Switch
                  id={option.value}
                  value={option.value}
                  checked={pTBType === option.value}
                  onChange={() =>
                    this.props.handleCheckboxChangeTBtype(option.value)
                  }
                />
                <label htmlFor={option.value}>{option.label}</label>
              </Grid>
            ))}
          </Grid>

          <br />
          <Typography>
            <b>
              e. For Animal Bite Package, Write the dates(mm-dd-yyyy) when the
              following doses of vacine was given:
              <br />
              Remiders: Anti Rabies Vaccine (ARV), Rabies Immunoglobulin (RIG){" "}
            </b>
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  // checked={this.props.isSpecialCon}
                  // onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check all if applicable"
            /> */}
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Day 0  ARV"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                name="pDay0ARV"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Day 3  ARV"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                name="pDay3ARV"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Day 7  ARV"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pDay7ARV"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                id="outlined-multiline-flexible"
                label="RIG"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pRIG"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Others"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pABPOthers"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Specify"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pABPSpecify"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
          </Grid>
          <br />
          <Typography>
            <b>f. Newborn Care Package </b>
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  // checked={this.props.isSpecialCon}
                  // onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check all if applicable"
            /> */}
          </Typography>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              {" "}
              <Typography>
                {/* <Switch
                  name="pEssentialNewbornCare"
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                /> */}
                Essential Newborn Care
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="pEssentialNewbornCare"
                  // value={this.props.itemCf.pPatientIs}
                  onChange={this.props.onchange}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="YES" />
                  <FormControlLabel value="N" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Typography>
                {/* <Switch
                  name="pNewbornHearingScreeningTest"
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                /> */}
                Newborn Screening Test
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="pNewbornScreeningTest"
                  // value={this.props.itemCf.pPatientIs}
                  onChange={this.props.onchange}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="YES" />
                  <FormControlLabel value="N" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Typography>
                {/* <Switch
                  name="pNewbornHearingScreeningTestResult"
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                /> */}
                Newborn Hearing Screening Test
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="pNewbornHearingScreeningTest"
                  // value={this.props.itemCf.pPatientIs}
                  onChange={this.props.onchange}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="YES" />
                  <FormControlLabel value="N" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <Typography>
                <b>For Essential Care</b>(Check Applicable boxes)
                {/* <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Check all */}
              </Typography>
            </Grid>
            {/* <Grid item xs={4}>
              {" "}
              <Typography>
                With O.R Attached?
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Yes
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Typography>
                With O.R Attached?
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Yes
              </Typography>
            </Grid> */}

            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pDrying"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pDrying === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Immediate drying of newborn, etc."
                    name="pDrying"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pSkinToSkin"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pSkinToSkin === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Early skin-to-skin contact"
                    name="pSkinToSkin"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pCordClamping"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pCordClamping === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Timely card clamping"
                    name="pCordClamping"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pProphylaxis"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pProphylaxis === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Eye prophylaxis"
                    name="pProphylaxis"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pWeighing"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pWeighing === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Weighing of the newborn"
                    name="pWeighing"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pVitaminK"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pVitaminK === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Vitamin of the newborn"
                    name="pVitaminK"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pBCG"
                        value="Y"
                        checked={this.props.essentialNewbornCare.pBCG === "Y"}
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="BCG vaccination"
                    name="pBCG"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pNonSeparation"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pNonSeparation === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Non-separation of mother/baby for early breastfeeding initiation"
                    name="pNonSeparation"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pHepatitisB"
                        value="Y"
                        checked={
                          this.props.essentialNewbornCare.pHepatitisB === "Y"
                        }
                        onChange={(e) =>
                          this.props.handleCheckboxChangeNewBorn(e)
                        }
                      />
                    }
                    label="Hepatitis B vaccination"
                    name="pHepatitisB"
                  />
                </Grid>
                {/* </FormGroup> */}
              </Grid>
            </Grid>

            {/* <Grid item xs={4}>
              <TextField
                id="outlined-multiline-flexible"
                label="Filter Card No."
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pFilterCardNo"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                With O.R Attached?
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Yes
              </Typography>
            </Grid> */}
          </Grid>
          <br />
          {/* <Typography>
            <b>g.Outpatient HIV/AIDS Treatment Package </b>
            <FormControlLabel
              control={
                <Checkbox
                  name="specialCon"
                  // checked={this.props.isSpecialCon}
                  // onClick={(e) => this.props.handleClickCheckBox(e)}
                />
              }
              label="Check all if applicable"
            />
          </Typography>
          <br /> */}

          {/* <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Laboratory Number"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pLaboratoryNumber"
                size="small"
                onChange={this.props.onchange}
              />{" "}
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Laboratory number is not indicated
              </Typography>
            </Grid>
          </Grid> */}

          {/* <br />
          <Typography>
            <b>
              Other Cases :<br /> h.For NSD Package emunerate four dates of
              pre-natal check-ups{" "}
            </b>
          </Typography>
          <br /> */}

          {/* <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="1 :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="2 :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="3 :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="4 :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                With O.R. Attached?
                <Switch
                  name=""
                  // checked={value === 1}
                  // onChange={handleChecked}
                  inputProps={{ "aria-label": "switch" }}
                />
                Yes
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-multiline-flexible"
                label="O.R. Amount"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                // type="time"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Menstrual Period :"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid> */}

          {/* <br />
          <Typography>
            <b>i. For Contact Package </b>
           
          </Typography>
          <br /> */}

          {/* <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Contract Pre-authorization Number"
                // multiline
                // maxRows={4}
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="pMemberMiddleName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      For intraocular Lens Stickers
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        <Switch
                          name=""
                          // checked={value === 1}
                          // onChange={handleChecked}
                          inputProps={{ "aria-label": "switch" }}
                        />
                        Present
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <Switch
                          name=""
                          // checked={value === 1}
                          // onChange={handleChecked}
                          inputProps={{ "aria-label": "switch" }}
                        />
                        Absent
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>(For left Eye) Sticker Number :</InputLabel>
                      <TextField
                        id="outlined-multiline-flexible"
                        // label="Multiline"
                        // multiline
                        // maxRows={4}
                        fullWidth
                        name="pMemberPIN"
                        size="small"
                        onChange={this.props.onchange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Date of Expiration :</InputLabel>
                      <TextField
                        id="outlined-multiline-flexible"
                        // label="Multiline"
                        // multiline
                        // maxRows={4}
                        fullWidth
                        name="pMemberPIN"
                        type="date"
                        size="small"
                        onChange={this.props.onchange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>(For Right Eye) Sticker Number :</InputLabel>
                      <TextField
                        id="outlined-multiline-flexible"
                        // label="Multiline"
                        // multiline
                        // maxRows={4}
                        fullWidth
                        name="pMemberPIN"
                        size="small"
                        onChange={this.props.onchange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Date of Expiration :</InputLabel>
                      <TextField
                        id="outlined-multiline-flexible"
                        // label="Multiline"
                        // multiline
                        // maxRows={4}
                        fullWidth
                        name="pMemberPIN"
                        type="date"
                        size="small"
                        onChange={this.props.onchange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>
          </Grid> */}
          {/* <br /> */}
          {/* <Typography>
            <b>j. For Medical Detoxification Package </b>
          </Typography>
          <br /> */}

          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Checklist of Mandatory and other Services for Medical Detoxification Package"
                  name=""
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Detoxification Treatment Plan"
                  name=""
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Photocopy of Completely Accomplished Satisfaction Questionaire"
                  name=""
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Checklist of Requirement for Reimbursement of Medical Detoxification Package"
                  name=""
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Checklist of Co-Morbidity Form(if with co-morbidity only)"
                  name=""
                />
              </FormGroup>
            </Grid>
          </Grid> */}



          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Philhealth Benefits{" "}
            </Typography>
          </Divider>

          {/* This line of code is inside in table */}
          <Forms2Table 
            diagnosCodeData={this.props.diagnosCodeData}
          />

          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Professional Fees / Charges{" "}
            </Typography>
          </Divider>

          {/* This line of code is inside in table ProfessionalTables*/}
          <ProfessionalTables />

          <br />
          <Divider>
            {" "}
            <Typography variant="h5" component="h5">
              {" "}
              Certification of Consumption of Benifits and Consent to Access
              Patient Record{" "}
            </Typography>
          </Divider>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                With Attached Statement of Account (SOA)
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

          <Certification />

          <URLUploader />

          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              fullWidth
              onClick={() => this.props.handleClick()}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </>
    );
  }
}

export default forms2;
