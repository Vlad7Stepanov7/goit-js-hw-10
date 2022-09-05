import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import fetchCountries from "./fetchCountries";
const debounce = require(`lodash.debounce`);

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInput: document.querySelector('#search-box'),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
};

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .catch(error => console.log(error));       
}



refs.countryInput.addEventListener(`input`, debounce(onFetchCountries, 300));

function onFetchCountries(evt) {
    const nameCountry = evt.target.value.trim();
    
    refs.countryList.innerHTML = ``;
    refs.countryInfo.innerHTML = ``;

    if (nameCountry === ``) {
       return
    }
    
     fetchCountries(nameCountry)
         .then(countries => {
             
             if (countries.length > 10) {
                 return console.log("Too many matches found. Please enter a more specific name.");    

             } else if (countries.length === 1) {
                 return infoCountryMarkup(countries);
             }

             console.log(countries);

            return listCountriesMarkup(countries);
         });
}

function listCountriesMarkup(countries) {
    
    const markupCountries = countries.map(country => {
        const { name, flags} = country;

     return`<li>
     <img src="${flags.svg}" width="20" height="20" />
     <p>${name.common}</p>
     </li>`
    }).join(``);

    return refs.countryList.insertAdjacentHTML(`beforeend`, markupCountries);
}

function infoCountryMarkup(country) {
    
    const markupCountry = country.map(country => {
        const { name, flags, capital, population, languages } = country;

     return`<li>
     <img src="${flags.svg}" width="20" height="20" />
     <p>${name.official}</p>
     <p>Capital: ${capital}</p>
     <p>Population: ${population}</p>
     <p>languages: ${languages}</p>
     </li>`
    }).join(``);

    return refs.countryInfo.insertAdjacentHTML(`beforeend`, markupCountry);
}
