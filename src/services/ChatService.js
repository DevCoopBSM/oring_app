import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

let stompClient = null;

export const initializeWebSocket = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');

    // SockJS를 사용하여 WebSocket 연결
    const socket = new SockJS('https://oring.bsm-aripay.kr/api/wsChat');

    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        'Authorization': `Bearer ${token}`,
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: (frame) => {
        console.log('STOMP Connected:', frame);
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.activate();

  } catch (error) {
    console.error('WebSocket setup failed:', error);
    throw error;
  }
};

export const subscribeToChat = (chatRoomId, callback) => {
  if (!stompClient) throw new Error('STOMP client not connected');

  stompClient.subscribe(`/subChat/chatRoom/${chatRoomId}`, (message) => {
    const data = JSON.parse(message.body);
    callback(data);
  });
};

export const sendMessage = async (message, chatRoomId = null) => {
  if (!stompClient) throw new Error('STOMP client not connected');

  const messageData = {
    userName: '박강은',
    messageType: 'TALK',
    message: message,
    ...(chatRoomId && { chatRoomId })
  };

  stompClient.publish({
    destination: '/pubChat/messaging',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
}; 