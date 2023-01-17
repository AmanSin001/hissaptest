import { AuthActionTypes } from './types';

let INITIAL_STATE = {
  auth: null,
  auth_loading: true,
  auth_error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH:
      return {
        ...state,
        auth: action.payload,
        auth_loading: false,
        auth_error: null,
      };
    case AuthActionTypes.AUTH_LOADING:
      return {
        ...state,
        auth_loading: true,
        auth_error: null,
      };
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...state,
        auth: false,
        auth_loading: false,
        auth_error: action.payload,
      };
    case AuthActionTypes.LOGIN_REQUIRED:
      return {
        ...state,
        auth: false,
        auth_loading: false,
        auth_error: null,
      };
    default:
      return state;
  }
};
