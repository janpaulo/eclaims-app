import React from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const EnlistmentForm = ({ formData, setFormData }) => {
  // Handle changes in form fields for specific enlistment
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEnlistments = [...formData];
    updatedEnlistments[index][name] = value;
    setFormData(updatedEnlistments);
  };

  // Add a new enlistment
  const handleAddEnlistment = () => {
    const newEnlistment = {
      eclaimid: "",
      enlistdate: "",
      enliststat: "",
      hcicaseno: "",
      hcitransno: "",
      transdate: "",
    };
    setFormData([...formData, newEnlistment]);
  };

  // Remove an enlistment
  const handleRemoveEnlistment = (index) => {
    if (formData.length > 1) {
      const updatedEnlistments = formData.filter((_, i) => i !== index);
      setFormData(updatedEnlistments);
    }
  };

  // Handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enlistment
      </Typography>
      <Button color="primary" variant="outlined" onClick={handleAddEnlistment}>
        {/* <AddCircle /> */} Add Fields
      </Button>
      <Divider style={{ margin: "0 5px" }} />

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          mb: 2,
          mt: 2,
        }}
      >
        <form onSubmit={handleSubmit} sx={{ mt: 4 }}>
          {formData.map((enlistment, index) => (
            <div key={index}>
              <Grid container spacing={3}>
                {/* Eclaim ID */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Eclaim ID"
                    name="eclaimid"
                    value={enlistment.eclaimid}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Grid>

                {/* Enlistment Date */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Enlistment Date"
                    name="enlistdate"
                    type="date"
                    value={enlistment.enlistdate}
                    onChange={(e) => handleChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Enlistment Status */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Enlistment Status</InputLabel>
                    <Select
                      name="enliststat"
                      value={enlistment.enliststat}
                      onChange={(e) => handleChange(index, e)}
                    >
                      <MenuItem value="1">Status 1</MenuItem>
                      <MenuItem value="2">Status 2</MenuItem>
                      <MenuItem value="3">Status 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* HCICA Case No */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="HCICA Case No"
                    name="hcicaseno"
                    value={enlistment.hcicaseno}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Grid>

                {/* HCI Trans No */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="HCI Trans No"
                    name="hcitransno"
                    value={enlistment.hcitransno}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Grid>

                {/* Transaction Date */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Transaction Date"
                    name="transdate"
                    type="date"
                    value={enlistment.transdate}
                    onChange={(e) => handleChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Add and Remove Buttons */}
                <Grid item xs={12} sm={12}>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleRemoveEnlistment(index)}
                  >
                    {/* <RemoveCircle /> */}Remove
                  </Button>
                </Grid>
              </Grid>
              {/* <hr /> */}
            </div>
          ))}

          {/* Submit Button */}
          {/* <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Grid> */}
        </form>
      </Box>
    </Box>
  );
};

export default EnlistmentForm;
