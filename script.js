// ================= TIME =================
function updateTime() {
    const now = new Date();
    document.getElementById("time").textContent =
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").textContent =
        now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
}
setInterval(updateTime, 1000);
updateTime();

// ================= COUNTRY NAME =================
function getCountryName(code) {
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
    } catch {
        return code;
    }
}

// ================= WEATHER =================
const input = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");
const footer = document.getElementById("footer");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        fetchWeather(input.value.trim());
    }
});

function fetchWeather(city) {
    if (!city) {
        weatherDiv.innerHTML = `<p style="color:red">⚠️ Please enter a city</p>`;
        return;
    }

    weatherDiv.innerHTML = "Loading...";
    footer.innerHTML = "";

    const API_KEY = "YOUR_API_KEY";

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                weatherDiv.innerHTML = `<p style="color:red">❌ ${data.message}</p>`;
                return;
            }

            weatherDiv.innerHTML = `
        <h3>${data.name}, ${getCountryName(data.sys.country)}</h3>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="feels">Feels like ${Math.round(data.main.feels_like)}°C</div>
      `;

            footer.innerHTML = `
        Developed by <strong>Md. Ridwan Rahman Radhi</strong><br>
        Team: <strong>RRR</strong>
      `;
        })
        .catch(() => {
            weatherDiv.innerHTML = "<p style='color:red'>API Failed</p>";
        });
}

// DEFAULT LOAD
fetchWeather("Dhaka");

function goToBD() {
    window.location.href = "https://bd-weather-free.vercel.app/";
}