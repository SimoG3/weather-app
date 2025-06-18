const choosenLocation = document.getElementById("choosenLocation");
const weatherResult = document.getElementById("weatherResult");


//take location return weather

async function getWeather(query) {
    try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?key=2PAFL2H3LXD8B4X42HJEXYLYV`, { mode: 'cors'});
    const locationWeather = await response.json();

    const adress = locationWeather.address;
    const description = locationWeather.description;
    const condition = locationWeather.days[0].conditions;
    const tempF = locationWeather.days[0].temp;

    const tempC = ((tempF -32) * 5/9 ).toFixed(2);
    
    return [adress, condition, description, tempC];

    } catch(error) {
        console.log(error);
        weatherResult.innerText = "Could not retreive Location's weather.";
    }
    
}


async function displayWeather(location) {
    const weather = await getWeather(location);

    weatherResult.innerHTML = `
        <h1>Weather in ${weather[0]}</h1>
        <br>
        <h2>Condition : ${weather[1]}</h2>
        <br>
        <h2>Description : ${weather[2]}</h2>
        <br>
        <h2>Temperature : ${ weather[3]}</h2>
    `;
}


choosenLocation.addEventListener('keydown', (e) => {
    if(e.key ==='Enter') {
        const location = choosenLocation.value.trim();
        displayWeather(location);
    }
})
