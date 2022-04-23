// Element variable declarations
let goBackBtn = document.getElementById("goBack");
let clearHighscoresBtn = document.getElementById("clearHighscores");
let highscoreTable = document.getElementById("highscoreTable");
let highScores = localStorage.getItem("highScores");

function highScoresRead(){
    goBackBtn.addEventListener("click", function(){
        window.location.href = "../../index.html";
    });
    clearHighscoresBtn.addEventListener("click", clearHighscores);
    renderScores();
}

function renderScores() {
    let tempHighScores;
    if(highScores != null) {
        tempHighScores = JSON.parse(highScores);
    } else {
        tempHighScores = [];
    }
    console.log(tempHighScores);

    //Sort highscores from highest to lowest
    tempHighScores.sort((a, b) => b.score - a.score);
    for( let i = 0; i < tempHighScores.length; i++) {
        const scoreAndName = document.createElement("li");
        const nameDiv = document.createElement("div");
        const scoreDiv = document.createElement("div");
        nameDiv.classList.add("tableCell");
        scoreDiv.classList.add("tableCell");
        const nameSpan = document.createElement("span");
        const scoreSpan = document.createElement("span");
        const name = document.createTextNode(`${tempHighScores[i].name}`);
        const score = document.createTextNode(`${tempHighScores[i].score}`);
        nameSpan.appendChild(name);
        scoreSpan.appendChild(score);
        nameDiv.appendChild(nameSpan);
        scoreDiv.appendChild(scoreSpan);
        scoreAndName.appendChild(nameDiv);
        scoreAndName.appendChild(scoreDiv);
        console.log(scoreAndName);
        highscoreTable.appendChild(scoreAndName);
    }
}

function clearHighscores(){
    console.log("Clearing local Storage")
    localStorage.clear();
    location.reload();
}

//Waits for the page to load before the main function is executed.
window.onload = highScoresRead;