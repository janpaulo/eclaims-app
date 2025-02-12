import React from "react";
import { 
  Container, Typography, Box, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups"; // Used for "Total Claims"
import GroupAddIcon from "@mui/icons-material/GroupAdd"; // Used for "Total Pending Claims"
import DesktopMacIcon from "@mui/icons-material/DesktopMac"; // Used for "Total Claimed"

import SharedAppBar from "../../shared/SharedAppBar";
const claimsData = [
  { hospital: "Hospital One", accNo: "12345678", total: 20, pending: 10, success: 10, status: "Active" },
  { hospital: "Hospital Two", accNo: "23456789", total: 15, pending: 5, success: 10, status: "Inactive" },
  { hospital: "Hospital One", accNo: "12345678", total: 20, pending: 10, success: 10, status: "Active" },
  { hospital: "Hospital One", accNo: "12345678", total: 20, pending: 10, success: 10, status: "Active" }
];

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      {/* <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
        Hello JUAN 👋
      </Typography> */}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ my: 3 }}>
        {[
          { icon: <GroupsIcon fontSize="large" sx={{ color: "#4caf50" }} />, label: "Total Claims", value: "5,423" },
          { icon: <GroupAddIcon fontSize="large" sx={{ color: "#4caf50" }} />, label: "Total Pending Claims", value: "1,893" },
          { icon: <DesktopMacIcon fontSize="large" sx={{ color: "#4caf50" }} />, label: "Total Claimed", value: "189" },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={2} sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
              <Box sx={{ bgcolor: "#e8f5e9", p: 2, borderRadius: "50%" }}>{item.icon}</Box>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">{item.label}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>{item.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search & Sort */}
      {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>All Claims</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField 
            size="small"
            placeholder="Search..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Select size="small" defaultValue="Newest">
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </Box>
      </Box> */}

      {/* Claims Table */}
      <SharedAppBar
              titleName="All Claims"
              //    titleName={this.state.title}
              //    esoaLink="/esoa_registration"
            />
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              {["Hospital Name", "Accreditation No.", "Total Claims", "Pending", "Success", "Status"].map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {claimsData.map((claim, index) => (
              <TableRow key={index}>
                <TableCell>{claim.hospital}</TableCell>
                <TableCell>{claim.accNo}</TableCell>
                <TableCell>{claim.total}</TableCell>
                <TableCell>{claim.pending}</TableCell>
                <TableCell>{claim.success}</TableCell>
                <TableCell>
                  <Chip 
                    label={claim.status} 
                    sx={{ 
                      bgcolor: claim.status === "Active" ? "#c8e6c9" : "#ffcdd2",
                      color: claim.status === "Active" ? "#388e3c" : "#d32f2f",
                      fontWeight: "bold"
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={40} color="primary" />
      </Box> */}
    </Container>
  );
};

export default Dashboard;
