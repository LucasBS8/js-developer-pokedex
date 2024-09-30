function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const pokemonNumber = getQueryParam('pokemon');
console.log('Pokemon Number from URL:', pokemonNumber);

const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
console.log('URL da API do Pokémon:', pokemonUrl); 

pokeApi.getPokemonDetail({ url: pokemonUrl })
    .then(pokemon => {
        console.log('Detalhes do Pokémon retornados:', pokemon);
        const pokemonDetails = document.getElementById('pokemonDetails');
        if (pokemonDetails) {
            pokemonDetails.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>Número: #${pokemon.number}</p>
            <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
            <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
            <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
            <p>Tipo(s): ${pokemon.types.join(', ')}</p>
            <p>Atributos Base:</p>
            <ul class="base-stats">
                ${pokemon.stats.map(stat => `<li>${stat.stat}: ${stat.base_stat}</li>`).join('')}
            </ul>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        `;
        } else {
            console.error('Elemento com ID "pokemonDetails" não encontrado.');
        }
    })
    .catch(error => console.error('Erro ao carregar os detalhes do Pokémon:', error));