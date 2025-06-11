// export default AutocompleteComponent;
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
// import { parseString } from "xml2js";
// import Xml2js from "xml2js";
import { Button } from "@mui/material";
import moment from "moment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class memberValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      selectedOptions: [], // Track selected options
      searchText: this.props.searchText,
    };
  }

  handleSubmit = () => {
    const item = this.state.searchText;
    item.birthdate = moment(new Date(item.birthdate)).format("MM-DD-YYYY")
    // item.pUserName = process.env.REACT_APP_USERNAME;
    // item.pUserPassword = "";
    // item.pHospitalCode = process.env.REACT_APP_HOSPITALCODE;

      this.props.updateDataItem({}, true, item);

    // axios({
    //   method: "POST",
    //   url: process.env.REACT_APP_NEW_PHIC_URL+'/GetMemberPIN',
    //   // url:  process.env.REACT_APP_API_CLAIMS+"soapPhic/memberSearch",
    //   data: (item),  
    //   headers: { 
    //     'accreno': process.env.REACT_APP_HOSPITALACRRENO, 
    //     'softwarecertid': process.env.REACT_APP_USERNAME, 
    //     'Content-Type': 'text/plain'
    //   },
    // }).then(resp => {
    //   this.props.updateDataItem(resp.data, true, item);
    // }).catch(response =>{
    //   this.props.updateDataItem(response.response.data, false, item);
    // })

  };

  handleInputChange(e) {
    this.setState({
      searchText: {
        ...this.state.searchText,
        [e.target.name]: e.target.value,
      },
    });
  }

  render() {
    const { searchText } = this.state;
    return (
      <div>

      <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <h5>Make sure member details are correct before proceeding</h5>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="outlined-multiline-flexible"
              label="Last Name"
              fullWidth
              required
              value={searchText.lastname}
              name="lastname"
              size="small"
              onChange={(e) => this.handleInputChange(e)}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-multiline-flexible"
              label="First Name"
              required
              fullWidth
              name="firstname"
              value={searchText.firstname}
              size="small"
              onChange={(e) => this.handleInputChange(e)}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="Middle Name"
              required
              fullWidth
              name="middlename"
              value={searchText.middlename}
              inputProps={{ style: { textTransform: "uppercase" } }}
              size="small"
              onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="Extension Name"
              fullWidth
              size="small"
              name="suffix"
              value={searchText.suffix}
              onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="Date of Birth"
              required
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              value={searchText.birthdate}
              name="birthdate"
              size="small"
              onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "end" }}>
            <Button variant="contained" onClick={this.handleSubmit}>
              Validate
            </Button>
          </Grid>
        </Grid>
            </CardContent>
          </Card>
       
      </div>
    );
  }
}

export default memberValidation;
