// src/App.js
import React from "react";
import { CssBaseline, Container } from "@mui/material";
import SharedAppBar from "../../shared/SharedAppBar"
import SharedTable from "../../shared/SharedTable"

function Main() {
    
  const columns = [
    { field: "hos_id", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    { field: "date_ceated", label: "Created Date" },
  ];
  return (
    <>
      <CssBaseline />
      <SharedAppBar
        titleName="CF4"
        isModal={false}
        esoaLink="/cf4_forms"
        // handleClick={handleClick}
      />

      <SharedTable
        columns={columns}
        data={[]}
        // onEdit={handleEdit}
        // page={page}
        // setPage={setPage}
        // rowsPerPage={rowsPerPage}
        // setRowsPerPage={setRowsPerPage}
      />
      
      {/* <Container maxWidth="md" sx={{ mt: 4 }}>
        <UploadDocsModule />
      </Container> */}
    </>
  );
}

export default Main;
