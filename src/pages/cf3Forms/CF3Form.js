// CF3Form.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Button,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const CF3Form = () => {
  const initial = {};
  const [f, setF] = useState(initial);
  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setF((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("CF3 Data:", f);
    // Add API integration here
  };
  const postpartumFields = [
    { id: "woundCare", label: "13. Perineal wound care" },
    {
      id: "complications",
      label: "14. Signs of Maternal Postpartum Complications",
    },
    { id: "breastfeeding", label: "15a. Breastfeeding and Nutrition" },
    { id: "familyPlanning", label: "15b. Family Planning" },
    {
      id: "serviceProvided",
      label:
        "16. Provided family planning service to patient (as requested by patient)",
    },
    {
      id: "partnerReferral",
      label:
        "17. Referred to partner physician for Voluntary Surgical Sterilization (as requested by pt.)",
    },
    { id: "nextFollowUp", label: "18. Schedule the next postpartum follow‑up" },
  ];
  const months = [
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        PhilHealth CF3 – Patient’s Clinical Record & Maternity Care Package
      </Typography>
      <form onSubmit={submit}>
        <Paper sx={{ p: 3, mb: 4 }}>
          
          <Typography variant="h6" gutterBottom>
             <Divider> PART I – Patient’s Clinical Record</Divider>
          </Typography>
          <Grid container spacing={2}>
            {/* Items 1–6 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="1. PhilHealth Accreditation No. (PAN)"
                name="pan"
                value={f.pan || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="2. Name of Patient (Last, First, Middle)"
                name="patientName"
                value={f.patientName || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="3. Chief Complaint / Reason for Admission"
                name="chiefComplaint"
                value={f.chiefComplaint || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="4. Date Admitted"
                type="date"
                name="dateAdmitted"
                value={f.dateAdmitted || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Time Admitted"
                type="time"
                name="timeAdmitted"
                value={f.timeAdmitted || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="5. Date Discharged"
                type="date"
                name="dateDischarged"
                value={f.dateDischarged || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Time Discharged"
                type="time"
                name="timeDischarged"
                value={f.timeDischarged || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="6. Brief History of Present Illness / OB History"
                name="history"
                value={f.history || ""}
                onChange={handle}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>

            {/* Item 7 – Physical Examination */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                7. Physical Examination (Pertinent Findings per System)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="General Survey"
                name="pe_5"
                value={f["pe_5"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            {/* <Grid container spacing={2}> */}
            <Grid item xs={12} sm={2.4}>
              <Typography gutterBottom>Vital Signs:</Typography>
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <TextField
                label="BP"
                name="pe_1"
                value={f["pe_1"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <TextField
                label="CR"
                name="pe_2"
                value={f["pe_2"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <TextField
                label="RR"
                name="pe_3"
                value={f["pe_3"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <TextField
                label="Temperature"
                name="pe_4"
                value={f["pe_4"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            {/* </Grid> */}

            <Grid item xs={12} sm={4}>
              <TextField
                label="Abdomen"
                name="pe_6"
                value={f["pe_6"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="HEENT"
                name="pe_7"
                value={f["pe_7"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="GU (IE)"
                name="pe_8"
                value={f["pe_8"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Chest/Lungs"
                name="pe_9"
                value={f["pe_9"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Skin/Extremities"
                name="pe_10"
                value={f["pe_10"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVS"
                name="pe_11"
                value={f["pe_11"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Neuro Examination"
                name="pe_12"
                value={f["pe_12"] || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>

            {/* Items 8–9 */}
            <Grid item xs={12}>
              <TextField
                label="8. Course in the Wards"
                name="course"
                value={f.course || ""}
                onChange={handle}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="9. Pertinent Laboratory & Diagnostic Findings"
                name="labFindings"
                value={f.labFindings || ""}
                onChange={handle}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>

            {/* Item 10 – Disposition on Discharge */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                10. Disposition on Discharge
              </Typography>
            </Grid>
            {["Improved", "Transferred", "HAMA", "Absconded", "Expired"].map(
              (opt) => (
                <Grid item xs={6} sm={2} key={opt}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`disp_${opt}`}
                        checked={!!f[`disp_${opt}`]}
                        onChange={handle}
                      />
                    }
                    label={opt}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Paper>

        {/* Part II – Maternity Care Package */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            <Divider> PART II – Maternity Care Package</Divider>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            PRENATAL CONSULTATION
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {/* Initial consultation and clinical history */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="1. Initial Prenatal Consultation Date"
                type="date"
                name="prenatal_initial"
                value={f.prenatal_initial || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="prenatal_vitalsNormal"
                    checked={!!f.prenatal_vitalsNormal}
                    onChange={handle}
                  />
                }
                label="Vital signs are normal"
              />
            </Grid>

            {/* Risk factors */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                3. Obstetric & Medical/Surgical Risk Factors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  {["Multiple pregnancy", "Ovarian cyst", "Myoma uteri"].map(
                    (opt, i) => (
                      <FormControlLabel
                        key={`ob_risk_${i}`}
                        control={
                          <Checkbox
                            name={`ob_risk_${i}`}
                            checked={!!f[`ob_risk_${i}`]}
                            onChange={handle}
                          />
                        }
                        label={opt}
                      />
                    )
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  {[
                    "Placenta previa",
                    "History of 3 miscarriages",
                    "History of stillbirth",
                  ].map((opt, i) => (
                    <FormControlLabel
                      key={`ob_risk_${i + 3}`}
                      control={
                        <Checkbox
                          name={`ob_risk_${i + 3}`}
                          checked={!!f[`ob_risk_${i + 3}`]}
                          onChange={handle}
                        />
                      }
                      label={opt}
                    />
                  ))}
                </Grid>

                <Grid item xs={12} sm={4}>
                  {[
                    "History of pre‑eclampsia",
                    "History of eclampsia",
                    "Premature contraction",
                  ].map((opt, i) => (
                    <FormControlLabel
                      key={`ob_risk_${i + 6}`}
                      control={
                        <Checkbox
                          name={`ob_risk_${i + 6}`}
                          checked={!!f[`ob_risk_${i + 6}`]}
                          onChange={handle}
                        />
                      }
                      label={opt}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">
                4. Medical/Surgical risk factors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  {["Hypertension", "Heart disease", "Diabetes"].map(
                    (opt, i) => (
                      <FormControlLabel
                        key={`ms_risk_${i}`}
                        control={
                          <Checkbox
                            name={`ms_risk_${i}`}
                            checked={!!f[`ms_risk_${i}`]}
                            onChange={handle}
                          />
                        }
                        label={opt}
                      />
                    )
                  )}
                </Grid>

                <Grid item xs={12} sm={3}>
                  {[
                    "Thyroid disorder",
                    "Obesity",
                    "Moderate to severe asthma",
                  ].map((opt, i) => (
                    <FormControlLabel
                      key={`ms_risk_${i + 3}`}
                      control={
                        <Checkbox
                          name={`ms_risk_${i + 3}`}
                          checked={!!f[`ms_risk_${i + 3}`]}
                          onChange={handle}
                        />
                      }
                      label={opt}
                    />
                  ))}
                </Grid>

                <Grid item xs={12} sm={3}>
                  {["Epilepsy", "Renal disease", "Bleeding disorders"].map(
                    (opt, i) => (
                      <FormControlLabel
                        key={`ms_risk_${i + 6}`}
                        control={
                          <Checkbox
                            name={`ms_risk_${i + 6}`}
                            checked={!!f[`ms_risk_${i + 6}`]}
                            onChange={handle}
                          />
                        }
                        label={opt}
                      />
                    )
                  )}
                </Grid>

                <Grid item xs={12} sm={3}>
                  {[
                    "History of previous cesarean section",
                    "History of uterine myomectomy",
                  ].map((opt, i) => (
                    <FormControlLabel
                      key={`ms_risk_${i + 9}`}
                      control={
                        <Checkbox
                          name={`ms_risk_${i + 9}`}
                          checked={!!f[`ms_risk_${i + 9}`]}
                          onChange={handle}
                        />
                      }
                      label={opt}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>

            {/* Admitting diagnosis, delivery plan */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="5. Admitting Diagnosis"
                name="admittingDiagnosis"
                value={f.admittingDiagnosis || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography gutterBottom mt={3}>
                6. Delivery Plan
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography>
                  a. Orientation to MCP/Availment of Benefits
                </Typography>
                <FormControlLabel control={<Checkbox />} label="Yes" />
                <FormControlLabel control={<Checkbox />} label="No" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography mt={2} mb={2} gutterBottom>
                b. Expected Date of Delivery
              </Typography>
              <TextField
                label=""
                type="date"
                name="expectedDoD"
                value={f.expectedDoD || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography gutterBottom mt={4}>
            7. Follow-up Prenatal Consultation
          </Typography>

          <Box sx={{ pb: 2 }}>
            {/* Prenatal Consultation No. */}
            <Typography>a. Prenatal Consultation No.</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {months.map((month, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  align="center"
                  sx={{ flex: 1, textAlign: "center" }}
                >
                  {month}
                </Typography>
              ))}
            </Box>

            {/* Date of Visit */}
            <Typography mt={2}>b. Date of Visit (mm/dd/yyyy)</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {months.map((month, index) => {
                const name = `dateOfVisit_${index + 1}`;
                return (
                  <Box key={index} sx={{ width: 120 }}>
                    <TextField
                      type="date"
                      size="small"
                      label={month}
                      fullWidth
                      name={name}
                      value={f[name] || ""}
                      onChange={handle}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* AOG in Weeks */}
            <Typography mt={2}>c. AOG in Weeks</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {months.map((_, index) => {
                const name = `aogWeeks_${index + 1}`;
                return (
                  <Box key={index} sx={{ flex: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name={name}
                      value={f[name] || ""}
                      onChange={handle}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* Weight & Vital Signs */}
            <Typography mt={2}>d. Weight & Vital Signs</Typography>
            {[
              "Weight",
              "Cardiac Rate",
              "Respiratory Rate",
              "Blood Pressure",
              "Temperature",
            ].map((label, i) => (
              <Box key={i} mt={2}>
                <Typography>{`d.${i + 1} ${label}`}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {months.map((_, index) => {
                    const name = `${label.replace(/\s/g, "").toLowerCase()}_${
                      index + 1
                    }`;
                    return (
                      <Box key={index} sx={{ flex: 1 }}>
                        <TextField
                          size="small"
                          fullWidth
                          name={name}
                          value={f[name] || ""}
                          onChange={handle}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
          <Typography variant="h6" mt={2} gutterBottom>
            <Divider>DELIVERY OUTCOME</Divider>
          </Typography>
          <Grid container spacing={2} alignItems="flex-end">
            {/* Delivery and postpartum */}
            <Grid item xs={12} sm={4}>
              <Typography>8.Date and Time of Delivery </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label=""
                type="date"
                name="deliveryDate"
                value={f.deliveryDate || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Time of Delivery"
                type="time"
                name="deliveryTime"
                value={f.deliveryTime || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>9.Maternal Outcome </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Obstetric Index "
                name="obstetricIndex"
                value={f.obstetricIndex || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>Pregnancy Uterine,</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="AOG by LMP"
                name="AOGLMP"
                value={f.AOGLMP || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Manner of Delivery"
                name="mannerOfDelivery"
                value={f.mannerOfDelivery || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Presentation"
                name="presentation"
                value={f.presentation || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            {/* {"10. Birth Outcome (Fetal Outcome)"} */}
            <Grid item xs={12} sm={2}>
              <Typography>10. Birth Outcome</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Fetal Outcome"
                name="birthOutcome"
                value={f.birthOutcome || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Sex"
                name="sexBaby"
                value={f.sexBaby || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Birth Weight (grams)"
                name="birthWeight"
                value={f.birthWeight || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="APGAR Score"
                name="APGARScore"
                value={f.APGARScore || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            {/* 11. Scheduled Postpartum follow-up consultation 1 week after delivery */}
            <Grid item xs={12} sm={6}>
              <Typography>
                11. Scheduled Postpartum follow-up consultation 1 week after
                delivery
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label=""
                type="date"
                name="postpartumDateWeek"
                value={f.postpartumDateWeek || ""}
                onChange={handle}
                fullWidth
              />
            </Grid>
            {/* 12. Date and Time of Discharge< */}
            <Grid item xs={12} sm={4}>
              <Typography>12. Date and Time of Discharge</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label=""
                type="date"
                name="dischargeDateOutcome"
                value={f.dischargeDateOutcome || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Time of Discharge"
                type="time"
                name="dischargeTimeOutcome"
                value={f.dischargeTimeOutcome || ""}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* POSTPARTUM CARE */}
          <Grid item xs={12} sm={12} mt={2}>
            <Typography variant="h6" gutterBottom>
              <Divider>POSTPARTUM CARE</Divider>
            </Typography>
          </Grid>
          <Box>
            {postpartumFields.map(({ id, label }) => (
              <Grid
                container
                spacing={1}
                key={id}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid item xs={12} md={6}>
                  <Typography>{label}</Typography>
                </Grid>

                {/* DONE checkbox */}
                <Grid item xs={1}>
                  <Checkbox
                    name={`${id}_done`}
                    checked={!!f[`${id}_done`]}
                    onChange={handle}
                  />
                </Grid>

                {/* Remarks */}
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Remarks"
                    name={`${id}_remarks`}
                    value={f[`${id}_remarks`] || ""}
                    onChange={handle}
                  />
                </Grid>
              </Grid>
            ))}

            <Divider sx={{ my: 4 }} />

            {/* Certification block */}
            <Typography variant="subtitle1" gutterBottom>
              <strong>19. Certification of Attending Physician/Midwife:</strong>
            </Typography>

            <Typography fontStyle="italic" sx={{ mb: 3 }}>
              I certify that the above information given in this form are true
              and correct.
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Signature Over Printed Name of Attending Physician/Midwife"
                  name="physicianName"
                  value={f.physicianName || ""}
                  onChange={handle}
                />
              </Grid>

              {/* Date signed */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={1}>
                  <TextField
                    label=""
                    type="date"
                    name="signedDate"
                    value={f.signedDate || ""}
                    onChange={handle}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Button variant="contained" color="primary" type="submit">
          Submit CF3
        </Button>
      </form>
    </div>
  );
};

export default CF3Form;
