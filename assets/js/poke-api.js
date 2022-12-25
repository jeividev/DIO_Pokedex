const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // pokemon.weight = (pokeDetail.weight / 10).toFixed(2).toString() + " kg"
    // pokemon.height = (pokeDetail.height / 10).toFixed(2).toString() + " cm"

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.moves = pokeDetail.moves.map((moveItem) => moveItem.move.name.replace("-", " "))
    // pokemon.abilities = pokeDetail.abilities.map((abilitiesItem) => abilitiesItem.ability.name)

    pokemon.about = {
        weight: (pokeDetail.weight / 10).toFixed(2).toString() + " kg",
        height: (pokeDetail.height / 10).toFixed(2).toString() + " cm",
        abilities: pokeDetail.abilities.map((abilitiesItem) => abilitiesItem.ability.name).join(', ')
    }

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)

        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))

        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetails = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((bodyJson) => {
            console.log(convertPokeApiDetailToPokemon(bodyJson))
            return convertPokeApiDetailToPokemon(bodyJson)
        })
}
