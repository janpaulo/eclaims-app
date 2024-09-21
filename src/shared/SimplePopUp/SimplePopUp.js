import React from 'react'

import PropTypes from 'prop-types'

import styles from './SimplePopUp.module.css'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material'

class SimplePopUp extends React.Component {
  render () {
    return (
      <Dialog open={this.props.openPopup} fullWidth={true} maxWidth={this.props.maxWidth} aria-labelledby={this.props.title?(`${this.props.title.toLowerCase().replace(/ /g, '_')}_dialog`):("dialog")}>
        <DialogTitle className={styles.header} >
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              <b>{this.props.title? (this.props.title.replace(/ /g, ' ')):(null)}</b>
            </Typography>
            <IconButton
              className={styles.secondary}
              onClick={() => this.props.handleClose()}
              id={this.props.title?(`${this.props.title.toLowerCase().replace(/ /g,'_')}_close`):("close")}
              name={this.props.title?(`${this.props.title.toLowerCase().replace(/ /g,'_')}_close`):("close")}
            >
             x
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {this.props.children}
        </DialogContent>
      </Dialog>
    )
  }
}

export default SimplePopUp;

SimplePopUp.propTypes = {
  classes: PropTypes.object,
  openPopup: PropTypes.bool.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func,
  onChange: PropTypes.func,
  item: PropTypes.object,
  submit: PropTypes.func,
  children: PropTypes.object,
  maxWidth: PropTypes.string
}
