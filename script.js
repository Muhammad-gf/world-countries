"use strict";

// Select variables
const button = document.querySelector(".button--custom__onclick");
const forms = document.querySelector("#exampleFormControlSelect1");
const containerCountries = document.querySelector(".countries");

///////////////////////////////////////////////////////////

// Main functions
const renderCountry = function (data, className = "") {
  const html = ` 
  <article class="country ${className} ">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${
      data.name.includes(")")
        ? data.name.slice(0, data.name.indexOf(" "))
        : data.name
    }</h3>
    <h4 class="country__region">${data.region} [${data.subregion}]</h4>
    <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
      "en-US"
    ).format((data.population / 1000000).toFixed(1))} mln odam</p>
    <p class="country__row"><span>🏕</span>${new Intl.NumberFormat(
      "en-US"
    ).format(data.area)} km<sup>2</sup></p>
    <p class="country__row"><span>🏙</span>${data.capital}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    <p class="country__row"><span>🧭</span>${data.timezones[0]}</p>
    
  </div>
</article>`;
  containerCountries.insertAdjacentHTML("beforeend", html);
};

const getJSON = function (url, errorMSG = "Ooops... Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMSG} (${response.status})`);
    return response.json();
  });
};

const getCountry = async function (country) {
  try {
    const [dataCountry] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`
    );

    renderCountry(dataCountry);
    console.log(dataCountry);
    dataCountry.borders.forEach(async function (border) {
      const data = await getJSON(`https://restcountries.eu/rest/v2/alpha/${border}
      `);
      renderCountry(data, "neighbour");
    });
  } catch (err) {
    console.error(err);
  }
};
///////////////////////////////////////////////////////////

// Add all countries to dropDownList
const allCountries = async function () {
  const data = await getJSON(`https://restcountries.eu/rest/v2/all`);
  data.forEach((data) => {
    forms.insertAdjacentHTML("beforeend", `<option>${data.name}</option>`);
  });
};
allCountries();
///////////////////////////////////////////////////////////

// Render country when button  clicked
button.addEventListener("click", function () {
  const country = forms.options[forms.selectedIndex].text;
  console.log(country);
  if (country) {
    containerCountries.textContent = "";
    getCountry(country);
  }
});
console.log(`"https://t.me/MaseyevMuhammadjon" men bilan bog'laning!`);
import "core-js/stable";
import "regenerator-runtime/runtime";
