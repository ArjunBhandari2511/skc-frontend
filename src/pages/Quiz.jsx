import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./css/Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://skc-backend-pm9w.onrender.com/quiz");
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to load quiz questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionChange = (questionIndex, answerKey) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerKey });
  };

  const handleSubmit = (questionIndex, correctAnswer) => {
    setFeedback({
      ...feedback,
      [questionIndex]: selectedAnswers[questionIndex] === correctAnswer ? "success" : "error",
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2 className="quiz-title">Python Quiz</h2>
        {questions.map((q, index) => (
          <Card key={index} className="quiz-question">
            <p className="question-text">{q.question}</p>
            <ul className="answer-list">
              {Object.entries(q.answers)
                .filter(([_, value]) => value !== null)
                .map(([key, value]) => (
                  <li key={key} className="answer-item">
                    <label className="answer-label">
                      <RadioButton
                        inputId={`q${index}-a${key}`}
                        name={`question-${index}`}
                        value={key}
                        onChange={() => handleOptionChange(index, key)}
                        checked={selectedAnswers[index] === key}
                        className="answer-radio"
                      />
                      {value}
                    </label>
                  </li>
                ))}
            </ul>
            <Button label="Submit" onClick={() => handleSubmit(index, q.correct_answer)} className="p-button-primary mt-2" />
            {feedback[index] && (
              <Message severity={feedback[index]} text={feedback[index] === "success" ? "Correct!" : "Wrong answer."} className="mt-2" />
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default Quiz;
