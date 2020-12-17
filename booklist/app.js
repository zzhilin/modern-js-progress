//book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//ui constructor (add book and more)
function UI() {
	//
}

//UI prototype add book to list
UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');
	//create tr
	const tr = document.createElement('tr');
	//add cols
	tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
	//append to list
	list.appendChild(tr);
};

//show alert
UI.prototype.showAlert = function(message, className) {
	//create div
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));
	//get parent
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	container.insertBefore(div, form);
	//set time out
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 1000);
};

//delete book
UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
};

//clear fields for UI proto
UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

//event listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
	//get form values
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;
	//instantiate book
	const book = new Book(title, author, isbn);
	//instantiate UI object
	const ui = new UI();
	// validate
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Plz finish all fields', 'error');
	} else {
		//add book to list
		ui.addBookToList(book);
		//show success
		ui.showAlert('Success', 'success');
		//clear fields
		ui.clearFields();
	}

	e.preventDefault();
});

//event listerner for delete
document.getElementById('book-list').addEventListener('click', function(e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	ui.showAlert('Book removed', 'success');
	e.preventDefault();
});
