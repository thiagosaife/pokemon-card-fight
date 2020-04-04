<template>
  <b-col cols="4">
    <b-card
      no-body class="overflow-hidden">
      <b-card-header class="text-left">
        <b-badge
          variant="info"
          class="mt-2">
          {{ getCapitalizedText(cardInfo.name) }} #{{ cardInfo.id }}
        </b-badge>
        <b-img
          :src="logoUrl"
          class="rounded-0 poke-ball float-right"/>
      </b-card-header>
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img
            :id="`tooltip-target-${cardIndex}`"
            :src="getFrontDefault" class="rounded-0 pokemon" />
          <b-tooltip
            placement="right"
            :target="`tooltip-target-${cardIndex}`" triggers="hover">
            <b-img
              v-for="(sprite, index) in getPokeSprites"
              :key="index"
              :src="sprite" class="rounded-0"/>
          </b-tooltip>
        </b-col>
        <b-col md="8" class="pt-3">
          <p class="m-0 text-left">
            <small>Espécie: {{ cardInfo.species.name }}</small>
          </p>
          <p class="m-0 text-left">
            <small
              class="tip"
              title="Peso em hectogramas"
              v-b-tooltip.hover>Peso: {{ cardInfo.weight }} hg</small>
          </p>
          <p class="m-0 text-left">
            <small
              class="tip"
              title="Altura em decímetros"
              v-b-tooltip.hover>Altura: {{ cardInfo.height }} dm</small>
          </p>
          <p class="m-0 text-left">
            <small
              class="tip"
              title="Ganho de XP ao derrotar este Pokemon"
              v-b-tooltip.hover>XP Gain: {{ cardInfo.base_experience }}</small>
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-card-body>
            <div role="tablist">
              <AccordionItem
                v-for="(accordion, index) in getAccordionList"
                :key="index"
                :arrayInfo="accordion.arrayInfo"
                :cardIndex="cardIndex"
                :extraInfo="accordion.extraInfo"
                :title="accordion.title"
                :type="accordion.type" />
            </div>
          </b-card-body>
        </b-col>
      </b-row>
      <b-card-footer>
        <b-badge
          v-for="(stat, index) in getPokeStats"
          :key="index"
          :variant="getVariantion(stat.base_stat)"
          v-b-tooltip.hover
          :title="stat.base_stat"
          class="m-1 tip">
            {{ stat.stat.name }}
        </b-badge>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
import AccordionItem from '@/components/AccordionItem.vue';

export default {
  name: 'PokeCard',
  props: {
    cardIndex: {
      type: Number,
      required: true,
    },
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    AccordionItem,
  },
  computed: {
    getAccordionList() {
      const accordionList = [
        {
          arrayInfo: this.getPokeStats,
          extraInfo: [
            {
              label: 'Status Base',
              field: 'base_stat',
            },
            {
              label: 'Esforço',
              field: 'effort',
            },
          ],
          title: 'Status',
          type: 'stat',
        },
        {
          arrayInfo: this.getPokeTypes,
          title: 'Tipos',
          type: 'type',
        },
        {
          arrayInfo: this.getPokeAbilities,
          title: 'Habilidades',
          type: 'ability',
        },
        {
          arrayInfo: this.getPokeForms,
          title: 'Formas',
          type: 'form',
        },
        {
          arrayInfo: this.getPokeItems,
          title: 'Itens',
          type: 'item',
        },
        {
          arrayInfo: this.getPokeMoves,
          title: 'Movimentos',
          type: 'move',
        },
      ];
      return accordionList;
    },
    getFrontDefault() {
      return this.cardInfo.sprites.front_default;
    },
    getPokeAbilities() {
      return this.cardInfo.abilities;
    },
    getPokeForms() {
      return this.cardInfo.forms;
    },
    getPokeItems() {
      return this.cardInfo.held_items;
    },
    getPokeMoves() {
      return this.cardInfo.moves;
    },
    getPokeSprites() {
      return this.cardInfo.sprites;
    },
    getPokeStats() {
      return this.cardInfo.stats;
    },
    getPokeTypes() {
      return this.cardInfo.types;
    },
  },
  methods: {
    getCapitalizedText(text) {
      return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    },
    getVariantion(baseStat) {
      const variations = [
        'light',
        'success',
        'info',
        'primary',
        'secondary',
        'warning',
        'danger',
        'dark',
      ];
      const variation = parseInt(baseStat / 10, 10) > variations.length - 1
        ? variations[variations.length - 1] : variations[parseInt(baseStat / 10, 10)];
      return variation;
    },
  },
};
</script>
