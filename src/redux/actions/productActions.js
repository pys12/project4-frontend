import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/products/`);
    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload: error.response,
    });
  }
};
export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/products/${id}/`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_FAIL,
      payload: error.response,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await axios.delete(`/products/${id}`, config);
    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

export const createProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.post(`/products/`,{}, config);
      dispatch({
          type: actionTypes.CREATE_PRODUCT_SUCCESS,
          payload:data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_PRODUCT_FAIL,
        payload: error.response,
      });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = { headers: { 'Content-Type':"application/json",Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.put(`/products/${product._id}`,product, config);
      dispatch({
          type: actionTypes.UPDATE_PRODUCT_SUCCESS,
          payload:data
      });
      dispatch({ type: actionTypes.PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        payload: error.response,
      });
    }
};
  
