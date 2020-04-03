const path = 'https://pokeapi.co/api/v2/';
const axios = require('axios');

export function getPokemon(pokemonId) {
  return new Promise((resolve, reject) => {
    axios.get(`${path}pokemon/${pokemonId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
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
