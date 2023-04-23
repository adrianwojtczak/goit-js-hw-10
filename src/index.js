import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(async ev => {
    const countries = await fetchCountries(ev.target.value.trim());
    if (!countries) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }

    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length > 1 && countries.length <= 10) {
      countryList.innerHTML = countries
        .map(
          country =>
            `<li><img height=16 src=${country.flags.svg}> ${country.name.common}</li>`
        )
        .join('');
    } else {
      countryList.innerHTML = '';
    }

    if (countries.length === 1) {
      countryInfo.innerHTML = countries
        .map(
          country =>
            `<p><img height=24 src=${country.flags.svg}> ${
              country.name.common
            }</p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(', ')}</p>`
        )
        .join('');
    } else {
      countryInfo.innerHTML = '';
    }

    console.log(countries);
  }, DEBOUNCE_DELAY)
);
