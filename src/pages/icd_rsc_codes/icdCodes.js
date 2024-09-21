import React from "react";
import ICDCodesTable from "./icdCodesTable";
import SimplePopUp from "../../shared/SimplePopUp/SimplePopUp";
import SimpleDeletePopUp from "../../shared/SimpleDeletePopUp/SimpleDeletePopUp";
import AlertMessage from "../../shared/alerts/PositionedSnackbar";
import axios from "axios";
import Form from "./icdForm";
// import moment from "moment";

class icdCodes extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "ICD CODES",
      item: {
        id: "",
        icd_10_code: "",
        description: "",
        group: "",
        case_rate: "",
        professional_fee: "",
        hci_fee: "",
      },
      // item: {},
      notify: {},
      items: [],
      openPopup: false,
      showpopup: false,
      isOpen:false,
      openDeletePopup: false,
      value: 0,
      error: "",
      message: "",
      type: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetICDcodes();
  }

  handleGetICDcodes = (e) => {
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_CLAIMS + "icdsCodes",
      headers: { "Content-Type": "application/json" },
      // headers: {'X-API-ACCESS-TOKEN': localStorage.getItem('api_key')}
    })
      .then((resp) => {
        this.setState({ items: resp.data.data });
        console.log(resp.data.data);
      })
      .catch((error) => {
        // Handle error
        this.setState({ error: error.message, items: [] });
      });
  };

  handleSubmit() {
    const { item } = this.state;
    console.log(item)
    let method = "";
    let url = "";
  
    if (item.id === "") {
      method = "post";
      url = `${process.env.REACT_APP_API_CLAIMS}icdsCodes`;
    } else {
      method = "put";
      url = `${process.env.REACT_APP_API_CLAIMS}icdsCodes/${item.id}`;
    }
  
    axios({
      method: method,
      url: url,
      data: item,
      // headers: {'X-API-ACCESS-TOKEN': localStorage.getItem('api_key')}
    })
    .then((resp) => {
      const newData = resp.data;
      const { items } = this.state;
      const updatedItems = item.id === "" ? [...items, newData] : items.map(i => i.id === newData.id ? newData : i);
  
      this.setState({
        items: updatedItems,
        openPopup: false,
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    })
    .catch(error => {
      console.error("Error submitting data:", error);
      this.setState({
        isOpen: true,
        message: "An error occurred while submitting data.",
        type: "error",
      });
    });
  }
  

  handleCreateorUpdateItem = (item, isAdd, model) => {
    var textTitle = "";
    if (isAdd) {
      textTitle = "Create " + model;
    } else {
      textTitle = "Edit " + model;
    }
    // this.setState({updateAccount: item.account})
    this.setState({ openPopup: true });
    this.setState({ item: item });
    this.setState({ title: textTitle });
  };

  handleShowPopUp = (e) => {
    this.setState({ openPopup: true });
  };

  handleClose = (e) => {
    this.setState({ item: {} });
    this.setState({ openPopup: false });
    this.setState({ openDeletePopup: false });
  };

  handleInputChange = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        [e.target.name]: e.target.value,
      },
    });
  };


  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({isOpen: false})
  }
  handleOpenDeletePopup = (item, model) => {
    this.setState({ model: "ICD Codes" });
    this.setState({ item: item });
    this.setState({ openDeletePopup: true });
  };

  handleDeleteItem = () => {
    const DeleteItemId = this.state.item.id;
    axios({
      method: "delete",
      url: process.env.REACT_APP_API_CLAIMS + "icdsCodes/" + DeleteItemId,
      // headers: {'X-API-ACCESS-TOKEN': localStorage.getItem('api_key')}
    })
      .then(() => {
        this.setState({
          items: this.state.items.filter((item) => item.id !== DeleteItemId),
        });
        this.setState({ openDeletePopup: false });
        this.setState({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
      })
      .catch((error) => console.log(error.response));
  };

  render() {
    const { items, error } = this.state;
    // console.log(start);
    return (
      <>
        <ICDCodesTable
          handleClick={this.handleCreateorUpdateItem}
          handleGetICDcodes={this.handleGetICDcodes}
          handleShowPopUp={this.handleShowPopUp}
          handleOpenDeletePopup={this.handleOpenDeletePopup}
          items={items}
          item={this.state.item}
          error={error}
        />

        <SimplePopUp
          openPopup={this.state.openPopup}
          title={this.state.title}
          handleClose={this.handleClose}
          maxWidth={this.state.maxWidth}
        >
          <Form
            error={this.state.error_messages}
            item={this.state.item}
            submit={this.handleSubmit}
            // handleSwitch={this.handleSwitch}
            onchange={this.handleInputChange}
            // isEdit={this.state.isEdit}
            // allowedParams={this.state.allowedParams}
          />
        </SimplePopUp>

        <SimpleDeletePopUp
          openDeletePopup={this.state.openDeletePopup}
          item={this.state.item}
          delete={this.handleDeleteItem}
          handleDeleteClose={this.handleClose}
          model={this.state.title}
        />
        <AlertMessage
          notify={this.state.notify}
          handleCloseAlert={this.handleCloseAlert}
          isOpen={this.state.isOpen}
          type={this.state.type}
          message={this.state.message}
        />
      </>
    );
  }
}

export default icdCodes;
