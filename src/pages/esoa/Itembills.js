import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

class Itembills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.dataItem,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      data: [
        ...prevState.data,
        {
          pServiceDate: "",
          pItemCode: "",
          pUnitOfMeasurement: "",
          pItemName: "",
          pUnitPrice: 0,
          pQuantity: 0,
          pTotalAmount: 0,
        },
      ],
    }));
  };

  handleChange = (e, i) => {
    const { name, value } = e.target;
    const newData = [...this.state.data];
    newData[i][name] = value;

    const amount = newData[i].pUnitPrice * newData[i].pQuantity;
    newData[i].pTotalAmount = amount;
    console.log("Amount for index " + i + ": " + amount);
    
    this.setState({ data: newData });
    
    this.props.onDataChange(newData);
    // Assuming you want to pass the updated data back to a parent component
    // this.props.itembills(newData);
  };

  handleDelete = (i) => {
    const newData = [...this.state.data];
    newData.splice(i, 1);
    this.setState({ data: newData });
    this.props.onDataChange(newData);
  };

  render() {
    return (
      <div className="App">
        <TableContainer component={Paper}>
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
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={this.handleClick}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((val, i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth
                      name="pServiceDate"
                      type="date"
                      size="small"
                      value={val.pServiceDate}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth
                      name="pItemCode"
                      size="small"
                      value={val.pItemCode}
                      onChange={(e) => this.handleChange(e, i)}
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
                      // onChange={this.props.onchange}
                      value={val.pItemName}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth
                      name="pUnitOfMeasurement"
                      size="small"
                      // onChange={this.props.onchange}
                      value={val.pUnitOfMeasurement}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth
                      name="pUnitPrice"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={val.pUnitPrice}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth
                      name="pQuantity"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={val.pQuantity}
                      onChange={(e) => this.handleChange(e, i)}
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
                      disabled
                      // onChange={this.props.onchange}
                      value={val.pUnitPrice * val.pQuantity}
                      // onChange={(e)=>handleChange(e,i)}
                    />
                  </TableCell>
                  {/* Repeat similar structure for other fields */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => this.handleDelete(i)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <p>{JSON.stringify(this.state.data)}</p> */}
      </div>
    );
  }
}

export default Itembills;
