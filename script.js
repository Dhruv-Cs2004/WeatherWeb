const apiKey = "9d8e1a2ac634b4a74d12ddc54e4113b1";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorText = document.getElementById("error");
const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");

let isCelsius = true;


const iconMap = {
  "01d": "https://cdn-icons-png.flaticon.com/512/869/869869.png", // sun
  "01n": "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // moon
  "02d": "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // partly cloudy day
  "02n": "https://cdn-icons-png.flaticon.com/512/1163/1163657.png", // partly cloudy night
  "03d": "https://cdn-icons-png.flaticon.com/512/1163/1163634.png", // cloudy
  "03n": "https://cdn-icons-png.flaticon.com/512/1163/1163634.png",
  "04d": "https://cdn-icons-png.flaticon.com/512/414/414825.png", // overcast
  "04n": "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  "09d": "https://cdn-icons-png.flaticon.com/512/1163/1163652.png", // showers
  "09n": "https://cdn-icons-png.flaticon.com/512/1163/1163652.png",
  "10d": "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // rain
  "10n": "https://cdn-icons-png.flaticon.com/512/1163/1163649.png",
  "11d": "https://cdn-icons-png.flaticon.com/512/1146/1146869.png", // thunderstorm
  "11n": "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  "13d": "https://cdn-icons-png.flaticon.com/512/642/642102.png", // snow
  "13n": "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  "50d": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", // mist
  "50n": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
};

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") getWeather();
});

unitToggle.addEventListener("click", () => {
  isCelsius = !isCelsius;
  getWeather();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return showError("Please enter a city name.");

  errorText.textContent = "";
  weatherResult.classList.remove("visible");
  weatherResult.innerHTML = "";

  const unit = isCelsius ? "metric" : "imperial";
  const unitLabel = isCelsius ? "°C" : "°F";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = iconMap[iconCode] || "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; 

    weatherResult.innerHTML = `
      <div class="location">
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon" />
      </div>
      <div class="temperature">
        <span>${data.main.temp}${unitLabel}</span>
        <p>${data.weather[0].description}</p>
      </div>
      <div class="extras">
        <div class="card">
          <span>💧</span>
          <p>Humidity</p>
          <h4>${data.main.humidity}%</h4>
        </div>
        <div class="card">
          <span>💨</span>
          <p>Wind</p>
          <h4>${data.wind.speed} ${isCelsius ? "m/s" : "mph"}</h4>
        </div>
      </div>
    `;

    weatherResult.classList.add("visible");
  } catch (err) {
    showError("City not found. Try another.");
  }
}

function showError(message) {
  errorText.textContent = message;
  weatherResult.innerHTML = "";
}
