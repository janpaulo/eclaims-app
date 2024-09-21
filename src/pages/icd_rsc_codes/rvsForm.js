import React from "react";

import { TextField, Button, Grid } from "@mui/material";

class rvsForm extends React.Component {
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
                name="rvs_code"
                fullWidth="true"
                label="RVS Code"
                onChange={this.props.onchange}
                value={this.props.item.rvs_code}
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
                || !this.props.item.description 
                || !this.props.item.rvs_code 
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

export default rvsForm;
