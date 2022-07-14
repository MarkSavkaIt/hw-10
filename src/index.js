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
    clearHtml();
  } else if (data.length === 1) {
    renderCountry(data[0]);
  } else renderCountries(data);
}

function renderCountry(data) {
  console.log('data from render on country', data);
  let html = `<div>
    <img src="${data.flags.svg}" width="30px" />
    <p>Capital : ${data.capital}</p>
    <p>Population : ${data.population}</p>
    <p>Languages : ${Object.values(data.languages).join(', ')}</p>
    
    
  </div>`;
  clearHtml();
  countryInfo.innerHTML = html;
}

function renderCountries(data) {
  let html = data
    .map(
      item =>
        `<li> <img src="${item.flags.svg}" width="30px" /> <p>${item.name.common}</p></li>`
    )
    .join('');
  clearHtml();
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
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearHtml();
      });
  }, DEBOUNCE_DELAY)
);

function clearHtml() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
