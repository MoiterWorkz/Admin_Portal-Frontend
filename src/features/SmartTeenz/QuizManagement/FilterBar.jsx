import React, { useState } from "react";
import {
  Search,
  Funnel,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FilterBar = () => {
  // Pagination states (same as ProductApproval)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // you can change this or make it dynamic

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-card/30 rounded-xl p-6 simple-card enhanced-border space-y-6 table-card">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="search-box relative flex-1">
          <Search className="absolute left-3 top-2.5 text-muted-foreground h-4 w-4" />
          <input
            className="w-full h-10 rounded-full bg-input-background border border-input px-10 text-sm search-input-approval"
            placeholder="Search configurations..."
          />
        </div>
      </div>

      {/* Filters + Pagination */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Category</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-input-background border border-input text-sm rounded-md px-3 py-2 pr-8 glass-input-subtle"
              defaultValue=""
            >
              <option value="">All Categories</option>
              <option value="financial">Financial Literacy</option>
              <option value="budgeting">Budgeting Basics</option>
              <option value="saving">Saving & Investment</option>
              <option value="money">Money Management</option>
              <option value="payments">Digital Payments</option>
              <option value="banking">Banking Fundamentals</option>
            </select>
            <ChevronDown className="w-4 h-4 opacity-50 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Status</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-input-background border border-input text-sm rounded-md px-3 py-2 pr-8 glass-input-subtle"
              defaultValue=""
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="not-started">Not Started</option>
            </select>
            <ChevronDown className="w-4 h-4 opacity-50 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Buttons + Pagination */}
        <div className="col-span-2 flex flex-col justify-between">
          {/* Buttons */}
          <div className="flex items-end justify-end gap-2">
            <button className="reset-btn">
              <Funnel className="w-4 h-4" />
              Filter
            </button>
            <button className="reset-btn">Reset</button>
          </div>

          {/* Pagination (FULL MATCH) */}
          <div className="flex items-center justify-end gap-2 mt-4">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-6 h-6 flex items-center justify-center rounded-md transition 
                ${
                  currentPage === 1
                    ? "bg-[#0f131d] text-gray-500 cursor-not-allowed"
                    : "bg-[#0f131d] text-white hover:border hover:border-[var(--primary-color)]"
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Active Page Number */}
            <span className="w-6 h-6 flex items-center justify-center rounded-md primary-bg text-black text-[12px]">
              {currentPage}
            </span>

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-6 h-6 flex items-center justify-center rounded-md transition 
                ${
                  currentPage === totalPages
                    ? "bg-[#0f131d] text-gray-500 cursor-not-allowed"
                    : "bg-[#0f131d] text-white hover:border hover:border-[var(--primary-color)]"
                }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
