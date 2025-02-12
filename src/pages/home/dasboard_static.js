import React from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];
// Function to format date as 'Month day, Year'
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Function to get dynamic greeting based on time
const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
const Dashboard = () => {

  const today = new Date();
  
  // Calculate the date 7 days ago (or any range you prefer)
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
      <Box>
          {/* Dynamic Greeting */}
          <Typography variant="h5">{getGreeting()}, APP Inc. 👋</Typography>
          <Typography color="text.secondary">Here is what’s happening with your projects today:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
          {/* Dynamic Date Range */}
          <Typography variant="body2">
            {formatDate(lastWeek)} to {formatDate(today)}
          </Typography>
          <IconButton sx={{ marginLeft: 2 }}>
          </IconButton>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">APP Plus</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>24,780</Typography>
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

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">APP Advanced</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>17,489</Typography>
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

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">APP Professional</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>9,962</Typography>
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

        {/* Other Charts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Claims</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>8,250 </Typography>
              {/* Add your chart here */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Claims</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>65.97</Typography>
              {/* Add another chart */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
