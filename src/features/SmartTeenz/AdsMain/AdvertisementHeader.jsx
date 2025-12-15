import React from "react";
import { Plus } from "lucide-react";

const AdvertisementHeader = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[var(--white-color)] text-lg sm:text-xl md:text-2xl font-bold">
          Advertisement Management
        </h1>

        <p className="submenu-card-label mt-1">
          Create and manage Smart Teenx advertisements
        </p>
      </div>
      <button
        onClick={onCreate}
        className="btn-outline inline-flex items-center justify-center"
      >
        <Plus className="w-5 h-5" />
        <span>Create Advertisement</span>
      </button>
    </div>
  );
};

export default AdvertisementHeader;
