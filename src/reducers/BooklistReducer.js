import { SYNC_GOODREADS_SUCCESS, SYNC_GOODREADS_ERROR } from '../actions/types';

const INITIAL_STATE = {
    books: [],
    syncError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SYNC_GOODREADS_SUCCESS:
            return { ...state, books: action.payload.books };
        case SYNC_GOODREADS_ERROR:
            return { ...state, syncError: action.payload.syncError };
        default:
        return state;
    }
};
