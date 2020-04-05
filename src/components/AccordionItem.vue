<template>
  <b-card
    v-if="arrayInfo.length"
    no-body class="mb-1 accordion-item">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block href="#"
        v-b-toggle="isModal
          ? `accordion-modal-${type}-${cardIndex}` : `accordion-${type}-${cardIndex}`"
        variant="light">
        {{ title }} <span v-if="showLength">({{ arrayInfo.length }})</span>
      </b-button>
    </b-card-header>
    <b-collapse
      :id="isModal
       ? `accordion-modal-${type}-${cardIndex}` : `accordion-${type}-${cardIndex}`"
      accordion="accordion"
      role="tabpanel">
      <b-card-body>
        <b-card-text v-for="(item, index) in arrayInfo"
          :key="index">
          <ul>
            <li class="text-left">
              <p>
                {{
                  item.name ?
                    getCapitalizedText(item.name) : getCapitalizedText(item[type].name)
                }}
              </p>
            </li>
          </ul>
          <div v-if="extraInfo.length">
            <p
              class="mb-0 text-left extra-info"
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
    isModal: {
      default: () => false,
      type: Boolean,
      required: false,
    },
    showLength: {
      default: () => true,
      type: Boolean,
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
};
</script>
