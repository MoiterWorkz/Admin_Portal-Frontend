// components/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="w-full bg-card/30 rounded-xl p-4 simple-card enhanced-border mt-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-chart-5">1–10</span> of{" "}
            <span className="font-semibold text-chart-5">124</span> entries
          </p>

          <select className="px-3 py-1.5 rounded-lg bg-card/50 border border-chart-5/30">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
            <option>100 per page</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button disabled className="page-btn disabled">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <span className="text-muted-foreground">...</span>
          <button className="page-btn">13</button>

          <button className="page-btn next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
