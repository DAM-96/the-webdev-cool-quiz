// Document Elements definitions
let startQuizBtn = document.getElementById("startQuiz");
let quizTimeTag = document.getElementById("quizTime");
let questionBoard = document.getElementById("questionBoard");
let quizFinish = document.getElementById("quizFinish");
let hiddableElements = document.getElementsByClassName("hiddable");
let correctMessage = document.getElementById("correct");
let wrongMessage = document.getElementById("wrong");
let submitBtn = document.getElementById("submitBtn");
let userName = document.getElementById("userName");
let highScores = localStorage.getItem("highScores");

let questionCount = 5;
let timePenalty = 20;
let quizQuestions = [];
let curQuestion = 0;
let questionAnswers = [];
let quizTime = questionCount*timePenalty;

let timeLapse;
let score;

let curTime = quizTime;
quizQuestions.length = questionCount;

const questions = [
    {
        question: "Which characters are used to declare an array in JavaScript?",
        wrong: ["{}","<>","()"],
        correct: "[]",
        explanation: ""
    },
    {
        question: "Which of the following is a corrrect CSS selector for an element by ID?",
        wrong: [".id {}",":id {}","*id {}"],
        correct: "#id {}",
        explanation: "CSS selectors for ID are characterized by the # symbol"
    },
    {
        question: "Under which HTML tag should the <meta> tags be placed?",
        wrong: ["<header>","<body>","<div>"],
        correct: "<head>",
        explanation: ""
    },
    {
        question: "Which of the following is a valid variable declaration in JavaScript?",
        wrong: ["let 1pin = 20","var ? = 10","var hello world = 10"],
        correct: "var variable = 10",
        explanation: ""
    },
    {
        question: "Which CSS attribute is used to define the font of an element?",
        wrong: ["font","font-type","letter-type"],
        correct: "font-family",
        explanation: ""
    },
    {
        question: "What is the correct way to link a CSS file to an application with HTML?",
        wrong: ["<style rel=\"stylesheet\" ref=\"style.css\">","<link href=\"stylesheet\" rel=\"style.css\">","<style href=\"style.css\"> rel=\"stylesheet\""],
        correct: "<link rel=\"stylesheet\" href=\"style.css\">",
        explanation: ""
    },
    {
        question: "All of the following statements are correct for JavaScript, except...",
        wrong: ["The for and while statements are used for looping","The var and let statements are used for declaring variables","true and false are examples of boolean variable types"],
        correct: "The return and if statements are mostly required to pass data from one function to another",
        explanation: "If is not mostly required for a function to pass data"
    },
    {
        question: "As of the current year (2022) which HTML version is used the most?",
        wrong: ["HTML3","HTML4","HTML6"],
        correct: "HTML5",
        explanation: ""
    },
    {
        question: "What does CSS stand for?",
        wrong: ["Colapsable Style Structure","Cascading Style Structure","Colapsable Style Sheets"],
        correct: "Cascading Style Sheets",
        explanation: ""
    },
    {
        question: "Identify the correct statement:",
        wrong: ["JavaScript and Java are two names for the same language","JavaScript is a Low Level programming language","JavaScript and HTML serve the same function in most web applications"],
        correct: "JavaScript can run asynchronous functions executions",
        explanation: ""
    },
    {
        question: "What does HTML stands for?",
        wrong: ["HyperText Monotone Language","HyperText Mention Language","HTTP Transmision Markup Language"],
        correct: "HyperText Markup Language",
        explanation: ""
    },
    {
        question: "In CSS, how can the properties of a div element with the int class be modified without affecting other elements?",
        wrong: ["div#int {}","div, int {}","div int {}"],
        correct: "div.int {}",
        explanation: ""
    },
    {
        question: "The difference between while and for is that...",
        wrong: ["While is for infinite loops and for is not","for can be halted at any time and while needs to complete the run to be halted","for runs for a fixed amount of loops, and while runs until a condition is met"],
        correct: "for executes a function as part of the statement every loop if a condition isn't met, and while doesn't",
        explanation: ""
    },
    {
        question: "In HTML, which tags are used to define a list",
        wrong: ["<lu> or <li>","<li> or <ul>","<div> or <nav>"],
        correct: "<ul> or <ol>",
        explanation: ""
    },
    {
        question: "Which CSS property can be edited to change the size of the font",
        wrong: ["font-height","letter-size","font-width"],
        correct: "font-size",
        explanation: ""
    }
];

function quizApp() {
    assignTextValues();
    startQuizBtn.addEventListener("click", runQuiz);
}

function assignTextValues() {
    let totalTimeTag = document.getElementById("totalTime");
    let questionCountTag = document.getElementById("questionCount");
    let timePenaltyTag = document.getElementById("timePenalty");

    totalTimeTag.textContent = quizTime;
    questionCountTag.textContent = questionCount;
    timePenaltyTag.textContent = timePenalty;
}

