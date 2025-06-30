import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import axios from "axios";

const initialData = {
  pHciPan: "",
  pHciTransmittalId: "",

  SummaryOfFees: {
    RoomAndBoard: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
    },

    DrugsAndMedicine: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
      OtherFundSource: [],
    },

    LaboratoryAndDiagnostic: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
      OtherFundSource: [],
    },

    OperatingRoomFees: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
      OtherFundSource: [],
    },

    MedicalSupplies: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
      OtherFundSource: [],
    },

    Others: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "",
        pSeniorCitizenDiscount: "",
        pPWDDiscount: "",
        pPCSO: "",
        pDSWD: "",
        pDOHMAP: "",
        pHMO: "",
      },
      OtherFundSource: [],
    },
  },

  PhilHealth: {
    pTotalCaseRateAmount: "",
  },

  Balance: {
    pAmount: "",
  },

  ProfessionalFees: {
    ProfessionalFee: [
      {
        ProfessionalInfo: {
          pPAN: "",
          pFirstName: "",
          pMiddleName: "",
          pLastName: "",
          pSuffixName: "",
        },
        SummaryOfFee: {
          pChargesNetOfApplicableVat: "",
          pSeniorCitizenDiscount: "",
          pPWDDiscount: "",
          pPCSO: "",
          pDSWD: "",
          pDOHMAP: "",
          pHMO: "",
        },
      },
      {
        ProfessionalInfo: {
          pPAN: "",
          pFirstName: "",
          pMiddleName: "",
          pLastName: "",
          pSuffixName: "",
        },
        SummaryOfFee: {
          pChargesNetOfApplicableVat: "",
          pSeniorCitizenDiscount: "",
          pPWDDiscount: "",
          pPCSO: "",
          pDSWD: "",
          pDOHMAP: "",
          pHMO: "",
        },
      },
    ],
  },

  ItemizedBillingItems: {
    ItemizedBillingItem: [
      {
        pServiceDate: "",
        pItemName: "",
        pItemCode: "",
        pUnitOfMeasurement: "",
        pUnitPrice: "",
        pQuantity: "",
        pTotalAmount: "",
        pCategory: "",
      },
    ],
  },
};

// Label formatter function
const formatLabel = (key) => {
  const customLabels = {
    pChargesNetOfApplicableVat: "Charges (Net of VAT)",
    pSeniorCitizenDiscount: "Senior Citizen Discount",
    pPWDDiscount: "PWD Discount",
    pPCSO: "PCSO",
    pDSWD: "DSWD",
    pDOHMAP: "DOH MAP",
    pHMO: "HMO",
    pTotalCaseRateAmount: "Total Case Rate Amount",
    pAmount: "Balance Amount",
    pPAN: "PAN",
    pFirstName: "First Name",
    pMiddleName: "Middle Name",
    pLastName: "Last Name",
    pSuffixName: "Suffix Name",
    pServiceDate: "Service Date",
    pItemCode: "Item Code",
    pItemName: "Item Name",
    pUnitOfMeasurement: "Unit of Measurement",
    pUnitPrice: "Unit Price",
    pQuantity: "Quantity",
    pTotalAmount: "Total Amount",
    pCategory: "Category",
    pDescription: "Description",
  };

  return customLabels[key] || key.replace(/([a-z])([A-Z])/g, "$1 $2");
};

