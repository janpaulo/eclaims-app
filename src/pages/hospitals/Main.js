import React from "react";
import { Container } from "@mui/material";
import HospitalsTable from "./HospitalsTable";

export function Main({ authUser }) {

  return (
    <Container maxWidth="lg">
      {/* <Box sx={{ mt: 4 }}>{children}</Box> */}
      <HospitalsTable   authUser={authUser}/>
    </Container>
  );
}
