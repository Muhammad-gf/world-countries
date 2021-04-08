"use strict";

const searchBtn = document.querySelector(".search-btn");
const searchTxt = document.querySelector(".search-txt");
const searchBox = document.querySelector(".search-box");
const dropDown = document.querySelector(".dropdown");
const searchMenu = document.querySelector(".searchMenu");

// DOM monipulation tanslate effect
searchBox.addEventListener("click", function (e) {
  e.preventDefault();
  searchBtn.style.color = "white";
  searchBtn.style.backgroundColor = "#6b5b95";
  searchBtn.style.fontSize = "1em";
  searchTxt.style.width = "90%";
  searchBox.style.width = "100%";
  dropDown.style.display = "none";
  searchMenu.style.display = "block";
});

window.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.path.includes(searchBox)) {
    searchBtn.style.color = "#6b5b95";
    searchBtn.style.backgroundColor = "transparent";
    searchBtn.style.fontSize = "1.4em";
    searchTxt.style.width = "0";
    searchBox.style.width = "24px";
    dropDown.style.display = "inline-block";
    searchMenu.style.display = "none";
  }
});

// Search function for search menu
const searchNameFunction = function () {
  const input = searchTxt.value.toUpperCase();
  const li = searchMenu.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    if (li[i].innerHTML.toUpperCase().includes(input)) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};

searchMenu.addEventListener("click", function (e) {
  selectOption.value = e.path[0].innerHTML;
  searchTxt.value = e.path[0].innerHTML;
});
