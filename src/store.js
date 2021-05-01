import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//--------User Reducers-------//
import {
    userLoginReducer,
    userDetailsReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';

//-------Cart Reducers--------//
import {
    cartReducer
} from './reducers/cartReducers';

//--------Product Reducers-------//
import {
    productListReducer,
    productDetailsReducer,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer
} from './reducers/productReducers';

//--------Product Reducers-------//
import {
    listAllOrdersReducer,
    listMyOrdersReducer,
    orderDetailsReducer,
} from './reducers/orderReducers';

//-------Combine Reducers------//
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    listAllOrders: listAllOrdersReducer,
    listMyOrders: listMyOrdersReducer,
    orderDetails: orderDetailsReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;