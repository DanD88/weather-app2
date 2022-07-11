const input_text = document.querySelector(".input_text");
input_text.addEventListener("keypress", setQuery);

// const input = document.querySelector('.input_text');
const main = document.querySelector(".name");
const country = document.querySelector(".country");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const iconElement = document.querySelector(".weather-icon");

// const button= document.querySelector('.submit');

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(input_text.value);
  }
}

function getResults(query) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=71da661a0a2dc1b4bb6ffd6ce390734e`
  )
    .then((response) => response.json())
    .then((data) => {
      const tempValue = data["main"]["temp"];
      const nameValue = data["name"];
      const descValue = data["weather"][0]["description"];
      const iconId = data["weather"][0]["icon"];
      const countryValue = data.sys.country;

      let now = new Date();
      let date = document.querySelector(".location .date");
      date.innerText = dateBuilder(now);

      main.innerHTML = nameValue;
      country.innerHTML = countryValue;
      desc.innerHTML = descValue;
      temp.innerHTML = tempValue + " &#8457";
      //input.value ="";
      iconElement.innerHTML = `<img src="icons/${iconId}.png"/>`;
      console.log(data);
    })

    .catch((err) => alert("Wrong city name!"));
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
