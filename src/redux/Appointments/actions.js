import { AppointmentsActionTypes } from './types';
import { socket } from '../../Config/WebSockets';

export const getAllAppointments = token => async dispatch => {
  dispatch({ type: AppointmentsActionTypes.APPOINTMENTS_LOADING });
  try {
    socket.send(
      JSON.stringify({
        request: 'getAllAppointments',
        token,
      }),
    );
    socket.addEventListener('message', async ({ data }) => {
      if (data) {
        data = JSON.parse(data);
        // console.log('Appointments', data);
        if (data?.request === 'getAllAppointments' && data?.error === true) {
          dispatch({
            type: AppointmentsActionTypes.APPOINTMENTS_ERROR,
            payload: data,
          });
        } else if (
          data?.request === 'getAllAppointments' &&
          data?.success === true
        ) {
          dispatch({
            type: AppointmentsActionTypes.APPOINTMENTS,
            payload: data,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AppointmentsActionTypes.APPOINTMENTS_ERROR,
      payload: error,
    });
  }
};
