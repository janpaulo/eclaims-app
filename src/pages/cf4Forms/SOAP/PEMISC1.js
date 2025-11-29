import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Grid,
  Button,
  Typography,
  Box,Divider
} from "@mui/material";
import axios from "axios";

const categoryConfig = [
  {
    key: "skin",
    label: "Skin",
    idKey: "skin_id",
    descKey: "skin_description",
    endpoint: "/lib_skin",
  },
  {
    key: "heent",
    label: "HEENT",
    idKey: "heent_id",
    descKey: "heent_description",
    endpoint: "/tsekap_lib_heent",
  },
  {
    key: "chest",
    label: "Chest",
    idKey: "chest_id",
    descKey: "chest_description",
    endpoint: "/tsekap_lib_chest",
  },
  {
    key: "heart",
    label: "Heart",
    idKey: "heart_id",
    descKey: "heart_description",
    endpoint: "/tsekap_lib_heart",
  },
  {
    key: "abdomen",
    label: "Abdomen",
    idKey: "abdomen_id",
    descKey: "abdomen_description",
    endpoint: "/tsekap_lib_abdomen",
  },
  {
    key: "neuro",
    label: "Neuro",
    idKey: "neuro_id",
    descKey: "neuro_description",
    endpoint: "/tsekap_lib_neuro",
  },
  {
    key: "gu",
    label: "Genito-Urinary",
    idKey: "gu_id",
    descKey: "gu_description",
    endpoint: "/tsekap_lib_genitourinary",
  },
  // {
  //   key: "rectal",
  //   label: "Rectal",
  //   idKey: "rectal_id",
  //   descKey: "rectal_description",
  //   endpoint: "/tsekap_lib_genitourinary",
  // },
];

export default function PhysicalExamForm({ authUser }) {
  const [formData, setFormData] = useState([
    Object.fromEntries(
      categoryConfig.map((cat) => [`p${capitalize(cat.key)}Id`, ""])
    ),
  ]);
  const [options, setOptions] = useState({});

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Fetch all category options from their respective endpoints
  useEffect(() => {
    const fetchOptions = async () => {
      const allOptions = {};
      for (const cat of categoryConfig) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_CLAIMS}api/tsekap/${cat.endpoint}`,
            {
              headers: {
                Authorization: `Bearer ${authUser.access_token}`,
              },
            }
          );
          allOptions[cat.key] = res.data;
        } catch (error) {
          console.error(`Failed to fetch ${cat.key}:`, error);
          allOptions[cat.key] = [];
        }
      }
      setOptions(allOptions);
    };

    if (authUser?.access_token) {
      fetchOptions();
    }
  }, [authUser]);

  const handleChange = (rowIndex, key, value) => {
    const updated = [...formData];
    updated[rowIndex][key] = value;
    setFormData(updated);

    console.log(updated)
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Physical Exam Form
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            setFormData([
              ...formData,
              Object.fromEntries(
                categoryConfig.map((cat) => [`p${capitalize(cat.key)}Id`, ""])
              ),
            ])
          }
        >
          Add Row
        </Button>
      </Box>

      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />

      {formData.map((row, rowIndex) => (
        <Grid container spacing={2} key={rowIndex} sx={{ mb: 3 }}>
          {categoryConfig.map((cat) => {
            const capitalized = `p${capitalize(cat.key)}Id`;
            const catOptions = options[cat.key] || [];

            return (
              <Grid item xs={12} sm={6} md={4} key={cat.key}>
                <Autocomplete
                  options={catOptions}
                  getOptionLabel={(opt) => opt?.[cat.descKey] || ""}
                  isOptionEqualToValue={(opt, val) =>
                    opt?.[cat.idKey] === val?.[cat.idKey]
                  }
                  value={
                    catOptions.find((o) => o[cat.idKey] === row[capitalized]) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleChange(
                      rowIndex,
                      capitalized,
                      newValue ? newValue[cat.idKey] : ""
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label={cat.label} fullWidth />
                  )}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </Box>
  );
}
