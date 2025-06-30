import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';

const diagnosticTypes = ["IMAGING", "LABORATORY", "SUPPLIES", "OTHERS"];

// Human-readable labels for DRGMED
const drgmedFields = [
  { key: "pPurchaseDate", label: "Purchase Date", type: "date" },
  { key: "pDrugCode", label: "Drug Code" },
  { key: "pPNDFCode", label: "PNDF Code" },
  { key: "pGenericName", label: "Generic Name" },
  { key: "pBrandName", label: "Brand Name" },
  { key: "pPreparation", label: "Preparation" },
  { key: "pQuantity", label: "Quantity", type: "number" },
];

// Human-readable labels for XLSO
const xlsoFields = [
  { key: "pDiagnosticDate", label: "Diagnostic Date", type: "date" },
  { key: "pDiagnosticType", label: "Diagnostic Type", type: "select" },
  { key: "pDiagnosticName", label: "Diagnostic Name" },
  { key: "pQuantity", label: "Quantity", type: "number" },
];

const ParticularsForm = () => {
  const [drgmedList, setDrgmedList] = useState([
    Object.fromEntries(drgmedFields.map(({ key }) => [key, ''])),
  ]);
  const [xlsoList, setXlsoList] = useState([
    Object.fromEntries(xlsoFields.map(({ key }) => [key, ''])),
  ]);

  const handleDrgmedChange = (index, field, value) => {
    const updated = [...drgmedList];
    updated[index][field] = value;
    setDrgmedList(updated);
  };

  const handleXlsoChange = (index, field, value) => {
    const updated = [...xlsoList];
    updated[index][field] = value;
    setXlsoList(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      PARTICULARS: {
        DRGMED: drgmedList,
        XLSO: xlsoList,
      },
    };

    console.log("Submitted Payload:", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h6" gutterBottom>PARTICULARS – DRUG MEDICINE</Typography>
        {drgmedList.map((item, i) => (
          <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Grid container spacing={2}>
              {drgmedFields.map(({ key, label, type }) => (
                <Grid item xs={12} sm={3} key={key}>
                  <TextField
                    required
                    fullWidth
                    label={label}
                    type={type === 'date' || type === 'number' ? type : 'text'}
                    InputLabelProps={type === 'date' ? { shrink: true } : {}}
                    value={item[key]}
                    onChange={(e) => handleDrgmedChange(i, key, e.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={1}>
              <Button
                onClick={() => setDrgmedList(drgmedList.filter((_, idx) => idx !== i))}
                color="error"
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() =>
            setDrgmedList([
              ...drgmedList,
              Object.fromEntries(drgmedFields.map(({ key }) => [key, ''])),
            ])
          }
        >
          Add DRUG MEDICINE
        </Button>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>PARTICULARS – XLSO</Typography>
        {xlsoList.map((item, i) => (
          <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Grid container spacing={2}>
              {xlsoFields.map(({ key, label, type }) => (
                <Grid item xs={12} sm={3} key={key}>
                  {type === "select" ? (
                    <TextField
                      select
                      required
                      fullWidth
                      label={label}
                      value={item[key]}
                      onChange={(e) => handleXlsoChange(i, key, e.target.value)}
                    >
                      {diagnosticTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      required
                      fullWidth
                      label={label}
                      type={type === 'date' || type === 'number' ? type : 'text'}
                      InputLabelProps={type === 'date' ? { shrink: true } : {}}
                      value={item[key]}
                      onChange={(e) => handleXlsoChange(i, key, e.target.value)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Box mt={1}>
              <Button
                onClick={() => setXlsoList(xlsoList.filter((_, idx) => idx !== i))}
                color="error"
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() =>
            setXlsoList([
              ...xlsoList,
              Object.fromEntries(xlsoFields.map(({ key }) => [key, ''])),
            ])
          }
        >
          Add XLSO
        </Button>

        {/* <Divider sx={{ my: 4 }} />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
      </Box>
    </form>
  );
};

export default ParticularsForm;
