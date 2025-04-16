import React, { useState } from "react";
import SharedTable from "../../shared/SharedTable";
import SharedAppBar from "../../shared/SharedAppBar";

export function Roles() {
  const [roleDaata, setRoleDaata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { field: "role_id", label: "No" },
    { field: "role_name", label: "Role Name" },
    { field: "role_desc", label: "Role Description" },
    { field: "is_active", label: "Status" },
  ];

  return (
    <>
      <SharedAppBar
        titleName="Roles"
        isModal={true}
        // handleClick={handleClick}
      />
      <SharedTable
        columns={columns}
        data={roleDaata}
        // onEdit={handleEdit}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}
