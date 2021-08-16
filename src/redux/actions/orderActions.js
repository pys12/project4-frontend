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
    const { data } = await axios.post(`/orders/`, order, config);

    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: data,
    });
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
      const { data } = await axios.get(`/orders/${id}`, config);
  
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
  