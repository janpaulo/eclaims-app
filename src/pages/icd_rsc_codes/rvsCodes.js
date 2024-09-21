import React from "react";
import SimplePopUp from "../../shared/SimplePopUp/SimplePopUp";
import SimpleDeletePopUp from "../../shared/SimpleDeletePopUp/SimpleDeletePopUp";
import AlertMessage from "../../shared/alerts/PositionedSnackbar";
import RVSCodesTable from "./rvsCodeTable";
import Form from "./rvsForm";
import axios from "axios";
// import moment from "moment";

class rvsCodes extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "RVS CODES",
      value: 0,
      item: {
        id: "",
        rvs_code: "",
        description: "",
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
      error: "",
      message: "",
      type: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateorUpdateItem = this.handleCreateorUpdateItem.bind(this);
  }

  

  componentDidMount() {
    this.handleGetRVScodes();
  }

  handleGetRVScodes = (e) => {
    axios({
      method: "GET",
      url:  process.env.REACT_APP_API_CLAIMS+"rvsCodes",
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
    const method = item.id === undefined ? "post" : "put";
    const url = item.id ===undefined ? `${process.env.REACT_APP_API_CLAIMS}rvsCodes` : `${process.env.REACT_APP_API_CLAIMS}rvsCodes/${item.id}`;
  
    axios({
      method: method,
      url: url,
      data: item,
    })
    .then((resp) => {
      const newData = resp.data;
      const updatedItems = item.id === "" ? [...this.state.items, newData] : this.state.items.map(i => i.id === newData.id ? newData : i);
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
  
  handleCreateorUpdateItem(item, isAdd, model) {
    const textTitle = isAdd ? `Create ${model}` : `Edit ${model}`;
    this.setState({ openPopup: true,item: item,
      title: textTitle
    });
  }

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
      url: process.env.REACT_APP_API_CLAIMS + "rvsCodes/" + DeleteItemId,
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
       

       <RVSCodesTable
          handleClick={this.handleCreateorUpdateItem}
          handleGetICDcodes={this.handleGetICDcodes}
          handleShowPopUp={this.handleShowPopUp}
          handleOpenDeletePopup={this.handleOpenDeletePopup}
          items={items}
          item={this.state.item}
          title={this.state.title}
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

export default rvsCodes;
