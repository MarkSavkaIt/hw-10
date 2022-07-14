import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

/*
  * Notiflix.Notify.success('Sol lucet omnibus')
  ! Notiflix.Notify.failure('Qui timide rogat docet negare')
  ? Notiflix.Notify.info('Memento te hominem esse')
*/

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function checkData(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryList.innerHTML = '';
  } else if (data.length === 1) {
    renderCountry(data);
  } else renderCountries(data);
}

function renderCountry(data) {
  let html = '';
}

function renderCountries(data) {
  let html = data
    .map(
      item =>
        `<li> <img src="${item.flags.svg}" width="30px" /> <p>${item.name.common}</p></li>`
    )
    .join('');
  countryList.innerHTML = html;
}

input.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(
      `https://restcountries.com/v3.1/name/${e.target.value}?fields=name,capital,population,flags,languages`
    )
      .then(res => res.data)
      .then(data => checkData(data))
      .catch(err => {
        Notiflix.Notify.failure(err.message);
        countryList.innerHTML = '';
      });

    // .catch(err => Notiflix.Notify.failure('Country not found!!!'));
  }, DEBOUNCE_DELAY)
);
