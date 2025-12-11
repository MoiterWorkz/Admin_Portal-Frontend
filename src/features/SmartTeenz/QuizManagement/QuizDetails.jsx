// QuizDetails.jsx
import React from "react";
import {
  ArrowLeft,
  Brain,
  Calendar,
  Clock,
  Target,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

const QuizDetails = ({ quiz, setSelectedQuiz }) => {
  if (!quiz) return null;

  const questionList = quiz.questionsList || [
    {
      id: 1,
      question:
        "What is the recommended percentage of income to save each month?",
      teenAnswer: "20%",
      correctAnswer: "20%",
      isCorrect: true,
    },
    {
      id: 2,
      question: "Which of the following is considered a fixed expense?",
      teenAnswer: "Rent",
      correctAnswer: "Rent",
      isCorrect: true,
    },
    {
      id: 3,
      question: "What does APR stand for in banking terms?",
      teenAnswer: "Annual Percentage Rate",
      correctAnswer: "Annual Percentage Rate",
      isCorrect: true,
    },
    {
      id: 4,
      question: "What is the primary purpose of a budget?",
      teenAnswer: "To save money",
      correctAnswer: "To track income and expenses",
      isCorrect: false,
    },
    {
      id: 5,
      question:
        "Which type of account typically offers the highest interest rate?",
      teenAnswer: "Savings Account",
      correctAnswer: "Fixed Deposit",
      isCorrect: false,
    },
  ];

  return (
    <div className="min-h-screen w-full p-4 md:p-8 space-y-8 dashboard-bg">
      {/* ================= HEADER BAR ================= */}
      <div className="w-full rounded-xl p-4 md:p-6 table-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedQuiz(null)}
              className="reset-btn flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Management
            </button>

            {/* Icon */}
            <div className="dash-kyc-icons flex items-center justify-center rounded-full [backgroundColor:var(--borderBg-color)]">
              <Brain className="w-6 h-6 text-chart-5 text-[var(--primary-color)]" />
            </div>

            {/* Title */}
            <div className="mt-1">
              <h1 className="user-table-header primary-color">
                Quiz Attempt Details
              </h1>
              <p className="root-sub-header">
                Detailed breakdown of quiz questions and answers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOP INFO CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Parent Name</p>
          <span></span>
          <p className="font-semibold break-all">{quiz.parent}</p>
        </div>

        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Teen Name</p>
          <span></span>
          <p className="font-semibold break-all">{quiz.teen}</p>
        </div>

        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Quiz Category</p>
          <span></span>
          <p
            className={`
              inline-flex px-2 py-1 rounded-md text-xs font-medium border 
              ${
                quiz.color === "purple"
                  ? "text-purple-500 border-purple-500/30 bg-purple-500/10"
                  : ""
              }
              ${
                quiz.color === "blue"
                  ? "text-blue-500 border-blue-500/30 bg-blue-500/10"
                  : ""
              }
              ${
                quiz.color === "green"
                  ? "text-green-500 border-green-500/30 bg-green-500/10"
                  : ""
              }
              ${
                quiz.color === "orange"
                  ? "text-orange-500 border-orange-500/30 bg-orange-500/10"
                  : ""
              }
            `}
          >
            {quiz.category}
          </p>
        </div>

        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Date</p>
          <span></span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-chart-5" />
            <p className="font-semibold">{quiz.scheduled}</p>
          </div>
        </div>
      </div>

      {/* ================= SCORE SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Time */}
        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Time Limit</p>
          <span></span>
          <div className="flex items-center space-x-2 mt-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <p className="text-2xl font-semibold text-blue-500">{quiz.time}</p>
          </div>
        </div>

        {/* Score */}
        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Total Score</p>
          <span></span>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-semibold text-chart-5">
              {quiz.correct}/{quiz.questions} (
              {((quiz.correct / quiz.questions) * 100).toFixed(1)}%)
            </p>
            <Target className="w-6 h-6 text-chart-5" />
          </div>
        </div>

        {/* Correct */}
        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Correct Answers</p>
          <span></span>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-semibold text-green-500">
              {quiz.correct}
            </p>
            <CircleCheckBig className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Wrong */}
        <div className="stat-card-dx91u high-risk-dx91u corner-box">
          <p className="submenu-card-label">Wrong Answers</p>
          <span></span>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-semibold text-red-500">{quiz.wrong}</p>
            <CircleX className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* ================= QUESTION BREAKDOWN ================= */}
      <div className="w-full rounded-xl p-4 md:p-6 table-card">
        <h2 className="font-semibold mb-6 heading-card-label">
          Question-by-Question Breakdown
        </h2>

        <div className="space-y-4">
          {questionList.map((q) => (
            <div
              key={q.id}
              className={`p-4 rounded-lg border ${
                q.isCorrect
                  ? "bg-green-500/5 border-green-500/30"
                  : "bg-red-500/5 border-red-500/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex-1">
                  {/* Question index + text */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold 
                        ${
                          q.isCorrect
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                    >
                      {q.id}
                    </div>
                    <p className="heading-card-label break-normal">
                      {q.question}
                    </p>
                  </div>

                  {/* Answers */}
                  <div className="ml-0 md:ml-11 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="min-w-[120px] submenu-card-label">
                        Teen's Answer:
                      </span>
                      <span
                        className={`small-heading ${
                          q.isCorrect ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {q.teenAnswer}
                      </span>
                    </div>

                    {!q.isCorrect && (
                      <div className="flex flex-wrap gap-2">
                        <span className="min-w-[120px] submenu-card-label">
                          Correct Answer:
                        </span>
                        <span className="small-heading text-green-500">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Badge */}
                <div className="md:ml-4">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${
                      q.isCorrect
                        ? "bg-green-500/10 border-green-500/30 text-green-500"
                        : "bg-red-500/10 border-red-500/30 text-red-500"
                    }`}
                  >
                    {q.isCorrect ? (
                      <CircleCheckBig className="w-3 h-3 mr-1" />
                    ) : (
                      <CircleX className="w-3 h-3 mr-1" />
                    )}
                    {q.isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOTNOTE ================= */}
      <div className="w-full bg-blue-500/5 border border-blue-500/30 p-4 rounded-xl">
        <p className="text-sm text-blue-500 flex items-center gap-2 leading-normal">
          📌 Admin View Only: All questions are unique and do not repeat for any
          teen. This ensures fair assessment and prevents answer sharing.
        </p>
      </div>
    </div>
  );
};

export default QuizDetails;
