import { AUTH_URL_RECEIVED, AUTH_URL_ERROR } from '../actions/types';

const INITIAL_STATE = {
    oauthUri: '',
    oauthError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_URL_RECEIVED:
            return { ...state, oauthUri: action.payload };
        case AUTH_URL_ERROR:
            return { ...state, oauthError: action.payload };
        default:
        return state;
    }
};
