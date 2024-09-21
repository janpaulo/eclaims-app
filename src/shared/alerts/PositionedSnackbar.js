import React, { Component } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

class PositionedSnackbar extends Component {
  render() {
    return (
      <Stack  
        style={{ position: 'fixed', bottom: 30, left: 65, zIndex: "1000000" }}
        // open={this.props.open}
        open="true"
        autoHideDuration={6000}
        onClose={this.props.handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
       {this.props.open && (
        <Alert severity="success" onClose={this.props.handleAlertClose}>
           <AlertTitle>Success</AlertTitle>
        Successfuly Save the record
        </Alert>
      )}
      </Stack>
    );
  }
}

export default PositionedSnackbar;
