import React, { useState } from "react";
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
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";

// --- INITIAL DATA (complete JSON) ------------------------------------------------
// const initialData = {
//   pHciPan: "H93005836",
//   pHciTransmittalId: "4619",

//   SummaryOfFees: {
//     RoomAndBoard: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "0",
//         pSeniorCitizenDiscount: "0",
//         pPWDDiscount: "0",
//         pPCSO: "0",
//         pDSWD: "0",
//         pDOHMAP: "0",
//         pHMO: "0",
//       },
//     },

//     DrugsAndMedicine: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "2695.53",
//         pSeniorCitizenDiscount: "0.00",
//         pPWDDiscount: "539.10",
//         pPCSO: "0.00",
//         pDSWD: "0.00",
//         pDOHMAP: "0.00",
//         pHMO: "0.00",
//       },
//       OtherFundSource: [
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//       ],
//     },

//     LaboratoryAndDiagnostic: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "2832.15",
//         pSeniorCitizenDiscount: "0.00",
//         pPWDDiscount: "566.44",
//         pPCSO: "0.00",
//         pDSWD: "0.00",
//         pDOHMAP: "0.00",
//         pHMO: "0.00",
//       },
//       OtherFundSource: [
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//       ],
//     },

//     OperatingRoomFees: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "11607.15",
//         pSeniorCitizenDiscount: "0.00",
//         pPWDDiscount: "2321.43",
//         pPCSO: "0.00",
//         pDSWD: "0.00",
//         pDOHMAP: "0.00",
//         pHMO: "0.00",
//       },
//       OtherFundSource: [
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//       ],
//     },

//     MedicalSupplies: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "8928.58",
//         pSeniorCitizenDiscount: "0.00",
//         pPWDDiscount: "1785.72",
//         pPCSO: "0.00",
//         pDSWD: "0.00",
//         pDOHMAP: "0.00",
//         pHMO: "0.00",
//       },
//       OtherFundSource: [
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//       ],
//     },

//     Others: {
//       SummaryOfFee: {
//         pChargesNetOfApplicableVat: "2678.57",
//         pSeniorCitizenDiscount: "0.00",
//         pPWDDiscount: "535.71",
//         pPCSO: "0.00",
//         pDSWD: "0.00",
//         pDOHMAP: "0.00",
//         pHMO: "0.00",
//       },
//       OtherFundSource: [
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//         { pDescription: "Courtesy Discount", pAmount: "452.85" },
//       ],
//     },
//   },

//   PhilHealth: {
//     pTotalCaseRateAmount: "5460.00",
//   },

