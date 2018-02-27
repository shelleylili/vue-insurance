import * as types from './mutations'

export const printCount = ({commit}) => {
  commit(types.PRINT_COUNT, {
    id: 1001
  })
}
export const increaseCount = ({commit}) => {
  commit(types.INCREASE_COUNT, {
    id: 1002
  })
}
export const decreaseCount = ({commit}) => {
  commit(types.DECREASE_COUNT, {
    id: 1003
  })
}
