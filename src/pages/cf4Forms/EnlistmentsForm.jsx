import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";

const civilStatusOptions = ["S", "M", "W", "X", "A", "U"];
const yesNoXOptions = ["Y", "N", "X"];
const sexOptions = ["M", "F"];
const packageTypeOptions = ["P", "E", "A"];
const patientTypeOptions = ["M", "N"];
const dependentTypeOptions = ["S", "C", "P", "X"];
const reportStatusOptions = ["U", "V", "F"];

const fieldLabels = {
  pEClaimId: "eClaim ID",
  pEClaimsTransmittalId: "eClaims Transmittal ID",
  pHciCaseNo: "HCI Case Number",
  pHciTransNo: "HCI Transaction Number",
  pEffYear: "Effective Year",
  pEnlistStat: "Enlistment Status",
  pEnlistDate: "Enlistment Date",
  pPackageType: "Package Type",
  pMemPin: "Member PIN",
  pMemFname: "Member First Name",
  pMemMname: "Member Middle Name",
  pMemLname: "Member Last Name",
  pMemExtname: "Member Extension Name",
  pMemDob: "Member Date of Birth",
  pMemCat: "Member Category",
  pMemNcat: "Member Non-Category",
  pPatientPin: "Patient PIN",
  pPatientFname: "Patient First Name",
  pPatientMname: "Patient Middle Name",
  pPatientLname: "Patient Last Name",
  pPatientExtname: "Patient Extension Name",
  pPatientType: "Patient Type",
  pPatientSex: "Patient Sex",
  pPatientContactno: "Patient Contact Number",
  pPatientDob: "Patient Date of Birth",
  pPatientAddbrgy: "Patient Address - Barangay",
  pPatientAddmun: "Patient Address - Municipality",
  pPatientAddprov: "Patient Address - Province",
  pPatientAddreg: "Patient Address - Region",
  pPatientAddzipcode: "Patient Address - Zip Code",
  pCivilStatus: "Civil Status",
  pWithConsent: "With Consent",
  pWithLoa: "With LOA",
  pWithDisability: "With Disability",
  pDependentType: "Dependent Type",
  pTransDate: "Transaction Date",
  pCreatedBy: "Created By",
  pReportStatus: "Report Status",
  pDeficiencyRemarks: "Deficiency Remarks",
  pAvailFreeService: "Avail Free Service",
};

export default function EnlistmentsForm() {
  const [enlistment, setEnlistment] = useState(
    Object.fromEntries(Object.keys(fieldLabels).map((key) => [key, ""]))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnlistment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        ENLISTMENT
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(fieldLabels).map(([key, label]) => {
          const isDate =
            key.toLowerCase().includes("date") || key.toLowerCase().includes("dob");
          const isSelect = [
            "pPackageType",
            "pPatientSex",
            "pCivilStatus",
            "pWithConsent",
            "pWithLoa",
            "pWithDisability",
            "pAvailFreeService",
            "pDependentType",
            "pReportStatus",
          ].includes(key);

          const selectOptions = {
            pPackageType: packageTypeOptions,
            pPatientSex: sexOptions,
            pCivilStatus: civilStatusOptions,
            pWithConsent: yesNoXOptions,
            pWithLoa: yesNoXOptions,
            pWithDisability: yesNoXOptions,
            pAvailFreeService: yesNoXOptions,
            pDependentType: dependentTypeOptions,
            pReportStatus: reportStatusOptions,
          };

          return (
            <Grid item xs={12} sm={3} key={key}>
              <TextField
                fullWidth
                type={isDate ? "date" : "text"}
                label={label}
                name={key}
                value={enlistment[key]}
                onChange={handleChange}
                InputLabelProps={isDate ? { shrink: true } : undefined}
                select={isSelect}
              >
                {isSelect &&
                  selectOptions[key].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
