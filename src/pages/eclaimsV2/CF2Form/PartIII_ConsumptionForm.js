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
import { NumericFormat } from "react-number-format";

const PartIII_ConsumptionForm = ({ data = {}, onChange }) => {
  // Safe fallback if CONSUMPTION or subkeys are missing
  const defaultConsumption = {
    pEnoughBenefits: "N",
    HCIFEES: {
      pTotalActualCharges: "0.00",
      pDiscount: "0.00",
      pPhilhealthBenefit: "0.00",
      pTotalAmount: "0.00",
      pMemberPatient: "N",
      pHMO: "N",
      pOthers: "N",
    },
    PROFFEES: {
      pTotalActualCharges: "0.00",
      pDiscount: "0.00",
      pPhilhealthBenefit: "0.00",
      pTotalAmount: "0.00",
      pMemberPatient: "N",
      pHMO: "N",
      pOthers: "N",
    },
    PURCHASES: {
      pDrugsMedicinesSupplies: "N",
      pDMSTotalAmount: "0.00",
      pExaminations: "N",
      pExamTotalAmount: "0.00",
    },
    BENEFITS: {
      pTotalHCIFees: "0.00",
      pTotalProfFees: "0.00",
      pGrandTotal: "0.00",
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

  useEffect(() => {
    if (consumption.pEnoughBenefits === "N") {
      // Clear BENEFITS fields
      updateSection("BENEFITS", "pTotalHCIFees", "");
      updateSection("BENEFITS", "pTotalProfFees", "");
      updateSection("BENEFITS", "pGrandTotal", "");
    } else if (consumption.pEnoughBenefits === "Y") {
      // Clear HCIFEES
      updateSection("HCIFEES", "pTotalActualCharges", "");
      updateSection("HCIFEES", "pDiscount", "");
      updateSection("HCIFEES", "pPhilhealthBenefit", "");
      updateSection("HCIFEES", "pTotalAmount", "");
      updateSection("HCIFEES", "pMemberPatient", "N");
      updateSection("HCIFEES", "pHMO", "N");
      updateSection("HCIFEES", "pOthers", "N");

      // Clear PROFFEES
      updateSection("PROFFEES", "pTotalActualCharges", "");
      updateSection("PROFFEES", "pDiscount", "");
      updateSection("PROFFEES", "pPhilhealthBenefit", "");
      updateSection("PROFFEES", "pTotalAmount", "");
      updateSection("PROFFEES", "pMemberPatient", "N");
      updateSection("PROFFEES", "pHMO", "N");
      updateSection("PROFFEES", "pOthers", "N");

      // Clear PURCHASES
      updateSection("PURCHASES", "pDrugsMedicinesSupplies", "N");
      updateSection("PURCHASES", "pDMSTotalAmount", "");
      updateSection("PURCHASES", "pExaminations", "N");
      updateSection("PURCHASES", "pExamTotalAmount", "");
    }
  }, [consumption.pEnoughBenefits]);

  useEffect(() => {
    const toNumber = (value) => parseFloat(value) || 0;

    // HCIFEES computation
    const actualHCI = toNumber(hcifees.pTotalActualCharges);
    const discountHCI = toNumber(hcifees.pDiscount);
    const benefitHCI = toNumber(hcifees.pPhilhealthBenefit);
    const computedHCI = actualHCI - discountHCI - benefitHCI;

    if (toNumber(hcifees.pTotalAmount) !== computedHCI) {
      updateSection("HCIFEES", "pTotalAmount", computedHCI.toFixed(2));
    }

    // PROFFEES computation
    const actualProf = toNumber(proffees.pTotalActualCharges);
    const discountProf = toNumber(proffees.pDiscount);
    const benefitProf = toNumber(proffees.pPhilhealthBenefit);
    const computedProf = actualProf - discountProf - benefitProf;

    if (toNumber(proffees.pTotalAmount) !== computedProf) {
      updateSection("PROFFEES", "pTotalAmount", computedProf.toFixed(2));
    }
  }, [
    hcifees.pTotalActualCharges,
    hcifees.pDiscount,
    hcifees.pPhilhealthBenefit,
    hcifees.pTotalAmount,
    proffees.pTotalActualCharges,
    proffees.pDiscount,
    proffees.pPhilhealthBenefit,
    proffees.pTotalAmount,
  ]);

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
                <NumericFormat
                  label="Total Health Care Institution Fees"
                  customInput={TextField}
                  fullWidth
                  thousandSeparator
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  value={benefit.pTotalHCIFees}
                  onValueChange={(values) =>
                    updateSection(
                      "BENEFITS",
                      "pTotalHCIFees",
                      values.floatValue || 0
                    )
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <NumericFormat
                  label="Total Professional Fees"
                  customInput={TextField}
                  fullWidth
                  thousandSeparator
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  value={benefit.pTotalProfFees}
                  onValueChange={(values) =>
                    updateSection(
                      "BENEFITS",
                      "pTotalProfFees",
                      values.floatValue || 0
                    )
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <NumericFormat
                  label="Grand Total"
                  customInput={TextField}
                  fullWidth
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  value={benefit.pGrandTotal}
                  readOnly
                  disabled
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
                <NumericFormat
                  label="Total Actual Charges"
                  customInput={TextField}
                  fullWidth
                  value={hcifees.pTotalActualCharges}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(v) =>
                    updateSection("HCIFEES", "pTotalActualCharges", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="Discount"
                  customInput={TextField}
                  fullWidth
                  value={hcifees.pDiscount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(v) =>
                    updateSection("HCIFEES", "pDiscount", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="PhilHealth Benefit"
                  customInput={TextField}
                  fullWidth
                  value={hcifees.pPhilhealthBenefit}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(v) =>
                    updateSection("HCIFEES", "pPhilhealthBenefit", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="Amount After Deduction"
                  customInput={TextField}
                  fullWidth
                  value={hcifees.pTotalAmount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  readOnly
                  disabled
                />
              </Grid>

              {/* Checkboxes... (unchanged) */}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* PROFFEES */}
            <Typography variant="subtitle1">Total Professional Fees</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <NumericFormat
                  label="Total Actual Charges"
                  customInput={TextField}
                  fullWidth
                  value={proffees.pTotalActualCharges}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(v) =>
                    updateSection("PROFFEES", "pTotalActualCharges", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="Discount"
                  customInput={TextField}
                  fullWidth
                  value={proffees.pDiscount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(v) =>
                    updateSection("PROFFEES", "pDiscount", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="PhilHealth Benefit"
                  customInput={TextField}
                  fullWidth
                  value={proffees.pPhilhealthBenefit}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  required
                  onValueChange={(v) =>
                    updateSection("PROFFEES", "pPhilhealthBenefit", v.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  label="Amount After Deduction"
                  customInput={TextField}
                  fullWidth
                  value={proffees.pTotalAmount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  readOnly
                  disabled
                />
              </Grid>

              {/* Checkboxes... (unchanged) */}
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
                <NumericFormat
                  label="Total Amount"
                  customInput={TextField}
                  fullWidth
                  value={purchases.pDMSTotalAmount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  required
                  onValueChange={(v) =>
                    updateSection("PURCHASES", "pDMSTotalAmount", v.value)
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
                <NumericFormat
                  label="Total Amount"
                  customInput={TextField}
                  fullWidth
                  value={purchases.pExamTotalAmount}
                  thousandSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  required
                  onValueChange={(v) =>
                    updateSection("PURCHASES", "pExamTotalAmount", v.value)
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
