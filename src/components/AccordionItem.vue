<template>
  <b-card
    v-if="arrayInfo.length"
    no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block href="#"
        v-b-toggle="`accordion-${type}-${cardIndex}`"
        variant="light">
        {{ title }} ({{ arrayInfo.length }})
      </b-button>
    </b-card-header>
    <b-collapse
      :id="`accordion-${type}-${cardIndex}`"
      accordion="accordion"
      role="tabpanel">
      <b-card-body>
        <b-card-text v-for="(item, index) in arrayInfo"
          :key="index">
          <p class="text-left mb-0">
              {{
                item.name ?
                  getCapitalizedText(item.name) : getCapitalizedText(item[type].name)
              }}
          </p>
          <div v-if="extraInfo.length">
            <p
              class="mb-0 text-left"
              v-for="(info, index) in extraInfo"
              :key="index">
                <small>
                  {{ info.label }}: {{ item[info.field] }}
                </small>
            </p>
          </div>
        </b-card-text>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'AccordionItem',
  props: {
    arrayInfo: {
      type: Array,
      required: true,
    },
    cardIndex: {
      type: Number,
      required: true,
    },
    extraInfo: {
      default: () => [],
      type: Array,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    getCapitalizedText(text) {
      return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    },
  },
};
</script>
