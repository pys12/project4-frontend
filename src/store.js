import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailReducer } from './reducers/productReducers'

const reducer = combineReducers({productList:productListReducer,productDetail:productDetailReducer})
const initialState = {}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store