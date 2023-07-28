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
            { text: "document.gettextnow("myText"). change. style.,",
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
        question: "Which are types of Pop up boxes available in JavaScript?",
        answers: [
            { text: "Alert", correct: true },
            { text: "Ready", correct: false },
            { text: "Prompt", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    { 
        question: "What are JavaScript Data Types?",
        answers: [
            { text: "Number, String, Boolean, Object, Undefined", correct: true },
            { text: "String, Boolean, Object, Undefined", correct: false },
            { text: "Number, String, Symbols, Object, Undefined", correct: false },
            { text: "Symbols, String, Boolean, Object", correct: false }
        ]
    },
];

// start first question & next button 
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// timer
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time Left: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}
// start quiz
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    timeTick();
    setNextQuestion();
};

// next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// show questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        let button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

// reset state 
function resetState() {
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

// select answer
function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (correct) {
        checkAnswerEl.innerHTML = "Correct!";
    } else {
        checkAnswerEl.innerHTML = "Wrong Answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // wrong answer -10sec
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
};
    
// answer btn color
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        let score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    let highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";

    for (i = 0; i < scores.length; i++) {
        let div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        let div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// remove all classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

// save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your score is " + timeLeft;
    }, 2000)
};

let loadScores = function () {

    if (!savedScores) {
        return false;
    }

    // convert to array
    savedScores = JSON.parse(savedScores);
    let initials = document.querySelector("#initials-field").value; 
    let newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

// submit score
submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    let initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

// view high scores
viewHighScores.addEventListener("click", showHighScores);

// restart 
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// clear scores
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});





