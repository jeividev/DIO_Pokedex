const pokemonMenuHtmlOl = document.getElementById("pokemonsList")
const loadMoreButton = document.getElementById("loadMoreButton")

let maxElementBody = 17

const limit = 5
let offset = 0

loadMorePokemos = (offset, limit) => {
    function pokemonToHtml(pokemon) {
        return `
            <a href="./assets/html/pokemon.html#id=${pokemon.number}" target="_self" class="pokemonDetails">
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
            </a>

        `
    }

    pokeApi.getPokemons(offset, limit)
        .then((dataJson = []) => {
            pokemonMenuHtmlOl.innerHTML += dataJson.map(pokemonToHtml).join("")
        })      
}

loadMorePokemos()

loadMoreButton.addEventListener("click", () => {
    offset += limit
    let nextElementCount = maxElementBody - offset

    loadMorePokemos(offset, nextElementCount >= limit ? limit : nextElementCount)
    if (offset + limit >= maxElementBody) {
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
})
