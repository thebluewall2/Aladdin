import { combineReducers } from 'redux';
import Auth from './Auth';
import Home from './Home';
import Requests from './Requests';
import Settings from './Settings';

export default combineReducers({
  auth: Auth.reducer,
  home: Home.reducer,
  requests: Requests.reducer,
  settings: Settings.reducer,
});
