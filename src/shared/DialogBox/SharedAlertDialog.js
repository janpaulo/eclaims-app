import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const SharedAlertDialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  cancelColor = "inherit",
  showCancel = true,
  showConfirm = true,
  customActions = null,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}

      {/* Optional padding above footer */}
      <div className="pt-4"></div>

      {/* Add padding to DialogActions */}
      <DialogActions sx={{ padding: "16px 24px" }}>
        {customActions ? (
          customActions
        ) : (
          <>
            {showCancel && (
              <Button variant="contained" onClick={onClose} color={cancelColor}>
                {cancelText}
              </Button>
            )}
            {showConfirm && (
              <Button
                variant="contained"
                onClick={onConfirm}
                color={confirmColor}
                autoFocus
              >
                {confirmText}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SharedAlertDialog;
