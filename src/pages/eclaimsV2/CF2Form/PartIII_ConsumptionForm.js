import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  FormGroup,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const PartIII_ConsumptionForm = ({ data = {}, onChange }) => {
  // Safe fallback if CONSUMPTION or subkeys are missing
  const defaultConsumption = {
    pEnoughBenefits: "N",
    BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES: [
      {
        BENEFITS: {
          pTotalHCIFees: "",
          pTotalProfFees: "",
          pGrandTotal: "",
        },
      },
      {
        HCIFEES: {
          pTotalActualCharges: "",
          pDiscount: "",
          pPhilhealthBenefit: "",
          pTotalAmount: "",
          pMemberPatient: "N",
          pHMO: "N",
          pOthers: "N",
        },
      },
      {
        PROFFEES: {
          pTotalActualCharges: "",
          pDiscount: "",
          pPhilhealthBenefit: "",
          pTotalAmount: "",
          pMemberPatient: "N",
          pHMO: "N",
          pOthers: "N",
        },
      },
      {
        PURCHASES: {
          pDrugsMedicinesSupplies: "N",
          pDMSTotalAmount: "",
          pExaminations: "N",
          pExamTotalAmount: "",
        },
      },
    ],
  };

  const consumption = {
    ...defaultConsumption,
    ...(data.CONSUMPTION || {}),
  };

  const getSection = (key) =>
    consumption.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES.find((x) => x[key])?.[
      key
    ] || {};

  const benefit = getSection("BENEFITS");
  const hcifees = getSection("HCIFEES");
  const proffees = getSection("PROFFEES");
  const purchases = getSection("PURCHASES");

  const updateSection = (section, field, value) => {
    const updatedList = consumption.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES.map(
      (entry) => {
        if (entry[section]) {
          return {
            [section]: {
              ...entry[section],
              [field]: value,
            },
          };
        }
        return entry;
      }
    );

    onChange({
      ...data,
      CONSUMPTION: {
        ...consumption,
        BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES: updatedList,
      },
    });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>
          {" "}
          CERTIFICATION OF CONSUMPTION OF BENEFITS
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography gutterBottom>
            PhilHealth benefit is enough to cover HCI and PF Charges. No
            purchase of drugs/medicines, supplies, diagnostics, and co-pay for
            professional fees by the member/patient.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={consumption.pEnoughBenefits === "Y"}
                onChange={(e) =>
                  onChange({
                    ...data,
                    CONSUMPTION: {
                      ...consumption,
                      pEnoughBenefits: e.target.checked ? "Y" : "N",
                    },
                  })
                }
              />
            }
            label="Yes"
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Total Health Care Institution Fees"
                fullWidth
                value={benefit.pTotalHCIFees}
                onChange={(e) =>
                  updateSection(
                    "BENEFITS",
                    "pTotalHCIFees",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Total Professional Fees"
                fullWidth
                value={benefit.pTotalProfFees}
                onChange={(e) =>
                  updateSection("BENEFITS", "pTotalProfFees", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Grand Total"
                fullWidth
                value={benefit.pGrandTotal}
                onChange={(e) =>
                  updateSection("BENEFITS", "pGrandTotal", e.target.value)
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography gutterBottom>
            The benefit of the member/patient was completely consumed prior to
            co-pay OR the benefit of the member/patient is not completely
            consumed BUT with purchases/expenses for drugs/medicines, supplies,
            diagnostics and others.
          </Typography>

          {/* HCIFEES */}
          <Typography variant="subtitle1">
            Total Health Care Institution Fees
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Total Actual Charges"
                fullWidth
                value={hcifees.pTotalActualCharges}
                onChange={(e) =>
                  updateSection(
                    "HCIFEES",
                    "pTotalActualCharges",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Discount"
                fullWidth
                value={hcifees.pDiscount}
                onChange={(e) =>
                  updateSection("HCIFEES", "pDiscount", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="PhilHealth Benefit"
                fullWidth
                value={hcifees.pPhilhealthBenefit}
                onChange={(e) =>
                  updateSection("HCIFEES", "pPhilhealthBenefit", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Amount After Deduction"
                fullWidth
                value={hcifees.pTotalAmount}
                onChange={(e) =>
                  updateSection("HCIFEES", "pTotalAmount", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hcifees.pMemberPatient === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "HCIFEES",
                          "pMemberPatient",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="Member/Patient"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hcifees.pHMO === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "HCIFEES",
                          "pHMO",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="HMO"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hcifees.pOthers === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "HCIFEES",
                          "pOthers",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="Others"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* PROFFEES */}
          <Typography variant="subtitle1">Total Professional Fees</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Total Actual Charges"
                fullWidth
                value={proffees.pTotalActualCharges}
                onChange={(e) =>
                  updateSection(
                    "PROFFEES",
                    "pTotalActualCharges",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Discount"
                fullWidth
                value={proffees.pDiscount}
                onChange={(e) =>
                  updateSection("PROFFEES", "pDiscount", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="PhilHealth Benefit"
                fullWidth
                value={proffees.pPhilhealthBenefit}
                onChange={(e) =>
                  updateSection(
                    "PROFFEES",
                    "pPhilhealthBenefit",
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Amount After Deduction"
                fullWidth
                value={proffees.pTotalAmount}
                onChange={(e) =>
                  updateSection("PROFFEES", "pTotalAmount", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={proffees.pMemberPatient === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "PROFFEES",
                          "pMemberPatient",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="Member/Patient"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={proffees.pHMO === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "PROFFEES",
                          "pHMO",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="HMO"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={proffees.pOthers === "Y"}
                      onChange={(e) =>
                        updateSection(
                          "PROFFEES",
                          "pOthers",
                          e.target.checked ? "Y" : "N"
                        )
                      }
                    />
                  }
                  label="Others"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* PURCHASES */}
          <Typography variant="subtitle1">
            Purchases / Expenses NOT Included in Health Care Institution Charges
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={purchases.pDrugsMedicinesSupplies === "Y"}
                    onChange={(e) =>
                      updateSection(
                        "PURCHASES",
                        "pDrugsMedicinesSupplies",
                        e.target.checked ? "Y" : "N"
                      )
                    }
                  />
                }
                label="Drugs / Medicines / Medical Supplies"
              />
              <TextField
                label="Total Amount"
                fullWidth
                value={purchases.pDMSTotalAmount}
                onChange={(e) =>
                  updateSection("PURCHASES", "pDMSTotalAmount", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={purchases.pExaminations === "Y"}
                    onChange={(e) =>
                      updateSection(
                        "PURCHASES",
                        "pExaminations",
                        e.target.checked ? "Y" : "N"
                      )
                    }
                  />
                }
                label="Laboratory / Diagnostics"
              />
              <TextField
                label="Total Amount"
                fullWidth
                value={purchases.pExamTotalAmount}
                onChange={(e) =>
                  updateSection("PURCHASES", "pExamTotalAmount", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default PartIII_ConsumptionForm;
