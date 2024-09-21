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

  // handleDecrypt = () => {
  //   const encryptedDataAsJsonStr =  {"docMimeType":"text\/xml","hash":"9c886dd4e679678afee5de4f32a6744eb6d8eb15fe3e9a0e3b5ffb0eed1c92c8","key1":"","key2":"","iv":"nF3nEUAoCH5EgntDjVNgKQ==","doc":"xVtohQA6Txc2UxqlZy5WprxklRD5fcUfFBLET9Ze98ObDRMG0YpJa9e84SElammAp0PF42+03vy6e+l\/h8HKwVzPzjc0xiBiTsUv3e86jfID0sjnzezhgte22yxRvcc\/rFq0kmOjcADStHPq2mBpxAP9\/FiukLAYilWp3uh6vxBbMT0o+tAyqGeuPhUQXOLqlMfDf7PnrT42kLvgE6AQ+R\/p6PrPtvGvGUuKgmYo1JlmNu1uF6nRbbeJM9KH7NZjNL07zJrvM7K3Jd6K706WvfxpuVDK061knJVJgskaqtd3QufUND8\/VeXzVotYhWQj4SnCfbWsMcdbqoty9GhP\/Hvkn1FGK4JhHIto8\/3jPOm1XvILFswe5LoaEe5NLQrus88mGJGovIyOSkJSHtPy\/NwcTrA805gk763iY4os9xsqHt4LCXTM5LSS\/8f2P8hH4VufwqOn+jgK\/v4zbiEjZvSP7QlrCmlHRMb4a030+h6zSDi109Uc7cbzGCtPYmms83L6tUgIbw2TNF\/AwzmAVprFQtCH4eEvIIz3IvvwU2blCqQB34Rnd4hPcsURDC9YYNuCzcLB7UOkw8ZUAiz0NflatUZmKnXKFHuz7KyVZuibzOCua+lqO8BIzVyjUYQzgl8TlsA0+7vaup6WbUwXSpjFRulcGqZ\/xOnvVR2sOeGGgDE7iak+tLX\/KZsQu\/qKyq1bri5IHfWUblbPiAj\/SPXqYWg\/0BPb8yd4lHRbusUAjT9VHUpBcnPaa1wuBCWnCjephyIv5WDzxgJPxJD6KuWAy3txgdVE9tB+e+81NCafelioRyuf36qZkn9iixcnJ\/eZQMOpl9SEfoJQoWEsZA\/KpBfYpvbP+HykjyMO3XTl9105iToI\/njDSjoiYbo0A3KaEWcpwH2byNZ3c1Lhf+GgudDCrSVPeq13kTFhRgIEv8HEBIJmwbybmvqjVURihEkpQIyKEPGpL7Ggvwtk+A6vcOViQ1Q\/f8u7ag3ctk5ZOoc2Ja7hUiGOLVLwFr+zP3uUNJ3XKl8+99+MwzHNzTiKgGFThY0BnHpLzmCacUrI11KRJ\/XyJZR952udHS\/tAsNvtwN0t90oDDKjxxL07CzdN7TXGyRRsPhXfnvV7iuUdVX8+K5nQ\/HU0N16wNP1d4ck1gbbcTU7wpwJY8XUNiEjd2VLqzn1tTqSL24fkOVFwQ1CAnZoGaZC8HxCRhL56I3La\/5IumgjKLAKMbFtbJHiGRvd6knuhggc67m0G2LZ682zxrcvjYnhyDH7lCYOG\/Rn9ysTo9F9m5OoByQPqJzJ+vW2GpKRp3d2OdwQNUd54WG510sblKR+NrSoQc59zz84GvR41A+O2ZMxKpaeVkqzNcnP+5JCJphbLrRhmlQqPymoAXDkLqPwxVe+ythHBdRpe+d4ivsdJU5XrKJ7diLBfNFxK4YJo62l1L+SgwCctEXAWELVZJ1onDnPqtav06kFG7yJDp96I0w5SPcUE9Yye9\/SJ7joWGFyCCqYXMOwT8UsmcBN6FJ1l4eTKePJqL+eoEF9WyER8gQeWC35rNOzUWjoU45uYYqcMYabrrNRoQ5urcIsK+Ty\/vfMXPpT5rSbsSKgcSTciEYswdCm9TPfXtwpbidzWDB2IDh0fpgXxDbIoRQJ4JK\/8NQ2dpOXa7kuzY\/YigBvYrxhXZn0V+V5IY4tIfysIzBpRne8pSM9N00sb967tLX6wRqdxpwTQ4CEgIsvjHF7qDGIjr4hvjzTzZcSizeLLEBQbJ3k8b+I3UFokwTsSJauHZl9L1UGcQK\/kBhtLRAeEwPvk12h\/KMfAz0u1P\/Q1JU48WS8hhNyj0p86OZj8eQw9VIP7E7TUHV73OXqrO14IZMaddlYHL9Fw53p6iWYaQZPpWU1b1pUSaMzoFqsoLK16BioODQ1kqqqiAZoVrOikS+jEVJYMUmAHzdIalrIteoh2zYy4m8chTSJZj8rvdC1m7atk7\/TSkgB7mP9TY8s\/KBMN7t3BZrogPZfhs3xSS9JG+ZXcGSrN3luMyqlG0w8vVTlDmqFwaB6WPmxOga1Ri9Z3rnTL69NdUBjF+NHAzk9wsUBl9U="}                                                //this.decryptXml({"docMimeType":"text/xml","key1":"","key2":"","iv":"hByessJGXODEr28ZPn3Sow==","doc":"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","hash":"2a3c07d20be37a8086c27bd6e85e7993e12a9a9ca8ebf5e90392818ee873f92d"});
  //   // // const decryptedXml = this.decryptXml({"docMimeType":"text\/xml","hash":"2a3c07d20be37a8086c27bd6e85e7993e12a9a9ca8ebf5e90392818ee873f92d","key1":"","key2":"","iv":"jvM3Htz06pCqTOcncyYkCQ==","doc":"tqZJCWqHOJAPz9jXOmovdPicmcwlobb\/ha\/1R7PX5u8uHXNZbJoSfQUF0iM19O8Hq2DnanEhDsisveFp\/loJxXXzwC\/p4nyNCym7lrdmhcb\/ZMXaDwyTWlT5MXK90bPJJJsbaM0q83GszavZREDhhB\/6wHvhQwVwoBYJc+525k5sPD4rG\/e\/sp0k3ajvkHum6PnzOQga4rqu5Dk911lNqzBGnM\/YLuAW\/i8y6\/rPLjXz5clfC25OJmvlj+7tJSX0cAz8ieTEUN1Bcr3jVH594\/KXGtMQIP1e3kRmP9rHmSBN0b4f2FueRy5WSOVVaMUcxmCoygxS0iZMCywz5273NkAlGhIo3ndrnzPEW4f8K2raASTxdhFqAmeUPmyvxkz9Zd6PzeuNemolY\/rNyoj44eHZr\/sNUeUf7u9+F7aK+hoZkTir+9qoiYU87+et7ijJpbIXayeTibIwZFlIKRFW1dWoQLaAiCCoz0IfNeHYhqyWEXgmEWXDYr5uosGejEmqVFA70ZlHSDpzwu8AFAIGoEiLkeIItja+8PnVRa+kScxio\/HOzOIqHKt40A6dmjxUAp76AXky6Uz6o0vN29GTYPyV3OqR7tNgC5HVszl48rEFyq1IGAXEDLSxaKCXYnpQju1KkTAyQtznbZs5kjhnVgo0FoTc\/65lUaypIxMmJbwe\/bNwNT5ihiHvGXgZ62siY1r8WUkndVx1F3hbxqls2gb52SvL35mgDvUz+KIw4Z8Ub5\/1qywlxRWuRArdwpj6XJ6maLX\/ZiW+6ddU8e70yiDylw\/\/6213o44N5ix4v5Vd46H9wPPGrvFE5F6zbXuxEA6J3T3zxP+Qtgbz8gUAjOhm8EibizLSN49Vt4ESCA7VyTmXURHiE0drlBU5nf4fNuBz7yck6075JeCL2\/pYGm19tSdLrO3afhM3QV93MKj\/\/FtImDTbD65pqnEFNj\/WWGSrQchp4Z9gFSFr1w62G8FhqdcQgjpIawiFY+ypNWVWAEcbZqIatOYbikvrTfMWIrAhvcCov3dRETPFO729Q8psv7f3wWlK9WH1lL1+XddNcZReT4JxwBzbCzEKpo1ctac64nvKAjQnH0ozxZnlskMjOZE3AwixeRw\/zD5L0Cv+TAqLnpt6m0E8oEFpAe83bamcgs5dZEmswH\/lp06xw\/euKeMhI+fEWOZ9IppJ3ZkYGuSu1mdHRysI7RTayNjqKKFARfGyRsUlIyuKQ\/iQV2Tjtz+XygoUUTFX3F53Q7gwyR0xp69tumn+8EcOEp8HFK\/Y72QUQkhEJiclZMMCCMImX2VatgO5F5k937xdxliKXxUWwn\/j57hEGRuM4f0FakIEQ4jO9M5u8UvHIyem1dZHvPeuTdyBM5v0sf3aIrgsI3B3rQZINFmi7VOmXy8gmKPJx87H2n9BdvZb9gL9mA3CQTxB9cVa3ofYWRzi0Q3hK6ku2gUTyBjjDyueWgX1+363urHYKwuJ9aBdnYtgbU6wgpV8IoB4FmKnEYGsXkwtXT8uRQ8mYgYlAIUPVsz3tcPDO9RXWjBm14hIyHzDleR8Sh83ymbAEc3l90EXEcRrnh1TVn91O1pFavkO5fyxLZ4XKb2NSX\/D0tmY9As03UeBzsi9CQgYc5N2Kzr7hkh\/lKh\/OzpFWuXISh2qXsF9xlNAlcK97un1IOb5qV2+FgkkoEL2CvIkIh\/I9MVDX+qWZgD1pv2U49kEYgPNWKLCNMdj\/P6wY58P4ySImFVLf\/okcJ5wEpB4vGFy5EjvAMiQGUTvez0I0jr5JX3BT5tdhktT\/nvqyuiTZNiHBOX0iB\/16xxnFyfITfvQPp4JIounqxGQbJj1HKDc5TQG1lq5Edb2ydWkE7bRet8KyLC7OMaZVTpVEpAOdDWZCCu6kIfLl1UqbTX36SfstbTeJPfiz3mFqUTmiVFb7S514KW+jnqg0\/0ZOf314i6aPhEOmuTF1pQNK06Qk\/IeYzGfOXElrblqDGAh1v1kI9Fr8VYhpfbIsFHyFMg5dWT\/fLvTrrYyOHc8ZzJ+LVuP1FRfTKFV"}     );
  //    const passphrase=  secretKey
  //   // this.setState({ decryptedXml });
  //   if (!encryptedDataAsJsonStr) {
  //     throw new Error("No data to be decrypted");
  // }

  //       const data =encryptedDataAsJsonStr //JSON.parse(encryptedDataAsJsonStr);

  //       const ivBase64 = data.iv;
  //       const encryptedDataBase64 = data.doc;

  //       if (!ivBase64 || !encryptedDataBase64) {
  //           throw new Error("Invalid JSON data: missing IV or encrypted data");
  //       }

  //       const cipherIV = this.base64Decode(ivBase64);
  //       const encryptedData = this.base64Decode(encryptedDataBase64);

  //       if (!cipherIV || !encryptedData) {
  //           throw new Error("Invalid base64-encoded IV or encrypted data");
  //       }

  //       const cipherKey = this.getPassphraseHash(secretKey);

  //       let decryptedXml = this.decryptUsingAES(encryptedData, cipherKey, cipherIV);

  //       const nullCharPos = decryptedXml.indexOf("\0");
  //       if (nullCharPos >= 0) {
  //           decryptedXml = decryptedXml.substring(0, nullCharPos);
  //       }

  //       console.log(decryptedXml)
  //       return decryptedXml;
  //     };

  handleDecrypt = async () => {
    const encryptedDataAsJsonStr = this.state.xmlData //= {
    //   iv: "0MnxIhXHq/yZ6DwMFuJN1Q==",
    //   docMimeType: "text/xml",
    //   doc: "FTuaTGuNAZs8wJcpNOffuW5tM+JdwcoZxm+SGQQfnEQ4sv8dQhp4Jo/ZWSvKU7eFKFmLa43YzTqi\r\n+mCE1z2pfxHe0N6nJ8hvXXDGvZQ2IxyruLWrH0cEaHzG+XhY4AvWqMOkoKYRiypCSDO82Itc4Ao4\r\nR5ukniUe3gwjV+X5oQolUL5yjP7iHqwFr0ujZ0WiSGbjcaidFzDcLnL1kHRtoo/elhwn45jBRbO6\r\nwbElW1Xl19l1drYM+GDD7fHWDDBUiVdGXq1c0xPaGz6dhAo0yzxF/APIOg5WvSPTJ0ynY4s4rhwF\r\nOXr/yApRz9UpNiVg6fCtOJ6R1kV2A65z8PiYlbVIki3BTseACrYv2OhG05dQXuJl8nUq+HxVECAK\r\nPkwNg4Tqt+GpWm9uoCynDUV0jOs2g9gaXHl8fKzNL9K8g9fnjvTOtFDbvretLcvyKCIpA3t8ur+7\r\ntg34jPElJ5t5MVkM7Vm0sNhnG7Vesfj9rEeEDC3PyCkI3iXCz8uqC15qimndQmEts8waUDw3iY53\r\n43EMfLksIeXLGmiIw0l2uBSmqIGLAmaB5YvGi+OSdpelaIUrOcp7I5t5hWFJl2zvjWxF8BTT2jZI\r\nAEcyjd2USIJLXcuPKnIi2jEyvmewtyKzg1on8zc2ssmgihMJvZnBLcCQn9nUD+vqqJdsMrRs5/KX\r\n5esmgGWIzoSej2dLjC4P",
    // };
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
      // this.setState({ jsonOutput: JSON.stringify(result, null, 2) });
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

    console.log(decrypted);
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
