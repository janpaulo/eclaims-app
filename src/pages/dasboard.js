import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';

const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const Dashboard = () => {
  const [claimStats, setClaimStats] = useState(null);

  useEffect(() => {
    // Fetch claim statistics from the API
    const fetchClaimStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/claims/all');
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
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h5">Good afternoon, Acme Inc. 👋</Typography>
          <Typography color="text.secondary">Here is what’s happening with your projects today:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
          <Typography variant="body2">Apr 6, 2021 to Apr 15, 2021</Typography>
          <IconButton sx={{ marginLeft: 2 }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {/* Card 1: Total Claims */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Claims</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {claimStats.total.total_claims}
              </Typography>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={sampleData}>
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Pending Claims */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Claims</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {claimStats.total.total_pending}
              </Typography>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={sampleData}>
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Claimed Claims */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Claimed Claims</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {claimStats.total.total_claimed}
              </Typography>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={sampleData}>
                  <Line type="monotone" dataKey="value" stroke="#ffc658" strokeWidth={2} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Hospital Stats Cards */}
        {claimStats.per_hci.map((hospital, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{hospital.hospital_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {hospital.is_active === 'active' ? 'Active' : 'Inactive'}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  {hospital.total_claims} Claims
                </Typography>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={sampleData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
