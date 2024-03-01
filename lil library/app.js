const myLibrary = [];
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const pagesInput = document.getElementById("bookPages");
const readInput = document.getElementById("bookState");
var error = document.getElementById("error");
var success = document.getElementById("success");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const addButton = document.getElementById("addBook");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function isInputValid(input) {
  return input !== '' && input !== 0 && input !== '0';
}

function bookExists(title, author) {
  return myLibrary.some(book => book.title === title && book.author === author);
}

function addBookToLibrary(title, author, pages, read) {
  if (isInputValid(title) && isInputValid(author) && isInputValid(pages) && isInputValid(read)) {
    if (!bookExists(title, author)) {
      let newBook = new Book(title, author, pages, read);
      myLibrary.push(newBook);
      error.textContent = "";
      success.textContent = "Successfully uploaded!";
      success.style.color = "green";
    } else {
      console.log('Error: Book already exists');
      success.textContent = "";
      error.textContent = "This book already exists in the library";
      error.style.color = "red";
    }
  } else {
    console.log('Error: Invalid input');
    success.textContent = "";
    error.textContent = "Please complete every input";
    error.style.color = "red";
  }
  console.log(myLibrary)
}

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
  error.textContent = "";
});

addButton.addEventListener("click", () => {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);;
});
