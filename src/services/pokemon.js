const path = 'https://pokeapi.co/api/v2/';
const axios = require('axios');

// eslint-disable-next-line import/prefer-default-export
export function getPokemonAbilities(pokemonId) {
  return new Promise((resolve, reject) => {
    axios.get(`${path}ability/${pokemonId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
