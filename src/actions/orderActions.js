import { beduStoreAPI } from '../api/beduStoreAPI';
import {
    LIST_ALL_ORDERS_REQUEST,
    LIST_ALL_ORDERS_SUCCESS,
    LIST_ALL_ORDERS_FAIL,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/orderConstants';

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ALL_ORDERS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data: { data } } = await beduStoreAPI.get(`/orders`, config);

        dispatch({
            type: LIST_ALL_ORDERS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: LIST_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data: { data } } = await beduStoreAPI.get(`/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MY_ORDERS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data: { data } } = await beduStoreAPI.get(`/orders/myorders`, config);

        dispatch({
            type: LIST_MY_ORDERS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}