const currencyUrl = document.URL.toString()
const searchValue = "#id="
const positionId = currencyUrl.indexOf(searchValue) + searchValue.length
const maxId = currencyUrl.length
const pokemonIdSearch = currencyUrl.substring(positionId, maxId)

const pokemonUrlPage = `https://pokeapi.co/api/v2/pokemon/${pokemonIdSearch}/`

const headPage = document.getElementById("head")
const bodyPage = document.getElementById("body")

function pokemonDetailsToHtml(detail) {
    return `
        <header class="details__header ${detail.type} content">
            <nav class="details__header__nav">
                <a href="../../index.html">&larr;</a>
            </nav>

            <div class="details__header__info">
                <h1 class="details__header__info_name">${detail.name}</h1>
                <div class="details__header__info_abilities">
                    ${detail.types
                        .map((type) => `<span class="details__header__info_abilitie ${type}">${type}</span>`)
                        .join("")}
                </div>
                <span class="details__header__info_id">${convertPokemonToNumber(detail.number)}</span>
            </div>

            <img
                src=${detail.photo}
                alt=${detail.name}
                class="details__header__info_img"
            />
            <div class="details__header__info_footer content"></div>
        </header>
        <section id="tabsDetailsPokemon" class="details__pokemon content">
            <ul>
                <li>
                    <a href="#tabsDetailsPokemon-1"><h3>About</h3></a>
                </li>
                <li>
                    <a href="#tabsDetailsPokemon-2"><h3>Moves</h3></a>
                </li>
            </ul>

            <section id="tabsDetailsPokemon-1">
                <ul>                   
                    ${Object.entries(detail.about).map((item) => {
                        return `
                            <li class="details__pokemon__details_item">
                                <span class="details__pokemon__details_item-Label">${item[0]}</span>
                                <span class="details__pokemon__details_item-Info">${item[1]}</span>
                            </li>                       
                        `
                    }).join('')}
                </ul>
            </section>
            <section id="tabsDetailsPokemon-2">
                <ol>${detail.moves
                    .map((move, index, array) => {
                        return `
                                <li class="details__pokemon__details_item">
                                    <span class="details__pokemon__details_item-Label">${index + 1}</span>
                                    <span class="details__pokemon__details_item-Info" style="text-transform: capitalize;">${move}</span>
                                </li>
                            `
                    })
                    .join("")}
                </ol>
            </section>
        </section>
    `
}

pokeApi.getPokemonDetails(pokemonUrlPage).then((response) => {
    console.log(response)
    bodyPage.innerHTML = pokemonDetailsToHtml(response)
    document.title = `${response.name} - details`
    headPage.innerHTML += `<link id="favicon" rel="icon" href=${response.photo} type="image/x-icon">`

    $(function () {
        $("#tabsDetailsPokemon").tabs()
    })
})
