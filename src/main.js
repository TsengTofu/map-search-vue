// Vue2-CLI
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../src/store/index'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyANoV26TKh0Y-kCQJzs0g0nZ2fr6Kunk3I',
    load: false,
    // libraries: 'maps', This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization' (as you require)
    // If you want to set the version, you can do so:
    // v: '3.26',
    // region    設定地區
    // language  設定語言
  }
})


new Vue({
  el: "#app",
  store,
  render: h => h(App),
}).$mount('#app')