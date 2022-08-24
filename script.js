let myLibrary = [];
let libraryTable = document.getElementById('libraryTable');
let addForm = document.querySelector('#addForm');

//Factory function that takes the value from the form to create a book object
function book () {
    let item = Object.create(book.proto);
    item.title = document.getElementById("title").value;
    item.author = document.getElementById("author").value;
    item.pages = document.getElementById("pages").value;
    item.read = document.getElementById("read").value;

    return item;
}

//Add the addBook method to the book object and adds it to the table
book.proto = {
    addBook: function () {
        myLibrary.push(this);
        let tr = libraryTable.insertRow();
        tr.insertCell().textContent = this.title;
        tr.insertCell().textContent = this.author;
        tr.insertCell().textContent = this.pages;
        tr.insertCell().textContent = this.read;
    }
}

//Creates the object and calls its addBook method on form submit
function addLibrary () {
    let newBook = book();
    newBook.addBook();
};

// Sets the width of the form so it can appear when the button is clicked
function displayBookForm () {
        document.getElementById("formBook").style.width = "100%";
}