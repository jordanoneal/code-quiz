const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which final fantasy game is my favorite of the franchise?",
    choice1: "10",
    choice2: "7",
    choice3: "12",
    choice4: "8",
    answer: 1
  },
  {
    question:
      "What's my favorite sport?",
    choice1: "water polo",
    choice2: "horse racing",
    choice3: "basketball",
    choice4: "soccer!!",
    answer: 3
  },
  {
    question: "what's the name of my puppy",
    choice1: "Peewee",
    choice2: "Ollie",
    choice3: "Teddy",
    choice4: "Evil pup",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;

function startGame() {
    score = 0;
    availableQuesions = [...questions];
    console.log(availableQuesions);
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuesions.length === 0) {
        return window.location.assign ("/highscores.html");
    }

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];       
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    
};

choices.forEach(choice => {
    choice.addEventListener("click", function(event) {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    });

});

incrementScore = num => {
     score += num;
     scoreText.innerText = score;
   };
  

startGame();