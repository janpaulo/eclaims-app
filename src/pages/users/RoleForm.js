import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../api';

export default function RoleForm({ onRoleCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await api.post('/roles', { name, description });
      onRoleCreated(res.data);
      setName('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h6">Create Role</Typography>
      <TextField label="Role Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
      <TextField label="Description" fullWidth margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Save Role</Button>
    </Box>
  );
}
