import React from "react";
import CBC from './CBC';
import URINALYSIS from './URINALYSIS';
import CHESTXRAY from './CHESTXRAY';
import SPUTUM from './SPUTUM';
import LIPIDPROF from './LIPIDPROF';
import FBS from './FBS';
import ECG from './ECG';
import FECALYSIS from './FECALYSIS';
import PAPSSMEAR from './PAPSSMEAR';
import OGTT from './OGTT';
import LABRESULT from './LABRESULT';

const LABRESULTS = ({ authUser,formData, setFormData }) => {
  return (
    <>
      <LABRESULT authUser={authUser}  formData={formData} setFormData={setFormData} />
      <CBC authUser={authUser}  formData={formData} setFormData={setFormData} />
      <URINALYSIS authUser={authUser}  formData={formData} setFormData={setFormData} />
      <CHESTXRAY authUser={authUser}  formData={formData} setFormData={setFormData} />
      <SPUTUM authUser={authUser}  formData={formData} setFormData={setFormData} />
      <LIPIDPROF authUser={authUser}  formData={formData} setFormData={setFormData} />
      {/* <FBS authUser={authUser}  formData={formData} setFormData={setFormData} />
      <ECG authUser={authUser}  formData={formData} setFormData={setFormData} /> */}
      <FECALYSIS authUser={authUser}  formData={formData} setFormData={setFormData} />
      <PAPSSMEAR authUser={authUser}  formData={formData} setFormData={setFormData} />
      <OGTT authUser={authUser}  formData={formData} setFormData={setFormData} />
    </>
  );
}
export default LABRESULTS;