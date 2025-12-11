import React from "react";
import { Eye } from "lucide-react";

const users = [
  {
    id: "USR001",
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    role: "Teen",
    roleColor: "purple",
    kyc: "Approved",
    kycColor: "green",
    date: "2024-11-15",
  },
  {
    id: "USR002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43211",
    role: "Parent",
    roleColor: "blue",
    kyc: "Approved",
    kycColor: "green",
    date: "2024-11-10",
  },
  {
    id: "USR003",
    name: "Rohan Patel",
    email: "rohan.patel@email.com",
    phone: "+91 97654 32109",
    role: "Teen",
    roleColor: "purple",
    kyc: "Pending",
    kycColor: "yellow",
    date: "2025-01-02",
  },
  {
    id: "USR004",
    name: "Neha Gupta",
    email: "neha.gupta@email.com",
    phone: "+91 96543 21098",
    role: "Parent",
    roleColor: "blue",
    kyc: "Rejected",
    kycColor: "red",
    date: "2024-12-20",
  },
];

const UsersTable = () => {
  return (
    <div className="w-full bg-card/30 rounded-xl simple-card enhanced-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30">
              {[
                "User ID",
                "Name",
                "Email",
                "Phone",
                "Role",
                "KYC Status",
                "Joined Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-2 text-left text-chart-5 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b border-border/30 hover:bg-card/20"
              >
                <td className="p-2 font-mono">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2 text-muted-foreground">{u.email}</td>
                <td className="p-2 text-muted-foreground">{u.phone}</td>

                {/* Role */}
                <td className="p-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md border border-${u.roleColor}-500/30 text-${u.roleColor}-500 bg-${u.roleColor}-500/10`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* KYC */}
                <td className="p-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md border border-${u.kycColor}-500/30 text-${u.kycColor}-500 bg-${u.kycColor}-500/10`}
                  >
                    {u.kyc}
                  </span>
                </td>

                <td className="p-2 text-muted-foreground">{u.date}</td>

                <td className="p-2 text-right">
                  <button className="border border-blue-500/30 px-3 py-1 rounded-md text-blue-500 hover:bg-blue-500/10 flex items-center gap-1">
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
