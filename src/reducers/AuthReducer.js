import { 
    AUTH_URL_RECEIVED, 
    AUTH_URL_ERROR, 
    AUTH_SUCCESS, 
    AUTH_FIELD_CHANGED 
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    oauthUri: '',
    oauthError: '',
    oauthToken: '',
    goodreadsUserId: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_FIELD_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case AUTH_URL_RECEIVED:
            return { ...state, oauthUri: action.payload };
        case AUTH_URL_ERROR:
            return { ...state, oauthError: action.payload };
        case AUTH_SUCCESS:
            return { 
                ...state, 
                ...INITIAL_STATE, 
                oauthToken: action.payload.authToken, 
                goodreadsUserId: action.payload.goodreadsUserId 
            };
        default:
        return state;
    }
};
