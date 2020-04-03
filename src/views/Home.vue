<template>
  <b-container class="bv-example-row">
    <b-row>
      <PokeCard />
      <FightControls />
    </b-row>
  </b-container>
</template>

<script>
import FightControls from '@/components/FightControls.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'Home',
  components: {
    FightControls,
    PokeCard,
  },
};
</script>
