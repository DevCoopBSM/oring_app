import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import picnic_red from './assets/items/picnic_red.jpg';
import picnic_green from './assets/items/picnic_green.jpg';
import meat from './assets/items/meat.jpg';
import kimchi from './assets/items/kimchi.jpg';
import worldcon_red from './assets/items/worldcon_red.png';
import worldcon_blue from './assets/items/worldcon_blue.png';
import alloa from './assets/items/alloa.jpg';
import con from './assets/items/99con.jpg';
import supercon_red from './assets/items/supercon_red.jpg';

const Index = () => {
  const navigation = useNavigation();
  const menuItems = ['전체', '과자', '음료', '아이스크림', '생필품'];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const onDetail = () => {
    navigation.navigate('Detail');
  };

  const Items = [
    {name: '매일_피크닛_사과맛', img: picnic_red, price: 700, num: 50},
    {name: '매일_피크닛_청포도맛', img: picnic_green, price: 700, num: 48},
    {name: '사조_고기포자만두', img: meat, price: 2000, num: 20},
    {name: '사조_김치포자만두', img: kimchi, price: 2000, num: 22},
    {name: '롯데_월드콘_바닐라맛', img: worldcon_red, price: 1400, num: 10},
    {name: '롯데_월드콘_쿠앤크맛', img: worldcon_blue, price: 1400, num: 13},
    {name: '웅진_가야농장_알로에', img: alloa, price: 1300, num: 38},
    {name: '롯데_구구콘_오리지널', img: con, price: 1400, num: 7},
    {name: '빙그레_슈퍼콘_초코맛', img: supercon_red, price: 1400, num: 15},
  ];

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
        {Items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuBox}
            onPress={onDetail}>
            <Image source={item.img} style={styles.menuImg} />
            <View style={styles.menuContent}>
              <Text style={styles.menuItem}>{item.name}</Text>
              <Text style={styles.menuPrice}>
                가격 : {item.price.toLocaleString()}원 | 수량 : {item.num}개
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Index;

// 스타일 정의
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
});
