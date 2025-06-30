import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SharedAppBar from "../../shared/SharedAppBar";
import moment from "moment";
import api from "../../api";

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Claims",
      items: [],
      error: null,
      authUser: props.authUser || {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetClaims();
  }
  handleGetClaims = async () => {
    const { authUser } = this.state;
  
    if (!authUser || !authUser.hci_no || !authUser.access_token) {
      this.setState({ items: [], error: "Missing credentials. Please log in again." });
      return;
    }
  
    try {
      const response = await api.get(`/claims/${authUser.hci_no}`, {
        headers: {
          Authorization: `Bearer ${authUser.access_token}`,
        },
      });
  
      const claims = response.data?.claims;
  
      if (Array.isArray(claims) && claims.length > 0) {
        this.setState({ items: claims, error: null });
      } else {
        this.setState({ items: [], error: "No claims found for this HCI." });
      }
    } catch (err) {
      const status = err.response?.status;
      const serverMsg = err.response?.data?.error || err.response?.data?.message;
  
      let errorMessage = "An error occurred while fetching claims.";
  
      if (status === 404) {
        errorMessage = serverMsg || "No claims found for this HCI.";
      } else if (serverMsg) {
        errorMessage = serverMsg;
      } else if (err.message) {
        errorMessage = err.message;
      }
  
      this.setState({ items: [], error: errorMessage });
      console.error("Error fetching claims:", err);
    }
  };
  
  handleSubmit(params) {
    console.log("handleSubmit called", params);
  }

  render() {
    const { items, error, title } = this.state;

    return (
      <>
        <SharedAppBar titleName={title} esoaLink="/claims_registration" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Series No</TableCell>
                <TableCell align="center">PAN No.</TableCell>
                <TableCell align="center">Member PIN</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date Admitted</TableCell>
                <TableCell align="center">Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ color: "red" }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.series_no}</TableCell>
                    <TableCell align="center">{item.hci_no}</TableCell>
                    <TableCell align="center">{item.member_pin}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="center">
                      {moment(item.date_admited).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.date_created).format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default TableList;
