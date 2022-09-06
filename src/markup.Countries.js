import { refs } from "./refs";

export function listCountriesMarkup(countries) {
    
    const markupCountries = countries.map(country => {
        const { name, flags} = country;

     return`<li class="country-list__item">
     <img src="${flags.svg}" width="20" height="20" />
     <p class="country-list__name">${name.common}</p>
     </li>`
    }).join(``);

    return refs.countryList.insertAdjacentHTML(`beforeend`, markupCountries);
}

export function infoCountryMarkup(country) {
    
    const markupCountry = country.map(country => {
        const { name, flags, capital, population, languages } = country;

        const languagesOfCountry = Object.values(languages).join(`, `);
        
        return`
     <div class="country-info__container">
     <img src="${flags.svg}" width="20" height="20" />
     <p class="country-info__name"><b>${name.official}</b></p>
     </div>
     <p class="country-info__text"><b>Capital:</b> ${capital}</p>
     <p class="country-info__text"><b>Population:</b> ${population}</p>
     <p class="country-info__text"><b>languages:</b> ${languagesOfCountry}</p>`
    }).join(``);

    return refs.countryInfo.insertAdjacentHTML(`beforeend`, markupCountry);
}