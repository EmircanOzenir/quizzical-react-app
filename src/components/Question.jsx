const Question = (props) => {
  const answers = props.question.answers;
  const questions = props.question.question;

  function handleClick(answer) {
    if (props.question.checked) {
      return; // If the question has been checked already, this function doesn't allow any further interaction with the question, as the user should not be able to change their answer after checking.
    }
    props.handleClickAnswer(props.id, answer); // If the question hasn't been checked, this line calls the handleClickAnswer function that is passed as a prop to the Question comp.
  }

  const answersElement = answers.map((answer) => { // responsible for rendering the question and its answer choices in the Question comp.
    let id = null;
    if (props.question.checked) {
      if (props.question.correct === answer) {
        id = "correct";
      } else if (props.question.selected === answer) {
        id = "incorrect";
      } else {
        id = "not-selected";
      }
    }

    return (
      <div>
        <button
          key={crypto.randomUUID()}
          id={id}
          className={
            answer === props.question.selected ? "answer selected" : "answer"
          }
          onClick={() => handleClick(answer)}
          >
          {answer}
        </button>
      </div>
    );
  });
  
  return <div className="question__container">
    <h2>{questions}</h2>
    <div className="all__answers">{answersElement}</div>
    </div>
};

export default Question;