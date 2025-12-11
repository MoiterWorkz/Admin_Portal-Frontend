import React from "react";
import "../chartSetup";
import {
  Users,
  User,
  UserCheck,
  Activity,
  Clock,
  CircleCheckBig,
  TriangleAlert,
} from "lucide-react";
import StatCard from "./StatCard";
import WalletChart from "./WalletChart";
import QuizChart from "./QuizChart";
import Alerts from "./Alerts";
import DashboardHeader from "./DashboardHeader";
import StatCardKyc from "./StatCardKyc";

const TeenzDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "3,247",
      color: "text-[#ffffff]",
      icon: <Users className="w-4 h-4 text-blue-500" />,
    },
    {
      title: "Total Teens",
      value: "1,856",
      color: "text-[#ffffff]",

      icon: <User className="w-4 h-4 text-blue-500" />,
    },
    {
      title: "Total Parents",
      value: "1,391",
      color: "text-[#ffffff]",
      icon: <UserCheck className="w-4 h-4 text-purple-500" />,
    },
    {
      title: "Daily Active Users",
      value: "892",
      color: "text-[#ffffff]",
      icon: <Activity className="w-4 h-4 text-green-500" />,
    },
  ];
  const kycStats = [
    {
      title: "KYC Pending",
      value: "23",
      statusText: "Awaiting review",
      color: "text-yellow-500",
      iconBg: "bg-yellow-900/40",
      icon: <Clock className="w-6 h-6 text-yellow-500" size={20} />,
    },
    {
      title: "KYC Approved",
      value: "2,785",
      statusText: "Verified accounts",
      color: "text-green-500",
      iconBg: "bg-green-900/40",
      icon: <CircleCheckBig className="w-6 h-6 text-green-500" size={20} />,
    },
    {
      title: "KYC Rejected",
      value: "37",
      statusText: "Require resubmission",
      color: "text-red-500",
      iconBg: "bg-red-900/40",
      icon: <TriangleAlert className="w-6 h-6 text-red-500" size={20} />,
    },
  ];

  return (
    <div className="min-h-screen w-full p-8 space-y-8 dashboard-bg">
      {/* HEADER */}
      <DashboardHeader />

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      {/* KYC STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kycStats.map((item, idx) => (
          <StatCardKyc key={idx} {...item} />
        ))}
      </div>
      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletChart />
        <QuizChart />
      </div>

      {/* ALERTS */}
      <Alerts />
    </div>
  );
};

export default TeenzDashboard;
