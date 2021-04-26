import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//--------User Reducers-------//
import {
    userLoginReducer
} from './reducers/userReducers';

//--------Product Reducers-------//
import {
    productListReducer,
    productDetailsReducer,
    productUpdateReducer,
    productDeleteReducer
} from './reducers/productReducers';


//-------Combine Reducers------//
const reducer = combineReducers({
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer
});

// const cartItemsFromStorage = localStorage.getItem('cartItems') 
//     ? JSON.parse(localStorage.getItem('cartItems')) 
//     : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
//     ? JSON.parse(localStorage.getItem('shippingAddress')) 
//     : {}


const initialState = {
    // cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;