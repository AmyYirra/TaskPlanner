
// Set appId
const appId = "e859087dd9b104fe708d0f632e8e4b21";

// getDataForCity function that fetches weather info from openweathermap api
const getDataForCity = (city) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // get the data we need for our html from the response
      const name = data.name;
      const emoji = emojis[data.weather[0].icon];
      const temp = Math.round(data.main.temp);
      const feelsLike = Math.round(data.main.feels_like);
      const description = data.weather[0].description;

      // create the card html
      const cardHtml = createCardHtml(
        name,
        emoji,
        temp,
        feelsLike,
        description
      );

      // render!
      weatherContainer.innerHTML = cardHtml;
    })
    .catch((error) => {

      weatherContainer.innerHTML = "City not found";
      // weatherContainer.innerHTML = `<em>Server returned error: "${error.message}".</em>`;
    });

// createCardHtml function used to render the weather info
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  

   <p> ${name} ${emoji} ${description} ${temp}&#8451 , feels like ${feelsLike}&#8451</p>

    
  
`;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
  "01d": "☀️",
  "02d": "⛅️",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "⛈",
  "13d": "❄️",
  "50d": "💨",
  "01n": "☀️",
  "02n": "⛅️",
  "03n": "☁️",
  "04n": "☁️",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "⛈",
  "13n": "❄️",
  "50n": "💨",
};

// selecting all the things needed
const goButton = document.querySelector("#go-button");
const cityInput = document.querySelector("#city-input");
const weatherContainer = document.querySelector("#weather-container");

// event listener for a click event on the "Go!" button
goButton.addEventListener("click", (e) => {
  // get the city from the input field
  const city = cityInput.value;
  // alert();
  // get the weather data for the city
  getDataForCity(city);

});

