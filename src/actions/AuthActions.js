// import { Linking } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';
import { 
    AUTH_URL_ERROR,
    AUTH_SUCCESS, 
    AUTH_FIELD_CHANGED,
    USER_SIGNED_IN
} from './types';

export const loginFieldChanged = ({ prop, value }) => {
    return {
        type: AUTH_FIELD_CHANGED,
        payload: { prop, value }
    };
};

export const loginOrSignup = (newUser, email, password, goodreadsUserId, goodreadsAccessToken) => {
    if (newUser) {
        // Sign them up and then set state accordingly 
        const body = {
            email, 
            password,
            goodreadsUserId,
            goodreadsAccessToken
        };

        return (dispatch) => {
            axios.post('http://10.0.2.2:3030/users/signup', body).then((user) => {
                dispatch({
                    type: USER_SIGNED_IN,
                    payload: user
                });
            });
        };
    }

    // Log them in and set state accordingly
};

export const signupGoodreads = () => {
    return (dispatch) => {
        axios.get('http://10.0.2.2:3030/users/oauth?source=android')
        .then((authUrl) => {
            console.log(authUrl.data);

            Linking.openURL(authUrl.data);
        })
        .catch((error) => {
            dispatch({
                type: AUTH_URL_ERROR,
                payload: JSON.stringify(error)
            });
        });
    };
};

export const loginGoodreads = ({ email, password }) => {
    return (dispatch) => {
        const body = {
            email,
            password
        };
        axios.post('http://10.0.2.2:3030/users/login', body)
        .then((response) => {
            const user = response.data;
            console.log(user);
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    goodreadsUserId: user.goodreadsUserId,
                    authToken: user.goodreadsAccessToken
                }
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

export const loginGoodreadsSuccess = (data) => {
    // Pull off auth token query param value with regex.
    // const authToken = receivedCallbackUrl.match(/oauth_token=([^&]*)/);
    const authorize = data.receivedCallbackUrl.match(/authorize=([^&]*)/)[1];
  
    return (dispatch) => {
        const packet = {
            authorize,
            username: data.username,
            password: data.password
        };
        
        axios.post('http://10.0.2.2:3030/callback', packet)
        .then((response) => {
            console.log(response);
            dispatch({
                type: AUTH_SUCCESS,
                payload: { 
                    goodreadsUserId: response.data.user.goodreadsUserId, 
                    authToken: response.data.user.goodreadsAccessToken 
                }
            });
        });
    };
};
