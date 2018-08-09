import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BooklistReducer from './BooklistReducer';

export default combineReducers({
    auth: AuthReducer,
    books: BooklistReducer
});
