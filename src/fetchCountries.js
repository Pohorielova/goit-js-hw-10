
export default function fetchCountries(name){

  return fetch(`https://restcountries.com/v3.1/name/${name}/?fields=name.official,capital,population,flags.svg,languages/`)
    .then(response => {
      if (response.status === 404) {
        return Promise.reject(new Error());
      }
      response.json()})
    // .then(({ countries }) => {
    //   // this.incrementPage();
    //   return countries ;
    
};


// export default class CountriesApiService {
//   constructor() {
//   //   this.searchQuery = '';
//   //   this.page = 1;
//   }

//   fetchCountries() {

//     return fetch(`https://restcountries.com/v3.1/name/${name}`)
//       .then(response => response.json())
//       .then(({ countries }) => {
//         // this.incrementPage();
//         console.log(countries) ;
//       });
//   }

  // incrementPage() {
  //   this.page += 1;
  // }

  // resetPage() {
  //   this.page = 1;
  // }

  // get query() {
  //   return this.searchQuery;
  // }

  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }
// }

