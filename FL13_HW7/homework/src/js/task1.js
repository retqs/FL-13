// Your code goes here

let login = prompt('Enter your login');

function checkAuth(login) {
  let password, date;
  login === '' || login === null ? alert('Canceled') : null;
  if (login) {
    login !== '' && login.length < 4
      ? alert("I don't know any users having name length less than 4 symbols")
      : null;
    if (login === 'User' || login === 'Admin') {
      password = prompt('Enter your password');
      if (password === 'UserPass' || password === 'RootPass') {
        date = new Date().toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true
        });
        let time = date.slice(0, 2);
        alert(
          `${
            /[^am$]/g.test(date) && time > 8 ||
            /[^pm$]/g.test(date) && time < 8
              ? 'Good day,'
              : 'Good night,'
          } dear ${login}`
        );
      } else {
        alert('Wrong password');
      }
    } else {
      alert('I don’t know you');
    }
  }
}

checkAuth(login);
