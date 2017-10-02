import Types from './types';

const authSetUserType = (userType) => ({
  type: Types.AUTH_SET_USER_TYPE,
  userType
});

export default {
  authSetUserType,
}
