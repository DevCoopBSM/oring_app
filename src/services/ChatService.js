import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

let stompClient = null;
let isConnected = false;
let isFirstMessage = true;

// API 기본 설정
const api = axios.create({
  baseURL: 'https://oring.bsm-aripay.kr',
  timeout: 10000,
});

// 채팅방 정보 가져오기
export const getChatRoomInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await api.get('/api/chat/rooms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat room info:', error);
    throw error;
  }
};

export const initializeWebSocket = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    console.log('Starting STOMP initialization');

    if (stompClient) {
      await disconnect();
    }

    const wsUrl = 'wss://oring.bsm-aripay.kr/api/wsChat';
    console.log('Connecting to WebSocket URL:', wsUrl);

    stompClient = new Client({
      brokerURL: wsUrl,
      connectHeaders: {
        'Authorization': `Bearer ${token}`
      },
      debug: function (str) {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => {
        const ws = new WebSocket(wsUrl, [], {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        ws.onclose = (event) => {
          console.log('WebSocket Connection Closed', event.code, event.reason);
          isConnected = false;
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket Error Details:', error);
        };

        ws.onopen = () => {
          console.log('WebSocket Connection Opened');
        };
        
        return ws;
      }
    });

    return new Promise((resolve, reject) => {
      let timeoutId = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, 15000);

      stompClient.onConnect = (frame) => {
        console.log('STOMP Connected Successfully', frame);
        clearTimeout(timeoutId);
        isConnected = true;
        resolve(stompClient);
      };

      stompClient.onStompError = (frame) => {
        console.error('STOMP Error:', frame);
        clearTimeout(timeoutId);
        isConnected = false;
        reject(frame);
      };

      try {
        console.log('Activating STOMP client...');
        stompClient.activate();
      } catch (error) {
        console.error('Error activating STOMP client:', error);
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  } catch (error) {
    console.error('STOMP initialization failed:', error);
    throw error;
  }
};

export const subscribeToChat = async (chatRoomId, callback) => {
  try {
    if (!stompClient || !isConnected) {
      throw new Error('STOMP client not connected');
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const subscribeHeaders = {
      'Authorization': `Bearer ${token}`
    };
    
    const subscription = stompClient.subscribe(
      `/subChat/chatRoom/${chatRoomId}`, 
      (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          callback(receivedMessage);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      },
      subscribeHeaders
    );

    return subscription;
  } catch (error) {
    console.error('Error subscribing to chat:', error);
    throw error;
  }
};

export const sendMessage = async (message, existingChatRoomId = null) => {
  try {
    if (!stompClient || !isConnected) {
      console.log('Attempting to reconnect...');
      await initializeWebSocket();
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const messageData = {
      userName: '박강은',
      messageType: isFirstMessage ? 'ENTER' : 'TALK',
      message: message
    };

    if (existingChatRoomId) {
      messageData.chatRoomId = existingChatRoomId;
    }

    console.log('Sending message to /pubChat/message:', messageData);

    stompClient.publish({
      destination: '/pubChat/message',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });

    if (isFirstMessage) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const chatRoomInfo = await getChatRoomInfo();
      isFirstMessage = false;
      return {
        messageData,
        chatRoomInfo
      };
    }

    return messageData;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const resetChatState = () => {
  isFirstMessage = true;
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    isConnected = false;
  }
};

// 재연결 함수 개선
export const reconnectWebSocket = async () => {
  console.log('Starting reconnection process');
  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      await disconnect();
      // 재연결 전 약간의 지연 추가
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Attempting reconnection ${retryCount + 1}/${maxRetries}`);
      const client = await initializeWebSocket();
      console.log('Reconnection successful');
      return client;
    } catch (error) {
      console.error(`Reconnection attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      // 재시도 간격 증가
      await new Promise(resolve => setTimeout(resolve, 3000 * (retryCount + 1)));
    }
  }
  throw new Error('Failed to reconnect after multiple attempts');
};

// 토큰 유효성 검사 함수도 수정
export const validateToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch('https://oring.bsm-aripay.kr/api/auth/validate', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}; 