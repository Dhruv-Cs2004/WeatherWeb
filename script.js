const apiKey = "9d8e1a2ac634b4a74d12ddc54e4113b1"

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorText = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    return showError("Please enter a city name.");
  }


  errorText.textContent = "";
  weatherResult.classList.remove("visible");
  weatherResult.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${iconUrl}" alt="Weather icon" />
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
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
