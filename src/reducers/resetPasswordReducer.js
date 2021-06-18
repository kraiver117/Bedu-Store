import { 
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_RESET
} from '../constants/resetPasswordConstants';

export const resetPasswordReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }

        case USER_RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                successMessage: action.payload
            }

        case USER_RESET_PASSWORD_FAIL:
            return {
                loading: false,
                errorMessage: action.payload
            }

        case USER_RESET_PASSWORD_RESET:
            return { }

        default:
            return state;

    }
}