import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const newDischargeGroup = () => ({
  pDischargeDiagnosis: "",
  ICDCODEOrRVSCODES: [],
});

// const DiagnosisCode = ({ onSubmit }) => {
// const DiagnosisCode = ({ diagnosCodeData, setFormData }) => {

const DiagnosisCode = forwardRef(({ setStoreDataDischarge }, ref) => {
  const [pAdmissionDiagnosis, setAdmissionDiagnosis] = useState("");
  const [dischargeGroups, setDischargeGroups] = useState([newDischargeGroup()]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [caseParam, setCaseParam] = useState({
    icdcode: "",
    rvscode: "",
    description: "",
    targetdate: "12-31-2025",
  });
  const [itemSearch, setItemSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [tempItem, setTempItem] = useState(null);
  const [targetGroupIdx, setTargetGroupIdx] = useState(0);
  const [searchCache, setSearchCache] = useState([]);

  var get_user = localStorage.getItem('item');
  var authUser = JSON.parse(get_user)

  const handleCaseChange = (e) => {
    const { name, value } = e.target;
    setCaseParam((prev) => ({ ...prev, [name]: value }));
  };
  const clearSearch = () => {
    setCaseParam({
      icdcode: "",
      rvscode: "",
      description: "",
      targetdate: "12-31-2025",
    });
    setItemSearch([]);
  };
  const searchCase = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/SearchCaseRates`,
        caseParam,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.username_code,
            "Content-Type": "text/plain",
          },
        }
      );
      const results = res.data.result?.caserates || [];
      const processed = results.map((item) => ({
        pitemCode: item.pitemCode,
        pitemDescription: item.pitemDescription,
        pRelatedProcedure: item.pitemDescription,
        pProcedureDate: "",
        pLaterality: "",
        amount: item.amount,
        pcaseRateCode: item.pcaseRateCode,
      }));
      setItemSearch(processed);
      setSearchCache(processed);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addDischargeGroup = () => {
    const updated = [...dischargeGroups, newDischargeGroup()];
    setDischargeGroups(updated);
    setStoreDataDischarge(updated);
    setTargetGroupIdx(updated.length - 1);
  };

  const removeDischargeItem = (groupIdx, itemIdx) => {
    const updated = [...dischargeGroups];
    const [removed] = updated[groupIdx].ICDCODEOrRVSCODES.splice(itemIdx, 1);
    const code = removed?.ICDCODE?.pICDCode || removed?.RVSCODES?.pRVSCode;
    const existsInCache = searchCache.find((i) => i.pitemCode === code);
    if (code && existsInCache) {
      setItemSearch((prev) => [...prev, existsInCache]);
    }
    setDischargeGroups(updated);
    setStoreDataDischarge(updated);
  };

  const addItemToGroup = (item) => {
    console.log(item);
    setTempItem(item);
    setConfirmDialog("confirm");
  };

  const confirmAdd = () => {
    if (!tempItem) return;
    const updated = [...dischargeGroups];
    const group = updated[targetGroupIdx];
    const isICD = !!caseParam.icdcode || !!caseParam.description;
    if (isICD) {
      group.ICDCODEOrRVSCODES.push({
        ICDCODE: {
          pICDCode: tempItem.pitemCode,
          pRelatedProcedure: tempItem.pRelatedProcedure,
          amount: tempItem.amount,
          pcaseRateCode: tempItem.pcaseRateCode,
        },
      });
    } else {
      group.ICDCODEOrRVSCODES.push({
        RVSCODES: {
          pRVSCode: tempItem.pitemCode,
          pRelatedProcedure: tempItem.pRelatedProcedure,
          pProcedureDate: tempItem.pProcedureDate,
          pLaterality: tempItem.pLaterality,
          amount: tempItem.amount,
          pcaseRateCode: tempItem.pcaseRateCode,
        },
      });
    }

    setDischargeGroups(updated);
    setStoreDataDischarge(updated);
    setItemSearch((prev) =>
      prev.filter((i) => i.pitemCode !== tempItem.pitemCode)
    );
    setTempItem(null);
    setConfirmDialog(null);
  };

  const updateRVSField = (gIdx, rIdx, field, value) => {
    const updated = [...dischargeGroups];
    const rvsItem = updated[gIdx].ICDCODEOrRVSCODES[rIdx]?.RVSCODES;
    if (rvsItem) rvsItem[field] = value;
    setDischargeGroups(updated);
    setStoreDataDischarge(updated);
  };

  const removeDischargeGroup = (indexToRemove) => {
    const updated = [...dischargeGroups];
    updated.splice(indexToRemove, 1); // remove selected group
    setDischargeGroups(updated);
    setStoreDataDischarge(updated);

    // Adjust target index if needed
    if (targetGroupIdx >= updated.length) {
      setTargetGroupIdx(Math.max(0, updated.length - 1));
    }
  };

  const transformToDTDOutput = () => ({
    DIAGNOSIS: {
      pAdmissionDiagnosis,
      DISCHARGE: dischargeGroups.map((group) => ({
        pDischargeDiagnosis: group.pDischargeDiagnosis,
        ICDCODEOrRVSCODES: group.ICDCODEOrRVSCODES.map((item) => {
          if (item.ICDCODE) {
            // Return only pICDCode, omit pRelatedProcedure if present
            return {
              ICDCODE: {
                pICDCode: item.ICDCODE.pICDCode,
              },
            };
          } else if (item.RVSCODES) {
            // Keep full RVS entry
            return {
              RVSCODES: item.RVSCODES,
            };
          }
          return item; // fallback
        }),
      })),
    },
  });

  useImperativeHandle(ref, () => ({
    getFormData: () => transformToDTDOutput(),
  }));

  return (
    <Box>
      <TextField
        label="Admission Diagnosis/es"
        fullWidth
        value={pAdmissionDiagnosis}
        onChange={(e) => setAdmissionDiagnosis(e.target.value)}
        sx={{ mb: 2 }}
        row={5}
        required
      />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            size="small"
            value={caseParam.description}
            onChange={handleCaseChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="icdcode"
            label="ICD Code"
            fullWidth
            size="small"
            value={caseParam.icdcode}
            onChange={handleCaseChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="rvscode"
            label="RVS Code"
            fullWidth
            size="small"
            value={caseParam.rvscode}
            onChange={handleCaseChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            size="small"
            fullWidth
            label="Select Discharge Group"
            value={targetGroupIdx}
            onChange={(e) => setTargetGroupIdx(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            {dischargeGroups.map((_, idx) => (
              <MenuItem key={idx} value={idx}>
                Discharge #{idx + 1}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            disabled={
              !(caseParam.description || caseParam.icdcode || caseParam.rvscode)
            }
            onClick={searchCase}
            sx={{ mr: 1 }}
          >
            Search
          </Button>
          <Button variant="outlined" onClick={clearSearch}>
            Clear
          </Button>
        </Grid>
      </Grid>

      {isLoading && <LinearProgress />}

      {itemSearch.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemSearch.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.pitemCode}</TableCell>
                  <TableCell>{item.pitemDescription}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => addItemToGroup(item)}
                      style={{ fontWeight: "700" }}
                    >
                      Discharge #{targetGroupIdx + 1}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {dischargeGroups.map((group, gIdx) => (
        <Accordion key={gIdx} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => setTargetGroupIdx(gIdx)}
          >
            <Typography>Discharge {gIdx + 1}</Typography>{" "}
            {dischargeGroups.length > 1 && (
              <Button
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation(); // prevent expanding accordion
                  removeDischargeGroup(gIdx);
                }}
              >
                Delete
              </Button>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="pDischargeDiagnosis"
              value={group.pDischargeDiagnosis}
              onChange={(e) => {
                const updated = [...dischargeGroups];
                updated[gIdx].pDischargeDiagnosis = e.target.value;
                setDischargeGroups(updated);
              }}
              sx={{ mb: 2 }}
            />

            {group.ICDCODEOrRVSCODES.map((item, idx) =>
              item.ICDCODE ? (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Box>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={2}>
                        <TextField
                          label="ICD Codes"
                          fullWidth
                          value={item.ICDCODE.pICDCode}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          label="Procedure"
                          fullWidth
                          value={item.ICDCODE?.pRelatedProcedure || ""}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          color="error"
                          size="small"
                          onClick={() => removeDischargeItem(gIdx, idx)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Typography variant="body2">ICD Code: {item.ICDCODE.pICDCode}</Typography>
                    <Typography variant="body2">Procedure: {item.RVSCODES?.pRelatedProcedure || ""}</Typography> */}
                  </Box>
                </Box>
              ) : item.RVSCODES ? (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <TextField
                        label="RVS Code"
                        fullWidth
                        value={item.RVSCODES?.pRVSCode || ""}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Procedure"
                        fullWidth
                        value={item.RVSCODES.pRelatedProcedure}
                        onChange={(e) =>
                          updateRVSField(
                            gIdx,
                            idx,
                            "pRelatedProcedure",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Date"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={item.RVSCODES.pProcedureDate}
                        onChange={(e) =>
                          updateRVSField(
                            gIdx,
                            idx,
                            "pProcedureDate",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        label="Laterality"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        value={item.RVSCODES.pLaterality}
                        onChange={(e) =>
                          updateRVSField(
                            gIdx,
                            idx,
                            "pLaterality",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="L">Left</option>
                        <option value="R">Right</option>
                        <option value="B">Both</option>
                        <option value="N">None</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => removeDischargeItem(gIdx, idx)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : null
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Button
        onClick={addDischargeGroup}
        variant="contained"
        sx={{ mr: 2, mt: 2 }}
      >
        Add DISCHARGE
      </Button>
      {/* <Button
        onClick={() => transformToDTDOutput()}
        // onClick={() => onSubmit(transformToDTDOutput())}
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
      >
        Submit / Transform
      </Button> */}

      <Dialog open={!!confirmDialog} onClose={() => setConfirmDialog(null)}>
        <DialogTitle>Confirm Add</DialogTitle>
        <DialogContent>
          Are you sure you want to add this item to the selected group?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(null)}>Cancel</Button>
          <Button onClick={confirmAdd} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default DiagnosisCode;
