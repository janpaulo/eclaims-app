import React from "react";
import { Container } from "@mui/material";
import SharedAppBar from "../../shared/SharedAppBar"
import SharedTable from "../../shared/SharedTable"

export function CF4Main({ authUser }) {

  const columns = [
    { field: "hos_id", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    { field: "date_ceated", label: "Created Date" },
  ];
  return (
    <Container maxWidth="lg">
      <SharedAppBar
        titleName="CF4"
        isModal={true}
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
    </Container>
  );
}
