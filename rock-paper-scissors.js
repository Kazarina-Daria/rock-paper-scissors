document.addEventListener("DOMContentLoaded", () => {
  const rockBtn = document.querySelector(".js-rock-button");
  const paperBtn = document.querySelector(".js-paper-button");
  const scissorsBtn = document.querySelector(".js-scissors-button");
  const resetBtn = document.querySelector(".js-reset-score-button");
  const resultElement = document.querySelector(".result");
  const scoreElement = document.querySelector(".score");

 
  let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  updateScoreElement();

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";

    if (playerMove === computerMove) {
      result = "Tie";
    } else if (
      (playerMove === "rock" && computerMove === "scissors") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissors" && computerMove === "paper")
    ) {
      result = "You win";
    } else {
      result = "You lose";
    }


    if (result === "You win") score.wins += 1;
    else if (result === "You lose") score.losses += 1;
    else score.ties += 1;

    localStorage.setItem("score", JSON.stringify(score));
    updateScoreElement();


    resultElement.innerHTML = `
      You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
      Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;

   
    if (result === "You win") Toast(`You picked ${playerMove}, computer picked ${computerMove}. You win!`, "success");
    else if (result === "You lose") Toast(`You picked ${playerMove}, computer picked ${computerMove}. You lose.`, "error");
    else Toast(`You picked ${playerMove}, computer picked ${computerMove}. It's a tie.`, "info");
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) return "rock";
    if (randomNumber < 2 / 3) return "paper";
    return "scissors";
  }

  function updateScoreElement() {
    if (!scoreElement) return;
    scoreElement.innerHTML = `
      <p>Wins: ${score.wins}</p>
      <p>Losses: ${score.losses}</p>
      <p>Ties: ${score.ties}</p>
    `;
  }

  function resetButton() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem("score");
    updateScoreElement();
    resultElement.textContent = "";
    Toast("Score reset!", "info");
  }

  function Toast(message, type = "info") {
    const options = {
      message,
      timeout: 2000,
      position: "topCenter",
    };
    if (type === "success") iziToast.success(options);
    else if (type === "error") iziToast.error(options);
    else iziToast.info(options);
  }


  rockBtn.addEventListener("click", () => playGame("rock"));
  paperBtn.addEventListener("click", () => playGame("paper"));
  scissorsBtn.addEventListener("click", () => playGame("scissors"));
  resetBtn.addEventListener("click", resetButton);
});
