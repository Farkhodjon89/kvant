export const ADD_TO_CART = 'ADD_TO_CART'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'
export const SET_CART_MODAL = 'SET_CART_MODAL'
export const HIDE_CART_MODAL = 'HIDE_CART_MODAL'
// add to cart
export const addToCart = (
  item,
  selectedProductColor,
  selectedProductSize,
  selectedProductId
) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        selectedProductColor:
          selectedProductColor ||
          (item.selectedProductColor ? item.selectedProductColor : null),
        selectedProductSize:
          selectedProductSize ||
          (item.selectedProductSize ? item.selectedProductSize : null),
        selectedProductId: selectedProductId
      }
    })
  }
}
// decrease from cart
export const decreaseQuantity = (item) => {
  return (dispatch) => {
    dispatch({ type: DECREASE_QUANTITY, payload: item })
  }
}
// delete from cart
export const deleteFromCart = (item) => {
  return (dispatch) => {
    dispatch({ type: DELETE_FROM_CART, payload: item })
  }
}
// delete all from cart
export const deleteAllFromCart = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_FROM_CART })
  }
}


export const setCartModal = () => {
  return (dispatch) => {
    dispatch({ type: SET_CART_MODAL })
  }
}

export const hideCartModal = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_CART_MODAL })
  }
}
