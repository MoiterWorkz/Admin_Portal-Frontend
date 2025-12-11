import React from "react";
import { Users } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="w-full rounded-xl p-6 table-card ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* ICON BOX */}
          <div className="w-12 h-12  rounded-xl flex items-center justify-center icon-round">
            <Users className="text-chart-5" size={15} />
          </div>

          {/* TEXT */}
          <div>
            <h1 className="user-table-header primary-color">
              Smart Teenz Dashboard
            </h1>
            <p className="root-sub-header mt-1">
              Financial literacy platform overview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
