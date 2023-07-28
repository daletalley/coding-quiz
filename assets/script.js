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

// Questions and answers
let questions = [
    { 
        question: "How do you write 'Hello World' in an alert box?", 
        answers: [
            { text: "name('Hello World')",
                correct: false },
            { text: "alert('Hello World')" ,
                correct: true },
            { text: "start('Hello World')",
                correct: false },
            { text: "play('Hello World')", 
                correct: false }
        ]
    },
    { 
        question: "Which of the following function of Array object calls a function for each element in the array?", 
        answers: [
            { text: "hide()",
                correct: false },
            { text: "control()",
                correct: false },
            { text: "forEach()",
                correct: true },
            { text: "style()",
                correct: false }
        ]
    },
    { 
        question: "How can the style/class of an element be changed?", 
        answers: [
            { text: "document.("myimg"). img. imgSize = "200 px";",
             correct: false },
            { text: "document.gettextnow("myText"). change. style.,
             correct: false },
            { text: "document.getElementById("myText"). style. fontSize = "20";",
             correct: true },            
            { text: "None of the above",
             correct: false }
        ]
    },
    { 
        question: "What is the correct way to write a JavaScript array?", 
        answers: [
            { text: "let food = (1:'pizza', 2:'donut', 3:'burger')",
             correct: false },
            { text: "let food = (pizza, donut, burger)",
             correct: false },
            { text: "let food = ['pizza', 'donut', 'burger']",
             correct: true },            
            { text: "All of the above",
             correct: false }
        ]
    },
    { 
        question: "How to leave a Javascript comment?",
        answers: [
            { text: "** Leave a comment", correct: false },
            { text: "*/ Leave a comment", correct: true },
            { text: "++ Leave a comment", correct: false },
            { text: "// Leave a comment", correct: true }
        ]
    },
    { 
        question: "What are all the looping structures in JavaScript??", 
        answers: [
            { text: "ready, for, first",
             correct: false },
            { text: "for, read, do-while",
             correct: false },
            { text: "for, while, do-while",
             correct: true },            
            { text: "None of the above",
             correct: false }
        ]
    },
    { 
        question: "What does NULL mean?",
        answers: [
            { text: "Represents a repeated value in the document", correct: false },
            { text: "Valid values detected in file", correct: false },
            { text: "Represents an alert from the vscode", correct: false },
            { text: "No object or null string, no valid boolean value, no number, and no array object", correct: true }
        ]
    },
    { 
        question: "What is an undefined value in JavaScript??", 
        answers: [
            { text: "A variable used in the code does NOT exist",
             correct: true },
            { text: "A variable is assigned to a value",
             correct: false },
            { text: "Property does NOT exist",
             correct: true },            
            { text: "None of the above",
             correct: false }
        ]
    },
    { 
        question: "What are all the types of Pop up boxes available in JavaScript?",
        answers: [
            { text: "Alert", correct: true },
            { text: "Ready", correct: false },
            { text: "Prompt", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    { 
        question: "How to leave a Javascript comment?",
        answers: [
            { text: "Number, String, Boolean, Object, Undefined", correct: true },
            { text: "String, Boolean, Object, Undefined", correct: false },
            { text: "Number, String, Symbols, Object, Undefined", correct: false },
            { text: "Symbols, String, Boolean, Object", correct: false }
        ]
    },
];
