// CF3Form.js
import React, { useState } from 'react';
import {
  Container, Typography, TextField, Grid, MenuItem, Button, Paper, Divider, FormControlLabel, Checkbox
} from '@mui/material';

const CF3Form = () => {
  const initial = {};
  const [f, setF] = useState(initial);
  const handle = e => {
    const { name, value, type, checked } = e.target;
    setF(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = e => {
    e.preventDefault();
    console.log('CF3 Data:', f);
    // Add API integration here
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>PhilHealth CF3 – Patient’s Clinical Record & Maternity Care Package</Typography>
      <form onSubmit={submit}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>PART I – Patient’s Clinical Record</Typography>
          <Grid container spacing={2}>
            {/* Items 1–6 */}
            <Grid item xs={12} sm={6}>
              <TextField label="1. PhilHealth Accreditation No. (PAN)" name="pan" value={f.pan||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="2. Name of Patient (Last, First, Middle)" name="patientName" value={f.patientName||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="3. Chief Complaint / Reason for Admission" name="chiefComplaint" value={f.chiefComplaint||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="4. Date Admitted" type="date" name="dateAdmitted" value={f.dateAdmitted||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Time Admitted" type="time" name="timeAdmitted" value={f.timeAdmitted||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="5. Date Discharged" type="date" name="dateDischarged" value={f.dateDischarged||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Time Discharged" type="time" name="timeDischarged" value={f.timeDischarged||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="6. Brief History of Present Illness / OB History" name="history" value={f.history||''} onChange={handle} multiline rows={3} fullWidth />
            </Grid>

            {/* Item 7 – Physical Examination */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">7. Physical Examination (Pertinent Findings per System)</Typography>
            </Grid>
            {['General Survey','Vital Signs','BP','CR','RR','Temperature','Abdomen','HEENT','GU (IE)','Chest/Lungs','Skin/Extremities','CVS','Neuro Examination']
              .map((label, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <TextField
                    label={label}
                    name={`pe_${i}`}
                    value={f[`pe_${i}`]||''}
                    onChange={handle}
                    fullWidth
                  />
                </Grid>
              ))}

            {/* Items 8–9 */}
            <Grid item xs={12}>
              <TextField label="8. Course in the Wards" name="course" value={f.course||''} onChange={handle} multiline rows={3} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="9. Pertinent Laboratory & Diagnostic Findings" name="labFindings" value={f.labFindings||''} onChange={handle} multiline rows={3} fullWidth />
            </Grid>

            {/* Item 10 – Disposition on Discharge */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">10. Disposition on Discharge</Typography>
            </Grid>
            {['Improved','Transferred','HAMA','Absconded','Expired'].map(opt => (
              <Grid item xs={6} sm={2} key={opt}>
                <FormControlLabel
                  control={<Checkbox name={`disp_${opt}`} checked={!!f[`disp_${opt}`]} onChange={handle} />}
                  label={opt}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Part II – Maternity Care Package */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>PART II – Maternity Care Package</Typography>
          <Typography variant="subtitle1" gutterBottom>PRENATAL CONSULTATION</Typography>
          <Grid container spacing={2} alignItems="center">
            {/* Initial consultation and clinical history */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="1. Initial Prenatal Consultation Date"
                type="date"
                name="prenatal_initial"
                value={f.prenatal_initial||''}
                onChange={handle}
                InputLabelProps={{ shrink:true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox name="prenatal_vitalsNormal" checked={!!f.prenatal_vitalsNormal} onChange={handle} />}
                label="Vital signs are normal"
              />
            </Grid>

            {/* Risk factors */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">Obstetric & Medical/Surgical Risk Factors</Typography>
              {[
                'Multiple pregnancy', 'Ovarian cyst', 'Myoma uteri', 'Placenta previa', 'History of 3 miscarriages',
                'History of stillbirth', 'History of pre‑eclampsia', 'History of eclampsia', 'Premature contraction',
                'Hypertension', 'Diabetes', 'Heart disease', 'Thyroid disorder', 'Obesity',
                'Moderate to severe asthma', 'Epilepsy', 'Renal disease', 'Bleeding disorders', 'History of previous cesarean section', 'History of uterine myomectomy'
              ].map((opt,i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <FormControlLabel
                    control={<Checkbox name={`risk_${i}`} checked={!!f[`risk_${i}`]} onChange={handle} />}
                    label={opt}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Admitting diagnosis, delivery plan */}
            <Grid item xs={12} sm={6}>
              <TextField label="5. Admitting Diagnosis" name="admittingDiagnosis" value={f.admittingDiagnosis||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="6. Expected Date of Delivery" type="date" name="expectedDoD" value={f.expectedDoD||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2} alignItems="flex-end">
            {/* Delivery and postpartum */}
            <Grid item xs={12} sm={4}>
              <TextField label="8. Date of Delivery" type="date" name="deliveryDate" value={f.deliveryDate||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Time of Delivery" type="time" name="deliveryTime" value={f.deliveryTime||''} onChange={handle} InputLabelProps={{ shrink:true }} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="9. Maternal Outcome" name="maternalOutcome" value={f.maternalOutcome||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="10. Birth Outcome (Fetal Outcome)" name="birthOutcome" value={f.birthOutcome||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Birth Weight (grams)" name="birthWeight" value={f.birthWeight||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Sex of Baby" name="sexBaby" value={f.sexBaby||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="11. Perineal Wound Care" name="perinealWound" value={f.perinealWound||''} onChange={handle} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="12. Signs of Maternal Postpartum Complications" name="postpartumSigns" value={f.postpartumSigns||''} onChange={handle} fullWidth />
            </Grid>

            {/* Family planning / sterilization / follow-up */}
            <Grid item xs={12} sm={4}>
              <FormControlLabel control={<Checkbox name="familyPlanning" checked={!!f.familyPlanning} onChange={handle} />} label="16. Provided Family Planning Service?" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel control={<Checkbox name="sterilization" checked={!!f.sterilization} onChange={handle} />} label="17. Referred for Sterilization?" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel control={<Checkbox name="nextFollowUp" checked={!!f.nextFollowUp} onChange={handle} />} label="18. Schedule Next Postpartum Follow‑up?" />
            </Grid>

            {/* Certification */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mt: 2 }}>
                19. Certification of Attending Physician/Midwife:
              </Typography>
              <TextField
                label="Signature over Printed Name"
                name="certifierName"
                value={f.certifierName||''}
                onChange={handle}
                fullWidth
                sx={{ my:1 }}
              />
              <TextField
                label="Date Signed"
                type="date"
                name="certifierDate"
                value={f.certifierDate||''}
                onChange={handle}
                InputLabelProps={{ shrink:true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>

        <Button variant="contained" color="primary" type="submit">Submit CF3</Button>
      </form>
    </Container>
  );
};

export default CF3Form;
