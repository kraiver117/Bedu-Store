import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
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

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
} 

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