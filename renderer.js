document.getElementById('pokemonId').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const pokemonId = document.getElementById('pokemonId').value.trim();
        if (!pokemonId || isNaN(pokemonId) || parseInt(pokemonId) < 1 || parseInt(pokemonId) > 1025) {
            mostrarError('Por favor, introduce un ID válido entre 1 y 1025.');
        } else {
            buscarPokemon(parseInt(pokemonId));
        }
    }
});

function buscarPokemon(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo encontrar el Pokémon. Por favor, introduce un ID válido.');
            }
            return response.json();
        })
        .then(data => {
            const pesoKg = data.weight / 10;
            const alturaM = data.height / 10;
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
              <H2>${data.name.toUpperCase()}</H2>
              <p><strong>Peso:</strong> ${pesoKg} Kg</p>
              <p><strong>Altura:</strong> ${alturaM} m</p>
              <p><strong>Tipos:</strong> ${data.types[0].type.name} ${data.types[1] ? `y ${data.types[1].type.name}` : ''}</p>
              <H3>Estadísticas Base</H3>
              <ul>
                ${data.stats.map(stat => `<li><strong>${stat.stat.name} :</strong>${stat.base_stat}</li>`).join('')}
              </ul>
              <H3>Imagen</H3>
              <img src="${data.sprites.other.home.front_default}" alt="Imagen frontal">
              <img src="${data.sprites.other.home.front_shiny}" alt="Imagen trasera">
            `;
          })
        .catch(error => {
            console.error('Error al buscar el Pokémon:', error);
            mostrarError(error.message);
        });
}

function mostrarError(errorMessage) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p style="font-size: 20px; color: red;">${errorMessage}</p>`;
}
