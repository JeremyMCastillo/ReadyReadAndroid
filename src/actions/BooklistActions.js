import axios from 'axios';
import { SYNC_GOODREADS_SUCCESS, SYNC_GOODREADS_ERROR } from './types';

export const syncGoodreadsList = ({ readyreadAuthToken, goodreadsUserId }) => {
    return (dispatch) => {
        axios.post('http://10.0.2.2:3030/books/sync', { goodreadsUserId }, { headers: { 'x-auth': readyreadAuthToken } })
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: SYNC_GOODREADS_SUCCESS,
                payload: {
                    books: res.data.list
                }
            });
        })
        .catch((e) => {
            console.log(e);
            dispatch({
                type: SYNC_GOODREADS_ERROR,
                payload: e
            });
        });
    };
};
