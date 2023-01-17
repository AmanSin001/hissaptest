import { AppointmentsActionTypes } from './types';

let INITIAL_STATE = {
  appointments: null,
  appointments_loading: false,
  appointments_error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppointmentsActionTypes.APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        appointments_loading: false,
        appointments_error: null,
      };
    case AppointmentsActionTypes.APPOINTMENTS_LOADING:
      return {
        ...state,
        appointments: null,
        appointments_loading: true,
        appointments_error: null,
      };
    case AppointmentsActionTypes.APPOINTMENTS_ERROR:
      return {
        ...state,
        appointments: null,
        appointments_loading: false,
        appointments_error: action.payload,
      };

    default:
      return state;
  }
};
