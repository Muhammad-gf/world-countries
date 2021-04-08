"use strict";

// get elemets
const selectOption = document.querySelector(".dropdown");
const buttonSearch = document.querySelector(".button-search");
const containerCountries = document.querySelector(".container-countries");
const map = document.querySelector("#mapid");

//                              Main functions
// get Promise
const getJSON = function (url, errorMSG = "Ooops... Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMSG} (${response.status})`);
    return response.json();
  });
};

// render Country
const renderCountry = function (data, neighbour = "") {
  const HTML = `<article class = "country ${neighbour}" >
        <img class="country__img" src="${data.flag}">
        <div class="country__data">
          <h3 class="country__name">${
            data.name.includes("of")
              ? data.name.slice(0, data.name.indexOf(" "))
              : data.name.includes("Republic")
              ? data.name.slice(0, data.name.indexOf(" "))
              : data.name
          }</h2>
          <h4 class="country__region">${data.region} [${data.subregion}]</h3>
            <p class="country__row">
              <span>👫</span>
              ${new Intl.NumberFormat("en-US").format(
                (data.population / 1000000).toFixed(1)
              )} mln
            </p>
            <p class="country__row">
              <span>🏕️</span>${new Intl.NumberFormat("en-US").format(data.area)}
              km<sup>2</sup>
            </p>
            <p class="country__row">
              <span>🏙️</span>
              ${data.capital}
            </p>
            <p class="country__row">
              <span>🗣️</span>
              ${data.languages[0].name}
            </p>
            <p class="country__row">
              <span>💰</span>
              ${data.currencies[0].name}
            </p>
            <p class="country__row">
              <span>🧭</span>
              ${data.timezones[0]}
            </p>
        </div>
      </article>`;
  containerCountries.insertAdjacentHTML("beforeend", HTML);
};

// ///////////////////////////
let mymap = L.map("mapid").setView([33, 13], 6);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibXVoYW1tYWRqb24tZ2YiLCJhIjoiY2ttczRkZDk3MGUzZTJvcWdvYXZjdTl2NCJ9.A7RsD0Xl3dJg26Ey_lBazQ",
  }
).addTo(mymap);

// Get country
const getCountry = async function (country) {
  try {
    containerCountries.textContent = "";
    const [data] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    renderCountry(data);
    if (data.borders.length) {
      data.borders.forEach(async function (element) {
        const data = await getJSON(
          `https://restcountries.eu/rest/v2/alpha/${element}`
        );
        renderCountry(data, "neighbour");
      });
    }

    // Render Leaflet Map
    mymap.setView(data.latlng, 6);
    L.marker(data.latlng).addTo(mymap);
  } catch (err) {
    console.error(err);
  }
};

///////////////////////////////////////////
//                       Render All Countries To Select-Option And To Search-Menu

(async function () {
  try {
    const data = await getJSON("https://restcountries.eu/rest/v2/all");
    data.forEach((data) => {
      selectOption.insertAdjacentHTML(
        "beforeend",
        `<option>${
          data.name.includes("of)")
            ? data.name.slice(0, data.name.indexOf(" "))
            : data.name.includes("Republic")
            ? data.name.slice(0, data.name.indexOf(" "))
            : data.name
        }</option>`
      );
    });

    // render to search menu
    data.forEach((data) => {
      searchMenu.insertAdjacentHTML(
        "beforeend",
        `<li>${
          data.name.includes("of)")
            ? data.name.slice(0, data.name.indexOf(" "))
            : data.name.includes("Republic")
            ? data.name.slice(0, data.name.indexOf(" "))
            : data.name
        }</li>`
      );
    });
  } catch (err) {
    console.error(err);
  }
})();

//

//                      Render Country When Button clicked
buttonSearch.addEventListener("click", async function (e) {
  e.preventDefault();
  getCountry(selectOption.value);
});

import "core-js/stable";
import "regenerator-runtime/runtime";
