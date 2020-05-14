const root = document.getElementById('root');

let books = JSON.parse(localStorage.getItem('data'));

let booksList = JSON.parse(localStorage.getItem('books')) || books;

const list = document.createElement('ul');
const addButton = document.createElement('button');
addButton.className = 'addBook';
addButton.innerText = 'Add book';
list.appendChild(addButton);
let selectedBook;

const createModal = (data) => {
  const modal = document.createElement('div');
  const overlay = document.createElement('div');
  const form = document.createElement('form');
  const discard = document.createElement('button');
  const save = document.createElement('button');
  const img = document.createElement('img');
  img.className = 'imgModal';
  modal.className = 'modal';
  form.className = 'form';
  modal.className = 'modal';
  overlay.className = 'overlay';
  discard.className = 'discard';
  save.className = 'save';
  form.id = 'form';

  if (data) {
    for (let [key, value] of Object.entries(data)) {
      const input = document.createElement('input');
      const label = document.createElement('label');
      input.setAttribute('required', '');
      if (key === 'img') {
        img.src = value;
        label.appendChild(img);
      }
      if (key === 'id') {
        console.log('empty');
      } else {
        label.innerText = key;
        input.value = value;
        input.name = key;

        input.addEventListener('input', (e) => {
          input.value = e.target.value;
          data = Object.assign(data, {[e.target.name]: e.target.value});
          // data = {
          //   ...data,
          //   [e.target.name]: e.target.value,
          // };
        });

        if (window.location.hash.includes('preview')) {
          input.setAttribute('disabled', true);
          discard.style['display'] = 'none';
          save.style['display'] = 'none';
        }

        label.appendChild(input);
        form.appendChild(label);
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      data.id
        ? localStorage.setItem(
            'books',
            JSON.stringify(
              booksList.map((book) => book.id === data.id ? data : book)
            )
          )
        : localStorage.setItem(
            'books',
            JSON.stringify(
              booksList = [
                ...booksList,
                Object.assign(data, {id: Math.floor(Math.random() * 100)})
              ]
            )
          );
      setTimeout(() => {
        alert('Book successfully updated');
        window.history.back();
        setTimeout(() => window.location.reload(), 100);
      }, 300);
    });

    discard.innerText = 'Discard';
    discard.type = 'button';
    discard.addEventListener('click', () => {
      const confValue = confirm('Discard changes?');
      confValue && window.history.back();
    });

    save.innerText = 'Save';
    save.type = 'submit';
    form.appendChild(discard);
    form.appendChild(save);
    form.appendChild(img);

    modal.appendChild(overlay);
    modal.appendChild(form);

    overlay.addEventListener('click', () => {
      modal.remove();
      window.history.back();
    });

    root.appendChild(modal);
  } else {
    modal.remove();
  }
};

const createListItem = (book) => {
  const listItem = document.createElement('li');
  const title = document.createElement('h2');
  const author = document.createElement('h4');
  const description = document.createElement('p');
  const img = document.createElement('img');
  const editButton = document.createElement('button');
  const listItemBody = document.createElement('div');
  const link = document.createElement('a');

  link.innerText = `Title: ${book.title}`;

  link.addEventListener('click', () => {
    selectedBook = book;
    window.history.pushState(
      selectedBook,
      'book',
      `?id=${selectedBook.id}#preview`
    );
    createModal(selectedBook);
  });

  editButton.addEventListener('click', () => {
    selectedBook = book;
    window.history.pushState(
      selectedBook,
      'book',
      `?id=${selectedBook.id}#edit`
    );
    createModal(selectedBook);
  });

  editButton.className = 'editBtn';
  listItem.className = 'listItem';
  title.className = 'title';
  author.className = 'author';
  description.className = 'plot';
  img.className = 'img';
  img.src = book.img;
  author.innerText = `Author: ${book.author}`;
  description.innerText = book.plot;
  editButton.innerText = 'Edit';

  title.appendChild(link);
  listItemBody.appendChild(title);
  listItemBody.appendChild(author);
  listItemBody.appendChild(description);
  listItemBody.appendChild(editButton);
  listItem.appendChild(img);
  listItem.appendChild(listItemBody);
  list.appendChild(listItem);
};

addButton.addEventListener('click', () => {
  selectedBook = {
    title: '',
    author: '',
    plot: '',
    img: ''
  };
  window.history.pushState(selectedBook, 'book', `#add`);
  createModal(selectedBook);
});

booksList.map(createListItem);

window.onpopstate = function (e) {
  const modal = this.document.querySelector('.modal');
  createModal(e.state);
  if (!e.state && modal) {
    modal.remove();
  }
};

const currentUrl = new URL(window.location.href);
const currentId = currentUrl.searchParams.get('id');

if (currentId) {
  createModal(booksList.find((elem) => elem.id === +currentId));
}
console.log(
  booksList.find((elem) => elem.id === +currentId),
  'from bottom'
);

root.appendChild(list);
