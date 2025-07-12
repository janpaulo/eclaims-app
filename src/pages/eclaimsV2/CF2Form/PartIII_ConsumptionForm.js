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
    HCIFEES: {
      pTotalActualCharges: "",
      pDiscount: "",
      pPhilhealthBenefit: "",
      pTotalAmount: "",
      pMemberPatient: "N",
      pHMO: "N",
      pOthers: "N",
    },
    PROFFEES: {
      pTotalActualCharges: "",
      pDiscount: "",
      pPhilhealthBenefit: "",
      pTotalAmount: "",
      pMemberPatient: "N",
      pHMO: "N",
      pOthers: "N",
    },
    PURCHASES: {
      pDrugsMedicinesSupplies: "N",
      pDMSTotalAmount: "",
      pExaminations: "N",
      pExamTotalAmount: "",
    },
    BENEFITS: {
      pTotalHCIFees: "",
      pTotalProfFees: "",
      pGrandTotal: "",
    },
  };

  const consumption = {
    ...defaultConsumption,
    ...(data.CONSUMPTION || {}),
  };

  const getSection = (key) => consumption?.[key] || {};

  const benefit = getSection("BENEFITS");
  const hcifees = getSection("HCIFEES");
  const proffees = getSection("PROFFEES");
  const purchases = getSection("PURCHASES");

  useEffect(() => {
    const hci = parseFloat(benefit.pTotalHCIFees) || 0;
    const prof = parseFloat(benefit.pTotalProfFees) || 0;
    const grandTotal = hci + prof;

    // Only update if value changed to prevent re-render loop
    if (parseFloat(benefit.pGrandTotal) !== grandTotal) {
      updateSection("BENEFITS", "pGrandTotal", grandTotal.toFixed(2));
    }
  }, [benefit.pTotalHCIFees, benefit.pTotalProfFees]);

  const updateSection = (section, field, value) => {
    const updatedSection = {
      ...consumption[section],
      [field]: value,
    };

    // Ensure only BENEFITS or HCIFEES + PROFFEES + PURCHASES are present
    const filteredConsumption =
      consumption.pEnoughBenefits === "Y"
        ? {
            pEnoughBenefits: "Y",
            BENEFITS: updatedSection,
          }
        : {
            pEnoughBenefits: "N",
            ...((section === "HCIFEES" && { HCIFEES: updatedSection }) || {
              HCIFEES: consumption.HCIFEES,
            }),
            ...((section === "PROFFEES" && { PROFFEES: updatedSection }) || {
              PROFFEES: consumption.PROFFEES,
            }),
            ...((section === "PURCHASES" && { PURCHASES: updatedSection }) || {
              PURCHASES: consumption.PURCHASES,
            }),
          };

    onChange({
      ...data,
      CONSUMPTION: filteredConsumption,
    });
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography> CERTIFICATION OF CONSUMPTION OF BENEFITS</Typography>
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

          <fieldset
            disabled={consumption.pEnoughBenefits === "N"}
            style={{ border: 0, padding: 0 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Total Health Care Institution Fees"
                  fullWidth
                  value={benefit.pTotalHCIFees}
                  onChange={(e) =>
                    updateSection("BENEFITS", "pTotalHCIFees", e.target.value)
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
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </fieldset>
          <Divider sx={{ my: 2 }} />

          <Typography gutterBottom>
            The benefit of the member/patient was completely consumed prior to
            co-pay OR the benefit of the member/patient is not completely
            consumed BUT with purchases/expenses for drugs/medicines, supplies,
            diagnostics and others.
          </Typography>
          <fieldset
            disabled={consumption.pEnoughBenefits === "Y"}
            style={{ border: 0, padding: 0 }}
          >
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
                    updateSection(
                      "HCIFEES",
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
              Purchases / Expenses NOT Included in Health Care Institution
              Charges
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
                    updateSection(
                      "PURCHASES",
                      "pDMSTotalAmount",
                      e.target.value
                    )
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
                    updateSection(
                      "PURCHASES",
                      "pExamTotalAmount",
                      e.target.value
                    )
                  }
                />
              </Grid>
            </Grid>
          </fieldset>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default PartIII_ConsumptionForm;
