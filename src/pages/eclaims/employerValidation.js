// export default AutocompleteComponent;
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import { parseString } from "xml2js";
// import Xml2js from "xml2js";
import { Button } from "@mui/material";
// import moment from "moment";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import xml2js from "xml2js";

// const secretKey = "PHilheaLthDuMmyciPHerKeyS"; // Replace this with your secret key
const CIPHER_KEY_LEN = 32;
class employerValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      isData: false,
      selectedOptions: [], // Track selected options
      searchText: this.props.searchEmployer,
    };
  }

  handleSubmit = () => {
    this.setState({isData:  false});

    this.setState({loading:  true});
    const item = this.state.searchText;
    item.pUserName = process.env.REACT_APP_USERNAME;
    item.pUserPassword = "";
    item.pHospitalCode = process.env.REACT_APP_HOSPITALCODE;

    axios({
      method: "POST",
      // url:' http://localhost:3000/soapPhic/employerSearch',
      url:  process.env.REACT_APP_API_CLAIMS+"soapPhic/employerSearch",
      data: (item), 
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {

      this.handleDecrypt(resp.data);

    }).catch((error) => {
      this.setState({loading:  false});
      this.setState({isData:  true});
      console.error("Error:", error);
    });
    
  };

  handleDecrypt = async (resultdata) => {
    const encryptedDataAsJsonStr = resultdata; //= {
    // console.log(this.state.xmlData);
    const passphrase = "PHilheaLthDuMmyciPHerKeyS";
    if (!encryptedDataAsJsonStr) {
      throw new Error("No data to be decrypted");
    }
    const data = JSON.parse(encryptedDataAsJsonStr);
    const ivBase64 = data.iv;
    const encryptedDataBase64 = data.doc;

    const iv = Buffer.from(ivBase64, "base64");
    const encryptedData = Buffer.from(encryptedDataBase64, "base64");
    const cipherKeyBytes = await this.getPassphraseHash(passphrase);

    const decryptedXml = this.decryptUsingAES(
      encryptedData,
      cipherKeyBytes,
      iv
    );

    xml2js.parseString(decryptedXml, (err, result) => {
      if (err) {
        console.error("Error converting XML to JSON:", err);
        return;
      }

      // console.log(newData);

      if (result.eEMPLOYERS && result.eEMPLOYERS.employer) {
        // Change the key name '$' inside each object of the 'employer' array
        const newData = result.eEMPLOYERS.employer.map((employer) => {
          employer.epmlist = employer["$"];
          delete employer["$"];
          return employer;
        });
        this.props.updateEmployerData(newData)
        this.setState({loading:  false});
        this.setState({isData:  false});
      } else {
        
        this.setState({loading:  false});
        this.setState({isData:  true});
        this.props.updateEmployerData(null)
        console.log("Data structure is not as expected.");
      }
    });
  };

  async getPassphraseHash(passphrase) {
    let cipherKeyBytes = new Uint8Array(CIPHER_KEY_LEN);
    cipherKeyBytes.fill(0);
    let passphraseBytes = new TextEncoder().encode(passphrase);
    let passphraseHashBytes = await this.getSHA256HashAsBytes(passphraseBytes);
    passphraseHashBytes.forEach((byte, index) => {
      if (index < CIPHER_KEY_LEN) {
        cipherKeyBytes[index] = byte;
      }
    });
    return cipherKeyBytes;
  }

  async getSHA256HashAsBytes(data) {
    let crypto = window.crypto || window.msCrypto;
    let hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
  }

  decryptUsingAES(encryptedDataBytes, cipherKeyBytes, ivBytes) {
    const encryptedDataHex = Array.from(encryptedDataBytes, (byte) =>
      ("0" + (byte & 0xff).toString(16)).slice(-2)
    ).join("");
    const cipherKeyHex = Array.from(cipherKeyBytes, (byte) =>
      ("0" + (byte & 0xff).toString(16)).slice(-2)
    ).join("");
    const ivHex = Array.from(ivBytes, (byte) =>
      ("0" + (byte & 0xff).toString(16)).slice(-2)
    ).join("");
    const cipherKey = CryptoJS.enc.Hex.parse(cipherKeyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encryptedData = CryptoJS.enc.Hex.parse(encryptedDataHex);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedData },
      cipherKey,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }
    );

    // console.log(decrypted);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  bytesToHex(bytes) {
    return bytes
      .map((byte) => ("0" + (byte & 0xff).toString(16)).slice(-2))
      .join("");
  }

  // Helper function to convert hex to bytes
  hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
  }

  // Function to handle changes in the XML data input
  handleXMLInputChange = (e) => {
    this.setState({ xmlData: e.target.value });
  };

  handleInputChange(e) {
    
   
    this.setState({
      searchText: {
        ...this.state.searchText,
        [e.target.name]: e.target.value ,
      },
    });
  }

  render() {
    return (
      <div>
        <h5>Make sure member details are correct before proceeding</h5>
        <Grid container spacing={2} style={{marginBottom: "20px"}}>
          <Grid item xs={5}>
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              name="pPen"
              label="PhilHealth Employer No.(PEN)"
              size="small"
              onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              name="employerName"
              size="small"
              label="Employer Name"
              onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "end" }}>
            <Button variant="contained" onClick={this.handleSubmit}>
              Search
            </Button>
          </Grid>
        </Grid>
        {this.state.loading ?  <Typography variant="body1">loading...................</Typography> :""}
        {this.state.isData ?  <Typography variant="body1">NO RECORD FOUND</Typography> :""}
      </div>
    );
  }
}

export default employerValidation;
