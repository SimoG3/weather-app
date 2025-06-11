const choosenLocation = document.getElementById("choosenLocation");
const weatherResult = document.getElementById("weatherResult");


//take location return weather

async function getWeather(query) {
    try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?key=2PAFL2H3LXD8B4X42HJEXYLYV`, { mode: 'cors'});
    const locationWeather = await response.json();
    const weather = locationWeather.description;

    return weather;

    } catch(error) {
        console.log(error);
        weatherResult.innerText = "Could not retreive Location's weather.";
    }
    
}


async function displayWeather(location) {
    const weather = await getWeather(location);
    weatherResult.innerText = weather;
}


choosenLocation.addEventListener('keydown', (e) => {
    if(e.key ==='Enter') {
        const location = choosenLocation.value.trim();
        displayWeather(location);
    }
})
