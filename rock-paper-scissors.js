//const prompt = require("prompt-sync")();
function getComputerChoice() {
    let result;
    let number = Math.floor(Math.random()*3);
    if (number===0) {
        result = 'Rock';
    }
    else if (number===1) {
        result = 'Paper';
    }
    else {
        result = 'Scissors';
    }
    return result;
}

function playRound(playerSelection, computerSelection) {
    let finalResult = "Player made a typo";
    let firstLetter = playerSelection[0].toUpperCase();
    let restantLetters = playerSelection.slice(1);
    let playerResult = firstLetter + restantLetters.toLowerCase();
    if (playerResult === computerSelection) {
        finalResult = "It's a tie!";
    }
    else {
        if (playerResult === 'Rock') {
            if (computerSelection === 'Paper') {
                finalResult = "You Lose! Paper beats Rock";
            }
            else {
                finalResult = "You Win! Rock beats Scissors";
            }
        }
        if (playerResult === 'Paper') {
            if (computerSelection === 'Rock') {
                finalResult = "You Win! Paper beats Rock";
            }
            else {
                finalResult = "You Lose! Scissors beats Paper";
            }
        }
        if (playerResult === 'Scissors') {
            if (computerSelection === 'Paper') {
                finalResult = "You Win! Scissors beats Paper";
            }
            else {
                finalResult = "You Lose! Rock beats Scissors";
            }
        }
    }
    return finalResult;
}

function game() {
    let round = 1;
    let playerCounter = 0;
    let computerCounter = 0;
    while (round < 6) {
        let playerSelection = prompt('Your choise');
        //let playerSelection = 'Rock';
        let computerSelection = getComputerChoice();
        console.log("Round: " + round);
        let roundResult = playRound(playerSelection, computerSelection);
        console.log(roundResult);
        if (roundResult === "It's a tie!" || roundResult === "Player made a typo") {
            console.log("Score: You " + playerCounter + " Computer " + computerCounter);
        }
        else if (roundResult === "You Win! Scissors beats Paper" || roundResult === "You Win! Paper beats Rock" || roundResult === "You Win! Rock beats Scissors") {
            playerCounter++;
            console.log("Score: You " + playerCounter + " Computer " + computerCounter);
        }
        else {
            computerCounter++;
            console.log("Score: You " + playerCounter + " Computer " + computerCounter);
        }
        round++;
    }
    if (playerCounter > computerCounter) {
        console.log('Congratulations! You win!')
    }
    else if (playerCounter === computerCounter) {
        console.log("It's a tie!")
    }
    else {console.log("Sorry, you lose!")}
}

game();

