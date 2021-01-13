function printHighScores() {
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // sort highscores by score property in decending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    let liEl = document.createElement("li");
    liEl.textContent = score.initials + " - " + score.score;

    let olEl = document.getElementById("highscores");
    olEl.appendChild(liEl);
  });
}

// clear scores
let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  window.localStorage.removeItem("highscores");
  window.location.reload();
});

printHighScores();
