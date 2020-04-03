<template>
  <b-container class="bv-example-row">
    <PokeCard msg="Welcome to Your Vue.js App" />
  </b-container>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'Home',
  components: {
    PokeCard,
  },
};
</script>
