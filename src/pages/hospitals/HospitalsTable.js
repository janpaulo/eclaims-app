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

  const columns = [
    { field: "hos_id", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    { field: "date_ceated", label: "Created Date" },
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

  useEffect(() => {
    fetchHospitals();
  }, [authUser.access_token]);

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedHospital(null); // Reset selected hospital data
  };

  const handleClick = () => setIsOpen(true);

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
      >
        <Form
          handleClose={handleClose}
          authUser={authUser}
          hospitalToEdit={selectedHospital} // Pass data here
          onSuccess={() => {
            fetchHospitals();
            handleClose();
          }}
        />
      </SimplePopUp>
    </>
  );
}
