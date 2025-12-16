import { memo, useCallback, useState } from "react";
import { Users, Download, FileSpreadsheet, ChevronRight } from "lucide-react";

/**
 * TeensReportCard (JSX)
 *
 * Props:
 *  - title (string)
 *  - total (number)
 *  - onExport (fn)  // receives type: 'csv' | 'xls'
 *
 * Usage:
 *  <TeensReportCard title="Teens Report" total={4} onExport={(type) => console.log(type)} />
 */

const actions = [
  {
    key: "csv",
    label: "CSV",
    Icon: Download,
    style: "bg-green-500/10 text-green-400 border-green-500/30",
  },
  {
    key: "xls",
    label: "XLS",
    Icon: FileSpreadsheet,
    style: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
];

const ReportTitle = ({
  title = "Teens Report",
  total = 0,
  onExport = () => {},
}) => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const handleExport = useCallback((key) => onExport(key), [onExport]);
  return (
    <div
      className="p-2 flex items-center justify-between border-b border-b-[#94A3B81A] cursor-pointer"
      onClick={() => setIsTableOpen(!isTableOpen)}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-blue-400 truncate">
            {title}
          </h2>
          <p className="text-xs text-[#9ca3af]">{total} total records</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {actions.map(({ key, label, Icon, style }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleExport(key)}
              className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring/50 hover:bg-primary/90 rounded-md gap-1.5 has-[>svg]:px-2.5 h-8 px-3 text-xs ${style} border`}
              aria-label={`Export ${label}`}
            >
              <Icon className="w-3 h-3 mr-1.5" aria-hidden="true" />
              <span className="select-none">{label}</span>
            </button>
          ))}
        </div>
        {/* rotate-90 */}
        <ChevronRight
          className={`w-5 h-5 text-[#9ca3af] transition-transform ${
            isTableOpen && "rotate-90"
          }`}
        />
      </div>
    </div>
  );
};

export default memo(ReportTitle);
