const h5 = document.querySelector('h5');
const h6 = document.querySelector('h6');

console.log('test git');
const searchSubmit = document.querySelector('.searchSubmit');
const searchBar = document.querySelector('.searchBar');

searchSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  h5.innerHTML = 'Loading...';
  h6.innerHTML = '';
  fetch('http://localhost:3000/weather?address=' + searchBar.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          h5.innerHTML = data.error;
          h6.innerHTML = '';
        } else {
          h5.innerHTML = data.forecast;
          h6.innerHTML = data.location;
        }
      });
    }
  );
});
