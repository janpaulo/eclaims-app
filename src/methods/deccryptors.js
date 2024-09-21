import React, { Component } from "react";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import xml2js from 'xml2js';

const secretKey = "PHilheaLthDuMmyciPHerKeyS"; // Replace this with your secret key
const CIPHER_KEY_LEN = 32;
class samplecryptors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptedData: {
        docMimeType: "text/xml",
        key1: "",
        key2: "",
        iv: "",
        doc: "",
        hash: "",
      },
      xmlData: '', 
      decryptedXml: "",
      decryptedXmlJson: {},
    };
  }

  encryptXml = (xml) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
    const cipherText = CryptoJS.AES.encrypt(xml, secretKey, { iv });
    const encryptedString = cipherText.toString();
    const hashedString = CryptoJS.SHA256(xml).toString();

    const encryptedData = {
      docMimeType: "text/xml",
      key1: "",
      key2: "",
      iv: iv.toString(CryptoJS.enc.Base64),
      doc: encryptedString,
      hash: hashedString,
    };

    return encryptedData;
  };

  decryptXml = (encryptedData) => {
    const iv = CryptoJS.enc.Base64.parse(encryptedData.iv);
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData.doc, secretKey, {
      iv,
    });
    const decryptedXml = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedXml;
  };

  handleEncrypt = () => {
    const xml = `<eSOA pHciPan="X12345678" pHciTransmittalId="X12345678-2023-02-13-1"><SummaryOfFees><RoomAndBoard><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/><OtherFundSource pDescription="" pAmount=""/></RoomAndBoard><DrugsAndMedicine><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/></DrugsAndMedicine><LaboratoryAndDiagnostic><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/></LaboratoryAndDiagnostic><OperatingRoomFees><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/></OperatingRoomFees><MedicalSupplies><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/></MedicalSupplies><PhilHealth pTotalCaseRateAmount=""/><Balance pAmount=""/></SummaryOfFees><ProfessionalFees><ProfessionalFee><ProfessionalInfo pPAN="1100-9501805-6" pFirstName="LADY" pMiddleName="IMHO" pLastName="GAGA" pSuffixName=""/><SummaryOfFee pActualCharges="0" pSeniorCitizenDiscount="0" pPWDDiscount="0" pPCSO="0" pDSWD="0" pDOHMAP="0" pHMO="0"/></ProfessionalFee><PhilHealth pTotalCaseRateAmount=""/><Balance pAmount=""/></ProfessionalFees><ItemizedBillingItems><ItemizedBillingItem pServiceDate="" pItemCode="" pUnitOfMeasurement="" pItemName="" pUnitPrice="0" pQuantity="0" pTotalAmount="0"/></ItemizedBillingItems></eSOA>`; // Replace this with the XML string
    const encryptedData = this.encryptXml(xml);
    this.setState({ encryptedData });
  };


  handleDecrypt = async () => {
    const encryptedDataAsJsonStr = this.state.xmlData //= {
    
    console.log(this.state.xmlData)
    // // const decryptedXml = this.decryptXml({"docMimeType":"text\/xml","hash":"2a3c07d20be37a8086c27bd6e85e7993e12a9a9ca8ebf5e90392818ee873f92d","key1":"","key2":"","iv":"jvM3Htz06pCqTOcncyYkCQ==","doc":"tqZJCWqHOJAPz9jXOmovdPicmcwlobb\/ha\/1R7PX5u8uHXNZbJoSfQUF0iM19O8Hq2DnanEhDsisveFp\/loJxXXzwC\/p4nyNCym7lrdmhcb\/ZMXaDwyTWlT5MXK90bPJJJsbaM0q83GszavZREDhhB\/6wHvhQwVwoBYJc+525k5sPD4rG\/e\/sp0k3ajvkHum6PnzOQga4rqu5Dk911lNqzBGnM\/YLuAW\/i8y6\/rPLjXz5clfC25OJmvlj+7tJSX0cAz8ieTEUN1Bcr3jVH594\/KXGtMQIP1e3kRmP9rHmSBN0b4f2FueRy5WSOVVaMUcxmCoygxS0iZMCywz5273NkAlGhIo3ndrnzPEW4f8K2raASTxdhFqAmeUPmyvxkz9Zd6PzeuNemolY\/rNyoj44eHZr\/sNUeUf7u9+F7aK+hoZkTir+9qoiYU87+et7ijJpbIXayeTibIwZFlIKRFW1dWoQLaAiCCoz0IfNeHYhqyWEXgmEWXDYr5uosGejEmqVFA70ZlHSDpzwu8AFAIGoEiLkeIItja+8PnVRa+kScxio\/HOzOIqHKt40A6dmjxUAp76AXky6Uz6o0vN29GTYPyV3OqR7tNgC5HVszl48rEFyq1IGAXEDLSxaKCXYnpQju1KkTAyQtznbZs5kjhnVgo0FoTc\/65lUaypIxMmJbwe\/bNwNT5ihiHvGXgZ62siY1r8WUkndVx1F3hbxqls2gb52SvL35mgDvUz+KIw4Z8Ub5\/1qywlxRWuRArdwpj6XJ6maLX\/ZiW+6ddU8e70yiDylw\/\/6213o44N5ix4v5Vd46H9wPPGrvFE5F6zbXuxEA6J3T3zxP+Qtgbz8gUAjOhm8EibizLSN49Vt4ESCA7VyTmXURHiE0drlBU5nf4fNuBz7yck6075JeCL2\/pYGm19tSdLrO3afhM3QV93MKj\/\/FtImDTbD65pqnEFNj\/WWGSrQchp4Z9gFSFr1w62G8FhqdcQgjpIawiFY+ypNWVWAEcbZqIatOYbikvrTfMWIrAhvcCov3dRETPFO729Q8psv7f3wWlK9WH1lL1+XddNcZReT4JxwBzbCzEKpo1ctac64nvKAjQnH0ozxZnlskMjOZE3AwixeRw\/zD5L0Cv+TAqLnpt6m0E8oEFpAe83bamcgs5dZEmswH\/lp06xw\/euKeMhI+fEWOZ9IppJ3ZkYGuSu1mdHRysI7RTayNjqKKFARfGyRsUlIyuKQ\/iQV2Tjtz+XygoUUTFX3F53Q7gwyR0xp69tumn+8EcOEp8HFK\/Y72QUQkhEJiclZMMCCMImX2VatgO5F5k937xdxliKXxUWwn\/j57hEGRuM4f0FakIEQ4jO9M5u8UvHIyem1dZHvPeuTdyBM5v0sf3aIrgsI3B3rQZINFmi7VOmXy8gmKPJx87H2n9BdvZb9gL9mA3CQTxB9cVa3ofYWRzi0Q3hK6ku2gUTyBjjDyueWgX1+363urHYKwuJ9aBdnYtgbU6wgpV8IoB4FmKnEYGsXkwtXT8uRQ8mYgYlAIUPVsz3tcPDO9RXWjBm14hIyHzDleR8Sh83ymbAEc3l90EXEcRrnh1TVn91O1pFavkO5fyxLZ4XKb2NSX\/D0tmY9As03UeBzsi9CQgYc5N2Kzr7hkh\/lKh\/OzpFWuXISh2qXsF9xlNAlcK97un1IOb5qV2+FgkkoEL2CvIkIh\/I9MVDX+qWZgD1pv2U49kEYgPNWKLCNMdj\/P6wY58P4ySImFVLf\/okcJ5wEpB4vGFy5EjvAMiQGUTvez0I0jr5JX3BT5tdhktT\/nvqyuiTZNiHBOX0iB\/16xxnFyfITfvQPp4JIounqxGQbJj1HKDc5TQG1lq5Edb2ydWkE7bRet8KyLC7OMaZVTpVEpAOdDWZCCu6kIfLl1UqbTX36SfstbTeJPfiz3mFqUTmiVFb7S514KW+jnqg0\/0ZOf314i6aPhEOmuTF1pQNK06Qk\/IeYzGfOXElrblqDGAh1v1kI9Fr8VYhpfbIsFHyFMg5dWT\/fLvTrrYyOHc8ZzJ+LVuP1FRfTKFV"}     );
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
        console.error('Error converting XML to JSON:', err);
        return;
      }
      console.log(result);
      this.setState({ decryptedXmlJson: result });
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
  }

  render() {
    return (
      <div>
        <div>
          <textarea
            placeholder="Enter XML data here..."
            value={this.state.xmlData}
            onChange={this.handleXMLInputChange}
            style={{ width: "100%", height: "200px" }}
          />
        </div>
        <button onClick={this.handleEncrypt}>Encrypt XML</button>
        <button onClick={this.handleDecrypt}>Decrypt XMLs</button>
        <div>
          Encrypted XML Data: {JSON.stringify(this.state.encryptedData)}
        </div>
        <div>Decrypted XML: {this.state.decryptedXml}</div>
      </div>
    );
  }
}

export default samplecryptors;
