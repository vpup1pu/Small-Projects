class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'Read' : 'Not Read Yet'}`;
        };
    }
}

//
function isInputValid(input) {
    return input !== '' && input !== 0 && input !== '0';
};

function bookExists(title, author, arr) {
    return arr.some(book => book.title.toUpperCase() === title.toUpperCase() && book.author.toUpperCase() === author.toUpperCase());
};

export function addBookToLibrary(title, author, pages, read, arr, error, success, container) {
    if (isInputValid(title) && isInputValid(author) && isInputValid(pages) && isInputValid(read)) {
        if (!bookExists(title, author, arr)) {
            let newBook = new Book(title, author, pages, read);
            arr.push(newBook);
            displayLibrary(arr, container);
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
        error.textContent = "Please complete every input";
        error.style.color = "#8C2F2C";
    }
};

function removeBook(book, arr, container) {
    const index = arr.indexOf(book);
    arr.splice(index, 1);
    displayLibrary(arr, container);
}

function changeStatus(book, arr, container) {
    book.read = !book.read;
    displayLibrary(arr, container); // Update the display after changing the status
}

export function displayLibrary(arr, container) {
    container.innerHTML = "";
    arr.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");

        const cardNav = document.createElement("div");
        cardNav.classList.add("cardNav");
        bookCard.appendChild(cardNav);

        const modifyBtn = document.createElement("button");
        modifyBtn.classList.add("modifyBtn");
        modifyBtn.textContent = "Change Status";
        modifyBtn.addEventListener("click", () => {
            const bookIndex = arr.indexOf(book);
            changeStatus(arr[bookIndex], arr, container);
        });
        cardNav.appendChild(modifyBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => {
            removeBook(book, arr, container);
        });
        cardNav.appendChild(deleteBtn);

        const info = document.createElement("div");
        info.classList.add("bookInfo");
        info.textContent = book.info();
        bookCard.appendChild(info);

        container.appendChild(bookCard);
    });
}