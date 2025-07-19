import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Typography
} from "@mui/material";

const AllCaseRate = forwardRef(({ setStoreDataDischarge }, ref) => {
  const rawOptions = Array.isArray(setStoreDataDischarge)
    ? setStoreDataDischarge
    : [];

  const codeOptions = rawOptions
    .map((entry) => {
      if (entry.ICDCODE) {
        return {
          code: entry.ICDCODE.pICDCode,
          pcaseRateCode: entry.ICDCODE.pcaseRateCode,
          type: "ICD",
          amount: entry.ICDCODE.amount?.[0]?.pprimaryCaseRate || "0.00",
        };
      } else if (entry.RVSCODES) {
        return {
          code: entry.RVSCODES.pRVSCode,
          pcaseRateCode: entry.RVSCODES.pcaseRateCode,
          type: "RVS",
          amount: entry.RVSCODES.amount?.[0]?.pprimaryCaseRate || "0.00",
        };
      }
      return null;
    })
    .filter(Boolean);

  const [form, setForm] = useState({
    firstCode: "",
    firstAmount: "",
    secondCode: "",
    secondAmount: ""
  });

  const handleCodeChange = (e) => {
    const { name, value } = e.target;
    const selected = codeOptions.find((opt) => opt.code === value);
    const amountField = name === "firstCode" ? "firstAmount" : "secondAmount";

    setForm((prev) => ({
      ...prev,
      [name]: value,
      [amountField]: selected?.amount || ""
    }));
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCaseRateEntry = (code, amount) => {
    if (!code || !amount) return null;

    const selected = codeOptions.find((opt) => opt.code === code);
    if (!selected) return null;

    return {
      pCaseRateCode: selected.pcaseRateCode || "", // ✅ include the hidden pcaseRateCode
      pICDCode: selected.type === "ICD" ? code : "",
      pRVSCode: selected.type === "RVS" ? code : "",
      pCaseRateAmount: amount
    };
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const first = getCaseRateEntry(form.firstCode, form.firstAmount);
      const second = getCaseRateEntry(form.secondCode, form.secondAmount);
      const result = [first, second].filter(Boolean);
      if (result.length === 0) return {};

      return {
        ALLCASERATEOrZBENEFIT: [
          {
            ALLCASERATE: {
              CASERATE: result
            }
          }
        ]
      };
    }
  }));

  const secondCodeOptions = codeOptions.filter(opt => opt.code !== form.firstCode);

  return (
    <Grid container spacing={2}>
      {/* First ICD or RVS */}
      <Grid item xs={6}>
        <Typography variant="caption">ICD 10 or RVS Code (First)</Typography>
        <TextField
          select
          fullWidth
          name="firstCode"
          value={form.firstCode}
          onChange={handleCodeChange}
        >
          <MenuItem value="" disabled>Select First Code</MenuItem>
          {codeOptions.map((opt) => (
            <MenuItem key={opt.code} value={opt.code}>
              {opt.type}: {opt.code}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="caption">First Case Rate Amount</Typography>
        <TextField
          fullWidth
          name="firstAmount"
          value={form.firstAmount}
          onChange={handleAmountChange}
        />
      </Grid>

      {/* Second ICD or RVS */}
      <Grid item xs={6}>
        <Typography variant="caption">ICD 10 or RVS Code (Second)</Typography>
        <TextField
          select
          fullWidth
          name="secondCode"
          value={form.secondCode}
          onChange={handleCodeChange}
          disabled={!form.firstCode}
        >
          <MenuItem value="" disabled>Select Second Code</MenuItem>
          {secondCodeOptions.map((opt) => (
            <MenuItem key={opt.code} value={opt.code}>
              {opt.type}: {opt.code}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="caption">Second Case Rate Amount</Typography>
        <TextField
          fullWidth
          name="secondAmount"
          value={form.secondAmount}
          onChange={handleAmountChange}
        />
      </Grid>

      {/* Display Output JSON */}
      {/* <Grid item xs={12}>
        <Typography variant="subtitle2">Generated JSON Output</Typography>
        <pre>
          {JSON.stringify(
            (() => {
              const first = getCaseRateEntry(form.firstCode, form.firstAmount);
              const second = getCaseRateEntry(form.secondCode, form.secondAmount);
              const result = [first, second].filter(Boolean);
              if (result.length === 0) return {};
              return {
                ALLCASERATEOrZBENEFIT: [
                  {
                    ALLCASERATE: {
                      CASERATE: result
                    }
                  }
                ]
              };
            })(),
            null,
            2
          )}
        </pre>
      </Grid> */}
    </Grid>
  );
});

export default AllCaseRate;
