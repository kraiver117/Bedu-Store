import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGOUT
} from '../constants/userConstants';
import { beduStoreAPI } from '../api/beduStoreAPI';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await beduStoreAPI.post(
            '/auth/login',
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');

    dispatch({ type: USER_LOGOUT });
}