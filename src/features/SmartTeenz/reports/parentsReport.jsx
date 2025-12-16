// ParentsReport.jsx
import { useMemo, useState, useEffect } from "react";
import { User, Search } from "lucide-react";
import { parentRecords } from "../../../constants/reports";
import { useReportExport } from "../../../hooks/useReportExport";
import {
  csvBtnStyle,
  paginationTextStyle,
  xlsBtnStyle,
} from "../../../constants";
import { currency } from "../../../helper";
import PaginationButton from "../../../components/reusable/paginationButton";
import ReportHeader from "../../../components/reusable/reportsHeader";
import ParentsTable from "./table/parentsTable";

/**
 * ParentsReport
 * - Pagination (8 items per page) + same UI as TeenReport
 * - Search resets page to 1
 * - Status dropdown filters by kycStatus (Completed / Pending / Rejected)
 * - Columns driven by tableColumns (loop)
 */

export default function ParentsReport({
  data = parentRecords,
  isOpen,
  onToggle,
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // <-- new

  // Pagination state
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // filtering by search query + status filter
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return data.filter((r) => {
      // status filter
      if (statusFilter && statusFilter !== "all") {
        // do case-insensitive compare, support "rejected" too
        if ((r.kycStatus ?? "").toString().toLowerCase() !== statusFilter) {
          return false;
        }
      }

      // search query
      if (!q) return true;
      return (
        (r.name && r.name.toString().toLowerCase().includes(q)) ||
        (r.email && r.email.toString().toLowerCase().includes(q)) ||
        (r.phone && r.phone.toString().toLowerCase().includes(q)) ||
        (r.pan && r.pan.toString().toLowerCase().includes(q)) ||
        (r.aadhar && r.aadhar.toString().toLowerCase().includes(q)) ||
        (r.city && r.city.toString().toLowerCase().includes(q)) ||
        (r.address && r.address.toString().toLowerCase().includes(q))
      );
    });
  }, [data, query, statusFilter]);

  const { downloadCSV, downloadXLS } = useReportExport({
    rows: filteredRows,
    fileName: "Parents_Report",

    /* ---------- CSV ---------- */
    csvHeaders: [
      "Name",
      "Gender",
      "DOB",
      "Age",
      "Phone",
      "Email",
      "PAN",
      "Aadhar",
      "KYC Status",
      "KYC Type",
      "Address",
      "City",
      "No of Teens",
      "Created Date",
      "Balance (INR)",
      "Sent (INR)",
    ],

    csvMapper: (r) => [
      r.name,
      r.gender,
      r.dob,
      r.age,
      r.phone,
      r.email,
      r.pan,
      r.aadhar,
      r.kycStatus,
      r.kycType,
      r.address,
      r.city,
      r.teens,
      r.created,
      r.balance,
      r.sent,
    ],

    /* ---------- XLS ---------- */
    xlsMapper: (r) => ({
      Name: r.name,
      Gender: r.gender,
      DOB: r.dob,
      Age: r.age,
      Phone: r.phone,
      Email: r.email,
      PAN: r.pan,
      Aadhar: r.aadhar,
      "KYC Status": r.kycStatus,
      "KYC Type": r.kycType,
      Address: r.address,
      City: r.city,
      "No of Teens": r.teens,
      "Created Date": r.created,
      "Balance (INR)": r.balance,
      "Sent (INR)": r.sent,
    }),
  });

  // Reset to page 1 when query or statusFilter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  // Pagination calculations
  const totalEntries = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);
  console.log(paginatedRows);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination span style (keeps it compact and similar to TeenReport)
  const parentsReportHeaderProps = {
    isOpen,
    onToggle,
    title: "Parents Report",
    totalRecords: data.length,
    icon: User,
    iconBgClass: "bg-purple-500/10",
    iconBorderClass: "border border-purple-500/30",
    iconColorClass: "text-purple-400",
    onDownloadCSV: downloadCSV,
    onDownloadXLS: downloadXLS,
    disableExport: filteredRows.length === 0,
    csvBtnStyle,
    xlsBtnStyle,
  };
  return (
    <div className="table-card rounded-xl p-6 overflow-hidden">
      {/* Header */}
      <ReportHeader {...parentsReportHeaderProps} />

      {/* Controls + Table */}
      {isOpen && (
        <div className="pt-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, email, phone, PAN..."
                  className="search-filter-input h-8 w-full"
                />
              </div>
            </div>

            {/* Status dropdown */}
            <div className="w-[170px]">
              <label className="sr-only">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
                style={{ height: "34px" }}
                aria-label="KYC Status filter"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <ParentsTable rows={paginatedRows} />
          </div>

          {/* Footer */}
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
