
import PropTypes from 'prop-types'

// import styles from './SimplePopUp.module.css'

import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";

class PopUpModule extends React.Component {
  render () {
    return (
      <Dialog open={this.props.openPopup} fullWidth={true} maxWidth={this.props.maxWidth} aria-labelledby={this.props.title?(`${this.props.title.toLowerCase().replace(/ /g, '_')}_dialog`):("dialog")}>
        <DialogTitle 
        // className={styles.header} 
        >
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              <b>{this.props.title? (this.props.title.replace(/ /g, ' ')):(null)}</b>
            </Typography>
            <IconButton
              // className={styles.secondary}
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

export default PopUpModule;

PopUpModule.propTypes = {
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
