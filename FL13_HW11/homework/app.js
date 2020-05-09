const data = [
  {
    folder: true,
    title: 'Pictures',
    children: [
      {
        title: 'logo.png'
      },
      {
        folder: true,
        title: 'Vacations',
        children: [
          {
            title: 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    folder: true,
    title: 'Desktop',
    children: [
      {
        folder: true,
        title: 'screenshots',
        children: null
      }
    ]
  },
  {
    folder: true,
    title: 'Downloads',
    children: [
      {
        folder: true,
        title: 'JS',
        children: null
      },
      {
        title: 'nvm-setup.exe'
      },
      {
        title: 'node.exe'
      }
    ]
  },
  {
    title: 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

// TODO: your code goes here

let isDisabled = false;
let selectedNode;
const container = document.createElement('div');
const menu = document.createElement('ul');
const customContextMenu = document.createElement('div');
const optionRename = document.createElement('div');
const optionDelete = document.createElement('div');
optionDelete.className = 'option';
optionRename.className = 'option';
customContextMenu.className = 'contextMenu';
optionRename.innerText = 'Rename';
optionDelete.innerText = 'Delete';
customContextMenu.appendChild(optionRename);
customContextMenu.appendChild(optionDelete);

optionRename.addEventListener('click', function () {
  const input = selectedNode.children[selectedNode.children.length - 1];
  console.log(selectedNode.children[selectedNode.children.length - 1]);
  input.disabled = false;
  input.select();
  console.log(input.value);
  if (/(txt|exe|png)/gi.test(input.value)) {
    input.setSelectionRange(0, input.value.length - 4);
  } else if (/jpeg/gi.test(input.value)) {
    input.setSelectionRange(0, input.value.length - 5);
  } else {
    input.setSelectionRange(0, input.value.length);
  }
});

optionDelete.addEventListener('click', function () {
  selectedNode.remove();
  console.log(selectedNode.children);
});

container.className = 'container';
menu.className = 'menu';

rootNode.appendChild(container);
container.appendChild(menu);
container.appendChild(customContextMenu);

const removeSelectedClassName = () => {
  document
    .querySelectorAll('.selected')
    .forEach((node) => node.classList.remove('selected'));
};

rootNode.addEventListener('mouseup', (e) => {
  if (e.button === 2) {
    customContextMenu.classList.add('open');
    if (e.target.className.includes('title') || e.target.type === 'text') {
      removeSelectedClassName();
      customContextMenu.classList.add('active');
      e.target.type === 'text'
        ? e.target.parentNode.classList.add('selected')
        : e.target.classList.add('selected');

      selectedNode = e.target.parentNode;
    } else {
      customContextMenu.classList.remove('active');
      removeSelectedClassName();
    }
  } else {
    customContextMenu.classList.remove('open');
    removeSelectedClassName();
    document.querySelectorAll('input').forEach((node) => {
      node.disabled = true;
    });
  }
});

window.addEventListener('click', (e) => {
  if (e.target.className !== 'menuItem') {
    customContextMenu.classList.remove('open');
  }
});

const createFolder = (parent, item) => {
  const title = document.createElement('div');
  const menuItem = document.createElement('li');
  const fileName = document.createElement('input');
  const innerMenu = document.createElement('ul');
  const icon = document.createElement('i');
  const empty = document.createElement('div');
  empty.style.fontStyle = 'italic';
  empty.innerText = 'Folder is empty';
  menuItem.className = 'menuItem';
  title.className = 'title';
  fileName.setAttribute('type', 'text');
  fileName.setAttribute('disabled', true);
  icon.className = 'material-icons';
  innerMenu.className = 'innerMenu';
  fileName.value = item.title;
  icon.innerText = 'folder';
  title.appendChild(icon);
  title.appendChild(fileName);
  menuItem.appendChild(title);
  menuItem.appendChild(innerMenu);
  parent.appendChild(menuItem);

  if (fileName.disable) {
    item.style.background = 'red';
  }

  if (item.children) {
    item.children.map((item) =>
      item.folder ? createFolder(innerMenu, item) : createFile(innerMenu, item)
    );
  } else {
    innerMenu.appendChild(empty);
  }

  title.addEventListener('click', function () {
    const menu = this.nextSibling;
    menu.style.display === 'block'
      ? menu.style.display = 'none'
      : menu.style.display = 'block';

    menu.style.display === 'block'
      ? icon.innerText = 'folder_open'
      : icon.innerText = 'folder';
  });
};

const createFile = (parent, item) => {
  const title = document.createElement('div');
  const menuItem = document.createElement('li');
  const fileName = document.createElement('input');
  const icon = document.createElement('i');
  fileName.setAttribute('disabled', true);
  menuItem.className = 'menuItem';
  icon.className = 'material-icons';
  fileName.value = item.title;
  icon.innerText = 'insert_drive_file';
  title.className = 'title';
  title.appendChild(icon);
  title.appendChild(fileName);
  parent.appendChild(title);

  title.addEventListener('mouseover', function () {
    this.style.background = 'rgb(209, 209, 209)';
  });

  title.addEventListener('mouseleave', function () {
    this.style.background = 'none';
  });
};

function getMenuItem(file) {
  file.folder ? createFolder(menu, file) : createFile(menu, file);
}

data.map(getMenuItem);

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  customContextMenu.style.left = `${e.pageX}px`;
  customContextMenu.style.top = `${e.pageY}px`;
});
