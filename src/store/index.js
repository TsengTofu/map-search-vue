// vuex 的 main.js，類似 store 的初始化 init
import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
      map,
  }
})