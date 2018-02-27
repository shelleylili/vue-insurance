import * as types from '../mutations'

// state 状态
const state = {
  count: 0
}

// getter 计算属性
const getters = {
  increaseCount: function (state) {
    return state.count++
  },
  decreaseCount: function (state) {
    return state.count--
  },
  printCount: function (state) {
    console.log(state.count)
  }
}

// actions 执行动作
const actions = {
  // increaseCount (context) {
  //   context.commit(types.INCREASE_COUNT)
  // },
  // decreaseCount (context) {
  //   context.commit(types.DECREASE_COUNT)
  // },
  // printCount (context) {
  //   context.commit(types.PRINT_COUNT)
  // }
}

// mutations
const mutations = {
  [types.INCREASE_COUNT] (state) {
    state.count++
  },
  [types.DECREASE_COUNT] (state) {
    state.count--
  },
  [types.PRINT_COUNT] (state) {
    console.log(state.count)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
