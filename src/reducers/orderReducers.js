import {
    LIST_ALL_ORDERS_REQUEST,
    LIST_ALL_ORDERS_SUCCESS,
    LIST_ALL_ORDERS_FAIL,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAIL,
    LIST_MY_ORDERS_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../constants/orderConstants';

export const listAllOrdersReducer = (state = { orders:[] }, action) => {
    switch (action.type) {
        case LIST_ALL_ORDERS_REQUEST:
            return {
                loading: true
            }
        
        case LIST_ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case LIST_ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [] }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        default:
            return state
    }
} 

export const listMyOrdersReducer = (state = { orders:[] }, action) => {
    switch (action.type) {
        case LIST_MY_ORDERS_REQUEST:
            return {
                loading: true
            }
        
        case LIST_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case LIST_MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case LIST_MY_ORDERS_RESET:
            return { orders: [] }

        default:
            return state;
    }
} 