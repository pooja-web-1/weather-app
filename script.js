const apiKey = "9fc379bd224404b5de67a3bc10d11e07";

async function getWeather() {
  let city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    let data = await res.json();

    console.log(data);

    if (data.cod != 200) {
      document.getElementById("weatherResult").innerHTML =
        "❌ City not found";
      return;
    }

    let icon = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("weatherResult").innerHTML = `
      <div class="card">
        <h2>${data.name}</h2>
        <img src="${iconUrl}">
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p>${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      </div>
    `;

  } catch (err) {
    console.log(err);
    alert("Network Error");
  }
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`
    );

    let data = await res.json();

    document.getElementById("cityInput").value = data.name;
    getWeather();
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}