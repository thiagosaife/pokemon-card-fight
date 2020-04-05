<template>
  <b-container class="bv-example-row">
    <b-row>
      <MainControls />
    </b-row>
    <b-row>
      <b-col cols="4" v-if="isStackedCards">
        <StackedCards :pokeList="PokeList1" />
      </b-col>
      <b-col cols="4"
        v-for="(card, index) in PokeList1"
        :key="index"
        v-else>
        <PokeCard class="mb-1"
          :cardIndex="index"
          :cardInfo="card" />
      </b-col>
    </b-row>
    <b-modal v-model="showModal">
      <b-row>
        <b-col cols="12">
          <PokeCard
            :isModal="true"
            :cardIndex="getCardIndex"
            :cardInfo="getCardInfo"/>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MainControls from '@/components/MainControls.vue';
import PokeCard from '@/components/PokeCard.vue';
import StackedCards from '@/components/StackedCards.vue';

export default {
  name: 'Home',
  components: {
    MainControls,
    PokeCard,
    StackedCards,
  },
  computed: {
    ...mapGetters([
      'getCardIndex',
      'getCardInfo',
      'isModalVisible',
      'isStackedCards',
      'PokeList1',
    ]),
    showModal: {
      get() {
        return this.isModalVisible;
      },
      set() {
        this.setModalVisibility();
      },
    },
  },
  methods: {
    ...mapMutations([
      'setModalVisibility',
    ]),
  },
};
</script>
