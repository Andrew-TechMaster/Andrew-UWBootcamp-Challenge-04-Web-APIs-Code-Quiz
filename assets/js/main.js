/* {============================= DOM / Element / Variable Declaration  =============================} */
/* <------ SectionEl ------> */
var menuSectionEl = document.querySelector("#menuSection");
var quizSectionEl = document.querySelector("#quizSection");
var settleSectionEl = document.querySelector("#settleSection");
var viewhighScoreSectionEl = document.querySelector("#viewScoreSection");
/* <------ ButtonEl ------> */
var viewBtnEl = document.querySelector("#viewBtn");
var startBtnEl = document.querySelector("#startBtn");
var optionAEl = document.querySelector("#optionA");
var optionBEl = document.querySelector("#optionB");
var optionCEl = document.querySelector("#optionC");
var optionDEl = document.querySelector("#optionD");
var submitInitialBtnEl = document.querySelector("#submitInitialBtn");
var goBackBtnEl = document.querySelector("#goBackBtn");
var clearBtnEl = document.querySelector("#clearBtn");
/* <------ Other / TextAreaEl ------> */
var navBarDefaultTextEL = document.querySelector("#navBarDefaultText");
var timerEl = document.querySelector("#timer");
var questionTitleEl = document.querySelector("#questionTitle");
var checkMessageEl = document.querySelector("#checkMessage");
var displayScoreEl = document.querySelector("#displayScore");
var inputNameEl = document.querySelector("#inputName");
/* <------ Variables ------> */
var setOfQuestions = questionCollection;
var lengthOfQuestions = setOfQuestions.length;
var timeLeft = lengthOfQuestions * 10;
var totalScore = 0;
var questionIndex = 0;
var resultArray = [];
let wrongPenalty = 2;
let correctBonus = 10;

