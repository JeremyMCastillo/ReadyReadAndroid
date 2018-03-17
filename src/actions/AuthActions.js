import axios from 'axios';
import { AUTH_URL_RECEIVED, AUTH_URL_ERROR } from './types';

export const loginGoodreads = () => {
    return (dispatch) => {
        axios.get('http://10.0.2.2:3030/users/oauth')
        .then((authUrl) => {
            console.log(authUrl);
            dispatch({
                type: AUTH_URL_RECEIVED,
                payload: authUrl.data
            });
        })
        .catch((error) => {
            dispatch({
                type: AUTH_URL_ERROR,
                payload: JSON.stringify(error)
            });
        });
    };
};
