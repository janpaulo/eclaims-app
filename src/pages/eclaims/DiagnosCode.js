import React from 'react';
import { Table, TableBody, TableRow, TableCell, TextField, Button, Checkbox, TableContainer,TableHead, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

class DiagnosCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.diagnosCodeData,
      data2: [],
      autocompleteICDOptions: [],
      autocompleteRVSOptions: [],
    };
  }
  handleChange = (e, i) => {
    const { name, value } = e.target;
    const { data } = this.state;
    const updatedData = [...data];
    updatedData[i][name] = value;
    this.setState({ data: updatedData });
    this.props.onDataChange(updatedData);
  };

  handleAutocompleteChange = (e, newValue, i,icd2) => {
    const newData = [...this.state.data];
if (icd2 !== undefined) {
    newData[i].selecttedICD = newValue;
} else{
        newData[i].selecttedRVS = newValue;
      }
    this.setState({ data: newData });
    this.props.onDataChange(newData);

  };

  handleCheckboxChange = (e, i) => {
    const { name, value, checked } = e.target;
    this.setState(prevState => {
      const newData = [...prevState.data];
      newData[i] = {
        ...newData[i],
        [name]: checked ? value : null
      };
      this.setState({ data: newData });
      this.props.onDataChange(newData);
    });
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

  
  // Function to fetch data from the API
  // fetchRVSData = async (searchTerm) => {
fetchData = async (searchTerm, urlSearch) => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(`${process.env.REACT_APP_API_CLAIMS}codes/${urlSearch}?term=${searchTerm}`);
      const data = response.data;
if(urlSearch === "serchICDAutocomplete"){
      if (Array.isArray(data)) {
        this.setState({ autocompleteICDOptions: data });
      } else {
        this.setState({ autocompleteICDOptions: [] });
        }
      }else{
        if (Array.isArray(data)) {
          this.setState({ autocompleteRVSOptions: data });
        } else {
          this.setState({ autocompleteRVSOptions: [] });
}
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { data, autocompleteICDOptions, autocompleteRVSOptions } = this.state;
    return (
      <div>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">DIAGNOSIS</TableCell>
                <TableCell align="center">ICD 10 CODES</TableCell>
                <TableCell align="center">PROCEDURE</TableCell>
                <TableCell align="center">RSVCODES</TableCell>
                <TableCell align="center">DATE OF PROCEDURE</TableCell>
                <TableCell align="center">LEFT</TableCell>
                <TableCell align="center">RIGHT</TableCell>
                <TableCell align="center">BOTH</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={this.handleClick}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((val, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                    <textarea
                    name="pDischargeDiagnosis"
                    value={val.pDischargeDiagnosis === null ? val.pDischargeDiagnosis : val.selecttedICD === undefined || val.selecttedICD === null  ?  val.pDischargeDiagnosis= "" : val.pDischargeDiagnosis = val.selecttedICD.description}
                    style={{ width: "100%", height: "100%" }}
                    onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                <TableCell align="center">
                  <Autocomplete
                    style={{ width: "350px" }}
                    size="small"
                    
                    options={autocompleteICDOptions}
                    getOptionLabel={(option) => option.icd_10_code  + ' - ' + option.description}
                    value={val.selecttedICD} // Provide a value prop to control the component
                    onChange={(e, newValue) => this.handleAutocompleteChange(e, newValue, i, "icd2")}
                    renderInput={(params) => <TextField {...params}  label="Search ICD Codes" />}
                    onInputChange={(e, newInputValue) => {
                      this.fetchData(newInputValue, "serchICDAutocomplete");

                    }}
                  />
                      <input
                      hidden
                      
                      id={`pICDCode-${i}`}
                      fullWidth
                      name="pICDCode"
                      size="small"
                      value={val.pICDCode === null ? val.pICDCode : val.selecttedICD === undefined || val.selecttedICD === null  ?  val.pICDCode : val.pICDCode = val.selecttedICD.icd_10_code}
                    />
                    

                </TableCell>
                  <TableCell align="center">
                    <TextField
                      id={`pRelatedProcedure-${i}`}
                      fullWidth
                      name="pRelatedProcedure"
                      size="small"
                      value={val.pRelatedProcedure}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">

                    <Autocomplete
                      style={{ width: "350px" }}
                      size="small"
                      
                      options={autocompleteRVSOptions}
                      getOptionLabel={(option) => option.rvs_code + " - " + option.description}
                      value={val.selecttedRVS} // Provide a value prop to control the component
                      onChange={(e, newValue) => this.handleAutocompleteChange(e, newValue, i)}
                      renderInput={(params) => <TextField {...params}  label="Search RVS Codes" />}
                      onInputChange={(e, newInputValue) => {
                        this.fetchData(newInputValue, "serchRVSAutocomplete");
                      }}
                    />

                      <input
                        hidden
                        
                        id={`pICDCode-${i}`}
                        fullWidth
                        name="pICDCode"
                        size="small"
                        value={val.pICDCode === null ? val.pICDCode : val.selecttedRVS === undefined || val.selecttedRVS === null  ?  val.pICDCode : val.pICDCode = val.selecttedRVS.rvs_code}
                      />

{/*                     
                    <TextField
                      id={`pRVSCode-${i}`}
                      fullWidth
                      name="pRVSCode"
                      size="small"
                      value={val.pRVSCode}
                      onChange={(e) => this.handleChange(e, i)}
                    /> */}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id={`pProcedureDate-${i}`}
                      fullWidth
                      name="pProcedureDate"
                      type="Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={val.pProcedureDate}
                      onChange={(e) => this.handleChange(e, i)}
                    />
                  </TableCell>
                <TableCell align="center">
                  <Checkbox
                    name="pLaterality"
                    value="L"
                    checked={val.pLaterality === "L"}
                    onChange={(e) => this.handleCheckboxChange(e, i)}
                  />
                  </TableCell>
                   <TableCell align="center">
                  <Checkbox
                    name="pLaterality"
                    value="R"
                    checked={val.pLaterality === "R"}
                    onChange={(e) => this.handleCheckboxChange(e, i)}
                  />
                  </TableCell>
                  <TableCell align="center">
                  <Checkbox
                    name="pLaterality"
                    value="B"
                    checked={val.pLaterality === "B"}
                    onChange={(e) => this.handleCheckboxChange(e, i)}
                  />
                </TableCell>

                {/* Add other cells for additional fields */}

                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick={() => this.handleDelete(i)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
         {/* <p>{JSON.stringify(this.state.data)}</p> */}
      </div>
    );
  }
}

export default DiagnosCode;
