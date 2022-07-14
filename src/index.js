import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

/*
  * Notiflix.Notify.success('Sol lucet omnibus')
  ! Notiflix.Notify.failure('Qui timide rogat docet negare')
  ? Notiflix.Notify.warning('Memento te hominem esse')
*/

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
      .then(checkData)
      .catch(() => Notiflix.Notify.failure('Country not found!!!'));
  }, DEBOUNCE_DELAY)
);

function checkData(data) {
  if (data.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    renderCountry();
  } else renderCountries();
}

function renderCountry() {}

function renderCountries() {}
