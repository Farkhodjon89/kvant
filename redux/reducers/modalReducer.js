import {
  SET_CART_MODAL,
  HIDE_CART_MODAL
} from '../actions/cartActions'

const initState = {
  cart: false
}

const modalReducer = (state = initState, action) => {
  if (action.type === SET_CART_MODAL) {
    return {
      ...state,
      cart: true
    }
  }

  if (action.type === HIDE_CART_MODAL) {
    return {
      ...state,
      cart: false
    }
  }

  return state
}

export default modalReducer