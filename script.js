const myLibrary = [];
const addBookButton = document.querySelector('#add-book button');
const formDialog = document.getElementById('form-dialog');
const submitAddBook = document.getElementById('submit-add-book');
const form = document.getElementById('add-book-form')

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function(){
        `${this.title} ${this.author}, ${this.pages}, ${this.isRead ? 'Read' : 'Not read'}`
    };
};

function addBookToLibrary(book){
    myLibrary.push(book)
}

function createBook(book) {
    const bookTitle = `<div>"${book.title}"</div>`;
    const bookAuthor = `<div>${book.author}</div>`;
    const bookPages = `<div>${book.pages} pages</div>`;
    const bookRead = `<div>${book.isRead ? 'Read' : 'Not read'}</div>`;
    const isReadButton = document.createElement('button');
    const removeButton = document.createElement('button');

    const bookContainer = document.createElement('div');
    
    isReadButton.classList.add('read');
    isReadButton.innerHTML = `${bookRead}`;

    if (book.isRead) {
        isReadButton.classList.add('green');
    }

    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';

    bookContainer.classList.add('book');

    bookContainer.innerHTML = `${bookTitle} ${bookAuthor} ${bookPages}`;
    bookContainer.appendChild(isReadButton);
    bookContainer.appendChild(removeButton);

    return bookContainer;
}

function displayLibrary(){
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookElement = createBook(book);
        booksContainer.appendChild(bookElement);
        
        const isReadButtonChange = document.querySelectorAll('button.read') 
        isReadButtonChange.forEach((button, index) => {
            button.addEventListener('click', () => {
                const book = myLibrary[index];
                book.isRead = !book.isRead;
                displayLibrary();
            })
        })

        const removeButton = bookElement.querySelector('button.remove');
        removeButton.addEventListener('click', () => {
            const indexOfBook = myLibrary.indexOf(book)
            myLibrary.splice(indexOfBook, 1);
            displayLibrary();
        });
    });
}

function isBookInLibrary(book) {
    return myLibrary.some(existingBook => 
        existingBook.title === book.title && 
        existingBook.author === book.author &&
        existingBook.pages === book.pages
    );
}

addBookButton.addEventListener('click', () => {
    formDialog.showModal();
    formDialog.style.display = 'flex';
});

// handle exit from form if it was clicked randomly
formDialog.addEventListener('click', (e) => {
    if (e.target === formDialog) {
        formDialog.close();
        formDialog.style.display = 'none';
    }
})

// handle form submit
submitAddBook.addEventListener('click', (e) => {
    formDialog.close();
    formDialog.style.display = 'none';

    e.preventDefault();

    if (!form.checkValidity()) {
        alert('Please fill out all fields.');
        return;
    }

    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const pages = document.querySelector('.pages').value;
    const readCheckboxInput = document.querySelector('#read-checkbox input[type="checkbox"]').checked;

    const book = new Book(title, author, pages, readCheckboxInput);

    if (!isBookInLibrary(book)) {
        addBookToLibrary(book);
    } else{
        alert('Book is already in library.');
        return;
    }

    displayLibrary();
})

displayLibrary();