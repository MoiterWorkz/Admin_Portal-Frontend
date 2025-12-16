// ChoresReport.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Target,
  Download,
  FileSpreadsheet,
  ChevronRight,
  Search,
  ChevronLeft,
} from "lucide-react";
import { choresRecords } from "../../../constants/reports";
import { useReportExport } from "../../../hooks/useReportExport";
import {
  csvBtnStyle,
  paginationTextStyle,
  xlsBtnStyle,
} from "../../../constants";
import { currency } from "../../../helper";
import PaginationButton from "../../../components/reusable/paginationButton";
import ReportHeader from "../../../components/reusable/reportsHeader";
import ChoresTable from "./table/choresTable";

/**
 * ChoresReport
 * - Converted from provided HTML to a responsive, loop-driven React component
 * - Lucide icons used
 * - tableColumns drives <th> and <td> rendering (loop)
 * - Pagination & CSV/XLS export similar to Teen/Parents components
 *
 * Usage:
 * <ChoresReport data={choresRecords} />
 *
 * If you have choresRecords in constants/reports, pass it via the `data` prop.
 */

export default function ChoresReport({ data = undefined, isOpen, onToggle }) {
  // sample fallback (used only when no data prop passed)

  const rowsSource = data ?? choresRecords;

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // All | Completed | Pending | Overdue
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // filtering logic (query + status)
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rowsSource.filter((r) => {
      // status filter
      if (statusFilter !== "all") {
        if ((r.status ?? "").toString().toLowerCase() !== statusFilter)
          return false;
      }

      if (!q) return true;
      return (
        (r.title && r.title.toString().toLowerCase().includes(q)) ||
        (r.description && r.description.toString().toLowerCase().includes(q)) ||
        (r.parent && r.parent.toString().toLowerCase().includes(q)) ||
        (r.teen && r.teen.toString().toLowerCase().includes(q))
      );
    });
  }, [rowsSource, query, statusFilter]);

  const { downloadCSV, downloadXLS } = useReportExport({
    rows: filteredRows,
    fileName: "Chores_Report",

    csvHeaders: [
      "Chore Title",
      "Description",
      "Parent",
      "Teen",
      "Assigned Date",
      "Due Date",
      "Completed Date",
      "Status",
      "Reward (INR)",
      "Verified",
    ],

    csvMapper: (r) => [
      r.title,
      r.description,
      r.parent,
      r.teen,
      r.assigned,
      r.dueDate,
      r.completed,
      r.status,
      r.reward,
      r.verified,
    ],

    xlsMapper: (r) => ({
      "Chore Title": r.title,
      Description: r.description,
      Parent: r.parent,
      Teen: r.teen,
      "Assigned Date": r.assigned,
      "Due Date": r.dueDate,
      "Completed Date": r.completed,
      Status: r.status,
      "Reward (INR)": r.reward,
      Verified: r.verified,
    }),
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  // pagination calculations
  const totalEntries = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const choresReportHeaderProps = {
    isOpen,
    onToggle,
    title: "Chores Report",
    totalRecords: rowsSource.length,
    icon: Target,
    iconBgClass: "bg-teal-500/10",
    iconBorderClass: "border border-teal-500/30",
    iconColorClass: "text-teal-400",
    onDownloadCSV: downloadCSV,
    onDownloadXLS: downloadXLS,
    disableExport: filteredRows.length === 0,
    csvBtnStyle,
    xlsBtnStyle,
  };
  return (
    <div className="table-card rounded-xl p-6 overflow-hidden">
      {/* header */}
      <ReportHeader {...choresReportHeaderProps} />

      {isOpen && (
        <div className="pt-5 space-y-4">
          {/* filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, parent, teen..."
                  className="search-filter-input h-8 w-full"
                />
              </div>
            </div>

            <div className="w-[170px]">
              <label className="sr-only">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
                style={{ height: "34px" }}
                aria-label="Chore status filter"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* table */}
          <div className="table-container">
            <ChoresTable rows={paginatedRows} />
          </div>
          {/* footer / pagination */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {totalEntries === 0 ? 0 : startIndex + 1}-{endIndex} of{" "}
              {totalEntries} entries
            </p>

            <div className="flex gap-1 items-center">
              <PaginationButton
                type="prev"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />

              <span className={paginationTextStyle}>{currentPage}</span>

              <PaginationButton
                type="next"
                disabled={currentPage === totalPages || totalEntries === 0}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
