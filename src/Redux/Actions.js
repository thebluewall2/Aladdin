import authActions from './Auth/actions';
import homeActions from './Home/actions';
import settingsActions from './Settings/actions';

export default {
  ...authActions,
  ...homeActions,
  ...settingsActions,
};
