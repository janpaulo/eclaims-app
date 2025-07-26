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
import NumericFormatInput from "../../utils/NumericFormatInput";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

const initialData = {
  pHciPan: "",
  pHciTransmittalId: "",

  SummaryOfFees: {
    RoomAndBoard: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
    },

    DrugsAndMedicine: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
      OtherFundSource: [],
    },

    LaboratoryAndDiagnostic: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
      OtherFundSource: [],
    },

    OperatingRoomFees: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
      OtherFundSource: [],
    },

    MedicalSupplies: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
      OtherFundSource: [],
    },

    Others: {
      SummaryOfFee: {
        pChargesNetOfApplicableVat: "0.00",
        pSeniorCitizenDiscount: "0.00",
        pPWDDiscount: "0.00",
        pPCSO: "0.00",
        pDSWD: "0.00",
        pDOHMAP: "0.00",
        pHMO: "0.00",
      },
      OtherFundSource: [],
    },

    PhilHealth: {
      pTotalCaseRateAmount: "0.00",
    },
    Balance: {
      pAmount: "0.00",
    },
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
          pChargesNetOfApplicableVat: "0.00",
          pSeniorCitizenDiscount: "0.00",
          pPWDDiscount: "0.00",
          pPCSO: "0.00",
          pDSWD: "0.00",
          pDOHMAP: "0.00",
          pHMO: "0.00",
        },
      },
    ],

    PhilHealth: {
      pTotalCaseRateAmount: "0.00",
    },
    Balance: {
      pAmount: "0.00",
    },
  },

  ItemizedBillingItems: {
    ItemizedBillingItem: [
      {
        pItemName: "",
        pItemCode: "",
        pCategory: "",
        pServiceDate: "",
        pUnitOfMeasurement: "",
        pUnitPrice: "0.00",
        pQuantity: "",
        pTotalAmount: "0.00",
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        pItemName: "",
        pItemCode: "",
        pCategory: "",
        pServiceDate: "",
        pUnitOfMeasurement: "",
        pUnitPrice: "",
        pQuantity: "",
        pTotalAmount: "",
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

  const handleSubmit = async () => {
    // Show confirmation before proceeding
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this form?"
    );
    if (!confirmSubmit) return; // Cancel submission if user clicks "Cancel"

    const itemizedErrors =
      formData.ItemizedBillingItems.ItemizedBillingItem.some((item, idx) => {
        for (const [key, value] of Object.entries(item)) {
          if (value === "" || value === null || value === undefined) {
            alert(`ItemizedBillingItem #${idx + 1}: "${key}" is required.`);
            return true;
          }
        }
        return false;
      });

    if (itemizedErrors) return;

    // Validate Professional Fees - only pFirstName
    const professionalErrors = formData.ProfessionalFees.ProfessionalFee.some(
      (prof, idx) => {
        const firstName = prof.ProfessionalInfo?.pFirstName;
        if (!firstName || firstName.trim() === "") {
          alert(`Professional Fee #${idx + 1}: "pFirstName" is required.`);
          return true;
        }
        return false;
      }
    );

    if (professionalErrors) return;
    setIsLoading(true);
    // Format pServiceDate
    const formattedData = {
      ...formData,
      ItemizedBillingItems: {
        ItemizedBillingItem:
          formData.ItemizedBillingItems.ItemizedBillingItem.map((item) => ({
            ...item,
            pServiceDate: item.pServiceDate
              ? moment(item.pServiceDate).format("MM-DD-YYYY")
              : "",
          })),
      },
      pHciPan: authUser.hospital?.accreditation_num,
      pHciTransmittalId: "4619",
    };

    const data = {
      professional_fee: 0,
      hci_no: formattedData.pHciPan,
      date_created: new Date(),
      total_amount: 0,
      sum_philhealth_amount:
        formattedData.SummaryOfFees.PhilHealth.pTotalCaseRateAmount,
      prof_philhealth_amount:
        formattedData.ProfessionalFees.PhilHealth.pTotalCaseRateAmount,
      xml_data: JSON.stringify(formattedData),
    };

    try {
      // **First encrypt the data** (before saving to esoas)
      const encryptResponse = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/EncrypteSOA`,
        formattedData,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.username_code,
            "Content-Type": "text/plain",
          },
        }
      );

      console.log("Encrypted Response:", encryptResponse.data);

      // **Proceed to save to esoas** only if encryption was successful
      const saveResponse = await axios({
        method: "POST",
        url: process.env.REACT_APP_API_CLAIMS + "esoas",
        data: data,
        headers: {
          Authorization: `Bearer ${authUser.access_token}`,
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      alert("Form saved successfully.");
      navigate("/esoa_table_list"); // <-- ✅ Redirect here
    } catch (error) {
      console.error("Error in encryption or save:", error);
      alert("An error occurred while processing the data.");
    }

    console.log("Submitted Form Data:", formattedData);
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
    "pHMO",
  ];
  const itemTypes = [
    "MedicalSupplies",
    "LaboratoryAndDiagnostic",
    "RoomAndBoard",
    "OperatingRoomFees",
    "DrugsAndMedicine",
  ];
  // =================================================================================
  return (
    <Box  p={2}>
      <Typography variant="h6" gutterBottom>
        Electronic Statement of Account Form
      </Typography>

      {/* Summary of Fees sections */}

      {Object.entries(formData.SummaryOfFees).map(
        ([sectionName, sectionData]) => {
          if (sectionName === "PhilHealth") {
            return (
              <Paper
                key="PhilHealthBalance"
                sx={{ p: 2, mb: 2 }}
                variant="outlined"
              >
                <Typography variant="h6" gutterBottom>
                  PhilHealth & Balance
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <NumericFormatInput
                      label={formatLabel("pTotalCaseRateAmount")}
                      value={
                        formData.SummaryOfFees.PhilHealth.pTotalCaseRateAmount
                      }
                      onChange={(val) => {
                        setFormData((prev) => {
                          const updated = structuredClone(prev);
                          updated.SummaryOfFees.PhilHealth.pTotalCaseRateAmount =
                            val;
                          return updated;
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <NumericFormatInput
                      label={formatLabel("pAmount")}
                      value={formData.SummaryOfFees.Balance.pAmount}
                      onChange={(val) => {
                        setFormData((prev) => {
                          const updated = structuredClone(prev);
                          updated.SummaryOfFees.Balance.pAmount = val;
                          return updated;
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            );
          }

          if (sectionName === "Balance") return null;

          return (
            <Accordion key={sectionName} defaultExpanded sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{sectionName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2 }} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid container spacing={2}>
                      {Object.entries(sectionData.SummaryOfFee).map(
                        ([key, value]) => (
                          <Grid item xs={12} sm={4} md={3} key={key}>
                            <NumericFormatInput
                              label={formatLabel(key)}
                              value={value}
                              onChange={(val) =>
                                handleSummaryField(sectionName, key, val)
                              }
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
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
                          <NumericFormatInput
                            label="Amount"
                            value={ofs.pAmount}
                            onChange={(val) =>
                              handleOtherFundSourceField(
                                sectionName,
                                idx,
                                "pAmount",
                                val
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
          );
        }
      )}

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

              {/* Professional Info */}
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
              </Grid>

              {/* Summary of Fee */}
              <Box mt={2}>
                <Typography variant="subtitle1">Summary of Fee</Typography>
                <Grid container spacing={2}>
                  {Object.entries(fee.SummaryOfFee).map(([key, value]) => (
                    <Grid item xs={12} sm={6} md={3} key={key}>
                      <NumericFormatInput
                        label={formatLabel(key)}
                        value={value}
                        onChange={(val) =>
                          handleProfessionalFeeChange(
                            idx,
                            "SummaryOfFee",
                            key,
                            val
                          )
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box mt={2}>
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

          {/* PhilHealth & Balance at the parent level */}
          <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
            <Typography variant="subtitle1">PhilHealth & Balance</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <NumericFormatInput
                  label={formatLabel("pTotalCaseRateAmount")}
                  value={
                    formData.ProfessionalFees.PhilHealth
                      ?.pTotalCaseRateAmount || ""
                  }
                  onChange={(val) => {
                    setFormData((prev) => {
                      const updated = structuredClone(prev);
                      updated.ProfessionalFees.PhilHealth.pTotalCaseRateAmount =
                        val;
                      return updated;
                    });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <NumericFormatInput
                  label={formatLabel("pAmount")}
                  value={formData.ProfessionalFees.Balance?.pAmount || ""}
                  onChange={(val) => {
                    setFormData((prev) => {
                      const updated = structuredClone(prev);
                      updated.ProfessionalFees.Balance.pAmount = val;
                      return updated;
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Button
            startIcon={<Add />}
            onClick={addProfessionalFee}
            variant="outlined"
            sx={{ mt: 2 }}
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
                <Typography variant="subtitle1">
                  Item #{idx + 1} ({item.pCategory || "Select Type"})
                </Typography>

                <Grid container spacing={2}>
                  {/* Select Type */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Item Type"
                      value={item.pCategory || ""}
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        handleItemizedChange(idx, "pCategory", selectedType);
                        // Optionally clear pItemName and pItemCode when type changes
                        handleItemizedChange(idx, "pItemName", "");
                        handleItemizedChange(idx, "pItemCode", "");
                      }}
                    >
                      {itemTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {Object.entries(item).map(([key, value]) => {
                    if (
                      key === "pCategory" ||
                      key === "pCategoryType" // we now render category manually
                    )
                      return null;

                    return (
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
                            options={itemOptions.filter(
                              (opt) => opt.cat_id === item.pCategory
                            )}
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option.item_desc
                            }
                            value={
                              itemOptions.find(
                                (opt) => opt.item_desc === item.pItemName
                              ) || item.pItemName
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
                                handleItemizedChange(
                                  idx,
                                  "pServiceDate",
                                  today
                                );
                              } else {
                                handleItemizedChange(
                                  idx,
                                  "pItemName",
                                  newValue || ""
                                );
                              }
                            }}
                            renderOption={(props, option) => (
                              <li {...props} key={option.item_id}>
                                {option.item_desc}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="Item Name" />
                            )}
                          />
                        ) : key === "pQuantity" ? (
                          <TextField
                            fullWidth
                            label={formatLabel(key)}
                            value={value}
                            onChange={(e) => {
                              const quantity = e.target.value;
                              handleItemizedChange(idx, "pQuantity", quantity);

                              const unitPrice = parseFloat(item.pUnitPrice);
                              const qty = parseFloat(quantity);

                              if (!isNaN(qty) && !isNaN(unitPrice)) {
                                const total = (qty * unitPrice).toFixed(2);
                                handleItemizedChange(
                                  idx,
                                  "pTotalAmount",
                                  total
                                );
                              } else {
                                // If either input is invalid, reset total to "0.00"
                                handleItemizedChange(
                                  idx,
                                  "pTotalAmount",
                                  "0.00"
                                );
                              }
                            }}
                          />
                        ) : key === "pUnitPrice" ? (
                          <NumericFormatInput
                            label={formatLabel(key)}
                            value={value}
                            onChange={(val) => {
                              handleItemizedChange(idx, "pUnitPrice", val);

                              const quantity = parseFloat(item.pQuantity);
                              const unitPrice = parseFloat(val);

                              if (!isNaN(quantity) && !isNaN(unitPrice)) {
                                const total = (quantity * unitPrice).toFixed(2);
                                handleItemizedChange(
                                  idx,
                                  "pTotalAmount",
                                  total
                                );
                              } else {
                                // Reset total if values are invalid or cleared
                                handleItemizedChange(
                                  idx,
                                  "pTotalAmount",
                                  "0.00"
                                );
                              }
                            }}
                          />
                        ) : key === "pTotalAmount" ? (
                          <NumericFormatInput
                            label={formatLabel(key)}
                            value={value}
                            disabled
                            onChange={() => {}}
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
                            disabled={key === "pItemCode"}
                            value={value}
                            onChange={(e) =>
                              handleItemizedChange(idx, key, e.target.value)
                            }
                          />
                        )}
                      </Grid>
                    );
                  })}
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
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size="30px" />
            ) : (
              <SendIcon />
            )
          }
          disabled={isLoading}
        >
          Submit Form
        </Button>
      </Box>
    </Box>
  );
};

export default EsoaForm;
