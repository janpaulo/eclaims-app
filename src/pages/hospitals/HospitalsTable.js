import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";


import SharedAppBar from "../../shared/SharedAppBar";

const hospitalsData = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  hospitalName: "Hospital One",
  accreditationNo: "1245478787",
  status: "Active",
  startDate: i === 2 ? "2 months ago" : "1 month ago",
  endDate: "10/10/2024",
}));

export default function HospitalsTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  // Filter hospitals based on search input
  const filteredHospitals = hospitalsData.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <SharedAppBar
        titleName="Hospitals"
        //    titleName={this.state.title}
        //    esoaLink="/esoa_registration"
      />
      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              {[
                "No.",
                "Hospital Name",
                "Accreditation No",
                "Status",
                "Start Date",
                "End Date",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.id}</TableCell>
                <TableCell>{hospital.hospitalName}</TableCell>
                <TableCell>{hospital.accreditationNo}</TableCell>
                <TableCell>{hospital.status}</TableCell>
                <TableCell>{hospital.startDate}</TableCell>
                <TableCell>{hospital.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
