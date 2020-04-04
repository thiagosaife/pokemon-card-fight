<template>
  <b-col cols="12" class="mb-3">
    <b-row>
      <b-col v-if="alert" cols="12">
        <b-alert show variant="danger">
          {{ getAlertText }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-form @submit.prevent="searchPokemon">
          <b-form-input
            v-model="name"
            placeholder="Procurar um Pokemon - Nome ou ID"></b-form-input>
          <b-button
            type="submit"
            class="mt-3 float-left">Procurar</b-button>
        </b-form>
      </b-col>
      <b-col cols="6">
        <b-row>
          <b-button
            class="float-left"
            variant="info"
            @click="openIds">Consultar lista de Nomes/IDs</b-button>
        </b-row>
        <b-row>
          <b-col cols="6" class="p-0">
            <b-button
              variant="success"
              type="button"
              class="mt-3 float-left" @click="createHand">Sortear mão</b-button>
          </b-col>
          <b-col cols="6" class="p-1">
            <b-input-group :prepend="minRange" :append="maxRange" class="mt-3">
              <b-form-input
                v-model="range"
                type="range"
                :min="minRange"
                :max="maxRange"></b-form-input>
            </b-input-group>
            <p class="p-1">{{ range }} Pokémons</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'MainControls',
  data() {
    return {
      alert: false,
      hand: 0,
      maxRange: '12',
      minRange: '1',
      name: '',
      range: 7,
    };
  },
  computed: {
    getAlertText() {
      return `Sua busca por "${this.name}" não retornou nenhum resultado. Tente consultar a lista de Ids no botão abaixo.`;
    },
  },
  methods: {
    ...mapActions([
      'Pokemon',
    ]),
    ...mapMutations([
      'setEmptyPokeList',
    ]),
    createHand() {
      this.alert = false;
      this.setEmptyPokeList();
      const range = +this.range + 1;
      for (let i = 1; i < range; i += 1) {
        const id = Math.floor(Math.random() * 890) + 1;
        this.Pokemon(id)
          .then((res) => console.log('res =>', res))
          .catch((err) => {
            const error = { ...err };
            if (error.response.status === 404) {
              this.randomizeCall();
            }
          });
      }
    },
    openIds() {
      window.open('https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number');
    },
    randomizeCall() {
      const id = Math.floor(Math.random() * 890) + 1;
      this.Pokemon(id)
        .catch((err) => {
          const error = { ...err };
          if (error.response.status === 404) {
            this.randomizeCall();
          }
        });
    },
    searchPokemon() {
      if (!this.name) return;
      this.alert = false;
      this.setEmptyPokeList();
      let name = this.name.toLowerCase();
      if (!isNaN(name)) {
        name = parseInt(name, 10);
      }
      this.Pokemon(name)
        .catch(() => {
          this.alert = true;
        });
    },
  },
  watch: {
    name() {
      this.alert = false;
    },
  },
};
</script>
