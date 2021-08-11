import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailReducer } from './redux/reducers/productReducers'
import { cartReducer } from './redux/reducers/cartReducers'

const reducer = combineReducers({ productList: productListReducer, productDetail: productDetailReducer, cart: cartReducer })
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
    }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store