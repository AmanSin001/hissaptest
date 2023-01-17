import React, { useEffect, useState } from 'react';
import { EventsActionTypes } from './types';
import moment from 'moment';
import randomColor from 'randomcolor';
import Toast from 'react-native-toast-message';
import { StackActions, CommonActions } from '@react-navigation/native';
import { NavigationContext } from '@react-navigation/native';

let INITIAL_STATE = {
  events: [],
  events_loading: false,
  events_error: null,
  marked_dates: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventsActionTypes.EVENTS:
      return {
        ...state,
        events: action.payload,
        events_loading: false,
        events_error: null,
      };
    case EventsActionTypes.EVENTS_LOADING:
      return {
        ...state,
        events: null,
        events_loading: true,
        events_error: null,
      };
    case EventsActionTypes.EVENTS_ERROR:
      return {
        ...state,
        events: null,
        events_loading: false,
        events_error: action.payload,
      };
    case EventsActionTypes.MARKED_DATES:
      return {
        ...state,
        marked_dates: action.payload,
        newEvent: null
      };

    case EventsActionTypes.UPDATE_SINGLE_EVENT:
      // console.log('Reducer data', action.payload);
      let newAllEvents = updateSingleEvent(state.events, action.payload);
      return {
        ...state,
        events: newAllEvents,
      };

    case EventsActionTypes.ADD_NEW_EVENT:
      let addData = addNewEvent(
        action.payload,
        state.events,
        state.marked_dates,
      );
      return {
        ...state,
        events: addData.allEvents,
        marked_dates: addData.marked,
        newEvent: action.payload,
        updatedEvent: null
      };

    case EventsActionTypes.UPDATE_EVENT:
      let updateData = updateEvent(
        action.payload,
        state.events,
        state.marked_dates,
      );
      return {
        ...state,
        events: updateData.allEvents,
        marked_dates: updateData.markedDates,
        newEvent: null,
        updatedEvent: action.payload
      };
    case EventsActionTypes.DELETE_EVENT:
      let deleteData = deleteEvent(
        action.payload,
        state.events,
        state.marked_dates
      );
      return {
        ...state,
        events: deleteData.allEvents,
        marked_dates: deleteData.markedDates,
        newEvent: null,
        deletedEvent: action.payload
      };
    default:
      return state;
  }
};

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

const updateSingleEvent = (allEvents, newEvent) => {
  console.log('All Events Redux', allEvents);
  // console.log('New Events Redux', newEvent);

  const event = newEvent?.newEventData;
  let newAllEvents = { ...allEvents };
  for (let i = 0; i < newAllEvents?.events.length; i++) {
    let element = newAllEvents?.events[i];
    if (element?.id === event?.id) {
      newAllEvents.events[i] = event;
      console.log('Found The Event');
      console.log(newAllEvents.events[i].status);
      break;
    }
  }

  return newAllEvents;
};

const sortedEvents = (events = []) => {
  let sorted = events.sort((a, b) => moment(a?.startTime) - moment(b?.startTime));
  return sorted;
};

const deleteAndUpdateMarkCalender = (markedDates = [], newEvent = {}) => {};

const singleMarkCalendarHandler = (markedDates = [], newEvent = {}) => {
  let marked = [...markedDates];
  // console.log('Event length', events?.length);

  let found = false;
  for (let j = 0; j < marked.length; j++) {
    const mark = marked[j];
    if (moment(mark.date).isSame(moment(newEvent.startTime), 'day')) {
      found = true;
      mark.dots.push({ color: randomColor() });
    }
  }
  if (found === false) {
    marked.push({
      date: newEvent.startTime,
      dots: [
        {
          color: randomColor(),
        },
      ],
    });
    return marked;
  }

  // console.log('Marked Array', marked);
  return marked;
};

const addNewEvent = (newEvent, allEvents, markedDates) => {
  allEvents.events = [...allEvents.events, newEvent];
  allEvents.events = sortedEvents(allEvents.events);
  let marked = singleMarkCalendarHandler(markedDates, newEvent);
  return {
    allEvents,
    marked,
  };
};

const updateEvent = (newEvent, allEvents, markedDates) => {
  console.log("UPDATING____________________________________________")
  let index = allEvents?.events?.findIndex(event => event.id === newEvent.id);
  console.log(index);
  if (index !== -1) {
    allEvents.events[index] = newEvent;
  }
  allEvents.events = sortedEvents(allEvents.events);
  markedDates = markCalendarHandler(allEvents.events)
  console.log(markedDates)
  return {
    allEvents,
    markedDates,
  };
};

const deleteEvent = (newEvent, allEvents, markedDates) => {
  const index = allEvents?.events?.findIndex(event => event.id === newEvent.id);
  console.log(index);
  if (index !== -1) {
    console.log(newEvent.id)
    console.log(`Deleting event`);
    console.log(allEvents.events.length);
    allEvents.events = allEvents.events.filter(
      event => event.id !== newEvent.id,
    );
    console.log(allEvents.events.length);
    markedDates = markCalendarHandler(allEvents.events)
  }
  return {
    allEvents,
    markedDates,
  };
};
