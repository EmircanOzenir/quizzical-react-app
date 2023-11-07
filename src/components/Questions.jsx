import { useState, useEffect } from "react";

import Question from "./Question";
import { fetchData } from "../data/fetchData";

const Questions = ({quizType, isStarted, toggleStart}) => {
  const [data, setData] = useState(null);
  const [correct, setCorrect] = useState(0); // tracks of the number of correct answers.
  const [isChecked, setIsChecked] = useState(false); // tracks to check the answers or not.
  
  // shuffle the answer choices
  const shuffleArr = (arr) => arr.sort(() => Math.random() - 0.5);
  
  // fetch & organize the data
  useEffect(() => {
    async function fetchQuestions(baseUrl, number, category, difficulty, type) {
      try {
        const result = await fetchData(baseUrl, number, category, difficulty, type);
        const organizedResult = [];
        result.results.forEach((element) => {
          organizedResult.push({
            id: crypto.randomUUID(),
            selected: null,
            isChecked: false,
            answers: shuffleArr([
              ...element.incorrect_answers,
              element.correct_answer,
            ]),
            question: element.question,
            correct: element.correct_answer
          });
        });
        setData(organizedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchQuestions(quizType.baseUrl, quizType.number, quizType.category, quizType.difficulty, quizType.type);
  }, [quizType]);  


  // match selected answers
  function handleClickAnswer(id, answer) {
    setData((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      })
    );
  }

  function handleCheck() {
    let selected = true; // Check if the user has selected an answer for all questions
    data.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });

    if (!selected) { // If not all questions are answered, return without further action
      return;
    }

    setData((data) =>
      data.map((question) => {
        return { ...question, checked: true }; // Mark all questions as "checked"
      })
    );
    setIsChecked(true);
    
    // Calculate the number of correct answers
    let correct = 0;
    console.log(data)
    data.forEach(question =>{
      if (question.correct === question.selected){
        correct += 1
      }
    })
    setCorrect(correct); // Update the state with the number of correct answers
  };


  // iterates over the data and creates "Question" components
  const questionElement = data ? data.map((question) => {
        return (
          <Question
            key={question.id}
            question={question}
            handleClickAnswer={handleClickAnswer}
            id={question.id}
          />
        );
      })
    : [];

  return (
    <div>
      {isStarted ? (
        <div className="questionElements__container">
          {questionElement}
          <div className="result__container">
          {isChecked && <span className='score'>You scored {correct}/{quizType.number} correct answers</span>}
          <button
          className='button'
          onClick={isChecked ? toggleStart : handleCheck}
          >{isChecked ? 'Play Again' : 'Check Answer'}</button>
         </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Questions;