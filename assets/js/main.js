/* {============================= DOM / Element / Variable Declaration  =============================} */
/* <------ SectionEl ------> */

/* <------ ButtonEl ------> */

/* <------ Variables ------> */
var setOfQuestions = questionCollection;
var lengthOfQuestions = setOfQuestions.length;
var timeLeft = lengthOfQuestions * 10;
var totalScore = 0;
var questionIndex = 0;
var resultArray = [];

/* {============================= Functions (callback) =============================} */
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

/* {============================= Add Event Listener  =============================} */
// btn.addEventListener("click", callback)

/* {============================= Temp For Testing / Notes  =============================} */
console.log(setOfQuestions);
console.log(`#Question: ${lengthOfQuestions} & Total Time: ${timeLeft} `);