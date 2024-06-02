function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

document.getElementById('bubu').addEventListener('click', function(event) {
    event.preventDefault();
    toggleTheme();
});

applySavedTheme();




async function fetchWeather() {
    try {
        const city = 'Irkutsk';
        const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data, city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('location').textContent = 'Unable to load weather data';
    }
}

function displayWeather(data, city) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');

    locationElement.textContent = city;
    temperatureElement.textContent = data.temperature;
    descriptionElement.textContent = data.description;

    const iconMap = {
        'Sunny': '☀️',
        'Clear': '☀️',
        'Partly cloudy': '🌤️',
        'Cloudy': '☁️',
        'Overcast': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️'
    };
    const icon = iconMap[data.description] || '❓';
    iconElement.textContent = icon;
}

fetchWeather();

