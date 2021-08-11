import * as actionTypes from '../constants/productConstants'
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/products/`)
        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: data})
    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: error.response
        })
    }
}
export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`/products/${id}/`)
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data})
    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_FAIL,
            payload: error.response
        })
    }
}