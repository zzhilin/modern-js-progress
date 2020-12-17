class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
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
	}

	showAlert(message, className) {
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
	}

	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
}

//local storage
class Store {
	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(function(book) {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static addBook(book) {
		//get from LS
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach(function(book, index) {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

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
		//add to local storage
		Store.addBook(book);
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
	//remove from LS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	ui.showAlert('Book removed', 'success');
	e.preventDefault();
});
