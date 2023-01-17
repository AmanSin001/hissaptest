import { combineReducers } from 'redux';
import authReducer from './Auth/reducer';
import eventsReducer from './Events/reducer';
import appointmentsReducer from './Appointments/reducer';

export default combineReducers({
  auth: authReducer,
  events: eventsReducer,
  appointments: appointmentsReducer,
});
