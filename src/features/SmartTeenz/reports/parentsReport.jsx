// ParentsReport.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  User,
  Download,
  FileSpreadsheet,
  ChevronRight,
  Search,
  ChevronLeft,
} from "lucide-react";
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

  // Column config drives both <th> and <td> rendering
  const tableColumns = [
    {
      key: "parent",
      label: "Parent",
      align: "left",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-6 h-6 rounded-full object-cover border border-border/30"
          />
          <span className="text-foreground font-medium truncate max-w-[140px]">
            {row.name}
          </span>
        </div>
      ),
    },
    { key: "gender", label: "Gender", align: "left", render: (r) => r.gender },
    { key: "dob", label: "DOB", align: "left", render: (r) => r.dob },
    { key: "age", label: "Age", align: "left", render: (r) => r.age },
    {
      key: "phone",
      label: "Phone",
      align: "left",
      render: (r) => <span className="font-mono text-xs">{r.phone}</span>,
    },
    {
      key: "email",
      label: "Email",
      align: "left",
      render: (r) => (
        <span className="truncate max-w-[160px] inline-block">{r.email}</span>
      ),
    },
    { key: "pan", label: "PAN", align: "left", render: (r) => r.pan },
    { key: "aadhar", label: "Aadhar", align: "left", render: (r) => r.aadhar },
    {
      key: "kycStatus",
      label: "KYC Status",
      align: "left",
      render: (r) => {
        const isCompleted = r.kycStatus?.toLowerCase?.() === "completed";
        const isPending = r.kycStatus?.toLowerCase?.() === "pending";
        const isRejected = r.kycStatus?.toLowerCase?.() === "rejected";
        const bg = isCompleted
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : isPending
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : isRejected
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-gray-100 text-gray-600";
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs border font-medium ${bg}`}
          >
            {r.kycStatus}
          </span>
        );
      },
    },
    {
      key: "kycType",
      label: "KYC Type",
      align: "left",
      render: (r) => <span className="text-xs">{r.kycType}</span>,
    },
    {
      key: "address",
      label: "Address",
      align: "left",
      render: (r) => (
        <span className="truncate max-w-[180px] inline-block">{r.address}</span>
      ),
    },
    { key: "city", label: "City", align: "left", render: (r) => r.city },
    {
      key: "teens",
      label: "Teens",
      align: "center",
      render: (r) => (
        <span className="text-chart-5 font-medium">{r.teens}</span>
      ),
    },
    {
      key: "created",
      label: "Created",
      align: "left",
      render: (r) => (
        <span className="text-xs text-muted-foreground">{r.created}</span>
      ),
    },
    {
      key: "balance",
      label: "Balance",
      align: "right",
      render: (r) => (
        <span className="text-chart-5 font-medium">{currency(r.balance)}</span>
      ),
    },
    {
      key: "sent",
      label: "Sent",
      align: "right",
      render: (r) => (
        <span className="text-red-400 font-medium">{currency(r.sent)}</span>
      ),
    },
  ];

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
            <table className="w-full text-sm">
              <thead className="bg-muted/30 sticky top-0">
                <tr className="border-b border-border/30">
                  {tableColumns.map((col) => (
                    <th
                      key={col.key}
                      className={`text-left p-3 text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b border-border/10 transition-colors ${
                        idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                      }`}
                    >
                      {tableColumns.map((col) => (
                        <td
                          key={col.key}
                          className={`p-3 whitespace-nowrap ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : ""
                          }`}
                        >
                          {col.render(row)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={tableColumns.length}
                      className="text-center py-4 text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
