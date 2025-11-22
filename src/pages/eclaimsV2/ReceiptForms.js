import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";

const receiptFields = [
  { key: "pCompanyName", label: "Company Name" },
  { key: "pCompanyTIN", label: "Company TIN" },
  { key: "pBIRPermitNumber", label: "BIR Permit Number" },
  { key: "pReceiptNumber", label: "Receipt Number" },
  { key: "pReceiptDate", label: "Receipt Date", type: "date" },
  { key: "pVATExemptSale", label: "VAT Exempt Sale" },
  { key: "pVAT", label: "VAT" },
  { key: "pTotal", label: "Total" },
];

const itemFields = [
  { key: "pQuantity", label: "Quantity", type: "number" },
  { key: "pUnitPrice", label: "Unit Price", type: "number" },
  { key: "pDescription", label: "Description" },
  { key: "pAmount", label: "Amount", type: "number", disabled: true },
];
const ReceiptForm = forwardRef((props, ref) => {
  const { disabled = false } = props;
  const initialItem = {
    pQuantity: "",
    pUnitPrice: "",
    pDescription: "",
    pAmount: "",
  };

  const initialReceipt = {
    ...Object.fromEntries(receiptFields.map(({ key }) => [key, ""])),
    items: [initialItem],
  };

  const [receipts, setReceipts] = useState([initialReceipt]);

  const handleReceiptChange = (receiptIndex, field, value) => {
    const updated = [...receipts];
    updated[receiptIndex][field] = value;
    setReceipts(updated);
  };

  const handleItemChange = (receiptIndex, itemIndex, field, value) => {
    const updated = [...receipts];
    const item = updated[receiptIndex].items[itemIndex];
    item[field] = value;

    // Auto-compute amount if quantity and unit price are numeric
    const quantity = parseFloat(item.pQuantity);
    const unitPrice = parseFloat(item.pUnitPrice);
    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      item.pAmount = (quantity * unitPrice).toFixed(2);
    } else {
      item.pAmount = "";
    }

    setReceipts(updated);
  };

  const addReceipt = () => {
    setReceipts([
      ...receipts,
      {
        ...Object.fromEntries(receiptFields.map(({ key }) => [key, ""])),
        items: [initialItem],
      },
    ]);
  };

  const addItem = (receiptIndex) => {
    const updated = [...receipts];
    updated[receiptIndex].items.push({ ...initialItem });
    setReceipts(updated);
  };

  const removeItem = (receiptIndex, itemIndex) => {
    if (itemIndex === 0) return;
    const updated = [...receipts];
    updated[receiptIndex].items.splice(itemIndex, 1);
    setReceipts(updated);
  };

  const removeReceipt = (index) => {
    if (index === 0) return;
    setReceipts(receipts.filter((_, i) => i !== index));
  };
  const transformToDTDOutput = () => {
    return {
      RECEIPTS: {
        RECEIPT: receipts.map(({ items, ...rest }) => ({
          ...rest,
          ITEM: items,
        })),
      },
    };
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => transformToDTDOutput(),
  }));

  return (
    <form>
      <fieldset disabled={disabled} style={{ border: 0, padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography variant="h6" gutterBottom>
              RECEIPT
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" color="success" onClick={addReceipt}>
              Add Receipt
            </Button>
          </Grid>
        </Grid>

        <Divider />
        <Box>
          {receipts.map((receipt, rIdx) => (
            <Paper key={rIdx} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Receipt #{rIdx + 1}
              </Typography>

              <Grid container spacing={2}>
                {receiptFields.map(({ key, label, type }) => (
                  <Grid item xs={12} sm={3} key={key}>
                    <TextField
                      required
                      fullWidth
                      label={label}
                      type={type === "date" ? "date" : "text"}
                      InputLabelProps={type === "date" ? { shrink: true } : {}}
                      value={receipt[key]}
                      onChange={(e) =>
                        handleReceiptChange(rIdx, key, e.target.value)
                      }
                    />
                  </Grid>
                ))}
              </Grid>

              <Box mt={3}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h6" gutterBottom>
                      Items
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => addItem(rIdx)}
                      variant="contained"
                      color="success"
                    >
                      Add Item
                    </Button>
                  </Grid>
                </Grid>

                <Divider />

                {receipt.items.map((item, iIdx) => (
                  <Box
                    key={iIdx}
                    sx={{
                      mt: 2,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      {itemFields.map(({ key, label, type, disabled }) => (
                        <Grid item xs={12} sm={3} key={key}>
                          <TextField
                            required
                            fullWidth
                            label={label}
                            type={type || "text"}
                            value={item[key]}
                            InputProps={{ readOnly: disabled }}
                            onChange={(e) =>
                              !disabled &&
                              handleItemChange(rIdx, iIdx, key, e.target.value)
                            }
                          />
                        </Grid>
                      ))}
                      {iIdx > 0 && (
                        <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
                          <Button
                            onClick={() => removeItem(rIdx, iIdx)}
                            color="error"
                            variant="outlined"
                          >
                            Remove Item
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                ))}
              </Box>

              {rIdx > 0 && (
                <Box mt={2}>
                  <Button onClick={() => removeReceipt(rIdx)} color="error">
                    Remove Receipt
                  </Button>
                </Box>
              )}
            </Paper>
          ))}

          {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
        </Box>
      </fieldset>
    </form>
  );
});

export default ReceiptForm;
