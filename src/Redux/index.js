import { combineReducers } from 'redux';
import Auth from './Auth';
import Home from './Home';

export default combineReducers({
  auth: Auth.reducer,
  home: Home.reducer,
});
