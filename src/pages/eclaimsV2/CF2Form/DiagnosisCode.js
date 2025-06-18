import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, LinearProgress, Accordion, AccordionSummary,
  AccordionDetails, Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PositionedSnackbar from "../../../shared/alerts/PositionedSnackbar"; // your snackbar

const DiagnosisCode = ({ diagnosCodeData, onDataChange }) => {
  const [data, setData] = useState(diagnosCodeData);
  const [caseParam, setCaseParam] = useState({
    icdcode: '',
    rvscode: '',
    description: '',
    targetdate: '12-31-2024',
  });
  const [itemSearch, setItemSearch] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setIsAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseParam((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTabledata = (e, i) => {
    const { name, value } = e.target;
    const updatedData = [...tableData];
    updatedData[i][name] = value;
    setTableData(updatedData);
    onDataChange(updatedData);
  };

  const handleCheckboxChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);
    onDataChange(updatedData);
  };

  const addToTable = (item) => {
    if (tableData.some((d) => d.pitemCode === item.pitemCode)) {
      alert('This item is already in the table.');
    } else {
      setTableData((prev) => [...prev, item]);
      setItemSearch((prev) => prev.filter((i) => i.pitemCode !== item.pitemCode));
    }
  };

  const deleteFromTable = (index) => {
    const removedItem = tableData[index];
    setTableData((prev) => prev.filter((_, i) => i !== index));
    setItemSearch((prev) => [...prev, removedItem]);
  };

  const searchCase = () => {
    setIsLoading(true);
    axios.post(
      process.env.REACT_APP_NEW_PHIC_URL + '/SearchCaseRates',
      caseParam,
      {
        headers: {
          accreno: process.env.REACT_APP_HOSPITALACRRENO,
          softwarecertid: process.env.REACT_APP_USERNAME,
          'Content-Type': 'text/plain',
        },
      }
    )
      .then((resp) => {
        const updatedData = resp.data.result.caserates.map((item) => ({
          ...item,
          pLaterality: null,
          pRelatedProcedure: '',
          pProcedureDate: '',
        }));
        setIsLoading(false);
        setIsAlert(updatedData.length === 0);
        setAlertMessage(updatedData.length > 0 ? '' : 'No data record found');
        setItemSearch(updatedData);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const clearData = () => {
    setCaseParam({ icdcode: '', rvscode: '', description: '', targetdate: '12-31-2024' });
    setTableData([]);
    setItemSearch([]);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  name="description"
                  size="small"
                  label="Description"
                  value={caseParam.description}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="icdcode"
                  size="small"
                  label="ICD Codes"
                  value={caseParam.icdcode}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="rvscode"
                  size="small"
                  label="RVS Codes"
                  value={caseParam.rvscode}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={searchCase}>Search</Button>
                <Button variant="contained" color="success" onClick={clearData}>Clear</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {isLoading && <LinearProgress />}

        {itemSearch.length > 0 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background: '#efefef' }}>
              <b style={{ color: 'red' }}>Search result</b>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ICD/RVS Code</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemSearch.map((val, i) => (
                      <TableRow key={i}>
                        <TableCell align="center">{val.pitemCode}</TableCell>
                        <TableCell align="center">{val.pitemDescription}</TableCell>
                        {/* <TableCell align="center">{val.rvscode || ''}</TableCell> */}
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => addToTable(val)}>
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
        )}

        {tableData.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell align="center"><b>Diagnosis</b></TableCell>
                  <TableCell align="center"><b>ICD/RVS Code</b></TableCell>
                  <TableCell align="center"><b>Related Procedure/s (if there’s any)</b></TableCell>
                  {/* <TableCell align="center"><b>RVS Code</b></TableCell> */}
                  <TableCell align="center"><b>DATE OF PROCEDURE</b></TableCell>
                  <TableCell align="center"><b>LEFT</b></TableCell>
                  <TableCell align="center"><b>RIGHT</b></TableCell>
                  <TableCell align="center"><b>BOTH</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{data.pitemDescription}</TableCell>
                    <TableCell align="center">{data.pitemCode}</TableCell>
                    <TableCell align="center">
                      <TextField
                        fullWidth
                        name="pRelatedProcedure"
                        size="small"
                        value={data.pRelatedProcedure || ''}
                        onChange={(e) => handleChangeTabledata(e, index)}
                      />
                    </TableCell>
                    {/* <TableCell align="center">{data.rvscode || ''}</TableCell> */}
                    <TableCell align="center">
                      <TextField
                        fullWidth
                        name="pProcedureDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        value={data.pProcedureDate || ''}
                        onChange={(e) => handleChangeTabledata(e, index)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        name="pLaterality"
                        value="L"
                        checked={data.pLaterality === 'L'}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        name="pLaterality"
                        value="R"
                        checked={data.pLaterality === 'R'}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        name="pLaterality"
                        value="B"
                        checked={data.pLaterality === 'B'}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error" onClick={() => deleteFromTable(index)}>
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

      <PositionedSnackbar
        open={isAlert}
        alertMessage={alertMessage}
        handleAlertClose={handleAlertClose}
        alertColor="error"
      />
    </div>
  );
};

export default DiagnosisCode;
