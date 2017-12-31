import authActions from './Auth/actions';
import homeActions from './Home/actions';
import requestsActions from './Requests/actions';
import settingsActions from './Settings/actions';

export default {
  ...authActions,
  ...homeActions,
  ...requestsActions,
  ...settingsActions,
};
