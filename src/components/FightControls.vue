<template>
  <b-col cols="4">
    <b-form-input v-model="name" placeholder="Pokemon"></b-form-input>
    <b-button type="button" class="mt-3" @click="createHand">Procurar</b-button>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PokeCard',
  computed: {
    ...mapGetters([
      'getPokemon',
    ]),
  },
  data() {
    return {
      hand: 0,
      name: '',
    };
  },
  methods: {
    ...mapActions([
      'Pokemon',
    ]),
    createHand() {
    },
  },
};
</script>
