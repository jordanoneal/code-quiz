// vars to keep track of quiz state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// vars to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  let startScreenEl = document.getElementById("start-screen");
  // hide start screen
  startScreenEl.setAttribute("class", "hide");

  // un-hide quesions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  let currentQuestion = questions[currentQuestionIndex];
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out ant old question chocies
  choicesEl.textContent = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create button for each choice
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + "." + choice;
    // attach click event listener to each choice
    choiceNode.addEventListener("click", questionClick);
    // display on page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check is user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;

    // play "wrong" sound effecr
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  } else {
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop time
  clearInterval(timerId);

  // show end screen
  let endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  let finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to start quiz
startBtn.addEventListener("click", startQuiz);

// user clicks button to submit intials
submitBtn.addEventListener("click", saveHighscore);

initialsEl.addEventListener("keyup", checkForEnter);
