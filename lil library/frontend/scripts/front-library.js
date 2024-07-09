const myLibrary = [];

//user-library.html
import {addBookToLibrary, displayLibrary} from './functions.mjs';

const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const pagesInput = document.getElementById("bookPages");
let error = document.getElementById("error");
let success = document.getElementById("success");
const addButton = document.getElementById("addBook");
const display = document.querySelector(".libContainer");
const dialog = document.querySelector(".dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.getElementById("closeBtn");
const resetButton = document.getElementById("resetBtn");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  const radioInputs = document.querySelectorAll('input[name="book_state"]');
  radioInputs.forEach(radio => {
    radio.checked = false;
  });

  dialog.close();
  error.textContent = "";
  success.textContent = "";
});

resetButton.addEventListener("click", () => {
  error.textContent = "";
  success.textContent = "";
});

pagesInput.addEventListener("keydown", function (event) {
  // Prevent the user from typing the character "e"
  if (event.key === 'e' || event.key === 'E') {
    event.preventDefault();
  }
});

addButton.addEventListener("click", (event) => {
  event.preventDefault()
  const readInput = document.querySelector('input[name="book_state"]:checked');
  if (!readInput) {
    success.textContent = "";
    error.textContent = "Please select a state for the book";
    error.style.color = "#8C2F2C";
    return;
  }

  if (!(/^\d+$/.test(pagesInput.value)) || parseInt(pagesInput.value) <= 0 || parseInt(pagesInput.value) >= 2000) {
    success.textContent = "";
    error.textContent = "Please enter a valid number of pages";
    error.style.color = "#8C2F2C";
    return;
  }

  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value, myLibrary, error, success, display);;
});

displayLibrary(myLibrary, display);