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
    PRODUCT_DETAILS_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESET,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_FAIL,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;

    }
}

export const productListWithQueryReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_WITH_QUERY_REQUEST:
            return {
                loading: true,
                products: []
            }

        case PRODUCT_LIST_WITH_QUERY_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                pagination: action.pagination,
                totalPages: action.totalPages
            }

        case PRODUCT_LIST_WITH_QUERY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;

    }
}

export const searchProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_SEARCH_SUCCESS:
            return {
                loading: false,
                products: action.products,
                page: action.page,
                pages: action.pages
            }

        case PRODUCT_SEARCH_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;

    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case PRODUCT_DETAILS_RESET:
            return {
                product: {}
            }

        default:
            return state;

    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }

        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state;

    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PRODUCT_CREATE_REVIEW_RESET:
            return { }

        default:
            return state;
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }

        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PRODUCT_UPDATE_RESET:
            return { 
                product: {}, 
                success: false 
            }

        default:
            return state;

    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case PRODUCT_DELETE_RESET:
            return {
                loading: false,
                success: false,
            }

        default:
            return state;

    }
}