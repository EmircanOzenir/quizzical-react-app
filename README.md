# React + Vite

### `App.jsx`

- The `App` component serves as the entry point of the application.
- It imports the `Intro` component and renders it.

### `Intro.jsx`

- The `Intro` component is responsible for displaying the introduction and quiz configuration options.
- It uses state variables to track whether the quiz has started and the quiz configuration.
- Users can select quiz parameters such as category, difficulty, number of questions and question type before starting the quiz.

### `QuizTypeOptions.js`

- The `QuizTypeOptions` component is a sub-component of `Intro`.
- It presents users with options to select quiz parameters such as category, difficulty, number of questions, and question type.
- Users can make selections that are reflected in the state of the `Intro` component.

### `Questions.js`

- The `Questions` component manages the quiz questions and answers.
- It fetches quiz questions based on the selected quiz parameters from API and organizes the data.
- Users can answer questions, check their answers and see their score at the end of the quiz.
- It uses sub-components like `Question` to render individual questions.

### `Question.js`

- The `Question` component represents an individual quiz question.
- It displays the question text and answer choices.
- Users can select an answer and the component visually indicates whether the answer is correct or incorrect.

### Additional Details

- The app uses React state and props to manage and update data.
- It shuffles answer choices for each question to provide variety.
- After answering all questions, users can check their answers.
- Users have the option to play again or return to the quiz configuration.
- The app calculates the number of correct answers and displays the score.
- The `crypto.randomUUID()` function is used to generate unique keys for React components.
- The code is organized and modular, making it easy to maintain and expand.