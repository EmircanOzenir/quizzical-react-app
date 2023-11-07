import { useState } from "react";
import Questions from "./Questions";
import QuizTypeOptions from "./QuizTypeOptions";

const Intro = () => {
  const [isStarted, setIsStarted] = useState(false); // whether the quiz has started
  const [quizType, setQuizType] = useState({
    baseUrl: "https://opentdb.com/api.php?",
    number: "3",
    category: "",
    difficulty: "",
    type: ""
  });

  function handleChange(event) { // updates the quizType state
    const { name, value } = event.target;

    setQuizType((prevQuizType) => {
      return {
        ...prevQuizType,
        [name]: value,
      };
    });
  }

  function toggleStart() { // toggles the isStarted state
    setIsStarted((prev) => !prev);
  }

  return (
    <div className="intro">
      {isStarted ? (
        <Questions
          quizType={quizType}
          isStarted={isStarted}
          toggleStart={toggleStart}
        />
      ) : (
        <div className="quizType__container">
          <div className="intro__text">
            <h1>Quizzical</h1>
            <p className="description">Whether you're looking for a fun way to test your trivia skills or want to learn something new, Quizzical has got you covered!<br />This interactive quiz app is built using React and Vite, ensuring a fast and responsive user experience.</p>
          </div>

          <QuizTypeOptions quizType={quizType} handleChange={handleChange} />

          <button className="button" onClick={toggleStart}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;