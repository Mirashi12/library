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
    }
}

// Take every book object in the library array and add their attributes in a new row/cells
function displayLibrary () {    
    myLibrary.forEach(element => {
        let tr = libraryTable.insertRow();
        tr.setAttribute('class', 'book_display');
        tr.insertCell().textContent = element.title;
        tr.insertCell().textContent = element.author;
        tr.insertCell().textContent = element.pages;
        tr.insertCell().textContent = element.read;
    });
}

// Selects all rows displaying book attributes and deletes them
function cleanDisplay () {
    let book_rows = document.querySelectorAll('.book_display');
    book_rows.forEach(book => {
        book.remove();
    });
}

//Creates the object and calls its addBook method on form submit
function addLibrary () {
    let newBook = book();
    newBook.addBook();
    cleanDisplay();
    displayLibrary();
};

// Sets the width of the form so it can appear when the button is clicked
//function displayBookForm () {
//        document.getElementById("formBook").style.width = "100%";
//}