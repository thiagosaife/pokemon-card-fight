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
          <b-spinner v-if="loadingSearch" class="spinner float-left" type="grow" label="Spinning" />
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
            <b-button
              v-if="PokeList1.length"
              variant="danger"
              @click="clearHand()"
              type="button"
              class="ml-1 mt-3 float-left">Limpar</b-button>
          </b-col>
          <b-col cols="6" class="p-1">
            <b-input-group :prepend="`${getMinRange}`" :append="`${getMaxRange}`" class="mt-3">
              <b-form-input
                v-model="range"
                type="range"
                :min="getMinRange"
                :max="getMaxRange" />
            </b-input-group>
            <p class="p-1">
              Quantidade de cartas: {{ range }} Pokémons
              <small>Padrão: {{ defaulRange }} cartas</small>
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="PokeList1.length">
      <b-col cols="12">
        <b-button
          variant="warning"
          type="button"
          class="mt-3 float-left" @click="stackCards">
            {{ isStackedCards
              ? `Ver todas (${PokeList1.length})` : `Empilhar cartas (${PokeList1.length})` }}
            <i class="material-icons button-icon">style</i>
          </b-button>
          <!-- <b-spinner v-if="!loadingHand" class="spinner float-left"
          type="grow" label="Spinning" /> -->
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MainControls',
  data() {
    return {
      alert: false,
      defaulRange: 7,
      hand: 0,
      loadingSearch: false,
      name: '',
    };
  },
  created() {
    this.EventBus.$on('setName', (name) => {
      this.name = this.getCapitalizedText(name);
    });
  },
  computed: {
    ...mapGetters([
      'getCardInfo',
      'getMaxRange',
      'getMinRange',
      'getRange',
      'isStackedCards',
      'PokeList1',
    ]),
    getAlertText() {
      return `Sua busca por "${this.name}" não retornou nenhum resultado. Tente consultar a lista de Ids no botão abaixo.`;
    },
    loadingHand() {
      return this.PokeList1.length === +this.getRange;
    },
    range: {
      get() {
        return this.getRange;
      },
      set(range) {
        this.setRange(range);
      },
    },
  },
  methods: {
    ...mapActions([
      'Pokemon',
    ]),
    ...mapMutations([
      'setCardIndex',
      'setEmptyPokeList',
      'setModalVisibility',
      'setRange',
      'setStackedCards',
    ]),
    clearHand() {
      this.setEmptyPokeList();
    },
    createHand() {
      this.alert = false;
      this.name = '';
      this.setEmptyPokeList();
      const range = +this.range + 1;
      for (let i = 1; i < range; i += 1) {
        const name = Math.floor(Math.random() * 890) + 1;
        this.Pokemon({ name })
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
      const name = Math.floor(Math.random() * 890) + 1;
      this.Pokemon({ name })
        .catch((err) => {
          const error = { ...err };
          if (error.response.status === 404) {
            this.randomizeCall();
          }
        });
    },
    searchPokemon() {
      if (!this.name) return;
      const isSearch = true;
      this.alert = false;
      this.loadingSearch = true;
      let name = this.name.toLowerCase();
      if (!isNaN(name)) {
        name = parseInt(name, 10);
      }
      this.Pokemon({ name, isSearch })
        .then(() => {
          this.loadingSearch = false;
          this.toggleModal();
        })
        .catch(() => {
          this.alert = true;
          this.loadingSearch = false;
        });
    },
    stackCards() {
      this.setStackedCards();
    },
    toggleModal() {
      this.setCardIndex(0);
      this.setModalVisibility(true);
    },
  },
  watch: {
    name() {
      this.alert = false;
    },
  },
};
</script>
