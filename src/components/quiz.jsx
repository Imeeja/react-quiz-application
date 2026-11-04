import { useState } from "react";
import Results from "./results";

function Quiz() {
  const questionBank = [
    {
      question: "What is the capital of france?",
      options: ["paris", "london", "lisbon", "herat"],
      answer: "paris",
    },
    {
      question: "What langauge is used for building web apps?",
      options: ["JavaScript", "Java", "Python", "all"],
      answer: "all",
    },
    {
      question: "What is does jsx stand for?",
      options: [
        "JavaScript XML",
        "Java syntax",
        "Java storage",
        "None of the above",
      ],
      answer: "JavaScript XML",
    },
  ];

  const initialAnswers = [null, null, null];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const selectedAnswer = userAnswers[currentQuestion];
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  function handleSelectOption(option) {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;
    setUserAnswers(newUserAnswers);
  }

  function goToNext() {
    console.log(isQuizFinished);

    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }
  function goToPrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }
  function restartQuiz() {
    setUserAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={userAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }
  return (
    <div>
      <h1>Question {currentQuestion + 1}</h1>
      <p className="question">{questionBank[currentQuestion].question}</p>
      {questionBank[currentQuestion].options.map((option) => (
        <button
          className={"option" + (selectedAnswer === option ? " selected" : "")}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}
      <div className="nav-buttons">
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
