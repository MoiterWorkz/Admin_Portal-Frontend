// WalletTransfersReport.jsx
import { useMemo, useState, useEffect } from "react";
import {
  Wallet,
  Download,
  FileSpreadsheet,
  ChevronRight,
  Search,
  ArrowRight,
} from "lucide-react";
import { walletRecords } from "../../../constants/reports";
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
 * WalletTransfersReport
 * - Responsive table driven by `tableColumns` (loops)
 * - Search + Type & Status filters (reset page to 1 when changed)
 * - Pagination (8 items per page) matching Parents/Teen design
 * - CSV export of filtered rows (XLS placeholder)
 *
 * Usage:
 * <WalletTransfersReport data={myTransfers} />
 *
 * If no data prop is passed, internal sample `walletRecords` is used.
 */

export default function WalletTransfersReport({
  data = null,
  isOpen,
  onToggle,
}) {
  // Sample fallback (only used if no `data` passed)

  const rowsSource = data ?? walletRecords;

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | Parent→Teen | Teen→Parent | ...
  const [statusFilter, setStatusFilter] = useState("all"); // all | Success | Pending | Failed
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // derive available type/status options from data
  const availableTypes = useMemo(() => {
    const types = Array.from(new Set(rowsSource.map((r) => r.type))).filter(
      Boolean
    );
    return ["all", ...types];
  }, [rowsSource]);

  const availableStatuses = useMemo(() => {
    const s = Array.from(new Set(rowsSource.map((r) => r.status))).filter(
      Boolean
    );
    return ["all", ...s];
  }, [rowsSource]);

  // table column definitions (loop-driven)
  const tableColumns = [
    {
      key: "txn",
      label: "Transaction ID",
      align: "left",
      render: (r) => (
        <span className="text-primary font-mono text-xs whitespace-nowrap">
          {r.id}
        </span>
      ),
    },
    {
      key: "sender",
      label: "Sender",
      align: "left",
      render: (r) => (
        <div className="flex flex-col">
          <span className="text-foreground font-medium">{r.senderName}</span>
          <span className="text-muted-foreground text-xs">{r.senderRole}</span>
        </div>
      ),
    },
    {
      key: "receiver",
      label: "Receiver",
      align: "left",
      render: (r) => (
        <div className="flex flex-col">
          <span className="text-foreground font-medium">{r.receiverName}</span>
          <span className="text-muted-foreground text-xs">
            {r.receiverRole}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      align: "left",
      render: (r) => (
        <div className="flex items-center gap-1.5 text-primary text-xs">
          <span>{r.type?.split("→")?.[0] ?? ""}</span>
          <ArrowRight className="w-3 h-3" />
          <span>{r.type?.split("→")?.[1] ?? ""}</span>
        </div>
      ),
    },
    {
      key: "senderPhone",
      label: "Sender Phone",
      align: "left",
      render: (r) => <span className="font-mono text-xs">{r.senderPhone}</span>,
    },
    {
      key: "receiverPhone",
      label: "Receiver Phone",
      align: "left",
      render: (r) => (
        <span className="font-mono text-xs">{r.receiverPhone}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      align: "right",
      render: (r) => (
        <span className="text-chart-5 font-medium">{currency(r.amount)}</span>
      ),
    },
    { key: "mode", label: "Mode", align: "left", render: (r) => r.mode },
    {
      key: "datetime",
      label: "Date & Time",
      align: "left",
      render: (r) => (
        <span className="text-muted-foreground text-xs">{r.datetime}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "left",
      render: (r) => {
        const s = (r.status ?? "").toString().toLowerCase();
        const cls =
          s === "success"
            ? "bg-green-500/10 text-green-400 border-green-500/30"
            : s === "pending"
            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
            : "bg-red-500/10 text-red-400 border-red-500/30";
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs border font-medium ${cls}`}
          >
            {r.status}
          </span>
        );
      },
    },
    {
      key: "notes",
      label: "Notes",
      align: "left",
      render: (r) => (
        <span className="truncate max-w-[180px] inline-block text-xs">
          {r.notes}
        </span>
      ),
    },
  ];

  // filtering by query + type + status
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rowsSource.filter((r) => {
      if (typeFilter !== "all" && (r.type ?? "") !== typeFilter) return false;
      if (statusFilter !== "all" && (r.status ?? "") !== statusFilter)
        return false;
      if (!q) return true;

      return (
        (r.id && r.id.toString().toLowerCase().includes(q)) ||
        (r.senderName && r.senderName.toLowerCase().includes(q)) ||
        (r.receiverName && r.receiverName.toLowerCase().includes(q)) ||
        (r.senderPhone && r.senderPhone.toLowerCase().includes(q)) ||
        (r.receiverPhone && r.receiverPhone.toLowerCase().includes(q)) ||
        (r.notes && r.notes.toLowerCase().includes(q))
      );
    });
  }, [rowsSource, query, typeFilter, statusFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const { downloadCSV, downloadXLS } = useReportExport({
    rows: filteredRows,
    fileName: "Wallet_Transfers_Report",

    csvHeaders: [
      "Transaction ID",
      "Sender Name",
      "Receiver Name",
      "Type",
      "Amount",
      "Status",
      "Date & Time",
    ],

    csvMapper: (r) => [
      r.id,
      r.senderName,
      r.receiverName,
      r.type,
      r.amount,
      r.status,
      r.datetime,
    ],

    xlsMapper: (r) => ({
      "Transaction ID": r.id,
      "Sender Name": r.senderName,
      "Receiver Name": r.receiverName,
      Type: r.type,
      "Amount (INR)": r.amount,
      Status: r.status,
      "Date & Time": r.datetime,
    }),
  });

  // reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, typeFilter, statusFilter]);

  // pagination
  const totalEntries = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const walletTransfersReportHeaderProps = {
    isOpen,
    onToggle,
    title: "Wallet Transfers Report",
    totalRecords: rowsSource.length,
    icon: Wallet,
    iconBgClass: "bg-orange-500/10",
    iconBorderClass: "border border-orange-500/30",
    iconColorClass: "text-orange-400",
    onDownloadCSV: downloadCSV,
    onDownloadXLS: downloadXLS,
    disableExport: filteredRows.length === 0,
    csvBtnStyle,
    xlsBtnStyle,
  };
  return (
    <div className="table-card rounded-xl p-6 overflow-hidden">
      {/* header */}
      <ReportHeader {...walletTransfersReportHeaderProps} />

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
                  placeholder="Search by transaction ID, name, phone..."
                  className="search-filter-input h-8 w-full"
                />
              </div>
            </div>

            <div className="w-[170px]">
              <label className="sr-only">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="form-input"
                style={{ height: "34px" }}
                aria-label="Transaction type filter"
              >
                {availableTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === "all" ? "All Types" : t}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[150px]">
              <label className="sr-only">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
                style={{ height: "34px" }}
                aria-label="Transaction status filter"
              >
                {availableStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "all" ? "All Status" : s}
                  </option>
                ))}
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
                      key={row.id + idx}
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
                      className="text-center py-6 text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
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
