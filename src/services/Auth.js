import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://oring.bsm-aripay.kr';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 인터셉터 추가
api.interceptors.request.use(
  config => {
    config.headers['User-Agent'] = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 로그인 함수
export const login = async (userEmail, userPassword) => {
  try {
    console.log('Attempting login with:', { userEmail, userPassword });
    
    const response = await api.post('/api/auth/login', {
      userEmail,
      userPassword,
    });

    console.log('Response headers:', response.headers);
    console.log('Response data:', response.data);

    // 토큰 저장
    const token = response.headers['authorization'];
    if (token) {
      try {
        await AsyncStorage.setItem('userToken', token.replace('Bearer ', ''));
        console.log('Token saved successfully');
      } catch (storageError) {
        console.error('Token storage error:', storageError);
      }
    }

    return response.data;
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      data: error.response?.data,
    });
    if (error.response?.status === 403) {
      throw new Error('일시적으로 서버 접근이 제한되었습니다. 잠시 후 다시 시도해주세요.');
    }
    throw new Error('로그인에 실패했습니다.');
  }
};

// 로그아웃 함수
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// 토큰 확인 함수
export const checkToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token !== null;
  } catch (error) {
    console.error('Token check error:', error);
    return false;
  }
}; 