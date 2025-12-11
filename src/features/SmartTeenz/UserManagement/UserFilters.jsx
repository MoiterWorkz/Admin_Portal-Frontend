import React from "react";
import { Search, Funnel } from "lucide-react";

const UserFilters = () => {
  return (
    <div className="w-full bg-card/30 rounded-xl p-6 simple-card enhanced-border space-y-6 table-card">
      {/* Search Bar */}
      <div className="search-box relative flex-1 w-full md:w-auto">
        <Search className="absolute left-3 top-2 text-muted-foreground h-4 w-4" />
        <input
          placeholder="Search by Name, Email, or User ID"
          className="w-full h-10 rounded-full bg-input-background border border-input px-10 text-sm search-input-approval !w-full md:w-auto"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["All Roles", "All Status", "All KYC Status"].map((item, i) => (
          <div key={i} className="space-y-1">
            <label className="text-sm text-muted-foreground">
              {item.replace("All ", "")}
            </label>

            <select className="w-full rounded-full px-4 text-sm bg-input-background border bg-[#0f172a] border-gray-700 text-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none">
              <option>{item}</option>
            </select>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex items-end space-x-3">
          <button className="flex-1 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition text-white text-sm flex items-center justify-center">
            <Funnel className="w-4 h-4 mr-2" /> Filter
          </button>

          <button className="flex-1 h-10 rounded-full border border-muted-foreground/30 hover:bg-muted/20 transition text-sm">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
