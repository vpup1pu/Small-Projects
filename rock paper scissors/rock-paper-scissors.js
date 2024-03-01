function game() {
    let playerScore = 0;
    let computerScore = 0;
    let round = 0;

    function getComputerChoice() {
        let result;
        let number = Math.floor(Math.random() * 3);
        if (number === 0) {
            result = 'Rock';
        }
        else if (number === 1) {
            result = 'Paper';
        }
        else {
            result = 'Scissors';
        }
        return result;
    }

    const playRound = () => {
        const playerBtn = document.querySelectorAll(".playerChoiceBtn");
        for (let i = 0; i < playerBtn.length; i++) {
            playerBtn[i].addEventListener('click', () => {
                const playerSelection = playerBtn[i].textContent;

                const roundsLeft = document.querySelector(".roundsLeft");
                round++;
                roundsLeft.textContent = `Rounds Left: ${5 - round}`;

                let computerSelection = getComputerChoice();
                const cChoice = document.querySelector("#compChoice");
                cChoice.textContent = `Computer choice: ${computerSelection}`;

                winner(playerSelection, computerSelection);
                if (round === 5) {
                    gameOver(playerBtn, roundsLeft);
                }
            })
        }
    }

    const winner = (player, computer) => {
        const result = document.querySelector(".finalResult");
        const playerScoreBoard = document.querySelector(".pCounter");
        const computerScoreBoard = document.querySelector(".cCounter");
        if (player === computer) {
            result.textContent = 'Tie';
        }
        else if (player === 'Rock') {
            if (computer === 'Paper') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'You Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player === 'Scissors') {
            if (computer === 'Rock') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'You Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player === 'Paper') {
            if (computer === 'Scissors') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'You Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
    }

    const gameOver = (playerBtn, roundsLeft) => {
        const result = document.querySelector(".finalResult");
        const restartBtn = document.querySelector(".newGameBtn");
        // const playerBtn = document.querySelectorAll(".playerChoiceBtn");
        for (let i = 0; i < playerBtn.length; i++) {
            playerBtn[i].style.display = 'none';
        }
        // const roundsLeft = document.querySelector(".roundsLeft");
        roundsLeft.style.display = 'none';
        
        if(playerScore > computerScore){
            result.style.fontSize = '2rem'; 
            result.innerText = 'You Won The Game';
            result.style.color = '#7fff00';
        }
        else if(playerScore < computerScore) {
            result.style.fontSize = '2rem'; 
            result.innerText = 'You Lost The Game';
            result.style.color = '#ff1493'
        }
        else {
            result.style.fontSize = '2rem'; 
            result.innerText = "It's a Tie!";
            result.style.color = '#8a2be2';
        }
        restartBtn.addEventListener('click', () =>{
            window.location.reload();
        })
    }
    playRound();
}

game();
