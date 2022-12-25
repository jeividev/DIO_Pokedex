class Pokemon {
    number
    name
    type
    types = []
    photo
}

function convertPokemonToNumber(id) {
    const padraoId = "000"
    return "#" + padraoId.substring(0, padraoId.length - id.toString().length) + id.toString()
}