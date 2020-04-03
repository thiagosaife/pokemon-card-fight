<template>
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
</template>

<script>

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
  },
};
</script>
