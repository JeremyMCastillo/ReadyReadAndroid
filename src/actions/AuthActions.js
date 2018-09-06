// import { Linking } from 'react-native';
import axios from 'axios';
import { Linking, AsyncStorage } from 'react-native';
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
            axios.post('http://10.0.2.2:3030/users/signup', body)
            .then((response) => {
                const user = response.data;
                console.log(response);
                AsyncStorage.setItem('ReadyReadAuthToken', response.headers['x-auth']);

                dispatch({
                    type: AUTH_SUCCESS,
                    payload: {
                        goodreadsUserId: user.goodreadsUserId,
                        authToken: user.goodreadsAccessToken,
                        readyreadAuthToken: response.headers['x-auth']
                    }
                });
            });
        };
    }
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
            console.log(response);

            AsyncStorage.setItem('ReadyReadAuthToken', response.headers['x-auth']);
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    goodreadsUserId: user.goodreadsUserId,
                    authToken: user.goodreadsAccessToken,
                    readyreadAuthToken: response.headers['x-auth']
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

export const checkLoggedInUser = () => {
    return (dispatch) => {
        console.log('Checking for logged in user.');
        AsyncStorage.getItem('ReadyReadAuthToken')
        .then((readyreadAuthToken) => {
            axios.get('http://10.0.2.2:3030/users/me', { headers: { 'x-auth': readyreadAuthToken } })
            .then((response) => {
                const user = response.data;
                console.log(response);

                dispatch({
                    type: AUTH_SUCCESS,
                    payload: {
                        goodreadsUserId: user.goodreadsUserId,
                        authToken: user.goodreadsAccessToken,
                        readyreadAuthToken
                    }
                });
            })
            .catch((error) => {
                console.log('users/me error');
                console.log(error);
            });
        }, (error) => {
            console.log('AsyncStorage error');
            console.log(error);
        })
        .catch((error) => {
            console.log('AsyncStorage error');
            console.log(error);
        });
    };
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
