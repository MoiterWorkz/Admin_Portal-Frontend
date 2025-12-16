// TeenReport.jsx
import { useMemo, useState, useEffect } from "react";
import { Users, Search } from "lucide-react";
import {
  ageOptions,
  genderOptions,
  linkedOptions,
  teenRecords,
  teenTableHeader,
} from "../../../constants/reports";
import { useReportExport } from "../../../hooks/useReportExport";
import {
  csvBtnStyle,
  paginationTextStyle,
  xlsBtnStyle,
} from "../../../constants";
import { currency } from "../../../helper";
import FilterSelect from "../../../components/reusable/filterSelect";
import PaginationButton from "../../../components/reusable/paginationButton";
import ReportHeader from "../../../components/reusable/reportsHeader";
import TeenTable from "./table/teenTable";

export default function TeenReport({ data = teenRecords, isOpen, onToggle }) {
  const [query, setQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("all"); // "all" | "13-15" | "16-18"
  const [genderFilter, setGenderFilter] = useState("all"); // "all" | "Male" | "Female"
  const [linkedFilter, setLinkedFilter] = useState("all"); // "all" | "linked" | "unlinked"

  // Pagination state
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered rows (same as your existing logic)
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return data.filter((r) => {
      // Age filter
      if (ageFilter === "13-15" && !(r.age >= 13 && r.age <= 15)) return false;
      if (ageFilter === "16-18" && !(r.age >= 16 && r.age <= 18)) return false;

      // Gender filter
      if (genderFilter !== "all" && r.gender !== genderFilter) return false;

      // Linked filter
      if (linkedFilter === "linked" && !r.linked) return false;
      if (linkedFilter === "unlinked" && r.linked) return false;

      // Search query
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q)
      );
    });
  }, [data, query, ageFilter, genderFilter, linkedFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { downloadCSV, downloadXLS } = useReportExport({
    rows,
    fileName: "Teens_Report",

    /* ---------- CSV ---------- */
    csvHeaders: [
      "Name",
      "Gender",
      "DOB",
      "Age",
      "Phone",
      "Email",
      "City",
      "Linked",
      "Relationship",
      "Created Date",
      "Last Login",
      "Balance (INR)",
      "Completed Chores",
      "Pending Chores",
      "Rewards (INR)",
    ],

    csvMapper: (r) => [
      r.name,
      r.gender,
      r.dob,
      r.age,
      r.phone,
      r.email,
      r.city,
      r.linked ? "Yes" : "No",
      r.relationship,
      r.created,
      r.lastLogin,
      r.balance,
      r.done,
      r.pending,
      r.rewards,
    ],

    /* ---------- XLS ---------- */
    xlsMapper: (r) => ({
      Name: r.name,
      Gender: r.gender,
      DOB: r.dob,
      Age: r.age,
      Phone: r.phone,
      Email: r.email,
      City: r.city,
      Linked: r.linked ? "Yes" : "No",
      Relationship: r.relationship,
      "Created Date": r.created,
      "Last Login": r.lastLogin,
      "Balance (INR)": r.balance,
      "Completed Chores": r.done,
      "Pending Chores": r.pending,
      "Rewards (INR)": r.rewards,
    }),
  });

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, ageFilter, genderFilter, linkedFilter]);

  // Pagination calculations
  const totalEntries = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedRows = rows.slice(startIndex, endIndex);

  // Pagination span style (keeps it compact and similar to EmployeeCreationForm)

  const teensReportHeaderProps = {
    isOpen,
    onToggle,
    title: "Teens Report",
    totalRecords: data.length,
    icon: Users,
    iconBgClass: "bg-blue-500/10",
    iconBorderClass: "border border-blue-500/30",
    iconColorClass: "text-blue-400",
    onDownloadCSV: downloadCSV,
    onDownloadXLS: downloadXLS,
    disableExport: rows.length === 0,
    csvBtnStyle,
    xlsBtnStyle,
  };

  return (
    <>
      <div className="table-card rounded-xl p-6 overflow-hidden">
        {/* Header */}
        <ReportHeader {...teensReportHeaderProps} />

        {isOpen && (
          <div className="pt-5 space-y-4">
            {/* Search + Filters (responsive stacking) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-filter-input h-8 w-full"
                    placeholder="Search by name, email, phone..."
                  />
                </div>
              </div>

              <FilterSelect
                value={ageFilter}
                onChange={setAgeFilter}
                width="w-[170px]"
                label="Age"
                ariaLabel="Age filter"
                options={ageOptions}
              />

              <FilterSelect
                value={genderFilter}
                onChange={setGenderFilter}
                width="w-[140px]"
                label="Gender"
                ariaLabel="Gender filter"
                options={genderOptions}
              />

              <FilterSelect
                value={linkedFilter}
                onChange={setLinkedFilter}
                width="w-[140px]"
                label="Linked"
                ariaLabel="Linked filter"
                options={linkedOptions}
              />
            </div>

            {/* Table wrapper */}
            <div className="table-container">
              <TeenTable
                headers={teenTableHeader}
                rows={paginatedRows}
                currency={currency}
              />
            </div>

            {/* Footer: pagination + counts (Employee style) */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#94a3b8]">
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
    </>
  );
}
