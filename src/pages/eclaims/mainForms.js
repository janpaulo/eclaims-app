import React from "react";
import Typography from "@mui/material/Typography";
import Forms from "./forms";
import Forms2 from "./forms2";
import SimplePopUp from "./../../shared/PopUp/PopUpModule";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import JsonToXml from "json2xml";
import moment from "moment";
import MemberValidation from "./memberValidation";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class mainForms extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Claims",
      item: {},
      openPopup: false,
      isMemberPin: false,
      memberData: null,
      employerData: null,
      selectedObject: null,
      selectedEmployerOption: "",
      searchEmployer: { pPen: "", employerName: "" },
      searchText: {
        // lastname: "RAMIREZ",
        // firstname: "DANTE",
        // middlename: "GALLARDO",
        // suffix: "",
        // bday: moment(new Date("11-18-1953")).format("YYYY-MM-DD"), //"11-18-1953",

        lastname: "",
        firstname: "",
        middlename: "",
        suffix: "",
        bday: "",  //"11-18-1953",
      },
      specialConsideration: {
        isHemodialysis: false,
        isPentoneal: false,
        isRadioLinac: false,
        isRadioCobalt: false,
        isRadioIMRT: false,
        isBloodTrans: false,
        isBracy: false,
        isSimpleDeb: false,
        isChemotherapy: false,
      },

      patienCon: {
        improved: false,
        recovered: false,
        homeDischarged: false,
        abscorded: false,
        expired: false,
        transfered: false,
      },

      options: [
        { label: "All Case Rate", value: "ALL-CASE-RATE" },
        { label: "Z-Benefits", value: "Z-BENEFITS" },
        { label: "Confinement Abroad", value: "CONFINEMENT-ABROAD" },
        { label: "Emergency Case", value: "EMERGENCY-CASE" },
        { label: "OPD Case", value: "OPD-CASE" },
        { label: "Others", value: "OTHERS" },
        { label: "For Post Audit", value: "POST-AUDIT" },
      ],

      options2: [
        { label: "Private", value: "Y" },
        { label: "Non-Private(Charity/Service)", value: "N" },
      ],

      options3: [
        { label: "Treatment Phase:", value: "I" },
        { label: "Maintenance Phase", value: "M" },
      ],
      options4: [
        { label: "Treatment Phase:", value: "I" },
        { label: "Maintenance Phase", value: "M" },
      ],

      selectedOption: null,
      selectedTypeOfAccomodation: null,
      pTBType: null,

      claimsType: {
        allCaseRate: false,
        zBenefits: false,
        confinementAbroad: false,
        emergencyCase: false,
        opdCase: false,
        others: false,
        posAudit: false,
      },

      isTransfered: false,
      specialCon: false,
      dateAdmitedCount: "",
      startDayAdmited: "",

      patientDisposition: "",

      eCLAIMS: {
        pUserName: ":ECLAIMS-04-01-2018-00002",
        pUserPassword: "",
        pHospitalCode: "300806",
        pHospitalEmail: "email@yahoo.com",
      },
      eTRANSMITTAL: {
        pHospitalTransmittalNo: "300806-07-21-2023-1",
        pTotalClaims: "1",
      },

      claim: {
        pClaimNumber: "300806-07-21-20211-1",
        pTrackingNumber: "",
        pPhilhealthClaimType: "ALL-CASE-RATE",
        pPatientType: "",
        pIsEmergency: "",
      },

      itemcf1: {
        pMemberPIN: "",
        pMemberLastName: "",
        pMemberFirstName: "",
        pMemberSuffix: "",
        pMemberMiddleName: "",
        pMemberBirthDate: "",
        pMemberShipType: "",
        pMailingAddress: "",
        pZipCode: "",
        pMemberSex: "",
        pLandlineNo: "",
        pMobileNo: "",
        pEmailAddress: "",
        pPatientIs: "M",
        pPatientPIN: "",
        pPatientLastName: "",
        pPatientFirstName: "",
        pPatientSuffix: "",
        pPatientMiddleName: "",
        pPatientBirthDate: "",
        pPatientSex: "",
        pPEN: "",
        pEmployerName: "",
      },
      itemcf2: {
        pPatientReferred: "Y",
        pReferredIHCPAccreCode: "H12345678",
        pAdmissionDate: moment(new Date()).format("YYYY-MM-DD"),
        pAdmissionTime: "", //01:00:00PM" ,
        pDischargeDate: moment(new Date()).format("YYYY-MM-DD"),
        pDischargeTime: "", //"03:00:00PM",
        pDisposition: "",
        pExpiredDate: "",
        pExpiredTime: "",
        pReferralIHCPAccreCode: "",
        pReferralReasons: "",
        pAccommodationType: "N",
      },

      // RVSCODES
      rvscodes: {
        pRelatedProcedure: "",
        RVSCode: "",
        pProcedureDate: "",
        pLaterality: "",
      },

      diagnosCodeData: [
        {
          pDischargeDiagnosis: "",
          pICDCode: "",
          pRVSCode: "",
          pProcedureDate: "",
          pRelatedProcedure: "",
          pLaterality: "N",
          selecttedICD: null,
          selecttedRVS: null,
          // left: false,
          // right: false,
          // both: false,
        },
      ],

      //IF YES pEssentialNewbornCare
      essentialNewbornCare: {
        pDrying: "N",
        pSkinToSkin: "N",
        pCordClamping: "N",
        pProphylaxis: "N",
        pWeighing: "N",
        pVitaminK: "N",
        pBCG: "N",
        pNonSeparation: "N",
        pHepatitisB: "N",
      },

      items: [],
      value: 0,
      selectedClaimsTypes: [],
      checkedDatesHemodialysis: [],
      checkedDatesBloodTransfusion: [],
      checkedDatesPeritoneal: [],
      checkedDatesBrachytherapy: [],
      checkedDatesRadiotherapyLINAC: [],
      checkedDatesChemotherapy: [],
      checkedDatesRadiotherapyCOBALT: [],
      checkedDatesDebridement: [],
      checkedDatesRadiotherapyIMRT: [],
      // Array to store checked dates
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleIsTrasfered = this.handleToggleIsTrasfered.bind(this);
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleClickCheckBoxSpeConsideration =
      this.handleClickCheckBoxSpeConsideration.bind(this);
    this.handleClickCheckBoxPatientCon =
      this.handleClickCheckBoxPatientCon.bind(this);
    this.handleSendSelection = this.handleSendSelection.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckboxChangeAccomondation =
      this.handleCheckboxChangeAccomondation.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleCheckboxChangeNewBorn = (e) => {
    const { name, checked } = e.target;
    const updatedItem = {
      ...this.state.essentialNewbornCare,
      [name]: checked ? "Y" : "N",
    };
    // Assuming you're updating the state directly in this component
    this.setState({ essentialNewbornCare: updatedItem });
  };

  handleCheckboxChangeHemodialysis = (event, date) => {
    const { checkedDatesHemodialysis } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesHemodialysis: [...checkedDatesHemodialysis, date],
      });
    } else {
      this.setState({
        checkedDatesHemodialysis: checkedDatesHemodialysis.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeBloodTransfusion = (event, date) => {
    const { checkedDatesBloodTransfusion } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesBloodTransfusion: [...checkedDatesBloodTransfusion, date],
      });
    } else {
      this.setState({
        checkedDatesBloodTransfusion: checkedDatesBloodTransfusion.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangePeritoneal = (event, date) => {
    const { checkedDatesPeritoneal } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesPeritoneal: [...checkedDatesPeritoneal, date],
      });
    } else {
      this.setState({
        checkedDatesPeritoneal: checkedDatesPeritoneal.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeBrachytherapy = (event, date) => {
    const { checkedDatesBrachytherapy } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesBrachytherapy: [...checkedDatesBrachytherapy, date],
      });
    } else {
      this.setState({
        checkedDatesBrachytherapy: checkedDatesBrachytherapy.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeRadiotherapyLINAC = (event, date) => {
    const { checkedDatesRadiotherapyLINAC } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesRadiotherapyLINAC: [...checkedDatesRadiotherapyLINAC, date],
      });
    } else {
      this.setState({
        checkedDatesRadiotherapyLINAC: checkedDatesRadiotherapyLINAC.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeChemotherapy = (event, date) => {
    const { checkedDatesChemotherapy } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesChemotherapy: [...checkedDatesChemotherapy, date],
      });
    } else {
      this.setState({
        checkedDatesChemotherapy: checkedDatesChemotherapy.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeRadiotherapyCOBALT = (event, date) => {
    const { checkedDatesRadiotherapyCOBALT } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesRadiotherapyCOBALT: [
          ...checkedDatesRadiotherapyCOBALT,
          date,
        ],
      });
    } else {
      this.setState({
        checkedDatesRadiotherapyCOBALT: checkedDatesRadiotherapyCOBALT.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeDebridement = (event, date) => {
    const { checkedDatesDebridement } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesDebridement: [...checkedDatesDebridement, date],
      });
    } else {
      this.setState({
        checkedDatesDebridement: checkedDatesDebridement.filter(
          (d) => d !== date
        ),
      });
    }
  };
  handleCheckboxChangeRadiotherapyIMRT = (event, date) => {
    const { checkedDatesRadiotherapyIMRT } = this.state;
    if (event.target.checked) {
      this.setState({
        checkedDatesRadiotherapyIMRT: [...checkedDatesRadiotherapyIMRT, date],
      });
    } else {
      this.setState({
        checkedDatesRadiotherapyIMRT: checkedDatesRadiotherapyIMRT.filter(
          (d) => d !== date
        ),
      });
    }
  };

  handleClickCheckBoxClaimsType = (type) => {
    // Check if the type is already in the array
    if (this.state.selectedClaimsTypes.includes(type)) {
      // If it is, remove it
      this.setState((prevState) => ({
        selectedClaimsTypes: prevState.selectedClaimsTypes.filter(
          (item) => item !== type
        ),
      }));
    } else {
      // If it's not, add it
      this.setState((prevState) => ({
        selectedClaimsTypes: [...prevState.selectedClaimsTypes, type],
      }));
    }
  };

  handleClose() {
    this.setState({ openPopup: false });
  }

  handleSubmit(params) {
    // console.log(this.state.essentialNewbornCare);

    const DIAGNOSIS = this.state.diagnosCodeData.map((item) => {
      
      if (item.pRVSCode !== null && item.pRVSCode !== "") {
        return {
          DISCHARGE: [
            {
              ICDCODE: "",attr: {
                pICDCode: item.pICDCode,
              }
             
            },
            { 
              RVSCODES: "",attr: {
              pRelatedProcedure: item.pRelatedProcedure,
              pRVSCode: item.pRVSCode,
              pProcedureDate: item.pProcedureDate,
              pLaterality: item.pLaterality,
            },}
          ], attr: {pDischargeDiagnosis: item.pDischargeDiagnosis}
        };
      } else {
        return {
          DISCHARGE: [
            {
              ICDCODE:"",attr: {
                pICDCode: item.pICDCode,
              },
            },
          ], attr: {pDischargeDiagnosis: item.pDischargeDiagnosis}
        };
      }
    });

    console.log(DIAGNOSIS);

    console.log(
      JsonToXml(
        {
          eCLAIMS: {
            eTRANSMITTAL: {
              CLAIM: [
                { CF1: "", attr: this.state.itemcf1 },
                {
                  CF2: [
                    {// DIAGNOSIS ITEM IS ON THE STATE
                      DIAGNOSIS,
                      attr: { pAdmissionDiagnosis: 2 },
                    },

                    { SPECIAL: [{ a: 1 }] },
                    {
                      PROFESSIONALS: [{ a: "s", attr: { pICDCode: "K31.9" } }],
                    },
                    {
                      CONSUMPTION: [
                        { BENEFITS: "s", attr: { pTotalHCIFees: "sa" } },
                      ],
                      attr: { pEnoughBenefits: "Y" },
                    },
                  ],
                  attr: this.state.itemcf2,
                },

                {
                  ALLCASERATE: { CASERATE: "", attr: { pCaseRateCode: "sa" } },
                },

                { PARTICULARS: { DRGMED: "", attr: { pCaseRateCode: "sa" } } },

                { RECEIPTS: { RECEIPT: "", attr: { pCaseRateCode: "sa" } } },

                { DOCUMENTS: { DOCUMENT: "", attr: { pCaseRateCode: "sa" } } },
              ],
              attr: this.state.claim,
            },
            attr: this.state.eTRANSMITTAL,
          },
          attr: this.state.eCLAIMS,
        },
        { attributes_key: "attr" }
      )
    );

    // this.setState({ openPopup: true });
    // console.log(this.state.patientDisposition);
  }

  handleDate(e) {
    this.setState({
      itemcf2: {
        ...this.state.itemcf2,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  handleInputChange(e) {
    // console.log(e.target.value);
    this.setState({
      itemcf1: {
        ...this.state.itemcf1,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleInputChangeclaim = (e) => {
    this.setState({
      claim: {
        ...this.state.claim,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleInputChanges = (e) => {
    this.setState({
      itemcf2: {
        ...this.state.itemcf2,
        [e.target.name]: e.target.value,
      },
    });
    // this.setState({ selectedOption: event.target.value });
  };

  handleToggleIsTrasfered() {
    this.setState({ isTransfered: !this.state.isTransfered });
  }

  handleClickCheckBox(e) {
    console.log(this.state.specialCon);
    this.setState({ specialCon: !this.state.specialCon });
  }

  handleSelectChangeMember = (e) => {
    this.setState({
      itemcf1: {
        ...this.state.itemcf1,
        [e.target.name]: e.target.value,
      },
    });
    // this.setState({ selectedOption: event.target.value });
  };

  handleClickCheckBoxPatientCon(option) {
    var valueOfDisposition = "";
    if (option === "improved") {
      valueOfDisposition = "I";
    } else if (option === "recovered") {
      valueOfDisposition = "R";
    } else if (option === "homeDischarged") {
      valueOfDisposition = "H";
    } else if (option === "abscorded") {
      valueOfDisposition = "A";
    } else if (option === "expired") {
      valueOfDisposition = "E";
    } else if (option === "transfered") {
      valueOfDisposition = "T";
    }

    this.setState({ patientDisposition: valueOfDisposition });

    this.setState((prevState) => ({
      patienCon: {
        ...Object.fromEntries(
          Object.entries(prevState.patienCon).map(([key]) => [key, false])
        ),
        [option]: !prevState.patienCon[option],
      },
    }));
  }

  handleClickCheckBoxSpeConsideration(e) {
    // console.log(e.target.checked);
    this.setState({
      specialConsideration: {
        ...this.state.specialConsideration,
        [e.target.name]: e.target.checked,
      },
    });
  }

  handleSendSelection(event) {
    console.log();
    console.log("value - ", event.target.value);
  }

  handleCheckboxChange = (option) => {
    this.setState({ selectedOption: option });
  };

  handleCheckboxChangeAccomondation = (option) => {
    console.log(option);
    this.setState({ selectedTypeOfAccomodation: option });
  };

  handleCheckboxChangeTBtype = (option) => {
    this.setState({ pTBType: option });
  };

  handleTimeChange = (e) => {
    // this.setState({ time: event.target.value });

    this.setState({
      itemcf2: {
        ...this.state.itemcf2,
        [e.target.name]: e.target.value,
      },
    });
  };

  print = () => {
    const { pDischargeTime, pAdmissionTime } = this.state.itemcf2;
    console.log(pDischargeTime);
    const [h, m] = pDischargeTime.split(":");
    const [H, M] = pAdmissionTime.split(":");
    console.log(
      (h % 12 ? h % 12 : 12) + ":" + m,
      parseInt(h, 10) >= 12 ? "PM" : "AM"
    );
    console.log(
      (H % 12 ? H % 12 : 12) + ":" + M,
      parseInt(H, 10) >= 12 ? "PM" : "AM"
    );
  };

  // for diagnosCodeData
  handleDataChange = (updatedData) => {
    this.setState({ diagnosCodeData: updatedData });
  };

  // Callback function to update memberData state
  updateMemberData = (data, isTrue, dataItem) => {
    var newData = ''
    if(data.success){
      newData = data.data
    }else{
      newData = ''
    }
    this.setState({ memberData: newData });
    this.setState({ ismemPin: data.success });
    this.setState({ searchText: dataItem });

    // console.log(dataItem)
  };

  // Callback function to update memberData state
  updateEmployerData = (data) => {
    this.setState({ employerData: data });
    console.log(this.state.employerData);

    if (data === null) {
      this.setState((prevState) => ({
        itemCf: {
          ...prevState.itemCf,
          pEmployerName: "",
          pAddress: "",
        },
      }));
    }
  };

  handleChangeSelectEmp = (event) => {
    const selectedValue =
      event.target.value === null ? null : event.target.value;
    const selectedOption = this.state.employerData.find(
      (option) => option.epmlist.pPEN === selectedValue
    );

    this.setState({ selectedObject: selectedOption });
    this.setState({ selectedEmployerOption: event.target.value });
  };

  render() {
    var start = this.state.itemcf2.pAdmissionDate;
    var end = this.state.itemcf2.pDischargeDate;

    const getDaysDiff = (start_date, end_date, date_format = "YYYY-MM-DD") => {
      const getDateAsArray = (date) => {
        return moment(date.split(/\D+/), date_format);
      };
      return (
        getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1
      );
    };
    const countAdmidatedDate = getDaysDiff(start, end);
    let satrtDay = moment(start).date();
    let month = 1 + moment(start).month();
    let year = moment(start).year();
    let dateAdmitedCounts = this.state.dateAdmitedCount;
    let startDayAdmits = this.state.startDayAdmited;

    dateAdmitedCounts = countAdmidatedDate;
    startDayAdmits = satrtDay;

    return (
      <>
        <Typography variant="h5" component="h5">
          {this.state.title}
          {this.state.item.Label1}
        </Typography>

        <div>
          {this.state.memberData === null ? (
            <MemberValidation
              ismemPin={this.state.isMemberPin}
              searchText={this.state.searchText}
              updateDataItem={this.updateMemberData}
            />
          ) : (
            this.state.memberData === '' ? "No  Data Found!" : ""
          )}

          {this.state.memberData ? (
            <>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                aria-label="basic tabs example"
              >
                {/* <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="secondary" aria-label="simple tabs example"> */}
                <Tab
                  label={
                    <div>
                      <span>
                        <b>CF1</b>
                      </span>
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div>
                      <span>
                        <b>CF2</b>
                      </span>
                    </div>
                  }
                  {...a11yProps(0)}
                />
              </Tabs>

              <CustomTabPanel value={this.state.value} index={0}>
                <Forms
                  handleClick={this.handleSubmit}
                  onchange={this.handleInputChange}
                  handleSelectChangeMember={this.handleSelectChangeMember}
                  itemCf={this.state.itemcf1}
                  memberDataPin={this.state.memberData}
                  searchText={this.state.searchText}
                  employerData={this.state.employerData}
                  searchEmployer={this.state.searchEmployer}
                  selectedObject={this.state.selectedObject}
                  selectedOption={this.state.selectedEmployerOption}
                  updateEmployerData={this.updateEmployerData}
                  handleChangeSelectEmp={this.handleChangeSelectEmp}
                />
              </CustomTabPanel>
              <CustomTabPanel value={this.state.value} index={1}>
                <Forms2
                  isTransfered={this.state.isTransfered}
                  specialConsideration={this.state.specialConsideration}
                  isSpecialCon={this.state.specialCon}
                  dateAdmitedCount={dateAdmitedCounts}
                  startDayAdmited={startDayAdmits}
                  startMonthAdmited={month}
                  startYearAdmited={year}
                  patienCon={this.state.patienCon}
                  claimsType={this.state.claimsType}
                  // itemcf={this.state.itemcf2}
                  itemCf={this.state.itemcf2}
                  handleClick={this.handleSubmit}
                  handleToggle={this.handleToggleIsTrasfered}
                  handleClickCheckBox={this.handleClickCheckBox}
                  handleDate={this.handleDate}
                  onchange={this.handleInputChanges}
                  handleClickCheckBoxSpeConsideration={
                    this.handleClickCheckBoxSpeConsideration
                  }
                  handleClickCheckBoxPatientCon={
                    this.handleClickCheckBoxPatientCon
                  }
                  handleSendSelection={this.handleSendSelection}
                  handleCheckboxChange={this.handleCheckboxChange}
                  handleCheckboxChangeAccomondation={
                    this.handleCheckboxChangeAccomondation
                  }
                  handleTimeChange={this.handleTimeChange}
                  handleCheckboxChangeTBtype={this.handleCheckboxChangeTBtype}
                  handleCheckboxChanges={this.handleCheckboxChanges}
                  options3={this.state.options3}
                  checkedDates={this.state.checkedDates}
                  pTBType={this.state.pTBType}
                  checkedDatesHemodialysis={this.state.checkedDatesHemodialysis}
                  checkedDatesBloodTransfusion={
                    this.state.checkedDatesBloodTransfusion
                  }
                  checkedDatesPeritoneal={this.state.checkedDatesPeritoneal}
                  checkedDatesBrachytherapy={
                    this.state.checkedDatesBrachytherapy
                  }
                  checkedDatesRadiotherapyLINAC={
                    this.state.checkedDatesRadiotherapyLINAC
                  }
                  checkedDatesChemotherapy={this.state.checkedDatesChemotherapy}
                  checkedDatesRadiotherapyCOBALT={
                    this.state.checkedDatesRadiotherapyCOBALT
                  }
                  checkedDatesDebridement={this.state.checkedDatesDebridement}
                  checkedDatesRadiotherapyIMRT={
                    this.state.checkedDatesRadiotherapyIMRT
                  }
                  handleCheckboxChangeHemodialysis={
                    this.handleCheckboxChangeHemodialysis
                  }
                  handleCheckboxChangeBloodTransfusion={
                    this.handleCheckboxChangeBloodTransfusion
                  }
                  handleCheckboxChangePeritoneal={
                    this.handleCheckboxChangePeritoneal
                  }
                  handleCheckboxChangeBrachytherapy={
                    this.handleCheckboxChangeBrachytherapy
                  }
                  handleCheckboxChangeRadiotherapyLINAC={
                    this.handleCheckboxChangeRadiotherapyLINAC
                  }
                  handleCheckboxChangeChemotherapy={
                    this.handleCheckboxChangeChemotherapy
                  }
                  handleCheckboxChangeRadiotherapyCOBALT={
                    this.handleCheckboxChangeRadiotherapyCOBALT
                  }
                  handleCheckboxChangeDebridement={
                    this.handleCheckboxChangeDebridement
                  }
                  handleCheckboxChangeRadiotherapyIMRT={
                    this.handleCheckboxChangeRadiotherapyIMRT
                  }
                  handleClickCheckBoxClaimsType={
                    this.handleClickCheckBoxClaimsType
                  }
                  handleCheckboxChangeNewBorn={this.handleCheckboxChangeNewBorn}
                  selectedClaimsTypes={this.state.selectedClaimsTypes}
                  patientDisposition={this.state.patientDisposition}
                  essentialNewbornCare={this.state.essentialNewbornCare}
                  claim={this.state.claim}
                  handleInputChangeclaim={this.handleInputChangeclaim}
                  print={this.print}
                  options={this.state.options}
                  options2={this.state.options2}
                  selectedOption={this.state.selectedOption}
                  selectedTypeOfAccomodation={
                    this.state.selectedTypeOfAccomodation
                  }
                  diagnosCodeData={this.state.diagnosCodeData}
                  handleDataChange={this.handleDataChange}
                />
              </CustomTabPanel>
            </>
          ) : (
           ''
          )}

          <SimplePopUp
            // openPopup={true}
            openPopup={this.state.openPopup}
            title={this.state.title}
            handleClose={this.handleClose}
            maxWidth={this.state.maxWidth}
          ></SimplePopUp>
        </div>
      </>
    );
  }
}

export default mainForms;
