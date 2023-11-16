"use strict";

const countriesWrapper = document.querySelector(".countries");
const selectCountry = document.querySelector(".selectCountry");

const allCountriesName = [];
// renderCountry();

/////////////////
// Slect country
selectCountry.addEventListener("change", () => {
  //   console.log(selectCountry.value);
  const country = selectCountry.value;
  //   console.log(country);

  if (!country) return;

  countriesWrapper.innerHTML = "";
  getCountry(country);
});

function drawCountryName() {
  selectCountry.innerHTML = "";

  let optionDefault = `<option value = '' >-- Country Name --</option>`;

  ///  sort
  allCountriesName.sort();

  // allCountriesName.keys.sort();

  allCountriesName.forEach((el) => {
    optionDefault += `<option value = ${el} ${
      el === "Uzbekistan" && "selected"
    } >${el}</option>`;
  });

  selectCountry.insertAdjacentHTML("beforeend", optionDefault);
}

/// AJAX
/////////////////////////
/*
function getAllCountryName() {
  const request = new XMLHttpRequest();
  request.open("GET", "https://restcountries.com/v3.1/name/all");
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);

    data.forEach((country) => {
      allCountriesName.push(country.name.common);
    });
    drawCountryName();
  });
}
*/
/*
function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    renderCountry(data);

    const neighbor = data.borders?.[0];

    if (!neighbor) return;

    ///////////////////////////

    const requestNeighbor = new XMLHttpRequest();
    requestNeighbor.open(
      "GET",
      `https://restcountries.com/v3.1/alpha/${neighbor}`
    );
    requestNeighbor.send();

    requestNeighbor.addEventListener("load", function () {
      const [dataNeighbor] = JSON.parse(this.responseText);
      // console.log(dataNeighbor);

      renderCountry(dataNeighbor, "neighbor");
    });
  });
}
*/

function renderCountry(data, className = "") {
  const lang = Object.values(data.languages);
  const [currency] = Object.values(data.currencies);
  // console.log(currency);
  const countryHTML = `
    <div class="country ${className}">
      <img src="${data.flags.png}" alt="${data.name.official}">
      <div class="country-data">
        <h3 class="country-name">${data.name.common}</h3>
        <h4 class="country-region">${data.region}</h4>
        <p class="country-row country-population">Population: <span>${(
          data.population / 1000000
        ).toFixed(1)} mln</span></p>
        <p class="country-row country-language">Language: <span>${lang.join(
          ", "
        )}</span></p>
        <p class="country-row country-currency">Currency: <span>${
          currency.symbol
        }</span></p>
      </div>    
  `;

  countriesWrapper.insertAdjacentHTML("beforeend", countryHTML);
}
/*
getAllCountryName();
getCountry("Uzbekistan");
*/

////////////////////////////////////////////////////////
//////////// Fetch \\\\\\\\\\\\\\\\\\\

function getCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      // console.log(response);

      if (!response.ok)
        throw new Error(`Status: ${response.status} ${response.statusText}`);

      return response.json();
    })
    .then((data) => {
      console.log(data[0]);
      renderCountry(data[0]);

      const neighbor = data[0].borders?.[0];

      if (!neighbor)
        throw new Error(
          alert(`     Has no neighboring country!!!.
          Shall we give information about this country???`)
        );

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Status: ${response.status} ${response.statusText}`);

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0], "neighbor");
    })
    .catch((err) => {
      // console.log(err);
      renderCountry(err.message);
    });
}

function getAllCountriesName() {
  fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.forEach((country) => allCountriesName.push(country.name.common));

      drawCountryName();
    });
}

function renderError(msg) {
  let errorMsg = `❌ Error occurred: ${msg}. Try again!`;

  countriesWrapper.insertAdjacentHTML("beforeend", errorMsg);
}

getAllCountriesName();
getCountry("Uzbekistan");
