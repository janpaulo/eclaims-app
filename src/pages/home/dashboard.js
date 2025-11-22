import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from "@mui/icons-material/Groups"; // Used for "Total Claims"
import GroupAddIcon from "@mui/icons-material/GroupAdd"; // Used for "Total Pending Claims"
import DesktopMacIcon from "@mui/icons-material/DesktopMac"; // Used for "Total Claimed"
import moment from "moment"; // Import moment.js
import axios from "axios";

import SharedAppBar from "../../shared/SharedAppBar";

const Dashboard = ({ authDetails }) => {
  const [claimStats, setClaimStats] = useState(null);  // Get the current hour using moment.js
  const currentHour = moment().hour();

  // Determine the greeting based on the time of day
  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Get today's date using moment.js
  const today = moment();

  // Get the date range (example: last 10 days)
  const startDate = today.clone().subtract(10, "days");

  // Format both the start and end dates using moment.js
  const formattedStartDate = startDate.format("MMM D, YYYY");
  const formattedEndDate = today.format("MMM D, YYYY");


  useEffect(() => {
    // Fetch claim statistics from the API
    const fetchClaimStats = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_CLAIMS + "claims/all",
          {
            headers: { Authorization: `Bearer ${authDetails.access_token}` },
          }
        );
        const { data } = response.data; // Extracting 'data' from the API response
        setClaimStats(data); // Set claim statistics to state
      } catch (error) {
        console.error("Error fetching claim stats:", error);
      }
    };

    fetchClaimStats();
  }, []);

  if (!claimStats) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="full">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
      <Box>
        <Typography variant="h5">{`${greeting}, APP Inc. 👋`}</Typography>
        <Typography color="text.secondary">Here is what’s happening with your projects today:</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <CalendarTodayIcon />
        </IconButton>
        <Typography variant="body2">{formattedStartDate} </Typography>
      </Box>
    </Box>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {[
          {
            icon: <GroupsIcon fontSize="large" sx={{ color: "#4caf50" }} />,
            label: "Total Claims",
            value: claimStats.total.total_claims,
          },
          {
            icon: <GroupAddIcon fontSize="large" sx={{ color: "#4caf50" }} />,
            label: "Total Pending Claims",
            value: claimStats.total.total_pending,
          },
          {
            icon: <DesktopMacIcon fontSize="large" sx={{ color: "#4caf50" }} />,
            label: "Total Claimed",
            value: claimStats.total.total_claimed,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 3,
              }}
            >
              <Box sx={{ bgcolor: "#e8f5e9", p: 2, borderRadius: "50%" }}>
                {item.icon}
              </Box>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {item.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Claims Table */}
      <SharedAppBar
        titleName="All Claims"
        isAdd={false}
        //    titleName={this.state.title}
        //    esoaLink="/esoa_registration"
      />
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              {[
                "Hospital Name",
                "Accreditation No.",
                "Total Claims",
                "Pending",
                "Success",
                "Status",
              ].map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {claimStats.per_hci.map((claim, index) => (
              <TableRow key={index}>
                <TableCell>{claim.hospital_name}</TableCell>
                <TableCell>{claim.hci_no}</TableCell>
                <TableCell>{claim.total_claims}</TableCell>
                <TableCell>{claim.total_pending}</TableCell>
                <TableCell>{claim.total_claimed}</TableCell>
                <TableCell>
                  <Chip
                    label={claim.is_active}
                    sx={{
                      bgcolor:
                        claim.is_active === "active" ? "#c8e6c9" : "#ffcdd2",
                      color:
                        claim.is_active === "active" ? "#388e3c" : "#d32f2f",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
