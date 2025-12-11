import React from "react";
import UserManagementHeader from "./UserManagementHeader";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";

const UserManagementMain = () => {
  return (
    <div className="min-h-screen w-full p-8 space-y-8 dashboard-bg">
      <UserManagementHeader />
      <UserFilters />
      <UsersTable />
    </div>
  );
};

export default UserManagementMain;
