// Free API key that I'm not gonna bother making private.
// It's limited to 100 uses per month, so if it stops working, that's why.
const weatherstackAPIKey = "e32aa1d771c6e7f113462f45e8fd25d0"

const weatherButton = document.getElementById("weather-button");
weatherButton.addEventListener("click", getWeatherCode());

const pokemonButton = document.getElementById("pokemon-button");
pokemonButton.addEventListener("click", getPokemonType());

const weatherElement = document.getElementById("weather-result");
const pokemonElement = document.getElementById("pokemon-result");
const explanationElement = document.getElementById("explanation");

let weatherCode = 0;
let pokemonType = "";

async function getWeatherCode() {
    try {
        const city = document.getElementById("weather-input").value.toLowerCase();
        const response = await fetch(`https://api.apilayer.net/weatherstack/current?access_key=${weatherstackAPIKey}&query=${city}`);
        const data = await response.json();

        weatherCode = data.current.weather_code;
        weatherElement.textContent = `Weather in ${city}: ${data.current.weather_descriptions[0]}`;
        if (weatherCode != 0 && pokemonType != "")
            makeExplanation();
    } catch {
        weatherElement.textContent = `${city} not found`;
    }
}

async function getPokemonType() {
    try {
        const pokemon = document.getElementById("pokemon-input").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();

        pokemonType = data.types[0].type.name;
        pokemonElement.textContent = `${pokemon}'s primary type is ${pokemonType}`;
        if (weatherCode != 0 && pokemonType != "")
            makeExplanation();
    } catch {
        pokemonElement.textContent = `${pokemon} not found`;
    }
}

function makeExplanation() {
    switch (pokemonType) {
        case "normal":
            if (weatherCode == 113 || weatherCode == 116 || weatherCode == 119)
                explanationElement.textContent = "The Pokémon's primary type is Normal. They'd be fine with the pretty normal-looking weather.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Normal. They might be a bit uncomfortable with the weather.";
            break;

        case "fire":
            if (weatherCode == 113)
                explanationElement.textContent = "The Pokémon's primary type is Fire. The sun is best for them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Fire. They might be a bit uncomfortable with the weather.";
            break;

        case "water":
            if ((weatherCode >= 263 && weatherCode <= 314) || (weatherCode >= 353 && weatherCode <= 359))
                explanationElement.textContent = "The Pokémon's primary type is Water. The rain is best for them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Water. They might be a bit uncomfortable with the weather.";
            break;

        case "grass":
            if (weatherCode == 113 || (weatherCode >= 263 && weatherCode <= 314) || (weatherCode >= 353 && weatherCode <= 359))
                explanationElement.textContent = "The Pokémon's primary type is Grass. The sun and rain are best for them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Grass. They might be a bit uncomfortable with the weather.";
            break;

        case "electric":
            if (weatherCode >= 386)
                explanationElement.textContent = "The Pokémon's primary type is Electric. The storm suits them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Electric. They might be a bit uncomfortable with the weather.";
            break;

        case "ice":
            if (weatherCode >= 386)
                explanationElement.textContent = "The Pokémon's primary type is Electric. The storm suits them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Electric. They might be a bit uncomfortable with the weather.";
            break;

        case "fighting":
            break;

        case "poison":
            break;

        case "ground":
            break;

        case "flying":
            break;

        case "psychic":
            break;

        case "bug":
            break;

        case "rock":
            break;

        case "ghost":
            break;

        case "dragon":
            break;

        case "dark":
            break;

        case "steel":
            explanationElement.textContent = "The Pokémon's primary type is Steel. They probably don't care about the weather.";
            break;

        case "fairy":
            break;
    }
}