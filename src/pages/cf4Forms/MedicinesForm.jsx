import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const defaultMedicine = {
  pDrugCode: "",
  pGenericCode: "",
  pSaltCode: "",
  pStrengthCode: "",
  pFormCode: "",
  pUnitCode: "",
  pPackageCode: "",
  pRoute: "",
  pQuantity: "",
  pActualUnitPrice: "",
  pCoPayment: "",
  pTotalAmtPrice: "",
  pInstructionQuantity: "",
  pInstructionStrength: "",
  pInstructionFrequency: "",
  pPrescPhysician: "",
  pIsApplicable: "Y",
  pDateAdded: new Date().toISOString().split("T")[0],
  pModule: "TSEKAP",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

export default function MedicinesForm({ authUser }) {
  const [medicines, setMedicines] = useState([defaultMedicine]);
  const [libs, setLibs] = useState({
    salt: [],
    strength: [],
    unit: [],
    form: [],
    generic: [],
    package: [],
  });
  const [drugOptions, setDrugOptions] = useState([]);
  const [loadingDrug, setLoadingDrug] = useState(false);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${authUser.access_token}` },
        };

        const [salt, strength, unit, form, generic, pack] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_medicine_salt`, config),
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_meds_strength`, config),
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/lib_medicine_unit`, config),
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_meds_form`, config),
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_meds_generic`, config),
          axios.get(`${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_meds_package`, config),
        ]);

        setLibs({
          salt: salt.data,
          strength: strength.data,
          unit: unit.data,
          form: form.data,
          generic: generic.data,
          package: pack.data,
        });
      } catch (error) {
        console.error("Error loading libraries", error);
      }
    };

    fetchLibraries();
  }, [authUser.access_token]);

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const fetchDrugOptions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return;
    setLoadingDrug(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${authUser.access_token}` },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_medicine?search=${searchTerm}`,
        config
      );
      setDrugOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch drug options", error);
    } finally {
      setLoadingDrug(false);
    }
  };

  const addMedicine = () => {
    setMedicines([...medicines, { ...defaultMedicine }]);
  };

  const removeMedicine = (index) => {
    const updated = [...medicines];
    updated.splice(index, 1);
    setMedicines(updated);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Medicines
      </Typography>

      {medicines.map((med, index) => (
        <Box key={index} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
          <Grid container spacing={2}>
            {/* pDrugCode - Autocomplete with async search */}
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                fullWidth
                options={drugOptions}
                getOptionLabel={(option) =>
                  option.drug_description || option.drug_code || ""
                }
                value={
                  drugOptions.find((opt) => opt.drug_code === med.pDrugCode) ||
                  null
                }
                loading={loadingDrug}
                onInputChange={(event, value) => {
                  if (value.length >= 2) fetchDrugOptions(value);
                }}
                onChange={(e, newVal) =>
                  handleChange(index, "pDrugCode", newVal?.drug_code || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Drug Code"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingDrug ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Autocomplete dropdowns for select fields */}
            {[
              { name: "pGenericCode", label: "Generic", select: libs.generic, valueKey: "generic_code", labelKey: "generic_description" },
              { name: "pSaltCode", label: "Salt", select: libs.salt, valueKey: "salt_code", labelKey: "salt_description" },
              { name: "pStrengthCode", label: "Strength", select: libs.strength, valueKey: "strength_code", labelKey: "strength_description" },
              { name: "pFormCode", label: "Form", select: libs.form, valueKey: "form_code", labelKey: "form_description" },
              { name: "pUnitCode", label: "Unit", select: libs.unit, valueKey: "unit_code", labelKey: "unit_description" },
              { name: "pPackageCode", label: "Package", select: libs.package, valueKey: "package_code", labelKey: "package_description" },
              { name: "pRoute", label: "Route" },
              { name: "pQuantity", label: "Quantity" },
              { name: "pActualUnitPrice", label: "Unit Price" },
              { name: "pCoPayment", label: "Co-Payment" },
              { name: "pTotalAmtPrice", label: "Total Amount" },
              { name: "pInstructionQuantity", label: "Instruction Quantity" },
              { name: "pInstructionStrength", label: "Instruction Strength" },
              { name: "pInstructionFrequency", label: "Instruction Frequency" },
              { name: "pPrescPhysician", label: "Prescribing Physician" },
              { name: "pDeficiencyRemarks", label: "Deficiency Remarks" },
              { name: "pIsApplicable", label: "Is Applicable (Y/N)" },
              { name: "pDateAdded", label: "Date Added", type: "date" },
              { name: "pModule", label: "Module" },
              { name: "pReportStatus", label: "Report Status" },
            ].map(({ name, label, select, valueKey = "code", labelKey = "description", type = "text" }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                {select ? (
                  <Autocomplete
                    fullWidth
                    disableClearable
                    options={select}
                    getOptionLabel={(option) => option[labelKey] || ""}
                    isOptionEqualToValue={(option, value) =>
                      option[valueKey] === value[valueKey]
                    }
                    value={
                      select.find((opt) => opt[valueKey] === med[name]) || null
                    }
                    onChange={(e, newValue) =>
                      handleChange(index, name, newValue ? newValue[valueKey] : "")
                    }
                    renderOption={(props, option, { index }) => (
                      <li {...props} key={`${option[valueKey]}-${index}`}>
                        {option[labelKey]}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label={label} />
                    )}
                  />

                ) : (
                  <TextField
                    label={label}
                    fullWidth
                    type={type}
                    value={med[name]}
                    onChange={(e) => handleChange(index, name, e.target.value)}
                  />
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeMedicine(index)}
                disabled={medicines.length === 1}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
      <Button variant="contained" onClick={addMedicine}>
        Add Medicine
      </Button>
    </Box>
  );
}
