import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Button } from "@mui/material";
import PartI_HCI from "./PartI_HCI";
import PartII_Confinement from "./PartII_Confinement";
import PartIII_Certification from "./PartIII_Certification";
import PartIV_HCICert from "./PartIV_HCICert";

const initial = {
  // all form fields keys here
  pan: "",
  hciName: "",
  hciAddress: "",
  patientLast: "",
  patientFirst: "",
  patientMiddle: "",
  patientExt: "",
  referredHCI: "no",
  referringHCIName: "",
  referringStreet: "",
  referringCity: "",
  referringZip: "",
  referral: false,
  referringHCI: "",
  admitDate: "",
  admitTime: "",
  admitAMPM: "AM",
  dischargeDate: "",
  dischargeTime: "",
  dischargeAMPM: "AM",
  disposition: "",
  accommodation: "",
  admissionDx: "",
  dischargeDx: "",
  consumedBenefit: false,
  totalHCIFees: "",
  totalProfFees: "",
  copayInst: "",
  copayProf: "",
  drugsSupplies: "",
  diagnostics: "",
  patientSig: "",
  patientSigDate: "",
  patientRelation: "",
  thumbmark: false,
  certName: "",
  certPosition: "",
  certSignature: "",
  certDate: "",
  patientDisposition: "",
  dateExpired: "",
  timeExpired: "",
  referralHCIName: "",
  referralReason: "",
  referralCity: "",
  referralProvince: "",
  referralZip: "",
  diagnosisCodes: [],
};

const CF2Form = forwardRef((props, ref) => {
  const [data, setData] = useState(initial);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () =>
    data.pan && data.patientLast && data.admitDate && data.dischargeDate;
  const handleSubmit = () => console.log("Submit CF2:", data);

  useImperativeHandle(ref, () => ({
    validateForm: validate,
    handleSubmit: handleSubmit,
  }));

  return (
    <Box sx={{ p: 2 }}>
      <PartI_HCI data={data} onChange={handleChange} />
      <PartII_Confinement form={data} handleChange={handleChange} setForm={setData}/>
      <PartIII_Certification data={data} onChange={handleChange}  />
      <PartIV_HCICert data={data} onChange={handleChange} />
    </Box>
  );
});

export default CF2Form;
