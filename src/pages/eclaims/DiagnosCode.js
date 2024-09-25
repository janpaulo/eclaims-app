import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Checkbox,
  TableContainer,
  TableHead,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import LinearProgress from '@mui/material/LinearProgress';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PositionedSnackbar from "./../../shared/alerts/PositionedSnackbar";
// import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

class DiagnosCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.diagnosCodeData,
      data2: [],
      caseParam: {
        icdcode: "",
        rvscode: "",
        description: "",
        targetdate: "12-31-2024",
      },
      itemSearch: [],
      tableData: [],
      isLoading:false,
      isAlert:false,
      open:false,
      alertMessage:"",
      autocompleteICDOptions: [],
      autocompleteRVSOptions: [],
    };
  }

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isAlert: false });
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // Sync state with props if necessary
  //   if (nextProps.isAlert !== prevState.isAlert) {
  //     return { isAlert: nextProps.isAlert };
  //   }
  //   return null;
  // }

  handleChangeTabledata = (e, i) => {
    const { name, value } = e.target;
    const { tableData } = this.state;
    const updatedData = [...tableData];
    updatedData[i][name] = value;
    this.setState({ tableData: updatedData });
    this.props.onDataChange(updatedData);
  };

  handleAutocompleteChange = (e, newValue, i, icd2) => {
    const newData = [...this.state.data];
    if (icd2 !== undefined) {
      newData[i].selecttedICD = newValue;
    } else {
      newData[i].selecttedRVS = newValue;
    }
    this.setState({ data: newData });
    this.props.onDataChange(newData);
  };

  handleCheckboxChange = (e, index) => {
    const { name, value, checked } = e.target;

    console.log(name, value, checked);
    this.setState(
      (prevState) => {
        const updatedData = prevState.tableData.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [name]: checked ? value : null, // Set value when checked, null when unchecked
            };
          }
          return item;
        });

        return { tableData: updatedData };
      },
      () => {
        // Notify parent component if needed
        console.log(this.state.tableData);
        this.props.onDataChange(this.state.tableData);
      }
    );
  };

  handleDelete = (i) => {
    const { data } = this.state;
    const updatedData = [...data];
    updatedData.splice(i, 1);
    this.setState({ data: updatedData });
    this.props.onDataChange(updatedData);
  };

  handleClick = () => {
    this.setState((prevState) => ({
      data: [
        ...prevState.data,
        {
          pDischargeDiagnosis: "",
          pICDCode: "",
          pRVSCode: "",
          pProcedureDate: "",
          pRelatedProcedure: "",
          pLaterality: "N",
        },
      ],
    }));
  };

  handleChange = (e) => {
    // this.setState({ time: event.target.value });

    this.setState({
      caseParam: {
        ...this.state.caseParam,
        [e.target.name]: e.target.value,
      },
    });
  };

  searchCase = () => {
    const item = this.state.caseParam;
    this.setState({isLoading: true})
    axios({
      method: "POST",
      url: process.env.REACT_APP_NEW_PHIC_URL + "/SearchCaseRates",
      data: item,
      headers: {
        accreno: process.env.REACT_APP_HOSPITALACRRENO,
        softwarecertid: process.env.REACT_APP_USERNAME,
        "Content-Type": "text/plain",
      },
    })
      .then((resp) => {
        // Transform the array of objects
        const updatedData = resp.data.result.caserates.map((item) => ({
          ...item, // Copy existing properties
          pLaterality: null,
          pRelatedProcedure: null,
          pProcedureDate: null, // Add the new key-value pair
        }));

        

        this.setState({isLoading: false})
        this.setState({isAlert: updatedData.length > 0 ? false:true})
        this.setState({alertMessage: updatedData.length > 0 ? "":"No data record found"})
        // Update the component state with the transformed data
        this.setState({ itemSearch: updatedData });
      })

      .catch((error) => {
        // Log the updated data to the console
        // Handle error
        // this.setState({ error: error.message, items: [] });
      });
  };

  clearData = () => {
    this.setState({
      caseParam: {
        icdcode: "",
        rvscode: "",
        description: "",
        targetdate: "12-31-2024",
      },
      tableData: [],
      itemSearch: [],
    });
  };

  // Function to fetch data from the API
  // fetchRVSData = async (searchTerm) => {
  // fetchData = async (searchTerm, urlSearch) => {
  //     try {
  //       this.setState({ loading: true });
  //       const response = await axios.get(`${process.env.REACT_APP_API_CLAIMS}codes/${urlSearch}?term=${searchTerm}`);
  //       const data = response.data;
  // if(urlSearch === "serchICDAutocomplete"){
  //       if (Array.isArray(data)) {
  //         this.setState({ autocompleteICDOptions: data });
  //       } else {
  //         this.setState({ autocompleteICDOptions: [] });
  //         }
  //       }else{
  //         if (Array.isArray(data)) {
  //           this.setState({ autocompleteRVSOptions: data });
  //         } else {
  //           this.setState({ autocompleteRVSOptions: [] });
  // }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   };

  // BUKAS AYUS KO TOH LINE NA TO DIAGNOSIS

  fetchData = async (searchTerm, urlSearch) => {
    try {
      this.setState({ loading: true });

      const searchObject = {
        icdcode: "",
        rvscode: "",
        description: searchTerm,
        targetdate: "",
      };
      // console.log(searchObject);

      const response = await axios.post(
        "http://localhost:7001/Claim30Client/Claims/SearchCaseRates",
        searchObject,
        {
          headers: {
            accreno: process.env.REACT_APP_HOSPITALACRRENO,
            softwarecertid: process.env.REACT_APP_USERNAME,
            "Content-Type": "text/plain",
          },
        }
      );

      const data = response.data.result.caserates;
      console.log(data);

      if (urlSearch === "SearchCaseRates") {
        this.setState({
          autocompleteICDOptions: Array.isArray(data) ? data : [],
        });
      } else {
        this.setState({
          autocompleteRVSOptions: Array.isArray(data) ? data : [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  addToTable = (item) => {
    const { tableData } = this.state;

    // Check if the item is already in the table
    if (
      tableData.some(
        (existingItem) => existingItem.pitemCode === item.pitemCode
      )
    ) {
      // Alert user if item is a duplicate
      alert("This item is already in the table.");
    } else {
      // Add item to table if it's not a duplicate
      this.setState((prevState) => ({
        tableData: [...prevState.tableData, item],
        itemSearch: prevState.itemSearch.filter(
          (searchItem) => searchItem.pitemCode !== item.pitemCode
        ), // Remove added item from search results
      }));
    }
  };

  deleteFromTable = (index) => {
    this.setState((prevState) => {
      const removedItem = prevState.tableData[index];
      return {
        tableData: prevState.tableData.filter((_, i) => i !== index),
        itemSearch: [...prevState.itemSearch, removedItem], // Add removed item back to search results
      };
    });
  };

  render() {
    const {
      // data,
      // autocompleteICDOptions,
      // autocompleteRVSOptions,
      itemSearch,
      caseParam,
      tableData,
    } = this.state;

    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    name="description"
                    size="small"
                    label="Description"
                    value={caseParam.description}
                    onChange={this.handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="icdcode"
                    size="small"
                    label="ICD Codes"
                    value={caseParam.icdcode}
                    onChange={this.handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="rvscode"
                    size="small"
                    label="RVS Codes"
                    value={caseParam.rvscode}
                    onChange={this.handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={this.searchCase}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={this.clearData}
                  >
                    Clear
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {this.state.isLoading &&(<LinearProgress />)}

          {itemSearch.length > 0 && (
            <>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={{background: "#efefef"}}
                >
                  <b style={{color: "red"}}>Search result</b>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                      stickyHeader
                      aria-label="sticky table search results"
                      sx={{ minWidth: 650 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">ICD Code</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">RVS Code</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {itemSearch.map((val, i) => (
                          <TableRow key={i}>
                            <TableCell align="center">
                              {val.pitemCode}
                            </TableCell>
                            <TableCell align="center">
                              {val.pitemDescription}
                            </TableCell>
                            <TableCell align="center">
                              {val.rvscode || ""}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.addToTable(val)}
                              >
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </>
          )}

          {tableData.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="table data">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>ICD Code</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>RVS Code</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Description</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>PROCEDURE</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>DATE OF PROCEDURE</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>LEFT</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>RIGHT</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>BOTH</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{data.pitemCode}</TableCell>
                      <TableCell align="center">{data.rvscode || ""}</TableCell>
                      <TableCell align="center">
                        {data.pitemDescription}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          id={`pRelatedProcedure-${index}`}
                          fullWidth
                          name="pRelatedProcedure"
                          size="small"
                          value={data.pRelatedProcedure}
                          onChange={(e) => this.handleChangeTabledata(e, index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          id={`pProcedureDate-${index}`}
                          fullWidth
                          name="pProcedureDate"
                          type="Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          value={data.pProcedureDate}
                          onChange={(e) => this.handleChangeTabledata(e, index)}
                        />
                      </TableCell>
                      {/* Other cells */}
                      <TableCell align="center">
                        <Checkbox
                          name="pLaterality"
                          value="L"
                          checked={data.pLaterality === "L"}
                          onChange={(e) => this.handleCheckboxChange(e, index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name="pLaterality"
                          value="R"
                          checked={data.pLaterality === "R"}
                          onChange={(e) => this.handleCheckboxChange(e, index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name="pLaterality"
                          value="B"
                          checked={data.pLaterality === "B"}
                          onChange={(e) => this.handleCheckboxChange(e, index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => this.deleteFromTable(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TableContainer>
        {/* <p>{JSON.stringify(this.state.data)}</p> */}

        
        <PositionedSnackbar
            open={this.state.isAlert}
            alertMessage={this.state.alertMessage}
            handleAlertClose={this.handleAlertClose}
            alertColor="error"
            //  handleAlertClose={this.handleAlertClose}
          />
      </div>
    );
  }
}

export default DiagnosCode;
