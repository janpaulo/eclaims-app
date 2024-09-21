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

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

import Divider from "@mui/material/Divider";

// import Paper from "@mui/material/Paper";

// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import moment from "moment";
import EmployerValidation from "./employerValidation";
// import Autocomplete from './Autocomplete';

// import { styled } from "@mui/material/styles";
// import Stack from "@mui/material/Stack";

class forms extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    const { searchText } = this.props;
    const { employerData } = this.props;
    const { selectedOption } = this.props;
    const { selectedObject } = this.props;

    return (
      <>
        <Divider>
          {" "}
          <Typography variant="h5" component="h5">
            {" "}
            Personal Information{" "}
          </Typography>
        </Divider>
        <Box id="fullWidth">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <InputLabel>
                Philhealth Identification No. (PIN) Member :
              </InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                value={
                  this.props.memberDataPin === null
                    ? this.props.itemCf.pMemberPIN
                    : (this.props.itemCf.pMemberPIN = this.props.memberDataPin)
                }
                fullWidth
                name="pMemberPIN"
                size="small"
                onChange={this.props.onchange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Name of Member</InputLabel>{" "}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Name"
                fullWidth
                value={
                  searchText.lastname === undefined
                    ? this.props.itemCf.pMemberLastName
                    : (this.props.itemCf.pMemberLastName = searchText.lastname)
                }
                name="pMemberLastName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="First Name"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberFirstName"
                value={
                  searchText.firstname === undefined
                    ? this.props.itemCf.pMemberFirstName
                    : (this.props.itemCf.pMemberFirstName =
                        searchText.firstname)
                }
                // value={this.props.itemCf.pMemberFirstName}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Extension Name"
                fullWidth
                size="small"
                name="pMemberSuffix"
                value={
                  searchText.suffix === undefined
                    ? this.props.itemCf.pMemberSuffix
                    : (this.props.itemCf.pMemberSuffix = searchText.suffix)
                }
                // value={this.props.itemCf.pMemberSuffix}
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Middle Name"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberMiddleName"
                value={
                  searchText.middlename === undefined
                    ? this.props.itemCf.pMemberMiddleName
                    : (this.props.itemCf.pMemberMiddleName =
                        searchText.middlename)
                }
                // value={this.props.itemCf.pMemberMiddleName}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Date of Birth"
                // multiline
                // maxRows={4}
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                fullWidth
                value={
                  searchText.bday === undefined
                    ? this.props.itemCf.pMemberBirthDate
                    : (this.props.itemCf.pMemberBirthDate = moment(
                        new Date(searchText.bday)
                      ).format("YYYY-MM-DD"))
                }
                name="pMemberBirthDate"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <InputLabel>Member Category</InputLabel> */}
              <FormControl fullWidth>
                <InputLabel id="membershipType-label">
                  Select Membership Type
                </InputLabel>
                <Select
                  labelId="membershipType-label"
                  id="pMemberShipType"
                  name="pMemberShipType"
                  size="small"
                  value={this.props.itemCf.pMemberShipType}
                  onChange={this.props.handleSelectChangeMember}
                  label="Select Membership Type"
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="S">Employed Private</MenuItem>
                  <MenuItem value="G">Employer Government</MenuItem>
                  <MenuItem value="I">Indigent</MenuItem>
                  <MenuItem value="NS">Individually Paying</MenuItem>
                  <MenuItem value="NO">OFW</MenuItem>
                  <MenuItem value="PS">Non Paying Private</MenuItem>
                  <MenuItem value="PG">Non Paying Government</MenuItem>
                  <MenuItem value="P">Lifetime member</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                id="outlined-multiline-flexible"
                // label="Middle Name"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMemberShipType"
                value={this.props.itemCf.pMemberShipType}
                size="small"
                onChange={this.props.onchange}

              /> */}
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="outlined-multiline-flexible"
                label="Mailing Address"
                // multiline
                // maxRows={4}
                fullWidth
                name="pMailingAddress"
                value={this.props.itemCf.pMailingAddress}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>{" "}
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Zip Code"
                // multiline
                // maxRows={4}
                fullWidth
                name="pZipCode"
                value={this.props.itemCf.pZipCode}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>{" "}
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Gender"
                  size="small"
                  value={this.props.itemCf.pMemberSex}
                  name="pMemberSex"
                  onChange={this.props.onchange}
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Contact Information</InputLabel>{" "}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Landline No."
                // multiline
                // maxRows={4}
                fullWidth
                name="pLandlineNo"
                value={this.props.itemCf.pLandlineNo}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Mobile No."
                // multiline
                // maxRows={4}
                fullWidth
                name="pMobileNo"
                value={this.props.itemCf.pMobileNo}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Email Address"
                // multiline
                // maxRows={4}
                fullWidth
                name="pEmailAddress"
                value={this.props.itemCf.pEmailAddress}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
          </Grid>

          <br />
          <Divider>
            {" "}
            <Typography variant="h6" component="h6">
              {" "}
              Patient Information{" "}
            </Typography>
            (To be filled-out only if the patient is a dependent)
          </Divider>

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Grid item xs={8}>
              <InputLabel>
                Philhealth Identification No. (PIN) of Dependent :
              </InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                value={this.props.itemCf.pPatientPIN}
                fullWidth
                name="pPatientPIN"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Name of the Patient</InputLabel>{" "}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Last Name"
                fullWidth
                value={this.props.itemCf.pPatientLastName}
                name="pPatientLastName"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-flexible"
                label="First Name"
                fullWidth
                name="pPatientFirstName"
                value={this.props.itemCf.pPatientFirstName}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Extension Name"
                fullWidth
                size="small"
                name="pPatientSuffix"
                value={this.props.itemCf.pPatientSuffix}
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label="Middle Name"
                fullWidth
                name="pPatientMiddleName"
                value={this.props.itemCf.pPatientMiddleName}
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-multiline-flexible"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                fullWidth
                value={this.props.itemCf.pPatientBirthDate}
                name="pPatientBirthDate"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {" "}
                  Relationship to Member
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="pPatientIs"
                  value={this.props.itemCf.pPatientIs}
                  onChange={this.props.onchange}
                >
                  {/* <FormControlLabel value="M" control={<Radio />} label="member" /> */}
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label="Child"
                  />
                  <FormControlLabel
                    value="P"
                    control={<Radio />}
                    label="Parent"
                  />
                  <FormControlLabel
                    value="S"
                    control={<Radio />}
                    label="Spouse"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Gender"
                  size="small"
                  value={this.props.itemCf.pPatientSex}
                  name="pPatientSex"
                  onChange={this.props.onchange}
                  // onChange={handleChange}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Divider>
            {" "}
            <Typography variant="h6" component="h6">
              {" "}
              Member Certification{" "}
            </Typography>
          </Divider>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              - With signature of member?{" "}
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                {/* <FormControlLabel label="YES" labelPlacement="start"/> */}
                <FormControlLabel control={<Switch />} label="YES ?" />
                {/* <FormControlLabel label="NO" labelPlacement="end"/> */}
              </FormGroup>
            </Grid>

            <Grid item xs={3}>
              Date Signed
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                // multiline
                // maxRows={4}
                type="date"
                fullWidth
                value={this.props.itemCf.pEmailAddress}
                name="pEmailAddress"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              - With signature of member's representative?{" "}
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                {/* <FormControlLabel label="YES" labelPlacement="start"/> */}
                <FormControlLabel control={<Switch />} label="YES ?" />
                {/* <FormControlLabel label="NO" labelPlacement="end"/> */}
              </FormGroup>
            </Grid>

            <Grid item xs={3}>
              Date Signed
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                // multiline
                // maxRows={4}
                fullWidth
                type="date"
                value={this.props.itemCf.pEmailAddress}
                name="pEmailAddress"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              - Relationship of the Representative of the Member?{" "}
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                {/* <FormControlLabel label="YES" labelPlacement="start"/> */}
                <FormControlLabel control={<Switch />} label="YES ?" />
                {/* <FormControlLabel label="NO" labelPlacement="end"/> */}
              </FormGroup>
            </Grid>

            <Grid item xs={3}>
              Date Signed
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                // multiline
                // maxRows={4}
                fullWidth
                type="date"
                name="pEmailAddress"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              - Reason for Signing on Behalf of the member{" "}
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                {/* <FormControlLabel label="YES" labelPlacement="start"/> */}
                <FormControlLabel
                  control={<Switch />}
                  label="Member is Incapacitated"
                />
                {/* <FormControlLabel label="NO" labelPlacement="end"/> */}
              </FormGroup>
            </Grid>

            <Grid item xs={3}>
              Other Reason
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                // multiline
                // maxRows={4}
                fullWidth
                name="pEmailAddress"
                size="small"
                onChange={this.props.onchange}
              />
            </Grid>
            <Grid item xs={3}>
              - With thumbmark of the Member/representative?{" "}
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                {/* <FormControlLabel label="YES" labelPlacement="start"/> */}
                <FormControlLabel control={<Switch />} label="YES ?" />
                {/* <FormControlLabel label="NO" labelPlacement="end"/> */}
              </FormGroup>
            </Grid>
          </Grid>
          <br />
          <Divider>
            {" "}
            <Typography variant="h6" component="h6">
              {" "}
              Employer's Certification
            </Typography>
          </Divider>

          <EmployerValidation
            searchEmployer={this.props.searchEmployer}
            updateEmployerData={this.props.updateEmployerData}
          />

          {this.props.employerData ? (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {/* <InputLabel>PhilHealth Employer No.(PEN)</InputLabel> */}
                {/* <TextField
                  id="outlined-multiline-flexible"
                  // value={selectedOption != null ? selectedOption = this.props.itemCf.pPEN: this.props.itemCf.pPEN}
                  hidden
                  fullWidth
                  name="pPEN"
                  size="small"
                  // onChange={this.props.onchange}
                /> */}

              <input
                      name="pPEN"
                      type="text"
                      hidden
                      value={selectedOption != null ? this.props.itemCf.pPEN = selectedOption : this.props.itemCf.pPEN}
                      // onChange={this.handleChange}
                    />

                <FormControl fullWidth>
                  <InputLabel>Select Option</InputLabel>
                  <Select
                    value={selectedOption}
                    onChange={this.props.handleChangeSelectEmp}
                    label="Select Option"
                    size="small"
                  >
                    {employerData !== null && employerData.length > 0 ? (
                      employerData.map((option, index) => (
                        <MenuItem key={index} value={option.epmlist.pPEN}>
                          {option.epmlist.pPEN} - {option.epmlist.pEmployerName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No options available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {" "}
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Name of Employer</InputLabel>{" "}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Name"
                  // multiline
                  // maxRows={4}
                  fullWidth
                  value={selectedObject !== null ? this.props.itemCf.pEmployerName = selectedObject.epmlist.pEmployerName:this.props.itemCf.pEmployerName }
                  name="pEmployerName"
                  size="small"
                  onChange={this.props.onchange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  // multiline
                  // maxRows={4}
                  fullWidth
                  name="pAddress"
                  // value={this.props.itemCf.pAddress}
                  value={selectedObject !== null ? this.props.itemCf.pAddress = selectedObject.epmlist.pEmployerAddress : this.props.itemCf.pEmployerName }
                  size="small"
                  onChange={this.props.onchange}
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}

          <br />
          {/* <Divider>
            {" "}
            <Typography variant="h6" component="h6">
              {" "}
              Health care institution, Confinement and other Information{" "}
            </Typography>
          </Divider>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <InputLabel>
                Philhealth Identification No. (PIN) Member :
              </InputLabel>
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
            <Grid item xs={4}>
              {" "}
            </Grid>
            <Grid item xs={8}>
              <InputLabel>FullName :</InputLabel>
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
            <Grid item xs={4}>
              {" "}
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Address :</InputLabel>
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
            <Grid item xs={4}>
              <InputLabel>Category :</InputLabel>
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
            <Grid item xs={4}>
              <InputLabel>Classification :</InputLabel>
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
            <Grid item xs={4}>
              <InputLabel>Accreditation Period :</InputLabel>
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
          <br /> */}
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel>Admission Date :</InputLabel>
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
                      <InputLabel>Discharge Date :</InputLabel>
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
                      <InputLabel>Recieve Date :</InputLabel>
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
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography>
                            Refiled?
                            <Switch
                              name=""
                              // checked={value === 1}
                              // onChange={handleChecked}
                              inputProps={{ "aria-label": "switch" }}
                            />
                            Yes
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
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
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography>Remarks </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Direct Filed"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Refer to Membership"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Refer to legal"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Refer Accreditation"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Pending Due to Policy Issues "
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Pending Due to System issues"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Refer to collection"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Learn More</Button> */}
          {/* </CardActions>
              </Card>
            </Grid> */}
          {/* </Grid> */}

          <br />
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

export default forms;
