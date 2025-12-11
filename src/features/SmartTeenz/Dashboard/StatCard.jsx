import React from "react";

const StatCard = ({
  title,
  value,
  color,
  icon,
  subText,
  percentage,
  progress,
  progressColor,
}) => {
  return (
    <div className="stat-card-dx91u high-risk-dx91u corner-box">
      <div className="flex justify-between items-center">
        <h3 className="submenu-card-label">{title}</h3>
        {icon}
      </div>

      <span></span>

      <p className={`submenu-card-value ${color}`}>{value}</p>

      {/* Optional progress section */}
      {subText && (
        <>
          <div className="flex justify-between text-xs text-gray-300">
            <p>{subText}</p>
            <p>{percentage}</p>
          </div>

          <div className="w-full h-1.5 bg-gray-200 rounded">
            <div
              className={`h-1.5 ${progressColor} rounded`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatCard;
