async function fetchWeather() {
    let input = document.getElementById("search").value.trim();
    const weatherdatasection = document.getElementById("weather_data");
    weatherdatasection.style.display = "block";
    const apiKey = "6f6c0b5f235fdfdeb0214960f96ee9d6";

    if (input === "") {
        weatherdatasection.innerHTML = ` 
            <div>
                <h2>Empty Input!</h2>
                <p>Please try again with a valid <u>city name</u>.</p>
            </div>
        `;
        return;
    }

    async function LonLat() {
        const countryCode = 91;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${input.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return null;
        }

        const data = await response.json();
        if (data.length === 0) {
            console.log("Something went wrong here.");
            weatherdatasection.innerHTML = `
                <div>
                    <h2>Invalid Input: "${input}"</h2>
                    <p>Please try again with a valid <u>city name</u>.</p>
                </div>
            `;
            return null;
        } else {
            return data[0];
        }
    }

    async function getWeatherData(lat, lon) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();
        weatherdatasection.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
            <div>
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
            </div>
        `;
    }

    document.getElementById("search").value = "";
    const geocodeData = await LonLat();
    if (geocodeData) {
        await getWeatherData(geocodeData.lat, geocodeData.lon);  // ✅ correct order
    }
}
