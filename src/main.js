import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'

import mainSide from './components/mainSide.vue'
import leftSide from './components/leftSide.vue'
import signIn from './components/signIn.vue'

Vue.component('mainSide', mainSide);
Vue.component('leftSide', leftSide);
Vue.component('signIn', signIn);
Vue.use(VModal, { dialog: true });

new Vue({
  el: '#app',
  render: h => h(App)
});
