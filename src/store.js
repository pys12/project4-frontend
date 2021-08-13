import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailReducer } from './redux/reducers/productReducers'
import { cartReducer } from './redux/reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './redux/reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
    },
    userLogin: {
        userInfo:localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
    }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store