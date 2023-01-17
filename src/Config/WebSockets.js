import React, { useEffect } from 'react';
import { webSocketUrl } from './config';
import moment from 'moment';
import { addNewEvent } from '../redux/Events/actions';

export let socket;

export const reconnectWebsocket = () => {
  console.log('New websocket connection', moment(new Date()).format('LLLL'));
  socket?.close();
  socket = new WebSocket(webSocketUrl);
  console.log(socket);
};

const WebSockets = () => {
  useEffect(() => {
    socket = new WebSocket(webSocketUrl);

    socket.onopen = e => {
      // an error occurred
      console.log('Open Socket', e);
    };

    socket.onerror = e => {
      // an error occurred
      console.log('Error Socket', e);

      socket?.close();
    };

    socket.addEventListener('message', ({ data }) => {
      // console.log(data);
    });

    socket.onclose = e => {
      // connection closed
      console.log('Close Socket', e);

      setTimeout(() => {
        reconnectWebsocket();
      }, 1000);
    };
  }, []);
  return null;
};

export default WebSockets;
