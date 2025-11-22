import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const SharedAlertDialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  cancelColor = 'inherit',
  showCancel = true,
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
      <DialogActions>
        {customActions ? (
          customActions
        ) : (
          <>
            {showCancel && (
              <Button onClick={onClose} color={cancelColor}>
                {cancelText}
              </Button>
            )}
            <Button onClick={onConfirm} color={confirmColor} autoFocus>
              {confirmText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SharedAlertDialog;
