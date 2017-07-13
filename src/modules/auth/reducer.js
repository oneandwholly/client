import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './actionTypes';

export default (state = { authenticated: false }, action) => {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
    }
    return state;
}
