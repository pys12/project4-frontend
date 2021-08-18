import axios from "axios";
import * as actionTypes from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.CREATE_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`https://record-on-the-block.herokuapp.com/orders/`, order, config);

    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: data,
    });
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_ORDER_FAIL,
      payload: error.response,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ORDER_DETAIL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`https://record-on-the-block.herokuapp.com/orders/${id}`, config);

    dispatch({
      type: actionTypes.ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DETAIL_FAIL,
      payload: error.response,
    });
  }
};

export const payOrder =(orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `https://record-on-the-block.herokuapp.com/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: actionTypes.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_PAY_FAIL,
        payload: error.response
      });
    }
  };
