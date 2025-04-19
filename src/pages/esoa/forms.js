
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";

import Professional from "./professional";
import ItemizzedBill from "./itemizzedBill";
import Itembills from "./Itembills";

const FeeInput = ({ label, value, onChange, name, xs = 2 }) => (
  <Grid item xs={xs}>
    <TextField
      id={`outlined-${name}`}
      label={label}
      value={value}
      fullWidth
      name={name}
      size="small"
      onChange={onChange}
      aria-label={label}
    />
  </Grid>
);

class Forms extends React.Component {
  render() {
    const {
      roomAndBoard,
      OtherFundSource,
      drugsAndMedicine,
      operatingRoomFees,
      laboratoryAndDiagnostic,
      medicalSupplies,
      handleInputChangePen,
      handleInputChangeOtherFundSource,
      handleInputChangedrugsAndMedicine,
      handleInputChangelaboratoryAndDiagnostic,
      handleInputChangeoperatingRoomFees,
      handleInputChangemedicalSupplies,
      handleDataChangeOrfPhilHealth,
      handleDataChangeprofPhilHealth,
      handleDataChangeProf,
      handleDataChangeProfSumary,
      professionalInfo,
      summaryOfFee,
      itembills,
      dataItem,
      handleDataChange,
      handleClick,
    } = this.props;

    return (
      <>
        <Box id="fullWidth">
          {/* Room and Board Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel>
                Philhealth Accreditation No. (PAN) of health Care Institution :
              </InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                fullWidth
                name="pHciPan"
                value={this.props.item.pHciPan}
                size="small"
                onChange={this.props.handleInputChangePen}
              />
            </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Room And Board
            </Typography>
            
            <Grid container spacing={2}>
              {[
                "Senior Citizen Discount",
                "PWD Discount",
                "PCSO",
                "DSWD",
                "DOH MAP",
                "HMO",
                "Actual Charges",
              ].map((label, index) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={roomAndBoard[`p${label.replace(/ /g, "")}`]}
                  onChange={this.props.onchange}
                  name={`p${label.replace(/ /g, "")}`}
                  xs={index === 6 ? 2 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* Other Fund Source Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Other Fundation Source
            </Typography>
            <Grid container spacing={2}>
              {["Description", "Amount"].map((label) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={OtherFundSource[`p${label}`]}
                  onChange={handleInputChangeOtherFundSource}
                  name={`p${label}`}
                  xs={label === "Description" ? 6 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* Drugs and Medicine Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Drugs And Medicine
            </Typography>
            <Grid container spacing={2}>
              {[
                "Senior Citizen Discount",
                "PWD Discount",
                "PCSO",
                "DSWD",
                "DOH MAP",
                "HMO",
                "Actual Charges",
              ].map((label, index) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={drugsAndMedicine[`p${label.replace(/ /g, "")}`]}
                  onChange={handleInputChangedrugsAndMedicine}
                  name={`p${label.replace(/ /g, "")}`}
                  xs={index === 6 ? 2 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* Laboratory and Diagnostic Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Laboratory And Diagnostic
            </Typography>
            <Grid container spacing={2}>
              {[
                "Senior Citizen Discount",
                "PWD Discount",
                "PCSO",
                "DSWD",
                "DOH MAP",
                "HMO",
                "Actual Charges",
              ].map((label, index) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={laboratoryAndDiagnostic[`p${label.replace(/ /g, "")}`]}
                  onChange={this.props.handleInputChangelaboratoryAndDiagnostic}
                  name={`p${label.replace(/ /g, "")}`}
                  xs={index === 6 ? 2 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* Operating Room Fees Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Operating Room Fees
            </Typography>
            <Grid container spacing={2}>
              {[
                "Senior Citizen Discount",
                "PWD Discount",
                "PCSO",
                "DSWD",
                "DOH MAP",
                "HMO",
                "Actual Charges",
              ].map((label, index) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={operatingRoomFees[`p${label.replace(/ /g, "")}`]}
                  onChange={this.props.handleInputChangeoperatingRoomFees}
                  name={`p${label.replace(/ /g, "")}`}
                  xs={index === 6 ? 2 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* Medical Supplies Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Medical Supplies
            </Typography>
            <Grid container spacing={2}>
              {[
                "Senior Citizen Discount",
                "PWD Discount",
                "PCSO",
                "DSWD",
                "DOH MAP",
                "HMO",
                "Actual Charges",
              ].map((label, index) => (
                <FeeInput
                  key={label}
                  label={label}
                  value={medicalSupplies[`p${label.replace(/ /g, "")}`]}
                  onChange={this.props.handleInputChangemedicalSupplies}
                  name={`p${label.replace(/ /g, "")}`}
                  xs={index === 6 ? 2 : 2}
                />
              ))}
            </Grid>
          </Paper>

          {/* PHILHEALTH Section */}
          <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              PHILHEALTH
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Total Case Rate Amount"
                  fullWidth
                  name="pTotalCaseRateAmount"
                  size="small"
                  onChange={handleDataChangeOrfPhilHealth}
                  aria-label="Total Case Rate Amount"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Amount"
                  fullWidth
                  name="pAmount"
                  size="small"
                  onChange={handleDataChangeOrfPhilHealth}
                  aria-label="Amount"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Additional Components */}
        <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
          <Professional
            handleDataChangeprofPhilHealth={handleDataChangeprofPhilHealth}
            handleDataChangeProf={handleDataChangeProf}
            handleDataChangeProfSumary={handleDataChangeProfSumary}
            professionalInfo={professionalInfo}
            summaryOfFee={summaryOfFee}
          />
        </Paper>

          <ItemizzedBill />

        <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={3}>
          <Itembills
            itembills={itembills}
            dataItem={dataItem}
            onDataChange={handleDataChange}
          />
        </Paper>
        {/* Submit Button */}
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
            onClick={handleClick}
          >
            Submit
          </Button>
        </Grid>
      </>
    );
  }
}

export default Forms;
