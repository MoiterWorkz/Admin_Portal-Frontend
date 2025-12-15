import React from "react";
import { Eye, Save, Upload, MapPin, AlertCircle } from "lucide-react";

const CreateAdvertisement = ({ onCancel }) => {
  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[var(--white-color-font)] text-lg sm:text-xl md:text-2xl font-bold">
            Create Advertisement
          </h1>
          <p className="submenu-card-label mt-1">
            Create a new advertisement for Smart Teenx
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <button onClick={onCancel} className="btn-outline px-4 py-1.5">
            Cancel
          </button>

          <button
            disabled
            className="btn-outline px-4 py-1.5 opacity-50 cursor-not-allowed"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </button>

          <button
            disabled
            className="btn-primary px-4 py-1.5 opacity-50 cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-5 sm:space-y-6">
          {/* IMAGE UPLOAD */}
          <div className="p-4 sm:p-6 four-corner-stroke space-y-3">
            <label className="white-color-font text-sm">
              Advertisement Image
            </label>

            <label className="block cursor-pointer">
              <input type="file" accept="image/*" className="hidden" />
              <div className="border border-dashed border-border/40 rounded-xl p-6 sm:p-10 text-center">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground text-sm">Click to upload image</p>
                <p className="text-muted-foreground text-xs mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </label>
          </div>

          {/* TITLE */}
          <div className="p-4 sm:p-6 four-corner-stroke space-y-2">
            <label className="white-color-font text-sm">Title</label>
            <input
              type="text"
              placeholder="Enter advertisement title"
              className="form-input p-2 text-sm sm:text-base"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="p-4 sm:p-6 four-corner-stroke space-y-2">
            <label className="white-color-font text-sm">Description</label>
            <textarea
              rows="4"
              placeholder="Enter advertisement description"
              className="form-input p-2 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5 sm:space-y-6">
          {/* AD PLACEMENT */}
          <div className="p-4 sm:p-6 four-corner-stroke space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <label className="white-color-font text-sm">
                Ad Placement <span className="text-primary">*</span>
              </label>
            </div>

            <p className="submenu-card-label text-xs">
              Choose where this ad will appear inside the app
            </p>

            <select className="w-full bg-background border border-border/40 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
              <option>Mid-Page Section</option>
              <option>Top Banner</option>
              <option>Footer Banner</option>
            </select>
          </div>

          {/* CAMPAIGN DURATION */}
          <div className="p-4 sm:p-6 four-corner-stroke space-y-4">
            <label className="white-color-font text-sm">
              Campaign Duration
            </label>

            <div>
              <label className="white-color-font text-xs">Start Date</label>
              <input
                type="date"
                className="form-input p-2 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="white-color-font text-xs">End Date</label>
              <input
                type="date"
                className="form-input p-2 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* PENDING APPROVAL */}
          <div className="p-4 sm:p-6 four-corner-stroke">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>

              <div>
                <p className="white-color-font text-sm font-medium">
                  Pending Approval
                </p>
                <p className="submenu-card-label text-xs mt-1">
                  Your ad will be sent to Checker for review and activation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvertisement;
