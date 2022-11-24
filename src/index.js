import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const coutryList = document.querySelector('.country-list');
const coutryInfo= document.querySelector('.country-info');

searchBox.addEventListener('input',debounce(onSearch,DEBOUNCE_DELAY));

const clearList = el=>(el.innerHTML = '');

function onSearch (evt) {
const name = evt.target.value.trim();
  if (!name) {
   clearList(coutryList);
   clearList(coutryInfo);
   return;
  }

  fetchCountries(name)
  .then(data => {
   console.log(data);
   if (data.length > 10) {
   Notify.info('Too many matches found. Please enter a more specific name');
    return;
       }
       renderMarkup(data);
     })
     .catch(err => {
        clearList(coutryList);
        clearList(coutryInfo);
        Notify.failure('Oops, there is no country with that name');
       });

};

const renderMarkup = data => {
  if (data.length === 1) {
    clearList(coutryList);
    const markupInfo = createInfoMarkup(data);
    coutryInfo.innerHTML = markupInfo;
  } else {
    clearList(coutryInfo);
    const markupList = createListMarkup(data);
    coutryList.innerHTML = markupList;
  }
};

const createListMarkup = data => {
  return data.map(
      ({ name, flags }) =>
        `<li class = "item" ><img src="${flags.svg}" alt="${name.official}" width="40" height="40">${name.official}</li>`,
    )
    .join('');
};

const createInfoMarkup = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.svg}" alt="${name.official}" width="40" height="40">${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );
};