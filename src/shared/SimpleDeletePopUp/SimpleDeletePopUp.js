import React from 'react'

// import PropTypes from 'prop-types'

import styles from './SimpleDeletePopUp.module.css'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Typography
} from '@mui/material'


class SimpleDeletePopUp extends React.Component {
  render () {
    return (
      <Dialog open={this.props.openDeletePopup} fullWidth={true} maxWidth="xs" classes={{ paper: styles.dialogWrapper }}
      id={this.props.model?(`${this.props.model.toLowerCase()}-dialog`):("dialog")} name="confirm_dialog">
        <DialogTitle className={styles.head} >
          <div className={styles.toolbar}>
            <Typography variant="h6" component="div" className={styles.toolbarLabel}>
              <b>Confirmation</b>
            </Typography>
            <IconButton
              className={styles.secondary}
              onClick={() => this.props.handleDeleteClose()}
              id={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_close`):("close")}
              name={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_close`):("close")}
            >
             x
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <>
            <div className={styles.deleteBody}>
              <Typography>Are you sure you want to delete this {this.props.model.toLowerCase()} ? </Typography>
            </div>
            <div edge="end" className={styles.button}>
              <Button
                variant="outlined"
                id={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_cancel`):("cancel")}
                name={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_cancel`):("cancel")}
                className={styles.buttonCancel}
                onClick={() => this.props.handleDeleteClose()} >
                  Cancel
              </Button>
              <Button
                variant="outlined"
                name={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_submit`):("confirm")}
                id={this.props.model?(`${this.props.model.toLowerCase().replace(/ /g, '_')}_confirm_submit`):("confirm")}
                color="secondary"
                onClick={() => this.props.delete()}
                className={styles.delete}
                ><div>DELETE</div>
                </Button>
            </div>
          </>
        </DialogContent>
      </Dialog>
    )
  }
}

export default SimpleDeletePopUp

// SimpleDeletePopUp.propTypes = {
//   openDeletePopup: PropTypes.bool,
//   handleDeleteClose: PropTypes.func,
//   model: PropTypes.string.isRequired,
//   delete: PropTypes.func
// }
