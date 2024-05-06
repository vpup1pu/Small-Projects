const myLibrary = [
  // new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet'),
  // new Book('Odisea', 'Homero', 480, 'read')
];
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const pagesInput = document.getElementById("bookPages");
var error = document.getElementById("error");
var success = document.getElementById("success");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.getElementById("closeBtn");
const addButton = document.getElementById("addBook");
const resetButton = document.getElementById("resetBtn");
const display = document.querySelector(".libContainer");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'Read' : 'Not Read Yet'}`;
  };
}

function isInputValid(input) {
  return input !== '' && input !== 0 && input !== '0';
}

function bookExists(title, author) {
  return myLibrary.some(book => book.title.toUpperCase() === title.toUpperCase() && book.author.toUpperCase() === author.toUpperCase());
}

function inputIsAWord(str) {
  if ((str.match(/-/g) || []).length > 1) {
    return false;
  }
  else if (str.startsWith('-') || str.endsWith('-')) {
    return false;
  }
  return true;
}

function addBookToLibrary(title, author, pages, read) {
  if (isInputValid(title) && isInputValid(author) && isInputValid(pages) && isInputValid(read)) {
    if (inputIsAWord(title) && inputIsAWord(author)) {
      if (!bookExists(title, author)) {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        displayLibrary();
        error.textContent = "";
        success.textContent = "Successfully uploaded!";
        success.style.color = "#465E46";
      } else {
        success.textContent = "";
        error.textContent = "This book already exists in the library";
        error.style.color = "#8C2F2C";
      }
    } else {
      success.textContent = "";
      error.textContent = "Please check if you've written correctly book's the title or the author";
      error.style.color = "#8C2F2C";
    }
  } else {
    success.textContent = "";
    error.textContent = "Please complete every input";
    error.style.color = "#8C2F2C";
  }
}

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
})

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

  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);;
});

function removeBook(book, array){
  const index = array.indexOf(book);
  array.splice(index, 1);
  displayLibrary();
}

function changeStatus(book) {
  book.read = !book.read;
  displayLibrary(); // Update the display after changing the status
}

function displayLibrary() {
  display.innerHTML = "";
  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const cardNav = document.createElement("div");
    cardNav.classList.add("cardNav");
    bookCard.appendChild(cardNav);

    const modifyBtn = document.createElement("button");
    modifyBtn.classList.add("modifyBtn");
    modifyBtn.textContent = "Change Status";
    modifyBtn.addEventListener("click", () => {
      const bookIndex = myLibrary.indexOf(book);
      changeStatus(myLibrary[bookIndex]);
    });
    cardNav.appendChild(modifyBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", ()=>{
      removeBook(book, myLibrary);
    });
    cardNav.appendChild(deleteBtn);

    const info = document.createElement("div");
    info.classList.add("bookInfo");
    info.textContent = book.info();
    bookCard.appendChild(info);

    display.appendChild(bookCard);
  });
}

displayLibrary();