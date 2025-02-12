import React from "react";
import { Container, Box } from "@mui/material";
import HospitalsTable from "./HospitalsTable";

export function Main({ children }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>{children}</Box>
      <HospitalsTable />
    </Container>
  );
}
