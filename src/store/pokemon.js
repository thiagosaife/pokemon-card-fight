import { v4 as uuidv4 } from 'uuid';

const path = 'https://pokeapi.co/api/v2/';
const axios = require('axios');

export default {
  state: {
    cardIndex: 0,
    cardInfo: {},
    defaultRange: 7,
    listLoaderVisible: false,
    maxRange: 12,
    minRange: 1,
    pokeList1: [],
    range: 7,
    showModal: false,
    stackedCards: false,
    uuid: '',
  },
  getters: {
    getCardIndex: (state) => state.cardIndex,
    getCardInfo: (state) => state.cardInfo,
    getDefaultRange: (state) => state.defaultRange,
    getMaxRange: (state) => state.maxRange,
    getMinRange: (state) => state.minRange,
    getRange: (state) => state.range,
    isLengthEqualRange: (state) => state.pokeList1.length === +state.range,
    isListLoaderVisible: (state) => state.listLoaderVisible,
    isModalVisible: (state) => state.showModal,
    isStackedCards: (state) => state.stackedCards,
    PokeList1: (state) => state.pokeList1,
  },
  actions: {
    Pokemon({ commit }, pokeInfo) {
      const { name } = pokeInfo;
      const { isSearch } = pokeInfo;
      return new Promise((resolve, reject) => {
        axios.get(`${path}pokemon/${name}`)
          .then((res) => {
            resolve(res.data);
            if (isSearch) {
              commit('setCardInfo', { cardInfo: res.data });
              return;
            }
            commit('addToPokeList', res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    addToPokeList(state, pokemon) {
      const parsedPokemon = JSON.parse(JSON.stringify(pokemon));
      const uuid = uuidv4();
      Object.assign(parsedPokemon, { uuid });
      state.pokeList1.unshift(parsedPokemon);
    },
    removeFromPokeList(state, uuid) {
      const pokeToRemove = state.pokeList1.findIndex((item) => item.uuid === uuid);
      state.pokeList1.splice(pokeToRemove, 1);
    },
    setCardIndex(state, cardIndex) {
      state.cardIndex = cardIndex;
    },
    setCardInfo(state, pokemon) {
      const parsedPokemon = JSON.parse(JSON.stringify(pokemon));
      const { cardInfo } = parsedPokemon;
      const { uuid } = cardInfo;
      if (!uuid) {
        const newUuid = uuidv4();
        Object.assign(cardInfo, { uuid: newUuid });
      }
      state.cardInfo = cardInfo;
    },
    setEmptyPokeList(state) {
      state.pokeList1 = [];
    },
    setListLoaderVisibiity(state, isRemove) {
      state.listLoaderVisible = isRemove;
    },
    setModalVisibility(state) {
      state.showModal = !state.showModal;
    },
    setRange(state, range) {
      state.range = range;
    },
    setStackedCards(state) {
      state.stackedCards = !state.stackedCards;
    },
  },
};
