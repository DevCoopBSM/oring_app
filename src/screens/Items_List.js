import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllItems, getCategoryItems } from '../services/itemAuth';
import defaultImage from './assets/items/picnic_red.jpg';

const Index = () => {
  const navigation = useNavigation();
  const menuItems = ['전체', '과자', '음료', '아이스크림', '생필품'];
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 상품 목록 불러오기
  const fetchItems = async (category) => {
    setLoading(true);
    try {
      const response = category === '전체' 
        ? await getAllItems()
        : await getCategoryItems(category);
      
      if (response && response.itemList) {
        setItems(response.itemList);
      } else {
        console.error('Invalid response format:', response);
        Alert.alert('오류', '데이터 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Fetch items error:', error);
      if (error.message.includes('접근 권한')) {
        // 'Main' 스택의 'Login' 스크린으로 이동
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('오류', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 변경 시 상품 목록 업데이트
  useEffect(() => {
    fetchItems(selectedCategory);
  }, [selectedCategory]);

  const onDetail = (itemId) => {
    navigation.navigate('Detail', { itemId });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.categoryList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryBox,
              {
                backgroundColor:
                  selectedCategory === item ? '#F49E15' : '#CCCCCC',
              },
            ]}>
            <Text style={styles.category}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.menuList}>
        {loading ? (
          <Text style={styles.loadingText}>로딩 중...</Text>
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.itemId}
              style={styles.menuBox}
              onPress={() => onDetail(item.itemId)}>
              <Image 
                source={
                  item.itemImage 
                    ? { uri: `data:image/jpeg;base64,${item.itemImage}` }
                    : defaultImage
                } 
                style={styles.menuImg} 
              />
              <View style={styles.menuContent}>
                <Text style={styles.menuItem}>{item.itemName}</Text>
                <Text style={styles.menuPrice}>
                  가격 : {item.itemPrice.toLocaleString()}원 | 수량 : {item.itemQuantity}개
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

// 기존 스타일에 로딩 텍스트 스타일 추가
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  categoryList: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryBox: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  category: {
    color: '#FFF',
    fontSize: 16,
  },
  menuList: {
    paddingVertical: 10,
  },
  menuBox: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuImg: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Index;
