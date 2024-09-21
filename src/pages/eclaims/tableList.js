import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SharedAppBar from "../../shared/SharedAppBar"
import axios from "axios";
import moment from "moment";

class tableList extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Claims",
      item: {},
      items: [],
      value: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetClaims();
  }

  handleGetClaims = (e) => {
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_CLAIMS+"claims",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        this.setState({ items: resp.data.result });
        console.log(resp.data.result);
      })
      .catch((error) => {
        // Handle error
        this.setState({ error: error.message, items: [] });
      });
  };


  handleSubmit(params) {
    console.log("here me");
  }

  render() {
    const { items, error } = this.state;
    // console.log(start);
    return (
      <>
       <SharedAppBar titleName={this.state.title} esoaLink="/claims_registration"/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Series No</TableCell>
                <TableCell align="center">PAN No.</TableCell>
                <TableCell align="center">Member PIN</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date Admited</TableCell>
                <TableCell align="center">Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {error && <div>Error: {error}</div>}
              {items.length > 0 ? (
                <>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.series_no}</TableCell>
                      <TableCell align="center">{item.hci_no}</TableCell>
                      <TableCell align="center">{item.member_pin}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">{ moment(new Date(item.date_admited)).format("MM/DD/YYYY")}</TableCell>
                      <TableCell align="center">{ moment(new Date(item.date_created)).format("MM/DD/YYYY")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <div>No data available</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default tableList;
