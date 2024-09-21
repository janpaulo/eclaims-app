import React from "react";

import { TextField, Button, Grid } from "@mui/material";

class icdForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                size="small"
                name="icd_10_code"
                fullWidth="true"
                label="ICD Code"
                onChange={this.props.onchange}
                value={this.props.item.icd_10_code}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                size="small"
                name="description"
                fullWidth="true"
                label="Description"
                onChange={this.props.onchange}
                value={this.props.item.description}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                size="small"
                name="group"
                fullWidth="true"
                label="Group"
                onChange={this.props.onchange}
                value={this.props.item.group}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                type="number"
                inputProps={{ inputMode: "numeric" }}
                size="small"
                name="case_rate"
                fullWidth="true"
                label="Case Rate"
                onChange={this.props.onchange}
                value={this.props.item.case_rate}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                type="number"
                inputProps={{ inputMode: "numeric" }}
                variant="outlined"
                required
                size="small"
                name="professional_fee"
                fullWidth="true"
                label="Professional Fee"
                onChange={this.props.onchange}
                value={this.props.item.professional_fee}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                autoComplete="off"
                type="number"
                inputProps={{ inputMode: "numeric" }}
                variant="outlined"
                required
                size="small"
                name="hci_fee"
                fullWidth="true"
                label="Health  Care Insurance Fee (HCI)"
                onChange={this.props.onchange}
                value={this.props.item.hci_fee}
              />
            </Grid>
          </Grid>
        </form>
        <br/>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Button
              variant="contained" 
              disabled={!this.props.item.hci_fee 
                || !this.props.item.professional_fee 
                || !this.props.item.case_rate 
                || !this.props.item.group 
                || !this.props.item.description 
                || !this.props.item.icd_10_code 
               }
              // id="bank-submit" 
              color="success"
              onClick={() => this.props.submit()}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default icdForm;
