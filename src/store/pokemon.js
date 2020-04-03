const path = 'https://pokeapi.co/api/v2/';
const axios = require('axios');

export default {
  state: {
    generation: {},
    pokemon: {},
  },
  getters: {
    getGeneration: (state) => state.generation,
    getPokemon: (state) => state.pokemon,
  },
  actions: {
    Generation({ commit }, generation) {
      return new Promise((resolve, reject) => {
        axios.get(`${path}generation/${generation}`)
          .then((res) => {
            commit('setGeneration', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    Pokemon({ commit }, pokemon) {
      return new Promise((resolve, reject) => {
        axios.get(`${path}pokemon/${pokemon}`)
          .then((res) => {
            commit('setPokemon', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    setGeneration(state, generation) {
      state.generation = generation;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
  },
};
