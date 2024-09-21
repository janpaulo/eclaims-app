import React from "react";
// import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SharedAppBar from "../../shared/SharedAppBar";
// import CryptoJS from "crypto-js";
import axios from "axios";
import moment from "moment";
import PositionedSnackbar from './../../shared/alerts/PositionedSnackbar'
// import { Button } from "@mui/material";
// import Xml2js from "xml2js";

class tableList extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "ESOA",
      item: {},
      items: [],
      value: 0,
      error: null,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetEsoa();
  }

  handleGetEsoa = (e) => {
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_CLAIMS+"esoas",
      headers: { "Content-Type": "application/json" },
      // headers: {'X-API-ACCESS-TOKEN': localStorage.getItem('api_key')}
    })
      .then((resp) => {
        this.setState({ items: resp.data.result });
        // console.log(resp.data.response);
      })
      .catch((error) => {
        // Handle error
        this.setState({ error: error.message, items: [] });
      });
  };

  

  render() {
    // const publicKey =
    //   "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4uWFW+ho+7SsZ+j/3DdI\n1foe9/N8E0x24KTs20WVgDuO13IK94P0l2tN1lqQ6JXtdok/nzKyXh0l+1WBNJ0y\nFZlMqKz2PBWwUKs+9VPf8dZnxGDBfzt4mKpm3MdL5oJhOn2miKqNejwx/0df0dkH\nxTzucmh5axbkHH7cby8K7ukwRJTHf1F4DfWJwJ0U+JK6yF4Q4oH44d9lcAs+4KjG\nsPyyT3oHb6K5N4sEwOfzQb9m/EUIojWKRdVZ/KDYDR4rHhLbNeKpyOYBpP1++Lph\n3nrIb7KRfTtxHb5j38ncI+TyD8k9+pZGTJ34OnW1lOC5JTYfWtQeI2YwxoJGlvzv\nawIDAQAB\n-----END PUBLIC KEY-----";

    // const encryptStringWithPublicKey = (str, publicKey) => {
    //   const encrypted = CryptoJS.AES.encrypt(str, publicKey);
    //   return encrypted.toString();
    // };
    

    // const cipherKey = "PHilheaLthDuMmyciPHerKeyS";

    // const encryptStringWithCipherKey = (str, cipherKey) => {
    //   const encrypted = CryptoJS.AES.encrypt(str, cipherKey);
    //   return encrypted.toString();
    // };

    // // Example usage
    // const originalString = "<foo>Foo!</foo>";
    // const encryptedString = encryptStringWithCipherKey(
    //   originalString,
    //   cipherKey
    // );
    // console.log(encryptedString);
    // console.log(start);

    // const ast = parse('<foo>Foo!</foo>');
    //   const xml = stringify(ast);

    //   console.log(xml);

    const { items, error } = this.state;
    return (
      <>
        <SharedAppBar
          titleName={this.state.title}
          esoaLink="/esoa_registration"
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">PAN No.</TableCell>
                <TableCell align="center">Professional fee</TableCell>
                <TableCell align="center">Professional PhilHealth Amount</TableCell>
                <TableCell align="center">Summary PhilHealth Amount</TableCell>
                <TableCell align="center">Total Amount</TableCell>
                <TableCell align="center">Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error && <div>Error: {error}</div>}
              {items.length > 0 ? (
                <>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.hci_no}</TableCell>
                      <TableCell align="center">{item.professional_fee}</TableCell>
                      <TableCell align="center">{item.prof_philhealth_amount}</TableCell>
                      <TableCell align="center">{item.sum_philhealth_amount}</TableCell>
                      <TableCell align="center">{item.total_amount}</TableCell>
                      {/* <TableCell align="center">{item.xml_data}</TableCell> */}
                      <TableCell align="center">{ moment(new Date(item.date_created)).format("MM/DD/YYYY")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <div>No data available</div>
              )}
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <PositionedSnackbar 
           open={this.props.open}
           handleAlertClose={this.props.handleAlertClose}
          
          />
      </>
    );
  }
}

export default tableList;
