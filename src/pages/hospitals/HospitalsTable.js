import React, { useState, useEffect } from "react";
import axios from "axios";

import SharedAppBar from "../../shared/SharedAppBar";
import SharedTable from "../../shared/SharedTable";

export default function HospitalsTable({authUser}) {
  const [hospitalsData, setHospitalsData] = useState([]);
  const columns = [
    { field: "hos_id", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    { field: "date_ceated", label: "Created Date" }
  ];

  
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // const token =authUser.access_token
        const response = await axios.get(
          process.env.REACT_APP_API_CLAIMS + "hospitals/",
          {
            headers: { Authorization: `Bearer ${authUser.access_token}` },
          }
        );

        // Ensure response is an array
        setHospitalsData(response.data.result || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [authUser.access_token]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (row) => alert(`Editing ${row.name}`);
  const handleDelete = (row) => alert(`Deleting ${row.name}`);

  return (
    <>
      <SharedAppBar titleName="Hospitals" />
      <SharedTable
        columns={columns}
        data={hospitalsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}