//   Balance: {
//     pAmount: "12704.93",
//   },
//   ProfessionalFees: {
//     ProfessionalFee: [
//       {
//         ProfessionalInfo: {
//           pPAN: "1504-2400015-3",
//           pFirstName: "LIFE",
//           pMiddleName: "GOES",
//           pLastName: "ON",
//           pSuffixName: "",
//         },
//         SummaryOfFee: {
//           pChargesNetOfApplicableVat: "20000.00",
//           pSeniorCitizenDiscount: "0.00",
//           pPWDDiscount: "1000.00",
//           pPCSO: "1000.00",
//           pDSWD: "2000.00",
//           pDOHMAP: "3000.00",
//           pHMO: "5000.00",
//         },
//       },
//       {
//         ProfessionalInfo: {
//           pPAN: "1100-2400002-5",
//           pFirstName: "LIVE",
//           pMiddleName: "LOVE",
//           pLastName: "LAUGH",
//           pSuffixName: "",
//         },
//         SummaryOfFee: {
//           pChargesNetOfApplicableVat: "23928.57",
//           pSeniorCitizenDiscount: "0.00",
//           pPWDDiscount: "1785.71",
//           pPCSO: "0.00",
//           pDSWD: "0.00",
//           pDOHMAP: "0.00",
//           pHMO: "5000.00",
//         },
//       },
//     ],
//   },
//   ItemizedBillingItems: {
//     ItemizedBillingItem: [
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "1727",
//         pItemName: "PATHOLOGY: CD8",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "1136.00",
//         pQuantity: "1.00",
//         pTotalAmount: "1136.00",
//         pCategory: "LaboratoryAndDiagnostic",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "",
//         pItemName: "CHEMISTRY: AMYLASE",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "1242.00",
//         pQuantity: "1.00",
//         pTotalAmount: "1242.00",
//         pCategory: "LaboratoryAndDiagnostic",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "1607",
//         pItemName: "CHEMISTRY: IONIZED CA",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "794.00",
//         pQuantity: "1.00",
//         pTotalAmount: "794.00",
//         pCategory: "LaboratoryAndDiagnostic",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "1898",
//         pItemName: "OPERATING ROOM",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "5000.00",
//         pQuantity: "1.00",
//         pTotalAmount: "5000.00",
//         pCategory: "OperatingRoomFees",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "1898",
//         pItemName: "OPERATING ROOM",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "8000.00",
//         pQuantity: "1.00",
//         pTotalAmount: "8000.00",
//         pCategory: "OperatingRoomFees",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "",
//         pItemName: "ASSIST FEE",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "2000.00",
//         pQuantity: "1.00",
//         pTotalAmount: "2000.00",
//         pCategory: "Others",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "",
//         pItemName: "PROCEDURE FEE",
//         pUnitOfMeasurement: "",
//         pUnitPrice: "1000.00",
//         pQuantity: "1.00",
//         pTotalAmount: "1000.00",
//         pCategory: "Others",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "122",
//         pItemName: "SYRINGE DISPOSABLE 50CC W/OUT NEEDLE, 25'S/BX",
//         pUnitOfMeasurement: "BOTTLE",
//         pUnitPrice: "100.00",
//         pQuantity: "50.00",
//         pTotalAmount: "5000.00",
//         pCategory: "MedicalSupplies",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "3",
//         pItemName: "ALCOHOL ISOPROPHYL 70%, 500ML.",
//         pUnitOfMeasurement: "PIECE",
//         pUnitPrice: "100.00",
//         pQuantity: "50.00",
//         pTotalAmount: "5000.00",
//         pCategory: "MedicalSupplies",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "ASPIR0000000066TAB490000000000",
//         pItemName: "ASPIRIN 80 mg TABLET",
//         pUnitOfMeasurement: "PIECE",
//         pUnitPrice: "166.68",
//         pQuantity: "10.00",
//         pTotalAmount: "1666.80",
//         pCategory: "DrugsAndMedicine",
//       },
//       {
//         pServiceDate: "03-21-2025",
//         pItemCode: "PARAC0000000047TAB490000000000",
//         pItemName: "PARACETAMOL 500 mg TABLET",
//         pUnitOfMeasurement: "PIECE",
//         pUnitPrice: "135.22",
//         pQuantity: "10.00",
//         pTotalAmount: "1352.20",
//         pCategory: "DrugsAndMedicine",
//       },
//     ],
//   },
// };

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
        pItemCode: "",
        pItemName: "",
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
const EsoaForm = () => {
  const [formData, setFormData] = useState(initialData);

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

  // =================================================================================
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
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
                      <Grid item xs={12} sm={6} md={4} key={key}>
                        <TextField
                          fullWidth
                          label={formatLabel(key)}
                          value={value}
                          onChange={(e) =>
                            handleSummaryField(sectionName, key, e.target.value)
                          }
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
                  <Grid item xs={12} sm={6} md={4} key={key}>
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
                  <Grid item xs={12} sm={6} md={4} key={key}>
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
                      <TextField
                        fullWidth
                        label={formatLabel(key)}
                        value={value}
                        onChange={(e) =>
                          handleItemizedChange(idx, key, e.target.value)
                        }
                      />
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
