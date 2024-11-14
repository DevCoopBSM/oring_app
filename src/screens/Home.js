import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import arrow from './assets/arrow_color.png';
import picnic_red from './assets/items/picnic_red.jpg';
import picnic_green from './assets/items/picnic_green.jpg';
import meat from './assets/items/meat.jpg';
import kimchi from './assets/items/kimchi.jpg';
import worldcon_red from './assets/items/worldcon_red.png';
import worldcon_blue from './assets/items/worldcon_blue.png';
import alloa from './assets/items/alloa.jpg';
import con from './assets/items/99con.jpg';
import supercon_red from './assets/items/supercon_red.jpg';
import {Shadow} from 'react-native-shadow-2';

const Index = () => {
  const navigation = useNavigation();
  const username = '박강은';
  const amount = 1400;

  const onCharge = () => {
    navigation.navigate('Charge');
  };

  const menuItems = [
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

  const menuItems2 = [
    {name: '웅진_가야농장_알로에', img: alloa, price: 1300, num: 38},
    {name: '롯데_구구콘_오리지널', img: con, price: 1400, num: 7},
    {name: '빙그레_슈퍼콘_초코맛', img: supercon_red, price: 1400, num: 15},
    {name: '사조_김치포자만두', img: kimchi, price: 2000, num: 22},
    {name: '롯데_월드콘_바닐라맛', img: worldcon_red, price: 1400, num: 10},
    {name: '롯데_월드콘_쿠앤크맛', img: worldcon_blue, price: 1400, num: 13},
    {name: '매일_피크닛_사과맛', img: picnic_red, price: 700, num: 50},
    {name: '매일_피크닛_청포도맛', img: picnic_green, price: 700, num: 48},
    {name: '사조_고기포자만두', img: meat, price: 2000, num: 20},
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
            distance={5}
            startColor={'#00000010'}
            endColor={'#00000000'}
            offset={[13, 2]}>
            <View key={index} style={styles.menuBox}>
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
      <ScrollView horizontal style={styles.menuList}>
        {menuItems2.map((item, index) => (
          <Shadow
            distance={5}
            startColor={'#00000010'}
            endColor={'#00000000'}
            offset={[13, 2]}>
            <View key={index} style={styles.menuBox}>
              <Image source={item.img} style={styles.menuImg} />
              <Text style={styles.menuItem}>{item.name}</Text>
              <Text style={styles.menuPrice}>
                {item.price.toLocaleString()}원 | {item.num} 개
              </Text>
            </View>
          </Shadow>
        ))}
      </ScrollView>
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
