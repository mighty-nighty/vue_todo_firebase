import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import firebase from 'firebase'

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
  { path: '/', component: signIn, meta: {requiresAuth: false} },
  { path: '/signUp', component: signUp, meta: {requiresAuth: false} },
  { path: '/main', component: container, meta: {requiresAuth: true} },
];
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  create() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/main')
      }
      else {
        this.$router.push('/')
      }
    })
  }
});
