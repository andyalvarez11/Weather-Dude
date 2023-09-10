// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

// Function to fetch current weather data
async function getCurrentWeather(city) {
    try {
        const response = await fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayCurrentWeather(data);
        addToSearchHistory(city);
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

// Function to fetch 5-day forecast data
async function getForecast(city) {
    try {
        const response = await fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Date: ${new Date(data.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Function to display 5-day forecast
function displayForecast(data) {
    const forecast = document.querySelector('.forecast');
    forecast.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    for (const day of dailyData) {
        forecast.innerHTML += `
            <div class="forecast-day">
                <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
                <p>Wind Speed: ${day.wind.speed} m/s</p>
            </div>
        `;
    }
}

// Function to update search history
function addToSearchHistory(city) {
    const searchHistory = document.querySelector('.search-history');
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => {
        getCurrentWeather(city);
        getForecast(city);
    });
    searchHistory.appendChild(historyItem);
}

// Function to handle search
function handleSearch() {
    const city = document.getElementById('cityInput').value;
    getCurrentWeather(city);
    getForecast(city);
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', handleSearch);

// Initial code to load the weather dashboard
// You can add more functionality here
