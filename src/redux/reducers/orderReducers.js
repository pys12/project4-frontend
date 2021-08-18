import * as actionTypes from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER_REQUEST:
            return { loading: true }
        case actionTypes.CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case actionTypes.CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailReducer = (state = {loading:true,orderItems:[],shippingAddress:{}}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DETAIL_REQUEST:
            return { ...state,loading: true }
        case actionTypes.ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload }
        case actionTypes.ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.ORDER_PAY_REQUEST:
        return {
          loading: true,
        }
      case actionTypes.ORDER_PAY_SUCCESS:
        return {
          loading: false,
          success: true,
        }
      case actionTypes.ORDER_PAY_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      case actionTypes.ORDER_PAY_RESET:
        return {}
      default:
        return state
    }
}