import { combineReducers } from 'redux';
import Auth from './Auth';
import Home from './Home';
import Settings from './Settings';

export default combineReducers({
  auth: Auth.reducer,
  home: Home.reducer,
  settings: Settings.reducer,
});
