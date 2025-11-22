import React, { useState, useEffect } from "react";
import axios from "axios";
import SimplePopUp from "../../shared/SimplePopUp/SimplePopUp";
import { Form } from "./Form";

import SharedAppBar from "../../shared/SharedAppBar";
import SharedTable from "../../shared/SharedTable";

export default function HospitalsTable({ authUser }) {
  const [hospitalsData, setHospitalsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalUsers, setHospitalUsers] = useState([]);

  const columns = [
    { field: "__index", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    // { field: "date_ceated", label: "Created Date" },
  ];

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_CLAIMS + "hospitals/",
        {
          headers: { Authorization: `Bearer ${authUser.access_token}` },
        }
      );
      setHospitalsData(response.data.result || []);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const fetchHospitalUsers = async (accreditation_num) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_CLAIMS}hospitals/users/${accreditation_num}`,
        {
          headers: { Authorization: `Bearer ${authUser.access_token}` },
        }
      );
      setHospitalUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching hospital users:", error);
      setHospitalUsers([]);
    }
  };

  const handleEdit = async (hospital) => {
    setSelectedHospital(hospital);
    await fetchHospitalUsers(hospital.accreditation_num);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedHospital(null);
    setHospitalUsers([]);
  };

  const handleClick = () => setIsOpen(true);

  useEffect(() => {
    fetchHospitals();
  }, [authUser.access_token]);

  return (
    <>
      <SharedAppBar
        titleName="Hospitals"
        isModal={true}
        handleClick={handleClick}
      />

      <SharedTable
        columns={columns}
        data={hospitalsData}
        onEdit={handleEdit}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      <SimplePopUp
        openPopup={isOpen}
        title={selectedHospital ? "Update Hospital" : "Create Hospital"}
        handleClose={handleClose}
        maxWidth={"md"}
      >
        <Form
          handleClose={handleClose}
          authUser={authUser}
          hospitalToEdit={selectedHospital}
          hospitalUsers={hospitalUsers}
          onSuccess={() => {
            fetchHospitals();
            handleClose();
          }}
        />
      </SimplePopUp>
    </>
  );
}
