const myLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function(){
        `${this.title} ${this.author}, ${this.pages}, ${isRead ? 'read' : 'not read yet'}`
    };
};

function addBookToLibrary(){
    
}



const addBookButton = document.querySelector('#add-book button');
const formDialog = document.getElementById('form-dialog');
const submitAddBook = document.getElementById('submit-add-book');

addBookButton.addEventListener('click', () => {
    formDialog.showModal();
    formDialog.style.display = 'flex';
});

formDialog.addEventListener('click', (e) => {
    if (e.target === formDialog) {
        formDialog.close();
        formDialog.style.display = 'none';
    }
})

submitAddBook.addEventListener('click', () => {
    formDialog.close();
    formDialog.style.display = 'none';
})
