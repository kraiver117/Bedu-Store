import { beduStoreAPI } from '../api/beduStoreAPI';
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_WITH_QUERY_SUCCESS,
    PRODUCT_LIST_WITH_QUERY_FAIL,
    PRODUCT_LIST_WITH_QUERY_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const { data } = await beduStoreAPI.get(`/products`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data.data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const searchProducts = (keyword = '', pageNumber = 1) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_SEARCH_REQUEST
        });

        const { data } = await beduStoreAPI.get(`/products/search/${keyword}?page=${pageNumber}`);

        dispatch({
            type: PRODUCT_SEARCH_SUCCESS,
            products: data.products,
            page: data.page,
            pages: data.pages
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_SEARCH_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const listProductsWithQuery = (category = '', page = '', limit = '') => async (dispatch) => {
    if (category === 'Todas') category = '';
    
    try {
        dispatch({
            type: PRODUCT_LIST_WITH_QUERY_REQUEST
        });

        const { data } = await beduStoreAPI.get(`/products?${category && `category=${category}`}&limit=${limit.toString()}&page=${page.toString()}`);

        dispatch({
            type: PRODUCT_LIST_WITH_QUERY_SUCCESS,
            payload: data.data,
            pagination: data.pagination,
            totalPages: data.totalPages
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_WITH_QUERY_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data: { data } } = await beduStoreAPI.get(`/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await beduStoreAPI.post(`/products`, product, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data: { data } } = await beduStoreAPI.put(`/products/${product._id}`, product, config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await beduStoreAPI.delete(`/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}
