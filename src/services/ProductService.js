import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://oring.bsm-aripay.kr';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 토큰 가져오기 함수
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Retrieved token:', token); // 토큰 로깅
    return token;
  } catch (error) {ㅇ
    console.error('Token retrieval error:', error);
    return null;
  }
};

// 인터셉터 추가
api.interceptors.request.use(
  async config => {
    const token = await getToken();
    
    // 요청 설정 로깅
    console.log('Request config:', {
      url: config.url,
      method: config.method,
      token: token ? 'exists' : 'not found',
    });

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['User-Agent'] = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    
    // 최종 헤더 로깅
    console.log('Request headers:', config.headers);
    
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => {
    console.log('Response received:', {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  error => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// 추천 상품 조회
export const fetchRecommendedProducts = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('접근 권한이 없습니다. 다시 로그인해주세요.');
    }

    const response = await api.get('/api/ai/recommend');
    console.log('Recommended products response:', response.data);
    
    if (!response.data) {
      throw new Error('데이터를 받아오지 못했습니다.');
    }
    
    return response.data.recommendList.map(item => ({
      itemId: item.itemId,
      itemName: item.itemName,
      itemImage: item.itemImage ? `data:image/jpeg;base64,${item.itemImage}` : null,
      itemPrice: item.itemPrice,
      itemQuantity: item.itemQuantity,
    }));
  } catch (error) {
    console.error('Fetch recommended products error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    if (error.response?.status === 403) {
      throw new Error('접근 권한이 없습니다. 다시 로그인해주세요.');
    }
    throw new Error('추천 상품을 불러오는데 실패했습니다.');
  }
}; 