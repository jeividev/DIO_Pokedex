const pokemonMenuHtmlOl = document.getElementById("pokemonsList")
const loadMoreButton = document.getElementById("loadMoreButton")

const limit = 5
let offset = 0

loadMorePokemos = (offset, limit) => {
    function pokemonToHtml(pokemon) {
        function convertPokemonToNumber(id) {
            const padraoId = "000"
            return "#" + padraoId.substring(0, padraoId.length - id.toString().length) + id.toString()
        }

        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${convertPokemonToNumber(pokemon.number)}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join(" ")}
                    </ol>
    
                    <img
                        src=${pokemon.photo}
                        alt="${pokemon.name}"
                    />
                </div>
            </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((dataJson = []) => {
        console.log(dataJson)
        pokemonMenuHtmlOl.innerHTML += dataJson.map(pokemonToHtml).join("")
    })
}

loadMorePokemos()

loadMoreButton.addEventListener('click', () =>{
    offset += limit
    loadMorePokemos(offset, limit)


})
