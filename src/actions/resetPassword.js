import {
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL
} from '../constants/resetPasswordConstants';
import { beduStoreAPI } from '../api/beduStoreAPI';
import { resetPasswordEmail } from '../services/emailJS/resetPassword/resetPasswordEmail';

export const resetPassword = (email) => async (dispatch) => {
    try {
        const from_name= 'Bedu Store';
        const newPassword = Math.floor(100000 + Math.random() * 900000).toString();

        dispatch({ type: USER_RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await beduStoreAPI.put(
            '/users/resetPassword',
            { email, password: newPassword },
            config
        );

        resetPasswordEmail(email, from_name, newPassword);

        dispatch({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        });
    }
}