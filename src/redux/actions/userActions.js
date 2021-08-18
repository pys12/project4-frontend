import * as actionTypes from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({type: actionTypes.USER_LOGIN_REQUEST})
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post('https://record-on-the-block.herokuapp.com/users/login/',{ email, password },config)
  
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload:error.response 
      })
    }
}
  
export const logout = () => (dispatch)=>{
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: actionTypes.USER_LOGOUT })
  document.location.href = '/';
  
}

export const register = (name,email, password) => async (dispatch) => {
  try {
    dispatch({type: actionTypes.USER_REGISTER_REQUEST})
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('https://record-on-the-block.herokuapp.com/users/',{ name, email, password },config)

    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:error.response 
    })
  }
}