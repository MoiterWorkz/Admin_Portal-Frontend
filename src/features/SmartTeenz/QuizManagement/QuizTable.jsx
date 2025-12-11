// components/QuizTable.jsx
import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Funnel,
} from "lucide-react";

// ------------------ DUMMY DATA ------------------
const dummyQuizData = [
  {
    id: "QA001",
    parent: "Sarah Johnson",
    teen: "Emily Johnson",
    category: "Financial Literacy",
    color: "purple",
    questions: 25,
    time: "30 min",
    scheduled: "2025-01-10",
    deadline: "2025-01-15",
    correct: 18,
    wrong: 7,
  },
  {
    id: "QA002",
    parent: "Michael Chen",
    teen: "Jason Chen",
    category: "Budgeting Basics",
    color: "blue",
    questions: 20,
    time: "25 min",
    scheduled: "2025-01-11",
    deadline: "2025-01-16",
    correct: 16,
    wrong: 4,
  },
  {
    id: "QA003",
    parent: "David Martinez",
    teen: "Sofia Martinez",
    category: "Saving & Investment",
    color: "green",
    questions: 15,
    time: "20 min",
    scheduled: "2025-01-12",
    deadline: "2025-01-17",
    correct: 12,
    wrong: 3,
  },
  {
    id: "QA004",
    parent: "Lisa Anderson",
    teen: "Ryan Anderson",
    category: "Money Management",
    color: "orange",
    questions: 30,
    time: "40 min",
    scheduled: "2025-01-13",
    deadline: "2025-01-18",
    correct: 24,
    wrong: 6,
  },
  {
    id: "QA005",
    parent: "Robert Taylor",
    teen: "Emma Taylor",
    category: "Digital Payments",
    color: "purple",
    questions: 18,
    time: "22 min",
    scheduled: "2025-01-14",
    deadline: "2025-01-19",
    correct: 15,
    wrong: 3,
  },
  {
    id: "QA006",
    parent: "Jennifer White",
    teen: "Alex White",
    category: "Financial Literacy",
    color: "blue",
    questions: 22,
    time: "28 min",
    scheduled: "2025-01-15",
    deadline: "2025-01-20",
    correct: 0,
    wrong: 0,
  },
];

// ------------------ QUIZ TABLE COMPONENT ------------------
const QuizTable = ({ setSelectedQuiz }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ------------------ FILTER LOGIC ------------------
  const filteredData = useMemo(() => {
    return dummyQuizData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teen.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !categoryFilter || item.category === categoryFilter;

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "completed" && item.correct > 0) ||
        (statusFilter === "not-started" && item.correct === 0);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  // ------------------ PAGINATION ------------------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* ------------------ FILTER BAR ------------------ */}
      <div className="w-full bg-card/30 rounded-xl p-6 simple-card enhanced-border space-y-6 table-card">
        {/* SEARCH */}
        <div className="flex items-center">
          <div className="search-box relative flex-1">
            <Search className="absolute left-3 top-2.5 text-muted-foreground h-4 w-4" />
            <input
              className="search-input-approval !w-full md:w-64 pl-8 py-1 text-sm md:text-base"
              placeholder="Search Parent, Teen, or Assignment ID"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* FILTERS + PAGINATION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* STATUS + CATEGORY GROUP */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
            {/* STATUS FIRST (Mobile), SECOND (Desktop) */}
            <div className="space-y-2 order-1 md:order-2">
              <label className="text-sm text-muted-foreground">Status</label>
              <select
                className="form-input w-full"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>

            {/* CATEGORY SECOND (Mobile), FIRST (Desktop) */}
            <div className="space-y-2 order-2 md:order-1">
              <label className="text-sm text-muted-foreground">Category</label>
              <select
                className="form-input w-full"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                <option value="Financial Literacy">Financial Literacy</option>
                <option value="Budgeting Basics">Budgeting Basics</option>
                <option value="Saving & Investment">Saving & Investment</option>
                <option value="Money Management">Money Management</option>
                <option value="Digital Payments">Digital Payments</option>
              </select>
            </div>
          </div>

          {/* RESET + PAGINATION (Right in Desktop, Center in Mobile) */}
          <div className="col-span-2 flex  items-center md:items-end gap-[15px]">
            {/* RESET BUTTON */}
            <button
              className="reset-btn mb-2 md:mb-0"
              onClick={() => {
                setCategoryFilter("");
                setStatusFilter("");
                setSearchQuery("");
                setCurrentPage(1);
              }}
            >
              <Funnel className="w-4 h-4" /> Reset
            </button>

            {/* PAGINATION */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-6 h-6 flex items-center justify-center rounded-md transition 
            ${
              currentPage === 1
                ? "bg-[#0f131d] text-gray-500 cursor-not-allowed"
                : "bg-[#0f131d] text-white hover:border hover:border-[var(--primary-color)]"
            }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number */}
              <span className="w-6 h-6 flex items-center justify-center rounded-md primary-bg text-black text-[12px]">
                {currentPage}
              </span>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-6 h-6 flex items-center justify-center rounded-md transition 
            ${
              currentPage === totalPages
                ? "bg-[#0f131d] text-gray-500 cursor-not-allowed"
                : "bg-[#0f131d] text-white hover:border hover:border-[var(--primary-color)]"
            }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ QUIZ TABLE ------------------ */}
      <div className="table-card mt-[18px]">
        <div className="table-header">
          <div className="flex items-center gap-2 primary-color">
            <Eye className="w-4 h-4" />
            <p className="user-table-header">Assigned Quiz List</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Assignment ID</th>
                <th>Parent Name</th>
                <th>Teen Name</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Time Limit</th>
                <th>Scheduled Date</th>
                <th>Deadline</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.parent}</td>
                    <td>{row.teen}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-[10px] 
                        ${
                          row.color === "purple"
                            ? "superuser"
                            : row.color === "blue"
                            ? "infra"
                            : row.color === "green"
                            ? "checker"
                            : row.color === "orange"
                            ? "maker"
                            : ""
                        }`}
                      >
                        {row.category}
                      </span>
                    </td>

                    <td>{row.questions}</td>

                    {/* Time */}
                    <td>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {row.time}
                      </div>
                    </td>

                    {/* Scheduled */}
                    <td>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {row.scheduled}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {row.deadline}
                      </div>
                    </td>

                    {/* Score */}
                    <td>
                      {row.correct}/{row.questions}
                    </td>

                    {/* Correct */}
                    <td className="text-green-500">{row.correct}</td>

                    {/* Wrong */}
                    <td className="text-red-500">{row.wrong}</td>

                    {/* ACTION BUTTON */}
                    <td>
                      <button
                        className="header-icon-box"
                        onClick={() => setSelectedQuiz(row)}
                      >
                        <Eye className="primary-color w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500">
                    No quizzes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuizTable;
