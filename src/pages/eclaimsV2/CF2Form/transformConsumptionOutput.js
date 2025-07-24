export const transformConsumptionOutput = (consumption = {}) => {
  const { pEnoughBenefits, BENEFITS, HCIFEES, PROFFEES, PURCHASES } =
    consumption;

  if (pEnoughBenefits === "Y") {
    // Return BENEFITS as a nested object inside BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES
    const {
      pDrugsMedicinesSupplies,
      pDMSTotalAmount,
      pExaminations,
      pExamTotalAmount,
      ...cleanedBenefits
    } = BENEFITS;

    return {
      pEnoughBenefits: "Y",
      BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES: [{ BENEFITS: cleanedBenefits }],
    };
  }

  // If pEnoughBenefits is "N", construct array from HCIFEES, PROFFEES, and PURCHASES
  const result = {
    pEnoughBenefits: "N",
    BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES: [],
  };

  if (HCIFEES) result.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES.push({ HCIFEES });
  if (PROFFEES)
    result.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES.push({ PROFFEES });
  if (PURCHASES)
    result.BENEFITSOrHCIFEESOrPROFFEESOrPURCHASES.push({ PURCHASES });

  return result;
};
