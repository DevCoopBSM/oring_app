import { getItemDetails as fetchItemDetails } from './itemAuth'; // itemAuth에서 가져오기

// 아이템 세부 정보 조회
export const getItemDetails = async (itemId) => {
  try {
    const itemDetails = await fetchItemDetails(itemId); // itemAuth의 함수 호출
    return itemDetails;
  } catch (error) {
    console.error('Get item details error:', error);
    throw new Error('아이템 세부 정보를 불러오는데 실패했습니다.');
  }
}; 