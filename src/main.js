// Vue2
import Vue from 'vue'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// 處理 state 的 vuex
import store from '../src/store/index'

// google map vue 套件
// import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'





Vue.config.productionTip = false
Vue.use(VueAxios, axios);







// Vue Google Map
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyANoV26TKh0Y-kCQJzs0g0nZ2fr6Kunk3I',
//     load: false,
//     // libraries: 'maps', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)

//     //// If you want to set the version, you can do so:
//     // v: '3.26',
//     // region 可以設定地區
//     // language 可以設定語言
//   }
// })


new Vue({
  el: "#app",
  store,
  render: h => h(App),
}).$mount('#app')