// --- COMPONENT --------------------------------------------------------------------
const EsoaForm = ({ authUser }) => {
  const [formData, setFormData] = useState(initialData);
  const [unitOptions, setUnitOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: authUser.access_token,
      accreno: authUser.hospital?.accreditation_num,
      softwarecertid: authUser.hospital?.username_code,
      "Content-Type": "text/plain",
    };

    const fetchUnits = axios.get(
      `${process.env.REACT_APP_API_CLAIMS}esoa-units`,
      { headers }
    );
    const fetchItems = axios.get(
      `${process.env.REACT_APP_API_CLAIMS}esoa-items`,
      { headers }
    );

    Promise.all([fetchUnits, fetchItems])
      .then(([unitsRes, itemsRes]) => {
        setUnitOptions(unitsRes.data); // from /esoa-units
        setItemOptions(itemsRes.data); // from /esoa-items
      })
      .catch((error) => {
        console.error("Error fetching unit or item data:", error);
      });
  }, []);

  // ------ root level fields -------------------------------------------------------
  const handleRootChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ------ SummaryOfFees -> SummaryOfFee ------------------------------------------
  const handleSummaryField = (section, key, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.SummaryOfFees[section].SummaryOfFee[key] = value;
      return updated;
    });
  };

  // ------ OtherFundSource items ---------------------------------------------------
  const handleOtherFundSourceField = (section, index, key, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.SummaryOfFees[section].OtherFundSource[index][key] = value;
      return updated;
    });
  };

  const addOtherFundSource = (section) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      if (!updated.SummaryOfFees[section].OtherFundSource) {
        updated.SummaryOfFees[section].OtherFundSource = [];
      }
      updated.SummaryOfFees[section].OtherFundSource.push({
        pDescription: "",
        pAmount: "",
      });
      return updated;
    });
  };

  const removeOtherFundSource = (section, index) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.SummaryOfFees[section].OtherFundSource.splice(index, 1);
      return updated;
    });
  };

  // ------ PhilHealth & Balance ----------------------------------------------------
  const handlePhilHealthChange = (field, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.PhilHealth[field] = value;
      return updated;
    });
  };

  const handleBalanceChange = (field, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.Balance[field] = value;
      return updated;
    });
  };

  const handleProfessionalFeeChange = (index, section, key, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ProfessionalFees.ProfessionalFee[index][section][key] = value;
      return updated;
    });
  };

  const addProfessionalFee = () => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ProfessionalFees.ProfessionalFee.push({
        ProfessionalInfo: {
          pPAN: "",
          pFirstName: "",
          pMiddleName: "",
          pLastName: "",
          pSuffixName: "",
        },
        SummaryOfFee: {
          pChargesNetOfApplicableVat: "",
          pSeniorCitizenDiscount: "",
          pPWDDiscount: "",
          pPCSO: "",
          pDSWD: "",
          pDOHMAP: "",
          pHMO: "",
        },
      });
      return updated;
    });
  };

  const removeProfessionalFee = (index) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ProfessionalFees.ProfessionalFee.splice(index, 1);
      return updated;
    });
  };

  const handleItemizedChange = (index, key, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ItemizedBillingItems.ItemizedBillingItem[index][key] = value;
      return updated;
    });
  };

  const addItemized = () => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ItemizedBillingItems.ItemizedBillingItem.push({
        pServiceDate: "",
        pItemCode: "",
        pItemName: "",
        pUnitOfMeasurement: "",
        pUnitPrice: "",
        pQuantity: "",
        pTotalAmount: "",
        pCategory: "",
      });
      return updated;
    });
  };

  const removeItemized = (index) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.ItemizedBillingItems.ItemizedBillingItem.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Form Data:", formData);
    alert("Form data dumped to console (dev tools)");
  };

  const numericFields = [
    "pQuantity",
    "pUnitPrice",
    "pTotalAmount",
    "pAmount",
    "pChargesNetOfApplicableVat",
    "pSeniorCitizenDiscount",
    "pPWDDiscount",
    "pPCSO",
    "pDSWD",
    "pDOHMAP",
    "pHMO"
  ];

  // =================================================================================
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Electronic Statement of Account Form
      </Typography>

      {/* Summary of Fees sections */}
      {Object.entries(formData.SummaryOfFees).map(
        ([sectionName, sectionData]) => (
          <Accordion key={sectionName} defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{sectionName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ p: 2 }} variant="outlined">
                {/* SummaryOfFee fields */}
                <Typography variant="subtitle1">Summary of Fee</Typography>
                <Grid container spacing={2}>
                  {Object.entries(sectionData.SummaryOfFee).map(
                    ([key, value]) => (
                      <Grid item xs={12} sm={4} md={3} key={key}>
                        <TextField
                          fullWidth
                          label={formatLabel(key)}
                          value={value}
                          inputMode={numericFields.includes(key) ? "decimal" : "text"}
                          inputProps={numericFields.includes(key) ? { pattern: "[0-9]*[.,]?[0-9]*" } : {}}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!numericFields.includes(key) || /^\d*\.?\d*$/.test(val) || val === "") {
                              handleSummaryField(sectionName, key, val); // Or relevant handler
                            }
                          }}
                        />
                      </Grid>
                    )
                  )}
                </Grid>

                {/* Other Fund Source */}
                {sectionData.OtherFundSource?.map((ofs, idx) => (
                  <Box key={idx} mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Other Fund Source #{idx + 1}
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="Description"
                          value={ofs.pDescription}
                          onChange={(e) =>
                            handleOtherFundSourceField(
                              sectionName,
                              idx,
                              "pDescription",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="Amount"
                          value={ofs.pAmount}
                          onChange={(e) =>
                            handleOtherFundSourceField(
                              sectionName,
                              idx,
                              "pAmount",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <IconButton
                          color="error"
                          onClick={() =>
                            removeOtherFundSource(sectionName, idx)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                <Box mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => addOtherFundSource(sectionName)}
                  >
                    Add Other Fund Source
                  </Button>
                </Box>
              </Paper>
            </AccordionDetails>
          </Accordion>
        )
      )}

      {/* PhilHealth Section */}
      <Paper sx={{ p: 2 }} variant="outlined">
        <Typography variant="h6">PhilHealth</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Total Case Rate Amount"
              value={formData.PhilHealth.pTotalCaseRateAmount}
              onChange={(e) =>
                handlePhilHealthChange("pTotalCaseRateAmount", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Amount"
              value={formData.Balance.pAmount}
              onChange={(e) => handleBalanceChange("pAmount", e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* PROFESSIONAL FEES */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Professional Fees</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {formData.ProfessionalFees?.ProfessionalFee.map((fee, idx) => (
            <Paper key={idx} sx={{ p: 2, mb: 2 }} variant="outlined">
              <Typography variant="subtitle1">
                Professional #{idx + 1}
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(fee.ProfessionalInfo).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <TextField
                      fullWidth
                      label={formatLabel(key)}
                      value={value}
                      onChange={(e) =>
                        handleProfessionalFeeChange(
                          idx,
                          "ProfessionalInfo",
                          key,
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                ))}
                {Object.entries(fee.SummaryOfFee).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <TextField
                      fullWidth
                      label={formatLabel(key)}
                      value={value}
                      onChange={(e) =>
                        handleProfessionalFeeChange(
                          idx,
                          "SummaryOfFee",
                          key,
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              <Box mt={1}>
                <Button
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => removeProfessionalFee(idx)}
                >
                  Remove Professional
                </Button>
              </Box>
            </Paper>
          ))}
          <Button
            startIcon={<Add />}
            onClick={addProfessionalFee}
            variant="outlined"
          >
            Add Professional Fee
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* ITEMIZED BILLING ITEMS */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Itemized Billing Items</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {formData.ItemizedBillingItems?.ItemizedBillingItem.map(
            (item, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2 }} variant="outlined">
                <Typography variant="subtitle1">Item #{idx + 1}</Typography>
                <Grid container spacing={2}>
                  {Object.entries(item).map(([key, value]) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      {key === "pUnitOfMeasurement" ? (
                        <TextField
                          select
                          fullWidth
                          label={formatLabel(key)}
                          value={value}
                          onChange={(e) =>
                            handleItemizedChange(idx, key, e.target.value)
                          }
                        >
                          {unitOptions.map((option) => (
                            <MenuItem
                              key={option.unit_id}
                              value={option.unit_desc}
                            >
                              {option.unit_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : key === "pItemName" ? (
                        <Autocomplete
                          fullWidth
                          freeSolo
                          options={itemOptions}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.item_desc
                          }
                          value={
                            itemOptions.find(
                              (opt) => opt.item_desc === value
                            ) || value
                          }
                          onChange={(event, newValue) => {
                            const today = new Date()
                              .toISOString()
                              .split("T")[0];
                            if (
                              typeof newValue === "object" &&
                              newValue !== null
                            ) {
                              handleItemizedChange(
                                idx,
                                "pItemName",
                                newValue.item_desc
                              );
                              handleItemizedChange(
                                idx,
                                "pItemCode",
                                newValue.item_id
                              );
                              handleItemizedChange(
                                idx,
                                "pCategory",
                                newValue.cat_id
                              );
                              handleItemizedChange(idx, "pServiceDate", today);
                            } else {
                              handleItemizedChange(
                                idx,
                                "pItemName",
                                newValue || ""
                              );
                            }
                          }}
                          onInputChange={(event, newInputValue) => {
                            if (typeof newInputValue === "string") {
                              handleItemizedChange(
                                idx,
                                "pItemName",
                                newInputValue
                              );
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label={formatLabel(key)} />
                          )}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          type={key === "pServiceDate" ? "date" : "text"}
                          label={formatLabel(key)}
                          InputLabelProps={
                            key === "pServiceDate"
                              ? { shrink: true }
                              : undefined
                          }
                          value={value}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            handleItemizedChange(idx, key, newValue);

                            // Auto compute pTotalAmount
                            if (key === "pQuantity" || key === "pUnitPrice") {
                              const quantity = parseFloat(
                                key === "pQuantity" ? newValue : item.pQuantity
                              );
                              const unitPrice = parseFloat(
                                key === "pUnitPrice"
                                  ? newValue
                                  : item.pUnitPrice
                              );
                              const total =
                                !isNaN(quantity) && !isNaN(unitPrice)
                                  ? (quantity * unitPrice).toFixed(2)
                                  : "";
                              handleItemizedChange(idx, "pTotalAmount", total);
                            }
                          }}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Box mt={1}>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => removeItemized(idx)}
                  >
                    Remove Item
                  </Button>
                </Box>
              </Paper>
            )
          )}

          <Button startIcon={<Add />} onClick={addItemized} variant="outlined">
            Add Itemized Billing
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Submit Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Submit Form
        </Button>
      </Box>
    </Box>
  );
};

export default EsoaForm;
