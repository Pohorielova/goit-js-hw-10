import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
/*1)HTTP-запросы

Используй публичный API Rest Countries, а именно ресурс name,
возвращающий массив объектов
стран удовлетворивших критерий поиска. Добавь минимальное оформление
элементов интерфейса.

Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс
name и возвращает
 промис с массивом стран - результатом запроса. Вынеси её в отдельный
 файл fetchCountries.js и сделай именованный экспорт.*/

 const searchBox = document.querySelector('#search-box');
 const coutryList = document.querySelector('.country-list');
 const coutryInfo= document.querySelector('.country-info');

 searchBox.addEventListener('input',debounce(onSearch,DEBOUNCE_DELAY));

const clearList = el=>(el.innerHTML = '');


function onSearch(e) {
const name = e.target.value.trim();
  if (!name) {
   clearList(coutryList);
   clearList(coutryInfo);
   return;
  }

  fetchCountries(name)
  .then(el => {
    console.log(data);
    if (el.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name');
      return;
    }
    renderMarkup(el);
  })
  .catch(err => {
    clearList(coutryList);
   clearList(coutryInfo);
    Notify.failure('Oops, there is no country with that name');
  });

};

// function fetchCountries() {
//   // loadMoreBtn.disable();
//   countriesApiService.fetchArticles().then(countries => {
//     // appendCountriesMarkup(countries);
//     // loadMoreBtn.enable();
//     console.log(countries);
//   });
// }

// function appendCountriesMarkup(articles) {
//   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

// function clearCountriesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }