import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchRecommendedProducts} from '../services/ProductService';
import arrow from './assets/arrow_color.png';
import Epicnic_red from './assets/items/Epicnic_red.png';
import Pocari from './assets/items/Pocari.png';
import banana from './assets/items/banana.png';
import {Shadow} from 'react-native-shadow-2';

const Index = () => {
  const navigation = useNavigation();
  const username = '박강은';
  const amount = 1400;
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const onCharge = () => {
    navigation.navigate('Charge');
  };

  const getRecommendedProducts = async () => {
    try {
      const products = await fetchRecommendedProducts();
      setRecommendedProducts(products);
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  const menuItems = [
    {name: '매일_피크닛_사과맛', img: Epicnic_red, price: 700, num: 50},
    {name: '빙그레_바나나맛_우유', img: banana, price: 1800, num: 20},
    {name: '롯데_포카리스웨트', img: Pocari, price: 1300, num: 48},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>
        좋은 아침이에요,{'\n'} {username}님!
      </Text>
      <Shadow
        distance={5}
        startColor={'#00000010'}
        endColor={'#00000000'}
        offset={[22, 18]}>
        <TouchableOpacity style={styles.userAmountBox} onPress={onCharge}>
          <Text style={styles.amountText}>
            현재 사용 가능한 금액
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image source={arrow} style={styles.arrow} />
            </View>
          </Text>
          <Text style={styles.amount}>{amount.toLocaleString()}원</Text>
        </TouchableOpacity>
      </Shadow>
      <Text style={styles.recommedText}>
        ‘피크닉 청포도맛’을 즐겨드시는 {username}님!{'\n'}
        오늘은 이거 어때요?
      </Text>

      <ScrollView horizontal style={styles.menuList}>
        {menuItems.map((item, index) => (
          <Shadow
            key={index}
            distance={5}
            startColor={'#00000010'}
            endColor={'#00000000'}
            offset={[13, 2]}>
            <View style={styles.menuBox}>
              <Image source={item.img} style={styles.menuImg} />
              <Text style={styles.menuItem}>{item.name}</Text>
              <Text style={styles.menuPrice}>
                {item.price.toLocaleString()}원 | {item.num} 개
              </Text>
            </View>
          </Shadow>
        ))}
      </ScrollView>

      <Text style={styles.recommedText}>오늘의 추천 상품이에요 😎</Text>
      <FlatList
      data={recommendedProducts}
      keyExtractor={item => item.itemId.toString()}
      renderItem={({item}) => (
        <Shadow
          key={item.itemId}
          distance={5}
          startColor={'#00000010'}
          endColor={'#00000000'}
          offset={[13, 2]}
        >
          <View style={styles.menuBox}>
            <Image 
              source={{ uri: item.itemImage }}
              style={styles.menuImg} 
            />
            <Text style={styles.menuItem}>{item.itemName}</Text>
            <Text style={styles.menuPrice}>
              {item.itemPrice.toLocaleString()}원 | {item.itemQuantity} 개
            </Text>
      </View>
    </Shadow>
  )}
  horizontal
  style={styles.menuList}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'left',
  },
  userName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 800,
    marginTop: 40,
    lineHeight: 33,
    marginLeft: 30,
    textAlign: 'left',
  },
  userAmountBox: {
    width: 342,
    height: 80,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    marginTop: 15,
    marginLeft: 20,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 8,
    height: 12,
    marginLeft: 15,
  },
  amount: {
    fontSize: 20,
    fontFamily: 'NanumSquareEB',
    marginTop: 5,
    fontWeight: 800,
  },
  recommedText: {
    fontSize: 14,
    fontFamily: 'NanumSquareEB',
    marginTop: 20,
    textAlign: 'left',
    lineHeight: 25,
    marginLeft: 30,
  },
  menuList: {
    paddingVertical: 10,
    width: '100%',
    paddingLeft: 20,
  },
  menuBox: {
    width: 120,
    height: 160,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  menuImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  menuItem: {
    fontSize: 12,
    fontFamily: 'NanumSquareEB',
    textAlign: 'left',
    marginTop: 5,
    width: '100%',
    paddingHorizontal: 5,
  },
  menuPrice: {
    fontSize: 10,
    fontFamily: 'NanumSquareL',
    textAlign: 'left',
    marginTop: 3,
    width: '100%',
    paddingHorizontal: 5,
  },
});

export default Index;
