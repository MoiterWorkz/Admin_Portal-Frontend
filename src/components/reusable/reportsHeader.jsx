import { ChevronRight, Download, FileSpreadsheet } from "lucide-react";

const ReportHeader = ({
  isOpen,
  onToggle,
  title,
  totalRecords,
  icon: Icon,
  iconBgClass,
  iconBorderClass,
  iconColorClass,
  onDownloadCSV,
  onDownloadXLS,
  disableExport,
  csvBtnStyle,
  xlsBtnStyle,
}) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-between ${
        isOpen ? "border-b border-gray-900 pb-5" : ""
      }`}
      onClick={onToggle}
    >
      {/* Left */}
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center
            ${iconBgClass} ${iconBorderClass}`}
        >
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
        </div>

        <div>
          <h2 className={`text-sm ${iconColorClass}`}>{title}</h2>
          <p className="text-[11px] text-[#94a3b8]">
            {totalRecords} total records
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {isOpen && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownloadCSV();
              }}
              disabled={disableExport}
              className={csvBtnStyle}
            >
              <Download className="w-3 h-3 mr-1.5" />
              CSV
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownloadXLS();
              }}
              disabled={disableExport}
              className={xlsBtnStyle}
            >
              <FileSpreadsheet className="w-3 h-3 mr-1.5" />
              XLS
            </button>
          </div>
        )}

        <ChevronRight
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ReportHeader;
