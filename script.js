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
        tr.setAttribute('data-index', myLibrary.indexOf(element));
        tr.insertCell().textContent = element.title;
        tr.insertCell().textContent = element.author;
        tr.insertCell().textContent = element.pages;
        tr.insertCell().textContent = element.read;
        tr.setAttribute('data-read_status', element.read);


        tr.addEventListener('dblclick', function () {
            if (this.getAttribute('data-read_status') == 'yes') {
                this.setAttribute('data-read_status', 'no');
                tr.cells[3].innerText = 'no';
                element.read = 'no'
            } else if (this.getAttribute('data-read_status') == 'no') {
                this.setAttribute('data-read_status', 'yes');
                tr.cells[3].innerText = 'yes';
                element.read = 'yes';
            }
        });

        tr.addEventListener('click', function displayButtons () {
            let index_icon = 'img[data-index=' + '"' + myLibrary.indexOf(element) + '"]';
            let remove_icon = document.querySelector(index_icon);
            remove_icon.classList.toggle('visible');
            this.classList.toggle('highlighted');
        });
    });
}

// Selects all rows displaying book attributes and deletes them
function cleanDisplay () {
    let book_rows = document.querySelectorAll('.book_display');
    book_rows.forEach(book => {
        book.remove();
    });

    let all_icons = document.querySelectorAll('.remove_button');
    all_icons.forEach( element => { 
        element.remove();
    });
}

//Creates the object and calls its addBook method on form submit
function addLibrary () {
    let newBook = book();
    newBook.addBook();
    cleanDisplay();
    displayLibrary();
    addIcons();
};

function removeBook(book) {
    myLibrary.splice(book,1);
    cleanDisplay();
    displayLibrary();
    addIcons();
}

function addIcons () {
    myLibrary.forEach(element => {
        let icon_div = document.getElementById('icon_div');
        let rmv_icon = document.createElement('img');
        rmv_icon.setAttribute('src', './resources/delete_icon.svg');
        rmv_icon.setAttribute('class', 'remove_button');
        rmv_icon.setAttribute('data-index', myLibrary.indexOf(element));  // Adds a data attribute containing the index of the book
        rmv_icon.addEventListener('click', function () {
            removeBook(this.getAttribute('data-index'));
        });                                                                  // Passes the index to the deletion function
        icon_div.append(rmv_icon);
    });
}


// Sets the width of the form so it can appear when the button is clicked
//function displayBookForm () {
//        document.getElementById("formBook").style.width = "100%";
//}