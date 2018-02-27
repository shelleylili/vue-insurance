import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import count from './modules/count'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    count
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
