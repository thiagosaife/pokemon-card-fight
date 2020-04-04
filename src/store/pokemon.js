const path = 'https://pokeapi.co/api/v2/';
const axios = require('axios');

export default {
  state: {
    pokeList1: [],
    pokemon: {},
  },
  getters: {
    PokeList1: (state) => state.pokeList1,
  },
  actions: {
    Pokemon({ commit }, pokemon) {
      return new Promise((resolve, reject) => {
        axios.get(`${path}pokemon/${pokemon}`)
          .then((res) => {
            commit('setPokeList', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    setEmptyPokeList(state) {
      state.pokeList1 = [];
    },
    setPokeList(state, pokemon) {
      state.pokeList1.push(pokemon);
    },
  },
};
