const API_URL = 'http://localhost:3000';

// /api/list
// /api/list/:id
// /api/create-article

const content = document.querySelector('.content');

function createListItem({author, date, description, img, title, quote}) {
  return `
  <li class="list__item">
      <h2>Author: <span>${author}</span></h2>
      <h2>Date: <span>${date}</span></h2>
      <h2>Title: <span>${title}</span></h2>
      <div class='list__item--img'>Image:
        <img src='${img}' alt='randomImage'/>
      </div>
      <h2>Author: <span>${description}</span></h2>
      <blockquote class='list__item--quote'>
        "${quote}"
      </blockquote>
  </li>
  `;
}

async function getList() {
  try {
    const res = await fetch(`${API_URL}/api/list`);
    const data = await res.json();

    if (data.length < 1) {
      const h2 = document.createElement('h2');
      h2.textContent = 'Empty';
      content.appendChild(h2);
    } else {
      const ul = document.createElement('ul');
      ul.className = 'list';
      data.map((value) => {
        ul.insertAdjacentHTML('afterbegin', createListItem(value));
      });
      content.appendChild(ul);
    }
  } catch (error) {
    console.log(error);
  }
}

getList();
