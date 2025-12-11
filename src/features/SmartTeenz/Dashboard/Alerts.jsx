import React from "react";
import { Clock, Activity, TriangleAlert, CheckCircle } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      text: "15 Parent KYC pending approval",
      time: "2 hours ago",
      icon: Clock,
      bg: "bg-yellow-900/20",
      border: "border-yellow-600/40",
      iconBg: "bg-yellow-700/20",
      iconColor: "text-yellow-400",
      color: "text-[#00d4aa]",
    },
    {
      text: "8 Teen MIN KYC submitted for review",
      time: "4 hours ago",
      icon: Activity,
      bg: "bg-blue-900/20",
      border: "border-blue-600/40",
      iconBg: "bg-blue-700/20",
      iconColor: "text-blue-400",
      color: "text-[#00d4aa]",
    },
    {
      text: "Unusual wallet activity detected - User #4521",
      time: "6 hours ago",
      icon: TriangleAlert,
      bg: "bg-red-900/20",
      border: "border-red-600/40",
      iconBg: "bg-red-700/20",
      iconColor: "text-red-400",
      color: "text-[#00d4aa]",
    },
    {
      text: "125 new teen-parent links completed",
      time: "1 day ago",
      icon: CheckCircle,
      bg: "bg-green-900/20",
      border: "border-green-600/40",
      iconBg: "bg-green-700/20",
      iconColor: "text-green-400",
      color: "text-[#00d4aa]",
    },
  ];

  return (
    <div className="bg-card/30 rounded-xl p-6 simple-card enhanced-border lg:col-span-2 table-card ">
      <h3 className="user-table-header primary-color mb-6">Recent Alerts</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 border ${a.border} ${a.bg} transition hover:bg-opacity-30`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${a.iconBg}`}
              >
                <a.icon className={`w-5 h-5 ${a.iconColor}`} />
              </div>

              <div>
                <p className={`text-sm white-color`}>{a.text}</p>
                <p className="text-[10px] text-gray-300 mt-1 ">{a.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
