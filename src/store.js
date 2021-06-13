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
    productListWithQueryReducer,
    productDetailsReducer,
    productCreateReducer,
    productReviewCreateReducer,
    productUpdateReducer,
    productDeleteReducer,
    searchProductsReducer
} from './reducers/productReducers';

//--------Product Reducers-------//
import {
    orderCreateReducer,
    listAllOrdersReducer,
    listMyOrdersReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer
} from './reducers/orderReducers';

//-------Combine Reducers------//
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
    searchProducts: searchProductsReducer,
    productsList: productListReducer,
    productsListWithQuery: productListWithQueryReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productReviewCreate: productReviewCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    listAllOrders: listAllOrdersReducer,
    listMyOrders: listMyOrdersReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;