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
            if (weatherCode == 227 || weatherCode == 230 || (weatherCode >= 317 && weatherCode <= 350) || (weatherCode >= 362 && weatherCode <= 377))
                explanationElement.textContent = "The Pokémon's primary type is Ice. The cold weather suits them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Ice. They might be a bit uncomfortable with the weather.";
            break;

        case "fighting":
            explanationElement.textContent = "The Pokémon's primary type is Fighting. They weather doesn't matter as long as they can punch someone.";
            break;

        case "poison":
            explanationElement.textContent = "The Pokémon's primary type is Poison. What does the weather even do to these creatures.";
            break;

        case "ground":
            if (weatherCode < 263)
                explanationElement.textContent = "The Pokémon's primary type is Ground. The conditions suit them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Ground. They weather will cause erosion.";
            break;

        case "flying":
            if (!(weatherCode >= 200 && weatherCode <= 230) && !(weatherCode >= 317 && weatherCode <= 350) && !(weatherCode >= 362))
                explanationElement.textContent = "The Pokémon's primary type is Flying. The conditions suit them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Flying. They might be a bit uncomfortable with the weather.";
            break;

        case "psychic":
            if (!(weatherCode == 227 || weatherCode == 230 || weatherCode == 305 || weatherCode == 308 || weatherCode == 314 || weatherCode == 320 || (weatherCode >= 329 && weatherCode <= 350) || weatherCode >= 356))
                explanationElement.textContent = "The Pokémon's primary type is Psychic. The weather is fine for them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Psychic. They weather could be distracting.";
            break;

        case "bug":
            if (weatherCode < 263)
                explanationElement.textContent = "The Pokémon's primary type is Bug. The conditions suit them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Bug. They might be a bit uncomfortable with the weather.";
            break;

        case "rock":
            if (weatherCode < 263)
                explanationElement.textContent = "The Pokémon's primary type is Rock. The conditions suit them.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Rock. They weather will cause erosion.";
            break;

        case "ghost":
            if (weatherCode == 248 || weatherCode == 260)
                explanationElement.textContent = "The Pokémon's primary type is Ghost. They're spookier in the fog.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Ghost. Nothing is special about the weather for them.";
            break;

        case "dragon":
            if (!(weatherCode == 227 || weatherCode == 230 || (weatherCode >= 317 && weatherCode <= 350) || (weatherCode >= 362 && weatherCode <= 377)))
                explanationElement.textContent = "The Pokémon's primary type is Dragon. They're fine with the weather.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Dragon. They are weak to the cold weather!";
            break;

        case "dark":
            if (weatherCode == 122)
                explanationElement.textContent = "The Pokémon's primary type is Dark. The dark sky matches their type.";
            else
                explanationElement.textContent = "The Pokémon's primary type is Dark. They weather is all the same to them.";
            break;

        case "steel":
            explanationElement.textContent = "The Pokémon's primary type is Steel. They probably don't care about the weather.";
            break;

        case "fairy":
            explanationElement.textContent = "The Pokémon's primary type is Fairy. They don't care about the weather, but they might be a bit uncomfortable with it.";
            break;
    }
}