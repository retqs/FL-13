const API_URL = 'http://localhost:3000';

const container = document.querySelector('.container');

const inputFields = [
  {
    type: 'text',
    label: 'quote',
    name: 'quote',
  },
  {
    type: 'date',
    label: 'date',
    name: 'date',
  },
  {
    type: 'text',
    label: 'author',
    name: 'author',
  },
  {
    type: 'text',
    label: 'title',
    name: 'title',
  },
  {
    type: 'text',
    label: 'type',
    name: 'type',
  },
  {
    type: 'text',
    label: 'image',
    name: 'image',
  },
];

function errorMarkup(title) {
  return `
      <div class="modalForm__error">
        <h2>${title}</h2>
      </div>
      `;
}

function createModal() {
  const markup = `
          <form id="modalForm" class="modalForm">
              <fieldset class="modalForm__row">
                  <label for="desc">
                      post description
                      <textarea
                      id="desc"
                      name="desc"
                      cols="30"
                      rows="10"
                      ></textarea>
                  </label>
              </fieldset>
              <button class="modalForm__submit" id="submit" type="submit">
                  Confirm
              </button>
          </form>
        `;

  container.insertAdjacentHTML('beforeend', markup);

  return container;
}

function createFields() {
  return inputFields.map(({type, label, name}) => {
    return `
            <fieldset class="modalForm__row">
                <label for="${label}">
                ${label}
                <input
                    class="modalForm__input"
                    id="${label}"
                    type="${type}"
                    autocomplete="off"
                    name='${name}'
                />
                </label>
            </fieldset>
            `;
  });
}

function validation(value) {
  const errors = {};
  console.log(value.slice(0, 1), value);
  if (value.length <= 2) {
    errors.title = 'Title must be more than 2 characters';
  } else if (value.length >= 20) {
    errors.title = 'Title must be less than 20 characters ';
  } else if (/[$%^&*()_+|~=`@#{}\[\]";'<>\/]/gi.test(value)) {
    errors.title = "Mustn't include special characters";
  } else if (value.slice(0, 1) !== value.slice(0, 1).toUpperCase()) {
    errors.title = 'Title must start with an uppercase letter;';
  }

  return errors;
}

const handleFetch = async (value) => {
  try {
    const res = await fetch(`${API_URL}/api/create-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    const json = await res.json();

    if (res.status === 200) {
      window.location.pathname = '/index.html';
    }
  } catch (error) {
    console.log(error);
  }
};

createModal();

const form = document.getElementById('modalForm');

createFields().map((field) => form.insertAdjacentHTML('afterbegin', field));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const submit = document.getElementById('submit');
  const titleInput = document.getElementById('title').value;
  const imgInput = document.getElementById('image').value;
  const descInput = document.getElementById('desc').value;
  const authorInput = document.getElementById('author').value;
  const dateInput = document.getElementById('date').value;
  const quoteInput = document.getElementById('quote').value;
  const error = validation(titleInput);

  if (error.title) {
    form.insertAdjacentHTML('afterbegin', errorMarkup(error.title));
    submit.disabled = true;

    setTimeout(() => {
      document.querySelector('.modalForm__error').remove();
      submit.disabled = false;
    }, 2000);
  } else {
    handleFetch({
      title: titleInput,
      img: imgInput,
      description: descInput,
      author: authorInput,
      date: dateInput,
      quote: quoteInput,
    });
  }
});
