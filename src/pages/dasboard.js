import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const Dashboard = () => {
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
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Acme Plus</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>$24,780</Typography>
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
              <Typography variant="h6">Acme Advanced</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>$17,489</Typography>
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
              <Typography variant="h6">Acme Professional</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>$9,962</Typography>
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
              <Typography variant="h6">Direct vs Indirect</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>$8,250 Direct, $27,700 Indirect</Typography>
              {/* Add your chart here */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Real Time Value</Typography>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>$65.97</Typography>
              {/* Add another chart */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
