import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
console.log(input);
input.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(
      `https://restcountries.com/v3.1/name/${e.target.value}?fields=name,capital,population,flags,languages`
    )
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, DEBOUNCE_DELAY)
);

function checkData (data) {
  // if()
}
