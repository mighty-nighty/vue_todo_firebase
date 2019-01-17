import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'

import mainSide from './components/mainSide.vue'
import leftSide from './components/leftSide.vue'
import signUp from './components/signUp.vue'
import signIn from './components/signIn.vue'
import container from './components/container.vue'

Vue.component('mainSide', mainSide);
Vue.component('leftSide', leftSide);
Vue.component('signUp', signUp);
Vue.component('signIn', signIn);
Vue.component('container', container);

Vue.use(VModal, { dialog: true });
Vue.use(VueRouter);

const routes = [
  { path: '/', component: container },
  { path: '/signUp', component: signUp },
  { path: '/signIn', component: signIn },
];
const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
