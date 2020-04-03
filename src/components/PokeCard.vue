<template>
  <b-row>
    <b-col cols="4">
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="getCapitalizedName">
              <b-card-text v-for="(description, index) in descriptions"
                :key="index" class="mb-1">
                {{ description.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="4">
      <b-form-input v-model="name" placeholder="Pokemon"></b-form-input>
      <b-button type="button" class="mt-3" @click="searchPokemon">Procurar</b-button>
    </b-col>
    <b-col cols="4">
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="getCapitalizedName">
              <b-card-text v-for="(description, index) in descriptions"
                :key="index" class="mb-1">
                {{ description.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { getPokemonAbilities, getPokemon } from '@/services/pokemon';

export default {
  name: 'PokeCard',
  computed: {
    getCapitalizedName() {
      return `${this.name.charAt(0).toUpperCase()}${this.name.slice(1)}`;
    },
  },
  data() {
    return {
      descriptions: [],
      id: '',
      image: '',
      name: '',
    };
  },
  methods: {
    searchPokemon() {
      getPokemon(this.name)
        .then((res) => {
          this.id = res.id;
          this.name = res.name;
          Object.entries(res.sprites).forEach(([key, value]) => {
            if (key === 'front_default') this.image = value;
          });
          getPokemonAbilities(this.id)
            .then((abilities) => {
              console.log(abilities);
              this.descriptions = abilities.descriptions;
            });
        })
        .catch((err) => console.log('err =>', err));
    },
  },
};
</script>
