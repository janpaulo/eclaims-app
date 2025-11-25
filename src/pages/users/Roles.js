import React, { useEffect, useState } from "react";
import SharedTable from "../../shared/SharedTable";
import SharedAppBar from "../../shared/SharedAppBar";
import api from "../../api";
import SimplePopUp from "../../shared/SimplePopUp/SimplePopUp";
import AssignPermissionsForm from "./AssignPermissionsForm";

export function Roles({ authUser }) {
  const [roleData, setRoleData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const columns = [
    { field: "id", label: "No" },
    { field: "name", label: "Role Name" },
    { field: "description", label: "Role Description" },
    {
      field: "permissions",
      label: "Permissions",
      render: (permissions) =>
        permissions && permissions.length > 0
          ? permissions.map((p) => p.name).join(", ")
          : "None",
    },
  ];

  const fetchRoles = async () => {
    const res = await api.get("/roles/permissions");
    setRoleData(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedHospital(null);
  };

  const handleClick = () => {
    setIsOpen(true);
    setSelectedHospital(null); // clear previous selection when creating new
  };

  const handleSuccess = async () => {
    await fetchRoles();
    handleClose();
  };

  return (
    <>
      <SharedAppBar titleName="Roles" isModal={true} handleClick={handleClick} />
      <SharedTable
        columns={columns}
        data={[]}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        onEdit={handleEdit}
      />

      <SimplePopUp
        openPopup={isOpen}
        title={selectedHospital ? "Update Assign Permissions to Role" : "Create Assign Permissions to Role"}
        handleClose={handleClose}
      >
        <AssignPermissionsForm
          handleClose={handleClose}
          authUser={authUser}
          hospitalToEdit={selectedHospital}
          onSuccess={handleSuccess}
        />
      </SimplePopUp>
    </>
  );
}
