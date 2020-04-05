import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/scss/custom.scss';

const EventBus = new Vue();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      EventBus,
      logoUrl: 'http://www.pngplay.com/wp-content/uploads/2/Pokeball-PNG-Photo-Image.png',
    };
  },
  methods: {
    getCapitalizedText(text) {
      return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    },
    setName(name) {
      this.EventBus.$emit('setName', name);
    },
    createUUID() {
      return uuidv4();
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
