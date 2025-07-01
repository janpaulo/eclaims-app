// utils/NumericFormatInput.js
import React from "react";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

/**
 * A wrapper for NumericFormat that works seamlessly with MUI TextField
 * and manages 0.00 default value behavior.
 */
const NumericFormatInput = ({ label, value, onChange, ...props }) => {
  return (
    <NumericFormat
      value={value}
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
      allowLeadingZeros={false}
      thousandSeparator
      customInput={TextField}
      fullWidth
      label={label}
      onValueChange={(values) => {
        const raw = values.value;
        onChange(raw === "" ? "0.00" : raw);
      }}
      onFocus={(e) => {
        if (e.target.value === "0.00") {
          e.target.value = "";
        }
      }}
      onBlur={(e) => {
        if (e.target.value === "") {
          onChange("0.00");
        }
      }}
      {...props}
    />
  );
};

export default NumericFormatInput;
