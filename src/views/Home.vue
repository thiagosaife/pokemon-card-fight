<template>
  <b-container class="bv-example-row">
    <b-row>
      <MainControls />
    </b-row>
    <b-row>
      <PokeCard class="p-1"
        v-for="(card, index) in PokeList1"
        :key="index"
        :cardIndex="index"
        :cardInfo="card" />
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MainControls from '@/components/MainControls.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'Home',
  components: {
    MainControls,
    PokeCard,
  },
  computed: {
    ...mapGetters([
      'PokeList1',
    ]),
  },
};
</script>
