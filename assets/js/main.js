function pokemonToHtml(pokemon, index, array) {
    function convertPokemonToNumber(id) {
        const padraoId = "000"
        return "#" + padraoId.substring(0, padraoId.length - id.toString().length) + id.toString()
    }

    return `
        <li class="pokemon">
            <span class="number">${convertPokemonToNumber(pokemon.number)}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type"> ${type}</li>`).join(" ")}
                </ol>

                <img
                    src=${pokemon.photo}
                    alt="${pokemon.name}"
                />
            </div>
        </li>
    `
}

const pokemonMenuHtmlOl = document.getElementById("pokemonsList")

pokeApi.getPokemons().then((dataJson = []) => {
    console.log(dataJson)
    pokemonMenuHtmlOl.innerHTML += dataJson.map(pokemonToHtml).join("")
})
