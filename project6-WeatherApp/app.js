const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeather();
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  if (!city) return;

  weatherResult.innerHTML = "Searching...";

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      weatherResult.innerHTML = "City not found!";
      return;
    }

    const location = geoData.results[0];
    const lat = location.latitude;
    const lon = location.longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const wind = weatherData.current.windspeed_10m;
    const time = weatherData.current.time;

    weatherResult.innerHTML = `
      <h2>${location.name}</h2>
      <p>${new Date(time).toLocaleTimeString()}</p>
      <p>${temp}°</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} km/h</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "Unable to load weather. Please try again.";
  }
}
