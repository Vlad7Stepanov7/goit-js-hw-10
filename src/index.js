
import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import { listCountriesMarkup, infoCountryMarkup } from './markup.Countries';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require(`lodash.debounce`);

const DEBOUNCE_DELAY = 300;



refs.countryInput.addEventListener(`input`, debounce(onFetchCountries, DEBOUNCE_DELAY));

function onFetchCountries(evt) {
    const nameCountry = evt.target.value.trim();
    
   clearCountries()

    if (nameCountry === ``) {
       return
    }
    
   
     fetchCountries(nameCountry)
         .then(countries => {
            
             if (countries === undefined) {
                 return Notify.failure("Oops, there is no country with that name");

             } else if (countries.length > 10) {
                 return Notify.info("Too many matches found. Please enter a more specific name.");    

             } else if (countries.length === 1) {
                
                 return infoCountryMarkup(countries);
             }

            return listCountriesMarkup(countries);
         }).catch(error => console.log(error)); 
               
}

function clearCountries() {
 refs.countryList.innerHTML = ``;
    refs.countryInfo.innerHTML = ``;
}