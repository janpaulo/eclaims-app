import React from "react";

import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";

import Divider from "@mui/material/Divider";

class itemizzedBill extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <>
        <Divider>
          {" "}
          <Typography variant="h5" component="h5">
            {" "}
            Itemized Billing Item{" "}
          </Typography>
        </Divider>
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Service Date</TableCell>
                <TableCell align="center">Item Code</TableCell>
                <TableCell align="center">Item Name</TableCell>
                <TableCell align="center">Unit Of Measurement</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pServiceDate"
                    type="date"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pItemCode"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pItemName"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pItemCode"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pUnitPrice"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pQuantity"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Amount"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pTotalAmount"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
      </>
    );
  }
}

export default itemizzedBill;
