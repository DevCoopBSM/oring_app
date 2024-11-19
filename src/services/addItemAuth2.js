import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = 'https://oring.bsm-aripay.kr';

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

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
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

export const addSnapshotItem = async (itemData) => {
  try {
    const itemName = itemData.explain
      ? `${itemData.company}_${itemData.productName}_${itemData.explain}`
      : `${itemData.company}_${itemData.productName}`;

    const requestData = {
      items: [
        {
          itemCode: itemData.barcode,
          itemName: itemName,
          itemExplain: itemData.explain || '',
          itemQuantity: parseInt(itemData.quantity)
        }
      ]
    };

    console.log('Sending request to server:', requestData);

    const response = await api.post('/api/inventory/snapshot', requestData);

    console.log('Server response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Snapshot addition error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    if (error.response?.status === 403) {
      throw new Error('서버 접근이 거부되었습니다. User-Agent 설정을 확인해주세요.');
    }
    throw new Error('재고 스냅샷 추가에 실패했습니다.');
  }
}; 