function runQuiz() {
    console.log("Starting Quiz")
    selectQuestions();
    renderTime();
    if(!timeLapse) {
        timeLapse = setInterval(runTimer, 1000);
    }

    hideHiddable();
    showElement(questionBoard);
    updateQuestion();
}

function selectQuestions() {
    let tempArr = []
    // Create an array with random unique numbers equal to indexes of the questions.length property
    while(tempArr.length < questionCount) {
        let qIndex = Math.floor(Math.random()*questions.length);
        if(tempArr.indexOf(qIndex) === -1) tempArr.push(qIndex);
    }
    for(let i = 0; i < questionCount; i++) {
        quizQuestions[i] = questions[tempArr[i]];
    }
}

function renderTime() {
    quizTimeTag.textContent = curTime;
}

function runTimer() {
    if (curTime < 0) curTime = 0;
    renderTime()
    if (curTime == 0 ){
        endQuiz();
    } else {
        curTime--;
    }
}

function hideHiddable() {
    Array.from(hiddableElements).forEach(element => {
        element.style.display = "none";
    });
}

function hideElement(htmlElement) {
    htmlElement.style.display = "none";
}

function showElement(htmlElement) {
    htmlElement.style.display = "flex";
}

function updateQuestion() {
    // Create the question options array
    questionAnswers = [...quizQuestions[curQuestion].wrong];
    questionAnswers.push(quizQuestions[curQuestion].correct)
    //Shuffle answer positions
    questionAnswers = questionAnswers.sort(function(a, b){return 0.5 - Math.random()});

    // Render question and options
    renderQuestion();
    renderOptions();

    reviewSubmision();
}

function renderQuestion() {
    // Display Current question in the specified title tag
    questionTitle = document.getElementById("question");
    questionTitle.textContent = quizQuestions[curQuestion].question;
    console.log(questionTitle);
}

function renderOptions() {
    // Create Ordered list and append it to answers
    optionsDiv = document.getElementById("answers");
    const fullList = document.createElement("ol");

    //Create a button for each answer to a question
    for(let i = 0; i < questionAnswers.length; i++) {
        const answerListItem = document.createElement("li");
        const answerBtn = document.createElement("button");
        answerBtn.classList.add("answer");
        const answerBtnText = document.createTextNode(`${questionAnswers[i]}`);

        answerBtn.appendChild(answerBtnText);
        answerListItem.appendChild(answerBtn);
        fullList.appendChild(answerListItem);
    }
    optionsDiv.appendChild(fullList);
}

function reviewSubmision(){
    const answerButtons = document.getElementsByClassName("answer");
    Array.from(answerButtons).forEach(element => {
        element.addEventListener("click", checkAnswer);
    })
}

function checkAnswer(event){
    let clickedButton = event.target;
    console.log("Selected answer: " + clickedButton.textContent);
    hideElement(correctMessage);
    hideElement(wrongMessage);

    //Evaluate the selected answer
    if(clickedButton.textContent == quizQuestions[curQuestion].correct) {
        console.log("Correct!");
        showElement(correctMessage);
        setTimeout(function() {
            correctMessage.style.display = "none";
        },1000)
    } else {
        console.log("Wrong answer!");
        curTime -= timePenalty; 
        if(curTime < 0) curTime = 0;
        renderTime();
        showElement(wrongMessage)
        setTimeout(function() {
            wrongMessage.style.display = "none";
        },1000)
    }

    // Clear the options list
    optionsDiv.innerHTML = "";

    if((curQuestion +1) < quizQuestions.length) {
        curQuestion++
        updateQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    console.log("Game Ended!")
    stopTimer();
    getScore();
    console.log(`Your score: ${score}`)
    hideElement(questionBoard);
    showElement(quizFinish);
    submitBtn.addEventListener("click" , registerScore);
}

function getScore() {
    score = curTime;
    let scoreTag = document.getElementById("score");
    scoreTag.textContent = score;
}

function stopTimer() {
    clearInterval(timeLapse);
    if(curTime < 0) curTime = 0;
    renderTime();
}

function registerScore(event) {
    let invalidName = document.getElementById("invalidName");
    let tempHighScores;
    event.preventDefault();

    if (userName.value != "" && userName.value != null){
        let submitData = {
            score: score,
            name: userName.value
        };
    
        if(highScores != null) {
            tempHighScores = JSON.parse(highScores);
        } else {
            tempHighScores = [];
        }        

        tempHighScores.push(submitData);
        hideElement(invalidName);

        console.log(`Score saved for the user ${userName.value}`)

        localStorage.setItem("highScores", JSON.stringify(tempHighScores));
        console.log("HighScore registered.");

        window.location.href = "assets/html/highScores.html";
    } else {
        showElement(invalidName);
        console.log("Invalid name input");
    }
}

quizApp();

