import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const MedicineForm = ({ authUser, medicines, setMedicines }) => {
  const [drugOptions, setDrugOptions] = useState([]);

  // 🔹 Function to create a blank medicine row
  const createEmptyMedicine = () => ({
    pHciCaseNo: "C280501202503000004",
    pHciTransNo: "C280501202503000004",
    pDrugCode: "",
    pGenericName: "",
    pGenericCode: "",
    pSaltCode: "",
    pStrengthCode: "",
    pFormCode: "",
    pUnitCode: "",
    pPackageCode: "",
    pRoute: "",
    pQuantity: "1.00",
    pActualUnitPrice: "",
    pCoPayment: "",
    pTotalAmtPrice: "",
    pInstructionQuantity: "",
    pInstructionStrength: "",
    pInstructionFrequency: "",
    pPrescPhysician: "",
    pIsApplicable: "Y",
    pDateAdded: new Date().toISOString().slice(0, 10),
    pModule: "CF4",
    pReportStatus: "U",
    pDeficiencyRemarks: "",
  });

  // 🔹 Fetch generic drug list
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${authUser.access_token}` },
        };

        const res = await axios.get(
          `${process.env.REACT_APP_API_CLAIMS}api/tsekap/tsekap_lib_medicine`,
          config
        );

        const mapped = res.data.map((d) => ({
          value: d.drug_code || d.drug_description,
          label: d.drug_description,
          raw: d,
        }));
        setDrugOptions(mapped);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      }
    };
    fetchDrugs();
  }, [authUser]);

  // 🔹 Handle select drug for a row
  const handleDrugSelect = (index, selected) => {
    const updated = [...medicines];
    if (selected) {
      const { raw } = selected;
      updated[index] = {
        ...updated[index],
        pDrugCode: raw.drug_code || "",
        pGenericName: raw.drug_description
          ? raw.drug_description.split(",")[0]
          : "",
        pGenericCode: raw.gen_code || "",
        pSaltCode: raw.salt_code || "",
        pStrengthCode: raw.strength_code || "",
        pFormCode: raw.form_code || "",
        pUnitCode: raw.unit_code || "",
        pPackageCode: raw.package_code || "",
      };
    } else {
      updated[index] = createEmptyMedicine();
    }
    setMedicines(updated);
  };

  // 🔹 Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  // 🔹 Add new medicine row
  const addMedicine = () => {
    setMedicines([...medicines, createEmptyMedicine()]);
  };

  // 🔹 Remove medicine row
  const removeMedicine = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated.length ? updated : [createEmptyMedicine()]);
  };

  return (
    <Box >

        
        {/* Add Medicine button */}
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addMedicine}
          sx={{ mr: 2 }}
        >
          Add Another Medicine
        </Button>
      <form>
        {medicines.map((med, index) => (
          <Box
            key={index}
            mb={3}
            p={2}
            border="1px solid #ddd"
            borderRadius={2}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Generic Drug React-Select */}
              <Grid item xs={12} md={6}>
                <Select
                  options={drugOptions}
                  onChange={(selected) => handleDrugSelect(index, selected)}
                  isClearable
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menu: (base) => ({ ...base, marginTop: 4 }),
                  }}
                  placeholder="Select Generic Drug"
                  value={
                    med.pDrugCode
                      ? {
                          value: med.pDrugCode,
                          label: med.pGenericName || med.pDrugCode,
                        }
                      : null
                  }
                />
              </Grid>

              {/* Route */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Route"
                  fullWidth
                  value={med.pRoute}
                  onChange={(e) => handleChange(index, "pRoute", e.target.value)}
                />
              </Grid>

              {/* Quantity */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Quantity"
                  fullWidth
                  value={med.pQuantity}
                  onChange={(e) => handleChange(index, "pQuantity", e.target.value)}
                />
              </Grid>

              {/* Total Amount */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Total Amount"
                  fullWidth
                  value={med.pTotalAmtPrice}
                  onChange={(e) =>
                    handleChange(index, "pTotalAmtPrice", e.target.value)
                  }
                />
              </Grid>

              {/* Instruction Frequency */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Instruction Frequency"
                  fullWidth
                  value={med.pInstructionFrequency}
                  onChange={(e) =>
                    handleChange(index, "pInstructionFrequency", e.target.value)
                  }
                />
              </Grid>

              {/* Physician */}
              <Grid item xs={12}>
                <TextField
                  label="Prescribing Physician"
                  fullWidth
                  value={med.pPrescPhysician}
                  onChange={(e) =>
                    handleChange(index, "pPrescPhysician", e.target.value)
                  }
                />
              </Grid>

              {/* Remove button */}
              <Grid item xs={12} textAlign="right">
                <IconButton color="error" onClick={() => removeMedicine(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

      </form>
    </Box>
  );
};

export default MedicineForm;
