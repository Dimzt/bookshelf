// Element
const storageKey = 'books';
const isComplete = document.getElementById('input-book-is-complete');
const submitAction = document.getElementById('input-book');
const inputSearch = document.getElementById('search-book-title');

// Check Storage
const checkStorage = () => {
  return typeof Storage !== 'undefined';
};

// Save
const saveBook = (data) => {
  if (checkStorage()) {
    let bookData = [];
    if (localStorage.getItem(storageKey) !== null) {
      bookData = JSON.parse(localStorage.getItem(storageKey));
    }
    bookData.unshift(data);
    localStorage.setItem(storageKey, JSON.stringify(bookData));
  }
};

// Load
const loadBook = () => {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
};

// Render HTML
const renderBook = () => {
  const bookData = loadBook();
  const bookComplete = document.getElementById('complete-bookshelf-list');
  const bookInComplete = document.getElementById('incomplete-bookshelf-list');

  bookComplete.innerHTML = '';
  bookInComplete.innerHTML = '';

  for (let book of bookData) {
    if (book.isComplete == false) {
      let element = `
      <article class="book-item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</P>

        <div class="action">
          <button class="green" onclick="readBook('${book.id}')">Selesai dibaca</button>
          <button class="red" onclick="deleteBook('${book.id}')">Hapus buku</button>
        </div>
      </article>
      `;
      bookInComplete.innerHTML += element;
    } else {
      let element = `
      <article class="book-item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</P>

        <div class="action">
          <button class="green" onclick="unreadBook('${book.id}')">Belum selesai dibaca</button>
          <button class="red" onclick="deleteBook('${book.id}')">Hapus buku</button>
        </div>
      </article>
      `;
      bookComplete.innerHTML += element;
    }
  }
};

// Condition
isComplete.addEventListener('click', () => {
  isComplete.classList.toggle('complete');
});

// Submit Data
submitAction.addEventListener('submit', () => {
  const inputTitle = document.getElementById('input-book-title').value;
  const inputAuthor = document.getElementById('input-book-author').value;
  const inputYear = document.getElementById('input-book-year').value;
  const newBook = {
    id: +new Date(),
    title: inputTitle,
    author: inputAuthor,
    year: parseInt(inputYear),
    isComplete: isComplete.classList.contains('complete'),
  };

  saveBook(newBook);
  renderBook();
});

// Display stored Data
window.addEventListener('load', () => {
  if (checkStorage()) {
    if (localStorage.getItem(storageKey) !== null) {
      renderBook();
    }
  } else {
    alert('Browser yang Anda gunakan tidak mendukung Web Storage');
  }
});

// Delete
const deleteBook = (id) => {
  const deleteId = (book) => book.id != id;
  const bookData = loadBook().filter(deleteId);
  localStorage.setItem(storageKey, JSON.stringify(bookData));
  renderBook();
};

// Read
const readBook = (id) => {
  const getId = (book) => book.id == id;
  const detailBook = loadBook().filter(getId);
  const newBook = {
    id: detailBook[0].id,
    title: detailBook[0].title,
    author: detailBook[0].author,
    year: detailBook[0].year,
    isComplete: true,
  };

  const deleteId = (book) => book.id != id;
  const bookData = loadBook().filter(deleteId);
  localStorage.setItem(storageKey, JSON.stringify(bookData));

  saveBook(newBook);
  renderBook();
};

// Unread
const unreadBook = (id) => {
  const getId = (book) => book.id == id;
  const detailBook = loadBook().filter(getId);
  const newBook = {
    id: detailBook[0].id,
    title: detailBook[0].title,
    author: detailBook[0].author,
    year: detailBook[0].year,
    isComplete: false,
  };

  const deleteId = (book) => book.id != id;
  const bookData = loadBook().filter(deleteId);
  localStorage.setItem(storageKey, JSON.stringify(bookData));

  saveBook(newBook);
  renderBook();
};

// Search
inputSearch.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  const titles = document.querySelectorAll('h3');
  const articles = document.querySelectorAll('.book-item');

  for (let i = 0; titles.length > i; i++) {
    const isVisible = titles[i].innerText.toLowerCase().includes(value);
    if (!isVisible) {
      articles[i].hidden = true;
    } else {
      articles[i].hidden = false;
    }
  }
});
