import React, { useState } from "react";
import QuizDetails from "./QuizManagement/QuizDetails";
import QuizDashboard from "./QuizManagement/QuizDashboard";

function QuizManagement() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      {selectedQuiz ? (
        <QuizDetails quiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} />
      ) : (
        <QuizDashboard setSelectedQuiz={setSelectedQuiz} />
      )}
    </>
  );
}

export default QuizManagement;
