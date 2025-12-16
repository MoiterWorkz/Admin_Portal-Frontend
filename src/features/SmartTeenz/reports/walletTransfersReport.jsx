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
import WalletTransfersTable from "./table/walletTranfersTable";
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
            <WalletTransfersTable rows={paginatedRows} />
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
