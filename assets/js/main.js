/* {============================= DOM / Element / Variable Declaration  =============================} */
/* <------ SectionEl ------> */
var menuEl = document.querySelector("#menuSection");
var quizEl = document.querySelector("#quizSection");
var settleEl = document.querySelector("#settleSection");
var viewhighScoreEl = document.querySelector("#viewScoreSection");
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
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = `: ${timeLeft} sec`;

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            timerEl.textContent = "is up";
        }
    }, 1000)
}

/* {============================= Add Event Listener  =============================} */
// btn.addEventListener("click", callback)

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

startBtnEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    countDown();
});