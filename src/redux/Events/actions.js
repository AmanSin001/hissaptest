import { EventsActionTypes } from './types';
import { socket } from '../../Config/WebSockets';
import randomColor from 'randomcolor';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const markCalendarHandler = (events = []) => {
  let marked = [];
  // console.log('Event length', events?.length);
  if (events.length !== 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      let found = false;
      for (let j = 0; j < marked.length; j++) {
        const mark = marked[j];
        if (moment(mark.date).isSame(moment(event.startTime), 'day')) {
          found = true;
          mark.dots.push({ color: randomColor() });
        }
      }
      if (found === false) {
        marked.push({
          date: event.startTime,
          dots: [
            {
              color: randomColor(),
            },
          ],
        });
      }
    }
  }
  // console.log('Marked Array', marked);
  return marked;
};

const sortedEvents = (events = []) => {
  let sorted = events.sort((a, b) => moment(a?.startTime) - moment(b?.startTime));
  return sorted;
};

export const getAllEventsbyIC =
  (token, idIntervenant, idChauffeur) => async dispatch => {
    dispatch({ type: EventsActionTypes.EVENTS_LOADING });
    try {
      const sendMessage = () => {
        if (socket.readyState === 1) {
          socket.send(
            JSON.stringify({
              request: 'getAllEventsByIC',
              token,
              idIntervenant: idIntervenant,
              idChauffeur: idChauffeur,
            }),
          );
        } else {
          setTimeout(() => {
            sendMessage();
          }, 1000);
        }
      };
      sendMessage();
      socket.addEventListener('message', async ({ data }) => {
        // console.log('Data', data);
        if (data) {
          let jsonData = await JSON.parse(data);
          // console.log('Events Action', jsonData);
          if (
            jsonData?.request === 'getAllEventsByIC' &&
            jsonData?.success === true
          ) {
            let events = jsonData.events;
            let markedDates = await markCalendarHandler(events);
            jsonData.events = await sortedEvents(events);
            dispatch({ type: EventsActionTypes.EVENTS, payload: jsonData });
            dispatch({
              type: EventsActionTypes.MARKED_DATES,
              payload: markedDates,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: EventsActionTypes.EVENTS_ERROR, payload: error });
    }
  };

export const getAllEvents = token => async dispatch => {
  dispatch({ type: EventsActionTypes.EVENTS_LOADING });
  try {
    socket.send(
      JSON.stringify({
        request: 'getAllEvents',
        token,
      }),
    );
    socket.addEventListener('message', async ({ data }) => {
      // console.log('Data', data);
      if (data) {
        let jsonData = await JSON.parse(data);
        // console.log('Events Action', jsonData);
        if (
          jsonData?.request === 'getAllEvents' &&
          jsonData?.success === true
        ) {
          let events = jsonData.events;
          let markedDates = await markCalendarHandler(events);
          jsonData.events = await sortedEvents(events);
          dispatch({ type: EventsActionTypes.EVENTS, payload: jsonData });
          dispatch({
            type: EventsActionTypes.MARKED_DATES,
            payload: markedDates,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: EventsActionTypes.EVENTS_ERROR, payload: error });
  }
};

export const updateSingleEvent = data => async dispatch => {
  dispatch({
    type: EventsActionTypes.UPDATE_SINGLE_EVENT,
    payload: data,
  });
};

export const addNewEvent = data => async dispatch => {
  dispatch({
    type: EventsActionTypes.ADD_NEW_EVENT,
    payload: data,
  });
};

export const updateEvent = data => async dispatch => {
  console.log("UPDATED")
  dispatch({
    type: EventsActionTypes.UPDATE_EVENT,
    payload: data,
  });
};

export const deleteEvent = data => async dispatch => {
  console.log("____REMOVED_____")
  console.log(data)
  console.log("____REMOVED_____")
  dispatch({
    type: EventsActionTypes.DELETE_EVENT,
    payload: data,
  });
};