/* {============================= Functions (callback) =============================} */
/* <------ Count Down / Timer ------> */
function countDown() {
    timerEl.textContent = "Time: "
    navBarDefaultTextEL.className = "navbar-text text-light hidden";
    timerEl.classList.replace("hidden", "visible");

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft} sec`;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time is up!";
            endGame();
        } else if ((timeLeft !== 0) && (questionIndex >= lengthOfQuestions)) {
            clearInterval(timeInterval);
            timerEl.textContent = "Complete all questions!";
        }
    }, 1000)
}

/* <------ Get Quesion / Next Question ------> */
function getQuestion() {
    menuSectionEl.className = "hidden";
    quizSectionEl.className = "visible";

    if (questionIndex < lengthOfQuestions) {
        questionTitleEl.textContent = setOfQuestions[questionIndex].title;
        optionAEl.textContent = setOfQuestions[questionIndex].choices[0];
        optionBEl.textContent = setOfQuestions[questionIndex].choices[1];
        optionCEl.textContent = setOfQuestions[questionIndex].choices[2];
        optionDEl.textContent = setOfQuestions[questionIndex].choices[3];
    } else {
        setTimeout(endGame, 1500);
    }
}

/* <------ Check Answer / Calculate Result ------> */
function checkAnswer(finalChoice) {
    if (finalChoice === questionCollection[questionIndex].answer) {
        totalScore += correctBonus;
        checkMessageEl.textContent = `🎉 You are right! +${correctBonus} points 🎉`;
        checkMessageEl.classList.add("answerCorrect");
        setTimeout(() => {
            checkMessageEl.textContent = "";
            checkMessageEl.classList.remove("answerCorrect");
        }, 1500);
    } else {
        totalScore -= wrongPenalty;
        timeLeft -= 10;
        checkMessageEl.textContent = `🙅 Incorrect, -${wrongPenalty} points & total time -10 sec 🙅`;
        checkMessageEl.classList.add("answerWrong");
        setTimeout(() => {
            checkMessageEl.textContent = ""
            checkMessageEl.classList.remove("answerWrong");
        }, 1500);
    }

    questionIndex++;
}

/* <------ End Game / Game Over ------> */
function endGame() {
    quizSectionEl.className = "hidden";
    settleSectionEl.className = "visible";

    displayScoreEl.textContent = `Your Final Score is ${totalScore}`
}


/* <------ Set Score / Convert obj to JSON and then save it on local storage ------> */
function setScore() {
    var userNameScore = {
        userName: inputNameEl.value,
        userScore: totalScore,
    };

    resultArray.push(userNameScore);
    var userNameScore_Serialization = JSON.stringify(resultArray);
    localStorage.setItem("userNameScore", userNameScore_Serialization);
}

/* <------ Get Score / Return Array Obj ------> */
function getScore() {
    var savedUserNameScore_JSON = localStorage.getItem("userNameScore");
    var savedUserNameScore_Deserialize = JSON.parse(savedUserNameScore_JSON);

    return savedUserNameScore_Deserialize;
}

/* <------ Print Score ------> */
function printScore(printedData) {
    var tbBody = document.querySelector("#tableBody");
    tbBody.innerHTML = "";

    if (printedData !== null) {
        for (let i = 0; i < printedData.length; i++) {
            var newRow = document.createElement("tr");
            newRow.setAttribute("data-index", i);

            var userName = printedData[i].userName;
            var userScore = printedData[i].userScore;

            var newCol01 = document.createElement("td");
            var col01Content = document.createTextNode(userName);
            newCol01.appendChild(col01Content)
            newRow.appendChild(newCol01);

            var newCol02 = document.createElement("td");
            var col02Content = document.createTextNode(userScore);
            newCol02.appendChild(col02Content)
            newRow.appendChild(newCol02)

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete ❌";
            deleteButton.className = "btn btn-danger btn-lg";

            newRow.appendChild(deleteButton);
            tbBody.appendChild(newRow);
        }
    } else {
        var newRow = document.createElement("tr");
        var userName = "JS (Example User)";
        var userScore = "10 (Example Score)"

        var newCol01 = document.createElement("td");
        var col01Content = document.createTextNode(userName);
        newCol01.appendChild(col01Content)
        newRow.appendChild(newCol01);

        var newCol02 = document.createElement("td");
        var col02Content = document.createTextNode(userScore);
        newCol02.appendChild(col02Content)
        newRow.appendChild(newCol02)

        tbBody.appendChild(newRow);
    }
}

/* <------ View High Score Page ------> */
function viewScore() {
    settleSectionEl.className = "hidden";
    menuSectionEl.className = "hidden";
    quizSectionEl.className = "hidden";
    viewhighScoreSectionEl.className = "visible";

    navBarDefaultTextEL.classList.replace("visible", "hidden");
    timerEl.classList.replace("visible", "hidden");

    inputNameEl.value = "";
}

/* <------ Back To Home Page ------> */
function toHomepage() {
    settleSectionEl.className = "hidden";
    quizSectionEl.className = "hidden";
    viewhighScoreSectionEl.className = "hidden";
    menuSectionEl.className = "visible";

    navBarDefaultTextEL.classList.replace("hidden", "visible");
    timerEl.classList.replace("visible", "hidden");
}

/* <------ Clear up local storage ------> */
function clearAll() {
    localStorage.clear();
    resultArray = [];
}

/* <------ init  ------> */
// prevent reolading then clear up all loacalstorage
// since I initialize an empty resultArray at first 
function init() {
    var storedData = JSON.parse(localStorage.getItem("userNameScore"));
    if (storedData !== null) {
        resultArray = storedData;
    }
}

/* {============================= Add Event Listener  =============================} */
/* <------ View High Score Button ------> */
viewBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    var data = getScore();
    printScore(data);
    viewScore();
})

/* <------ Start Button ------> */
startBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    totalScore = 0;
    questionIndex = 0;
    timeLeft = lengthOfQuestions * 10;

    countDown();
    getQuestion();
});

/* <------ Quiz Section: Options Button ------> */
quizSectionEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.matches(".btn")) {
        var item = target.textContent;
        checkAnswer(item);
        getQuestion();
    }
})

/* <------ Submit Initial Button ------> */
submitInitialBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    setScore();
    var data = getScore();
    printScore(data);
    viewScore();
})

/* <------ Go Back Button ------> */
goBackBtnEl.addEventListener("click", toHomepage)

/* <------ Clear Button ------> */
clearBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    clearAll();
    printScore();
})

/* <------ Delete Button In View Score Table ------> */
viewhighScoreSectionEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    var element = evt.target;
    if (element.matches(".btn-danger")) {
        var index = element.parentElement.getAttribute("data-index");
        resultArray.splice(index, 1);

        var userNameScore_Serialization = JSON.stringify(resultArray);
        localStorage.setItem("userNameScore", userNameScore_Serialization);
        var savedUserNameScore_JSON = localStorage.getItem("userNameScore");
        var savedUserNameScore_Deserialize = JSON.parse(savedUserNameScore_JSON);

        printScore(savedUserNameScore_Deserialize)
    }
})

/* <------ Inint function ------> */
init();



/* {============================= Temp For Testing / Notes  =============================} */
// startGame() => call countDown(), call getQuestion() 
// countDown() => return void
// getQuestion() => return void
// caculateResult() => return void
// endGame() => return void, show message
// setScore() => return void, localStorage.setItem
// getScore() => return resultArray, localStorage.getItem
// printScore() => return void, createElement, appendChild
// showScore() => return void, show the viewScoreSection
// toHomepage() => back to the home page
// clearAll() => clear local storage
// console.log(setOfQuestions);
// console.log(`#Question: ${lengthOfQuestions} & Total Time: ${timeLeft} `);
// console.log(setOfQuestions[questionIndex].choices[3])
