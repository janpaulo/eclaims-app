// CF3FormOld.js
import React, { useState, forwardRef, useImperativeHandle } from "react";
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

// const CF3FormOld = () => {

const CF3FormOld = forwardRef((props, ref) => {
  const { disabled = false } = props;
  const initial = {};
  const [f, setF] = useState(initial);
  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setF((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const transformToCF3Old = (flat) => {
    const rawConsultations = Array.from({ length: 11 }).map((_, i) => {
      const idx = i + 1;
      return {
        pVisitDate: flat[`dateOfVisit_${idx}`] || "",
        pAOGWeeks: flat[`aogWeeks_${idx}`] || "",
        pWeight: flat[`weight_${idx}`] || "",
        pCardiacRate: flat[`cardiacrate_${idx}`] || "",
        pRespiratoryRate: flat[`respiratoryrate_${idx}`] || "",
        pBloodPressure: flat[`bloodpressure_${idx}`] || "",
        pTemperature: flat[`temperature_${idx}`] || "",
      };
    });

    let filteredConsultations = rawConsultations.filter((item) =>
      Object.values(item).some((val) => val && val.trim() !== "")
    );

    // 👇 Ensure one blank object if all are empty
    if (filteredConsultations.length === 0) {
      filteredConsultations = [rawConsultations[0]];
    }

    return {
      CF3_OLD: {
        pChiefComplaint: flat.chiefComplaint || "",
        pBriefHistory: flat.history || "",
        pCourseWard: flat.course || "",
        pPertinentFindings: flat.labFindings || "",
        PHEX: {
          pBP: flat.pe_1 || "",
          pCR: flat.pe_2 || "",
          pRR: flat.pe_3 || "",
          pTemp: flat.pe_4 || "",
          pHEENT: flat.pe_7 || "",
          pChestLungs: flat.pe_9 || "",
          pCVS: flat.pe_11 || "",
          pAbdomen: flat.pe_6 || "",
          pGUIE: flat.pe_8 || "",
          pSkinExtremities: flat.pe_10 || "",
          pNeuroExam: flat.pe_12 || "",
        },
        MATERNITY: {
          PRENATAL: {
            pPrenatalConsultation: flat.prenatal_initial || "",
            pMCPOrientation: flat.prenatal_mcpOrientation ? "Y" : "N",
            pExpectedDeliveryDate: flat.expectedDoD || "",
            CLINICALHIST: {
              pVitalSigns: flat.prenatal_vitalsNormal ? "Y" : "N",
              pLMP: flat.lmp || "",
              pMenarcheAge: flat.menarche || "",
              pObstetricG: flat.g || "",
              pObstetricP: flat.p || "",
              pObstetric_T: flat.t || "",
              pObstetric_P: flat.pp || "",
              pObstetric_A: flat.a || "",
              pObstetric_L: flat.l || "",
              pPregnancyLowRisk: flat.lowRisk ? "Y" : "N",
            },
            OBSTETRIC: {
              pMultiplePregnancy: flat.ob_risk_0 ? "Y" : "N",
              pOvarianCyst: flat.ob_risk_1 ? "Y" : "N",
              pMyomaUteri: flat.ob_risk_2 ? "Y" : "N",
              pPlacentaPrevia: flat.ob_risk_3 ? "Y" : "N",
              pMiscarriages: flat.ob_risk_4 ? "Y" : "N",
              pStillBirth: flat.ob_risk_5 ? "Y" : "N",
              pPreEclampsia: flat.ob_risk_6 ? "Y" : "N",
              pEclampsia: flat.ob_risk_7 ? "Y" : "N",
              pPrematureContraction: flat.ob_risk_8 ? "Y" : "N",
            },
            MEDISURG: {
              pHypertension: flat.ms_risk_0 ? "Y" : "N",
              pHeartDisease: flat.ms_risk_1 ? "Y" : "N",
              pDiabetes: flat.ms_risk_2 ? "Y" : "N",
              pThyroidDisaster: flat.ms_risk_3 ? "Y" : "N",
              pObesity: flat.ms_risk_4 ? "Y" : "N",
              pAsthma: flat.ms_risk_5 ? "Y" : "N",
              pEpilepsy: flat.ms_risk_6 ? "Y" : "N",
              pRenalDisease: flat.ms_risk_7 ? "Y" : "N",
              pBleedingDisorders: flat.ms_risk_8 ? "Y" : "N",
              pPreviousCS: flat.ms_risk_9 ? "Y" : "N",
              pUterineMyomectomy: flat.ms_risk_10 ? "Y" : "N",
            },
            CONSULTATION: filteredConsultations,
          },
          DELIVERY: {
            pDeliveryDate: flat.deliveryDate || "",
            pDeliveryTime: flat.deliveryTime || "",
            pObstetricIndex: flat.obstetricIndex || "",
            pAOGLMP: flat.AOGLMP || "",
            pDeliveryManner: flat.mannerOfDelivery || "",
            pPresentation: flat.presentation || "",
            pFetalOutcome: flat.birthOutcome || "",
            pSex: flat.sexBaby || "",
            pBirthWeight: flat.birthWeight || "",
            pAPGARScore: flat.APGARScore || "",
            pPostpartum: flat.postpartumDateWeek || "",
          },
          POSTPARTUM: {
            pPerinealWoundCare: flat.woundCare_done ? "Y" : "N",
            pPerinealRemarks: flat.woundCare_remarks || "",
            pMaternalComplications: flat.complications_done ? "Y" : "N",
            pMaternalRemarks: flat.complications_remarks || "",
            pBreastFeeding: flat.breastfeeding_done ? "Y" : "N",
            pBreastFeedingRemarks: flat.breastfeeding_remarks || "",
            pFamilyPlanning: flat.familyPlanning_done ? "Y" : "N",
            pFamilyPlanningRemarks: flat.familyPlanning_remarks || "",
            pPlanningService: flat.serviceProvided_done ? "Y" : "N",
            pPlanningServiceRemarks: flat.serviceProvided_remarks || "",
            pSurgicalSterilization: flat.partnerReferral_done ? "Y" : "N",
            pSterilizationRemarks: flat.partnerReferral_remarks || "",
            pFollowupSchedule: flat.nextFollowUp_done ? "Y" : "N",
            pFollowupScheduleRemarks: flat.nextFollowUp_remarks || "",
          },
        },
      },
    };
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   const cf3Payload = transformToCF3Old(f);
  //   console.log("Final Payload:", cf3Payload);
  //   // Add API integration here
  // };

  const validate = () => {
    return (
      f.pan?.trim() &&
      f.patientLast?.trim() &&
      f.pAdmissionDate?.trim() &&
      f.pDischargeDate?.trim()
    );
  };

  useImperativeHandle(ref, () => ({
    validateForm: validate,
    getFormData: () => transformToCF3Old(f),
  }));

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
      <form>
        <fieldset disabled={disabled} style={{ border: 0, padding: 0 }}>
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

            <Box sx={{ pb: 2 }}>
              <Typography fontWeight="bold" gutterBottom>
                7. Follow-up Prenatal Consultation
              </Typography>

              {Array.from({ length: 11 }).map((_, index) => {
                const visitIndex = index + 1;

                return (
                  <Box
                    key={visitIndex}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography fontWeight="bold" gutterBottom>
                      Prenatal Visit #{visitIndex + 1}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Date of Visit"
                          type="date"
                          name={`dateOfVisit_${visitIndex}`}
                          value={f[`dateOfVisit_${visitIndex}`] || ""}
                          onChange={handle}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <TextField
                          label="AOG (Weeks)"
                          name={`aogWeeks_${visitIndex}`}
                          value={f[`aogWeeks_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <TextField
                          label="Weight"
                          name={`weight_${visitIndex}`}
                          value={f[`weight_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <TextField
                          label="Cardiac Rate"
                          name={`cardiacrate_${visitIndex}`}
                          value={f[`cardiacrate_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <TextField
                          label="Resp. Rate"
                          name={`respiratoryrate_${visitIndex}`}
                          value={f[`respiratoryrate_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Blood Pressure"
                          name={`bloodpressure_${visitIndex}`}
                          value={f[`bloodpressure_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <TextField
                          label="Temperature"
                          name={`temperature_${visitIndex}`}
                          value={f[`temperature_${visitIndex}`] || ""}
                          onChange={handle}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
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
                <strong>
                  19. Certification of Attending Physician/Midwife:
                </strong>
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
          {/* 
        <Button variant="contained" color="primary" type="submit">
          Submit CF3
        </Button> */}
        </fieldset>
      </form>
    </div>
  );
});

export default CF3FormOld;
