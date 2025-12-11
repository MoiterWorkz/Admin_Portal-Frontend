// QuizDashboard.jsx
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import QuizTable from "./QuizTable";
import QuizDetails from "./QuizDetails";

const QuizDashboard = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="min-h-screen w-full space-y-8 dashboard-bg">
      {/* If QuizDetails is open → hide dashboard */}
      {selectedQuiz ? (
        <QuizDetails quiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} />
      ) : (
        <>
          <DashboardHeader />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Quizzes Assigned"
              value="8"
              icon="target"
              color="text-blue-500"
            />
            <StatCard
              title="Quizzes Completed"
              value="5"
              icon="trending"
              color="text-chart-5"
            />
            <StatCard
              title="Pending Quizzes"
              value="3"
              icon="check"
              color="text-green-500"
            />
            <StatCard
              title="Avg. Quiz Score"
              value="79.1%"
              icon="brain"
              color="text-purple-500"
            />
          </div>

          {/* Table */}
          <QuizTable setSelectedQuiz={setSelectedQuiz} />
        </>
      )}
    </div>
  );
};

export default QuizDashboard;
