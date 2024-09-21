// export default AutocompleteComponent;
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
// import { parseString } from "xml2js";
// import Xml2js from "xml2js";
import { Button } from "@mui/material";
// import moment from "moment";

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
    item.pUserName = process.env.REACT_APP_USERNAME;
    item.pUserPassword = "";
    item.pHospitalCode = process.env.REACT_APP_HOSPITALCODE;

    axios({
      method: "POST",
      // url:' http://localhost:3000/soapPhic/memberSearch',
      url:  process.env.REACT_APP_API_CLAIMS+"soapPhic/memberSearch",
      data: (item), 
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      this.props.updateDataItem(resp.data, true, item);
    })

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
              value={searchText.bday}
              name="bday"
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
      </div>
    );
  }
}

export default memberValidation;
