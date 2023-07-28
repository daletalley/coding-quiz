let timeLeft = 60;
let timerID;
let timerEl = document.getElementById("timer");
let startButton = document.getElementById("start-btn");
let nextButton = document.getElementById("next-btn");
let questionContainerEl = document.getElementById("question-container");
let startContainerEl = document.getElementById("start-container");
let questionEl = document.getElementById("question");
let answerButtonsEl = document.getElementById("answer-buttons");
let checkAnswerEl = document.getElementById("check-answer");
let viewHighScores = document.getElementById("highscores-link");
let submitButton = document.getElementById("submit-btn");
let clearScoreButton = document.getElementById("clear-btn");
let initialsField = document.getElementById("player-name");
let restartButton = document.getElementById("restart-btn");
let scoreField = document.getElementById("player-score");
let scores = JSON.parse(localStorage.getItem("scores")) || [];

let shuffledQuestions, currentQuestionIndex;
