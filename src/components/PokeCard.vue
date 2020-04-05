<template>
  <b-card
    no-body class="overflow-hidden">
    <b-card-header
      @click="isModal ? null : toggleModal(cardInfo, cardIndex)"
      class="text-left"
      :class="isModal ? '' : 'tip'">
      <b-badge
        variant="info"
        class="p-2">
        {{ getCapitalizedText(cardInfo.name) }} #{{ cardInfo.id }}
      </b-badge>
      <b-img
        v-if="isModal"
        :src="logoUrl"
        class="rounded-0 poke-ball float-right image-shadow"/>
      <i
        v-else
        class="material-icons header-icon">open_in_new</i>
      <b-button
        v-if="isModal"
        @click="canRemove ? removeFromHand() : null"
        variant="danger"
        :title="canRemove
          ? `Remover esta carta ${ getCapitalizedText(cardInfo.name) } da mão`
          : `Você não pode remover esta carta ${ getCapitalizedText(cardInfo.name) }.`"
        v-b-tooltip.hover
        class="float-right mr-2 button-header">
        <span>
          <i class="material-icons button-icon">cancel</i>
        </span>
        <i class="material-icons button-icon">style</i>
      </b-button>
      <b-button
        v-if="isModal"
        @click="canAdd ? addToHand() : null"
        variant="success"
        :title="canAdd
          ? `Adicionar 1 ${ getCapitalizedText(cardInfo.name) } à mão`
          : `Você não pode adicionar mais de ${getMaxRange} cartas à mão.`"
        v-b-tooltip.hover
        class="float-right mr-1 button-header">
        <span>
          <i class="material-icons button-icon">control_point</i>
        </span>
        <i class="material-icons button-icon">style</i>
      </b-button>
    </b-card-header>
    <b-card-body>
      <b-row no-gutters>
        <b-col>
          <b-card-img
            :id="isModal
              ? `tooltip-target-modal${cardIndex}` : `tooltip-target-${cardIndex}`"
            :src="getFrontDefault" class="rounded-0 pokemon image-shadow" />
          <b-tooltip
            placement="right"
            :target="isModal
              ? `tooltip-target-modal${cardIndex}` : `tooltip-target-${cardIndex}`"
            triggers="hover">
            <b-img
              v-for="(sprite, index) in getPokeSprites"
              :key="index"
              :src="sprite" class="rounded-0"/>
          </b-tooltip>
        </b-col>
        <b-col class="p-2 text-right">
          <p class="m-0 label">
            <strong>Nome:</strong> <span>{{ getCapitalizedText(cardInfo.name) }}</span>
          </p>
          <p class="m-0 label tip">
            <span
              title="Peso em hectogramas (hg)"
              v-b-tooltip.hover>
              <strong>Peso:</strong> {{ cardInfo.weight }} hg
            </span>
          </p>
          <p class="m-0 label tip">
            <span
              title="Altura em decímetros (dm)"
              v-b-tooltip.hover>
              <strong>Altura:</strong> {{ cardInfo.height }} dm
            </span>
          </p>
          <p class="m-0 label tip">
            <span
              title="Ganho de XP ao derrotar este Pokemon"
              v-b-tooltip.hover>
              <strong>XP Gain:</strong> {{ cardInfo.base_experience }}
            </span>
          </p>
        </b-col>
      </b-row>
      <div role="tablist">
        <AccordionItem
          v-for="(accordion, index) in getAccordionList"
          :key="index"
          :arrayInfo="accordion.arrayInfo"
          :cardIndex="cardIndex"
          :extraInfo="accordion.extraInfo"
          :isModal="isModal"
          :showLength="accordion.showLength"
          :title="accordion.title"
          :type="accordion.type" />
      </div>
    </b-card-body>
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
    isModal: {
      default: () => false,
      type: Boolean,
      required: false,
    },
  },
  components: {
    AccordionItem,
  },
  computed: {
    ...mapGetters([
      'getCardInfo',
      'getMaxRange',
      'PokeList1',
    ]),
    canAdd() {
      return this.PokeList1.length < this.getMaxRange;
    },
    canRemove() {
      const { uuid } = this.getCardInfo;
      const hasPokemon = this.PokeList1.some((item) => item.uuid === uuid);
      return hasPokemon;
    },
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
          showLength: false,
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
    ...mapMutations([
      'addToPokeList',
      'removeFromPokeList',
      'setCardIndex',
      'setCardInfo',
      'setModalVisibility',
    ]),
    addToHand() {
      const { cardInfo } = this;
      this.addToPokeList(cardInfo);
      this.setCardInfo({ cardInfo });
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
    removeFromHand() {
      const { uuid } = this.cardInfo;
      this.removeFromPokeList(uuid);
    },
    toggleModal(cardInfo, cardIndex) {
      this.setCardIndex(cardIndex);
      this.setCardInfo({ cardInfo });
      this.setModalVisibility(true);
      this.setName(cardInfo.name);
    },
  },
};
</script>
