import axios from 'axios'
import * as actionTypes from '../constants/cartConstants'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}/`)
  
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: data._id,
        title: data.title,
        cover: data.cover,
        price: data.price,
        stockCount: data.stockCount,
        quantity,
      },
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
  
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
 
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))

}