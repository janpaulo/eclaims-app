import React from "react";
import Typography from "@mui/material/Typography";
import Forms from "./forms";
// import Forms2 from "./forms2";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import JsonToXml from "json2xml";
// import SimplePopUp from "./../../shared/PopUp/PopUpModule";
import axios from 'axios'
import PositionedSnackbar from './../../shared/alerts/PositionedSnackbar'

import CryptoJS from "crypto-js";

import { Navigate } from 'react-router-dom';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

class mainForms extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "ESOA",
      item: {pHciPan: ''},
      originalData: {
        docMimeType: 'text/xml',
        hash: '8add3bdd69d6f69b0791dd6af583784ea82091c5de9ffe52473ec54fbcb4ed8d',
        key1: '',
        key2: '',
        iv: 'MDEyMzQ1Njc4OUFCQ0RFRg==',
        doc: ''
      },
      openPopup: false,
      xml: "",
      // roomAndBoard: {},
      
      summaryOfFees: { },
        roomAndBoard: { pActualCharges: 0, pSeniorCitizenDiscount: "0",pPWDDiscount: "0",pPCSO: "0",pDSWD: "0", pDOHMAP: "0",pHMO: "0"},
        OtherFundSource: { pDescription: "", pAmount: "" },
        drugsAndMedicine: { pActualCharges: 0,  pSeniorCitizenDiscount: "0", pPWDDiscount: "0", pPCSO: "0", pDSWD: "0",   pDOHMAP: "0",pHMO: "0"},
        laboratoryAndDiagnostic: {pActualCharges: 0,  pSeniorCitizenDiscount: "0", pPWDDiscount: "0", pPCSO: "0", pDSWD: "0",   pDOHMAP: "0",pHMO: "0"},
        operatingRoomFees:  {pActualCharges: 0,  pSeniorCitizenDiscount: "0", pPWDDiscount: "0", pPCSO: "0", pDSWD: "0",   pDOHMAP: "0",pHMO: "0"},
        medicalSupplies:  {pActualCharges: 0,  pSeniorCitizenDiscount: "0", pPWDDiscount: "0", pPCSO: "0", pDSWD: "0",   pDOHMAP: "0",pHMO: "0"},
        
        professionalInfo: { pPAN: "1100-9501805-6",  pFirstName: "LADY", pMiddleName: "IMHO", pLastName: "GAGA",  pSuffixName: "" },
        summaryOfFee: { pActualCharges: "0", pSeniorCitizenDiscount: "0", pPWDDiscount: "0", pPCSO: "0",  pDSWD: "0", pDOHMAP: "0", pHMO: "0" },
        
        orfPhilHealth :{pTotalCaseRateAmount: ""},
        orfBalance :{pAmount: ""}, 
        profPhilHealth :{pTotalCaseRateAmount: ""},
        profBalance :{pAmount: ""},
        
      itemSummaryFee: {
        pActualCharges: 0,
        pSeniorCitizenDiscount: "0",
        pPWDDiscount: "0",
        pPCSO: "0",
        pDSWD: "0",
        pDOHMAP: "0",
        pHMO: "0"

      },
      itemOtherFundSource: {
        pDescription: "",
        pAmount: ""
      },
      dataItem: [
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
      items: [],
      itembills: [],
      value: 0,
      alert: false,
      redirectToSuccess: false,
      redirectTimeout: 4000 // 4 seconds timeout
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChangeOtherFundSource = this.handleInputChangeOtherFundSource.bind(this);
    this.handleInputChangedrugsAndMedicine = this.handleInputChangedrugsAndMedicine.bind(this);
    this.handleInputChangelaboratoryAndDiagnostic = this.handleInputChangelaboratoryAndDiagnostic.bind(this);
    this.handleInputChangeoperatingRoomFees = this.handleInputChangeoperatingRoomFees.bind(this);
    this.handleInputChangemedicalSupplies = this.handleInputChangemedicalSupplies.bind(this);
  }

  

  encryptStringWithCipherKey = (str, cipherKey) => {
    const encrypted = CryptoJS.AES.encrypt(str, cipherKey);
    return encrypted.toString();
  };


  encryptStringWithDynamicIV = (stringToEncrypt, key) => {
    // Generate a random IV for each encryption
    const iv = CryptoJS.lib.WordArray.random(16);
    // Encrypt the string using AES cipher with the dynamically generated IV
    const encryptedString = CryptoJS.AES.encrypt(stringToEncrypt, key, { iv }).toString();
    return {
      iv: iv.toString(CryptoJS.enc.Base64),
      encryptedString: encryptedString
    };
  };

  hashString = (stringToHash) => {
    // Add a hash key using SHA-256
    const hashedString = CryptoJS.SHA256(stringToHash).toString();
    return hashedString;
  };

  handleSubmit(params) {
    console.log("here me");
    const array = this.state.dataItem;
    // Create JSON object based on the length of the array
    const ItemizedBillingItems = array.map((value, index) => {
      return { "ItemizedBillingItem": '', attr: value };
    });
    
    console.log(ItemizedBillingItems)
    const XML = JsonToXml(
      {eSOA: [
        {SummaryOfFees:
          [
            {
              RoomAndBoard: [
                {SummaryOfFee: "" , attr: this.state.roomAndBoard },
                {OtherFundSource: "" , attr: this.state.OtherFundSource },
              ] 
            },
            {
              DrugsAndMedicine: [
                { SummaryOfFee:  "", attr: this.state.drugsAndMedicine }
              ] 
            },
            {
              LaboratoryAndDiagnostic: 
              [
                { SummaryOfFee:  "", attr: this.state.laboratoryAndDiagnostic }
              ]  
            },
            {
              OperatingRoomFees: 
              [
                { SummaryOfFee:  "", attr: this.state.operatingRoomFees }
              ]  
            },
            {
              MedicalSupplies: 
              [
                { SummaryOfFee:  "",  attr: this.state.medicalSupplies }
              ] 
            },
            {PhilHealth: "", attr: this.state.orfPhilHealth  },
            {Balance: "", attr: this.state.orfBalance   },
          ]
          // , attr: {s: "Dadada"} 
        },
        { ProfessionalFees: [
            {
              ProfessionalFee: 
              [
                {ProfessionalInfo: "", attr: this.state.professionalInfo },
                {SummaryOfFee: "", attr: this.state.summaryOfFee },
              ]
            },
            {PhilHealth: "", attr: this.state.profPhilHealth},
            {Balance: "", attr: this.state.profBalance },
          ] 
        },
        { ItemizedBillingItems //data is on the json
        } ,
      ],
        attr: {	pHciPan: "X12345678", pHciTransmittalId: "X12345678-2023-02-13-1"},
      },
      { attributes_key: "attr" }
    )




    this.setState({openPopup: true})
    this.setState({alert: true})


    // this.setState({xml: XML})

    // const xml_data = "'" + XML  + "'";
    // console.log(xml_data)

    const data = {
      "professional_fee": 2000,
      "hci_no": this.state.item.pHciPan,
      "date_created": new Date(),
      "total_amount": 0,
      "sum_philhealth_amount": this.state.orfBalance.pAmount,
      "prof_philhealth_amount":  this.state.profBalance.pAmount,
      "xml_data": XML
    }

    axios({
      method: "POST",
      url: "http://localhost:3000/esoas",
      data: (data), 
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
      // headers: {'X-API-ACCESS-TOKEN': localStorage.getItem('api_key')}
    }).then(resp => {
      setTimeout(() => {
        
      this.setState({redirectToSuccess: true});
      console.log(resp.data)
      }, this.state.redirectTimeout);
    })

    // const newObject = {};

    // const cipherKey = "PHilheaLthDuMmyciPHerKeyS";
    // const originalString = xml_data;
    // const encryptedString = this.encryptStringWithCipherKey(
    //   originalString,
    //   cipherKey
    // );
    // const { originalData } = this.state;
    // const jsonString = JSON.stringify(originalData);
    // const encryptedData = CryptoJS.AES.encrypt(jsonString, cipherKey).toString();
    // originalData.doc = encryptedString;
    // console.log(originalData);


    // const originalString = xml_data;
    // const encryptionKey = "PHilheaLthDuMmyciPHerKeyS";

    // const { iv, encryptedString } = this.encryptStringWithDynamicIV(originalString, encryptionKey);
    // const hashedString = this.hashString(encryptedString);

  //   const resultObject = {
  //     docMimeType: 'text/xml',
  //     key1: '',
  //     key2: '',
  //     iv: iv,
  //     doc: encryptedString,
  //     hash: hashedString

  // }
  // console.log(xml_data)
  }



  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ alert: false });
  };

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  handleInputChange(e) {
    this.setState({
      roomAndBoard: {
        ...this.state.roomAndBoard,
        [e.target.name]: e.target.value,
      },
    });
  
  }
  handleInputChangeOtherFundSource(e) {
    this.setState({
      OtherFundSource: {
        ...this.state.OtherFundSource,
        [e.target.name]: e.target.value,
      },
    });
  
  }
  handleInputChangedrugsAndMedicine(e) {
    this.setState({
      drugsAndMedicine: {
        ...this.state.drugsAndMedicine,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleInputChangelaboratoryAndDiagnostic(e) {
    this.setState({
      laboratoryAndDiagnostic: {
        ...this.state.laboratoryAndDiagnostic,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleInputChangeoperatingRoomFees(e) {
    this.setState({
      operatingRoomFees: {
        ...this.state.operatingRoomFees,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleInputChangemedicalSupplies(e) {
    this.setState({
      medicalSupplies: {
        ...this.state.medicalSupplies,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleDataChange = (updatedData) => {
    this.setState({ dataItem: updatedData });
  };

  handleDataChangeOrfPhilHealth = (e) => {
    
    console.log(e.target.name);
    if(e.target.name === "pTotalCaseRateAmount") {
      this.setState({
        orfPhilHealth: {
          ...this.state.orfPhilHealth,
          [e.target.name]: e.target.value,
        },
      });
    }
    if (e.target.name === "pAmount") {
      this.setState({
        orfBalance: {
          ...this.state.orfBalance,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  handleDataChangeprofPhilHealth = (e) => {
    
    console.log(e.target.name);
    if (e.target.name === "pTotalCaseRateAmount") {
      this.setState({
        profPhilHealth: {
          ...this.state.profPhilHealth,
          [e.target.name]: e.target.value,
        },
      });
    }
    if (e.target.name === "pAmount") {
      this.setState({
        profBalance: {
          ...this.state.profBalance,
          [e.target.name]: e.target.value,
        },
      });
    }
  };
  handleInputChangePen = (e) => {
      this.setState({
        item: {
          ...this.state.item,
          [e.target.name]: e.target.value,
        },
      });
    
  };


  handleDataChangeProf = (e) => {
    this.setState({
      professionalInfo: {
        ...this.state.professionalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleDataChangeProfSumary = (e) => {
    this.setState({
      summaryOfFee: {
        ...this.state.summaryOfFee,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleClose= (e) =>{
    this.setState({ openPopup: false });
  }

  


  render() {
    if (this.state.redirectToSuccess) {
      return  (<Navigate
        to={{  pathname: "/esoa_table_list"   }} 
        state={{ open: this.state.alert, handleAlertClose:  this.handleAlertClose}} 
      />)
      
      
      
      // <redirect to="/esoa_table_list" />;
    }
    return (
      <>
        <Typography variant="h5" component="h5">
          {this.state.title}
          {this.state.item.Label1}
        </Typography>

        <div>
        
          <Forms
              handleClick={this.handleSubmit}
              onchange={this.handleInputChange}
              handleDataChange={this.handleDataChange}
              handleInputChangeOtherFundSource={this.handleInputChangeOtherFundSource}
              handleInputChangedrugsAndMedicine={this.handleInputChangedrugsAndMedicine}
              handleInputChangelaboratoryAndDiagnostic={this.handleInputChangelaboratoryAndDiagnostic}
              handleInputChangeoperatingRoomFees={this.handleInputChangeoperatingRoomFees}
              handleInputChangemedicalSupplies={this.handleInputChangemedicalSupplies}
              handleDataChangeOrfPhilHealth={this.handleDataChangeOrfPhilHealth}
              handleDataChangeprofPhilHealth={this.handleDataChangeprofPhilHealth}
              handleDataChangeProfSumary={this.handleDataChangeProfSumary}
              handleDataChangeProf={this.handleDataChangeProf}
              handleInputChangePen={this.handleInputChangePen}
              itembills={this.state.itembills}
              dataItem={this.state.dataItem}
              item={this.state.item}


              roomAndBoard={this.state.roomAndBoard}
              professionalInfo={this.state.professionalInfo}
              summaryOfFee={this.state.summaryOfFee}
              OtherFundSource={this.state.OtherFundSource}
              drugsAndMedicine={this.state.drugsAndMedicine}
              laboratoryAndDiagnostic={this.state.laboratoryAndDiagnostic}
              operatingRoomFees={this.state.operatingRoomFees}
              medicalSupplies={this.state.medicalSupplies}
            />

          {/* <SimplePopUp
            // openPopup={true}
            openPopup={this.state.openPopup}
            title={this.state.title}
            handleClose={this.handleClose}
            maxWidth={this.state.maxWidth}
          >
            

          </SimplePopUp> */}

          <PositionedSnackbar 
           open={this.state.alert}
           handleAlertClose={this.handleAlertClose}
          
          />
         
        </div>
      </>
    );
  }
}

export default mainForms;
