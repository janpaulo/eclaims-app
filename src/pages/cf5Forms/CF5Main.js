import React from "react";
import { Container } from "@mui/material";
import SharedAppBar from "../../shared/SharedAppBar"
import SharedTable from "../../shared/SharedTable"

export function CF5Main({ authUser }) {

  const columns = [
    { field: "hos_id", label: "No" },
    { field: "hospital_name", label: "Hospital Name" },
    { field: "accreditation_num", label: "Accreditation No" },
    { field: "is_active", label: "Status" },
    { field: "date_ceated", label: "Created Date" },
  ];
  return (
    <Container maxWidth="full"  sx={{ my: 4 }}>
      <h1>Under maintenance . . . .</h1>
      <SharedAppBar
        titleName="CF5"
        isModal={false}
        esoaLink="/cf5_forms"
        // handleClick={handleClick}
      />

      <SharedTable
        columns={columns}
        data={[]}
      />
    </Container>
  );
}
