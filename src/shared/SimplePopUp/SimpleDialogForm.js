import React from 'react'

import PropTypes from 'prop-types'

import styles from './SimplePopUp.module.css'

import {
  Grid
} from '@material-ui/core'
import AuditLog from '../AuditLog/AuditLog'
class SimpleDialogForm extends React.Component {
  render() {
    return (
      <>
      <Grid container spacing={1}>
        {
          this.props.fields.length>0?
            this.props.fields.map((field,idx)=>(
              field.includes('.')?(
                <Grid key={field-idx} item xs={6}>
                <div className={styles.detailList}>
                  <div><b>{field.replace('.',' ')}</b></div>
                  <div>:&nbsp; {this.props.item[field.split(".")[0]] ? (this.props.item[field.split(".")[0]][field.split(".")[1]]) : ("n/a")} </div>
                </div>
              </Grid>):(
               <Grid key={field-idx} item xs={6}>
               <div className={styles.detailList}>
                 <div><b>{field.replace(/_/g, ' ')}</b></div>
                 <div>:&nbsp; {this.props.item[field]} </div>
               </div>
             </Grid>
              )
             
            ))
          :null
        }
        {
          this.props.longfield?
          <Grid item xs={12}>
            <div className={styles.detailList}>
              <div><b>{this.props.longfield.replace(/_/g, ' ')}</b></div>
              <div>:&nbsp; {this.props.item[this.props.longfield]} </div>
            </div>
          </Grid>:null
        }
         </Grid>
        <hr />
        {
          this.props.item? <AuditLog gid={this.props.item.gid} />:null
        }
        
      </>
    )
  }
}

export default SimpleDialogForm;

SimpleDialogForm.propTypes = {
  item: PropTypes.object,
  fields: PropTypes.array,
  longfield: PropTypes.string
}
