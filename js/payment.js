"use strict";

const selectSeanse = JSON.parse(localStorage.selectSeanse);

// We form a line with the selected places and calculate the total amount
let places = "";
let price = 0;

for (const { row, place, type } of selectSeanse.salesPlaces) {
  if (places !== "") {
    places += ", ";
  }
  places += `${row}/${place}`;
  price += type === "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);
}

document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName; // movie title
document.querySelector(".ticket__chairs").innerHTML = places; // chairs
document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName; // hall name
document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime; // session start
document.querySelector(".ticket__cost").innerHTML = price; // price

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");

document.querySelector(".acceptin-button").addEventListener("click", (event) => {
  event.preventDefault();
  //  fetch("http://f0769682.xsph.ru/", {
  fetch("https://jscp-diplom.netoserver.ru/", {
    method: "POST",
    body: `event=sale_add&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}&hallConfiguration=${reserveHall}`,
  });
});

const onReserveButtonClick = (evt) => {
  evt.preventDefault();
  window.localStorage.setItem('ticketId', Date.now());
  sendReserveToServer();
  window.location.href = './ticket.html';
}

makeTicketDescription();
reserveButton.addEventListener('click', onReserveButtonClick);
