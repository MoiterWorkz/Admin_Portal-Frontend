// components/StatCard.jsx
import React from "react";
import { Brain, Target, TrendingUp, CircleCheckBig } from "lucide-react";

const ICONS = {
  brain: Brain,
  target: Target,
  trending: TrendingUp,
  check: CircleCheckBig,
};

const StatCard = ({ title, value, icon, color }) => {
  const IconComponent = ICONS[icon];

  return (
    <div className="stat-card-dx91u high-risk-dx91u corner-box">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm submenu-card-label">{title}</p>
          <p className={`text-2xl font-semibold ${color}`}>{value}</p>
        </div>
        <span></span>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-${color}/20 to-${color}/5`}
        >
          <IconComponent className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
