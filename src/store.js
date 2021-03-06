import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
} from "./redux/reducers/productReducers";
import { cartReducer } from "./redux/reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./redux/reducers/userReducers";
import {
  createOrderReducer,
  orderDetailReducer,
  orderPayReducer,
} from "./redux/reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createOrder: createOrderReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer
});
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
