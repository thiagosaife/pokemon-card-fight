import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '@/views/About.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
