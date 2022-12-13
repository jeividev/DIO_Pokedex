function pokemonToHtml(pokemon, index, array) {
    function convertPokemonIdToPattern(id) {
        const padraoId = "000"
        return "#" + padraoId.substring(0, padraoId.length - id.toString().length) + id.toString()
    }

    function convertPokemonTypesToLi(pokemonTypes) {
        return pokemonTypes.map((typeSolt) => `<li class="type"> ${typeSolt.type.name}</li>`)
    }

    return `
        <li class="pokemon">
            <span class="number">${convertPokemonIdToPattern(pokemon.id)}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join(" ")}
                </ol>

                <img
                    src=${pokemon.sprites.other.dream_world.front_default}
                    alt="${pokemon.name}"
                />
            </div>
        </li>
    `
}

const pokemonMenuHtmlOl = document.getElementById("pokemonsList")

pokeApi.getPokemons().then((dataJson = []) => {
    pokemonMenuHtmlOl.innerHTML += dataJson.map(pokemonToHtml).join("")
})
