import React from "react";

const StatCardKyc = ({ title, value, statusText, color, icon, iconBg }) => {
  return (
    <div className="stat-card-dx91u high-risk-dx91u corner-box">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="submenu-card-label">{title}</p>
          <span></span>

          <p className={`text-3xl font-semibold ${color}`}>{value}</p>
          <p className="stat-sub-dx91u">{statusText}</p>
        </div>

        {/* ICON BOX */}
        <div
          className={`dash-kyc-icons flex items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCardKyc;
