<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(card, index) in pokeList"
        :key="index"
        @click="toggleModal(card, index)"
        class="d-flex justify-content-between align-items-center tip">
        <b-badge
          variant="info"
          :id="`tooltip-cog-stacked-${index}`"
          class="p-2">
          {{ getCapitalizedText(card.name) }} #{{ card.id }}
          <i class="material-icons badge-icon">settings</i>
        </b-badge>
        <b-card-img
          :id="`tooltip-stacked-${index}`"
          :src="card.sprites.front_default"
          class="rounded-0 poke-mini float-right image-shadow" />
        <b-tooltip
          placement="right"
          :target="`tooltip-stacked-${index}`" triggers="hover">
          <b-img
            :src="card.sprites.front_default" class="rounded-0"/>
        </b-tooltip>
        <b-tooltip
          placement="right"
          :target="`tooltip-cog-stacked-${index}`" triggers="hover">
          <b-row>
            <b-badge
              @click="addToHand(card)"
              :title="canAdd
                ? `Adicionar 1 ${ getCapitalizedText(card.name) } à mão`
                : `Você não pode adicionar mais de ${getMaxRange} cartas à mão.`"
              v-b-tooltip.hover
              class="float-right badge-tip tip">
              <span>
                <i class="material-icons">control_point</i>
              </span>
            </b-badge>
            <b-badge
              @click="removeFromHand(card)"
              :title="`Remover 1 ${ getCapitalizedText(card.name) } da mão`"
              v-b-tooltip.hover
              class="float-right badge-tip tip">
              <span>
                <i class="material-icons">cancel</i>
              </span>
            </b-badge>
          </b-row>
        </b-tooltip>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'StackedCards',
  props: {
    pokeList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'getMaxRange',
      'PokeList1',
    ]),
    canAdd() {
      return this.PokeList1.length < this.getMaxRange;
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
    addToHand(cardInfo) {
      if (!this.canAdd) return;
      this.addToPokeList(cardInfo);
    },
    removeFromHand(card) {
      this.removeFromPokeList(card);
    },
    toggleModal(cardInfo, cardIndex) {
      this.setCardIndex(cardIndex);
      this.setCardInfo(cardInfo);
      this.setModalVisibility(true);
      this.setName(cardInfo.name);
    },
  },
};
</script>
