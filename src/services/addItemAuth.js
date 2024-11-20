import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = 'https://oring.bsm-aripay.kr';

// User-Agent 생성 함수
const getUserAgent = () => {
  const defaultAgent = Platform.select({
    ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    android: 'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
  });
  return defaultAgent;
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 인터셉터 수정
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // User-Agent 헤더 재설정
    if (config.headers['User-Agent']) {
      delete config.headers['User-Agent'];
    }
    config.headers['User-Agent'] = getUserAgent();
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 재고 추가 함수
export const addInventoryItem = async (itemData) => {
  try {
    const response = await api.post('/api/inventory/inventory', {
      items: [
        {
          itemCode: itemData.itemCode,
          itemName: itemData.itemName,
          itemQuantity: parseInt(itemData.itemQuantity),
          reason: itemData.reason
        }
      ]
    });

    return response.data;
  } catch (error) {
    console.error('Inventory addition error:', error.response?.data || error.message);
    if (error.response?.status === 403) {
      throw new Error('서버 접근이 거부되었습니다. User-Agent 설정을 확인해주세요.');
    }
    throw new Error('재고 추가에 실패했습니다.');
  }
}; 