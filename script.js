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
        tr.setAttribute('data-read_status', element.read);


        tr.addEventListener('dblclick', function () {
            if (this.getAttribute('data-read_status') == 'yes') {
                this.setAttribute('data-read_status', 'no');
                tr.cells[3].innerText = 'no';
            } else {
                this.setAttribute('data-read_status', 'yes');
                tr.cells[3].innerText = 'yes';
            }
        })

        let btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.setAttribute('class', 'remove_button');
        btn.setAttribute('data-index', myLibrary.indexOf(element));  // Adds a data attribute containing the index of the book
        btn.setAttribute('onclick', "removeBook(this.getAttribute('data-index'))"); // Passes the index to the deletion function
        tr.append(btn);
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

function removeBook(book) {
    myLibrary.splice(book,1);
    cleanDisplay();
    displayLibrary();
}

function updateStatus () {

}


// Sets the width of the form so it can appear when the button is clicked
//function displayBookForm () {
//        document.getElementById("formBook").style.width = "100%";
//}