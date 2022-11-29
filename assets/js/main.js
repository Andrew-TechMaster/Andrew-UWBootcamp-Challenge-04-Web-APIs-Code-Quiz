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

/* {============================= Functions (callback) =============================} */
/* <------ Count Down / Timer ------> */
function countDown() {
    navBarDefaultTextEL.classList.add("hidden");
    timerEl.className = "visible";

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft} sec`;

        // if (time == 0 sec) => stops execution of action at set interval
        // if (time !=== 0 sec && finish all questions) => stops execution of action at set interval
        if (timeLeft === 0) {
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
        setTimeout(endGame, 1000);
    }
}

/* <------ Check Answer / Calculate Result ------> */
function checkAnswer(finalChoice) {
    if (finalChoice === questionCollection[questionIndex].answer) {
        totalScore += 5;
        checkMessageEl.textContent = "Congragulations! You are right!";
        checkMessageEl.classList.add("answerCorrect");
        setTimeout(() => {
            checkMessageEl.textContent = "";
            checkMessageEl.classList.remove("answerCorrect");
        }, 2000);
    } else {
        totalScore -= 2;
        timeLeft -= 10;
        checkMessageEl.textContent = ":( Wrong~~";
        checkMessageEl.classList.add("answerWrong");
        setTimeout(() => {
            checkMessageEl.textContent = ""
            checkMessageEl.classList.remove("answerWrong");
        }, 2000);
    }

    questionIndex++;
}

/* <------ End Game / Game Over ------> */
function endGame() {
    quizSectionEl.className = "hidden";
    settleSectionEl.className = "visible";

    displayScoreEl.textContent = `Your Final Score is ${totalScore}`
}
/* {============================= Add Event Listener  =============================} */
startBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    countDown();
    getQuestion();
});

quizSectionEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.matches(".btn")) {
        var item = target.textContent;
        checkAnswer(item);
        getQuestion();
    }
})

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
console.log(setOfQuestions);
console.log(`#Question: ${lengthOfQuestions} & Total Time: ${timeLeft} `);
console.log(setOfQuestions[questionIndex].choices[3])
