import React, { useState } from "react";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import api from "../../api";
import SharedTable from "../../shared/SharedTable";
import SharedAppBar from "../../shared/SharedAppBar";
// import SimplePopUp from "../../shared/SimplePopUp/SimplePopUp";


export default function HopitalRoleAccount({ onRoleCreated }) {

    // const [accountsData, setAccountsData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedHospital, setSelectedHospital] = useState(null);
    
  const columns = [
    { field: "id", label: "No" },
    { field: "name", label: "Hospital Name" },
    { field: "hci_no", label: "Hospital Accreditation" },
    { field: "role_id", label: "Roles" }
  ];
  //   const [name, setName] = useState('');
  //   const [description, setDescription] = useState('');

  //   const handleSubmit = async () => {
  //     try {
  //       const res = await api.post('/roles', { name, description });
  //       onRoleCreated(res.data);
  //       setName('');
  //       setDescription('');
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    <div>
      <SharedAppBar
        titleName="Hospital Role Account"
        isModal={true}
        // handleClick={handleClick}
      />
      <SharedTable
        columns={columns}
        data={[]}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        // onEdit={handleEdit}
      />
      {/* <Typography variant="h6">Create Role</Typography>
      <TextField label="Role Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
      <TextField label="Description" fullWidth margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Save Role</Button> */}
    </div>
  );
}
