import React from 'react';
import {Image, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import detail_arrow from './assets/back.png';
import detail_fix from './assets/fix.png';
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
  const menuItems = [
    {name: '매일_피크닛_사과맛', img: picnic_red, price: 700, num: 50},
    {name: '웅진_가야농장_알로에', img: alloa, price: 1300, num: 38},
    {name: '롯데_월드콘_쿠앤크맛', img: worldcon_blue, price: 1400, num: 13},
    {name: '롯데_구구콘_오리지널', img: con, price: 1400, num: 7},
    {name: '빙그레_슈퍼콘_초코맛', img: supercon_red, price: 1400, num: 15},
    {name: '롯데_월드콘_바닐라맛', img: worldcon_red, price: 1400, num: 10},
    {name: '사조_고기포자만두', img: meat, price: 2000, num: 20},
    {name: '사조_김치포자만두', img: kimchi, price: 2000, num: 22},
  ];

  const onFix = () => {
    navigation.navigate('Home');
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Icon>
        <TouchableOpacity onPress={onBack}>
          <Arrow source={detail_arrow} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFix}>
          <Fix source={detail_fix} />
        </TouchableOpacity>
      </Icon>
      <ItemImg source={picnic_green} />
      <DetailBox>
        <Contain>
          <ItemName>매일_피크닉_청포도맛</ItemName>
          <ItemPrice>700원</ItemPrice>
          <Inventory>제품 제고</Inventory>
          <ItemInventory>
            <Num>48개 </Num>
            <Date>· 2024.07.09 기준</Date>
          </ItemInventory>
        </Contain>
      </DetailBox>
      <RecommendBox>
        <RecommedText>비슷한 다른 메뉴를 추천해드릴게요! 🥰</RecommedText>
        <MenuList horizontal showsHorizontalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <Shadow
              distance={5}
              startColor={'#00000010'}
              endColor={'#00000000'}
              offset={[15, 5]}>
              <MenuBox key={index}>
                <MenuImg source={item.img} />
                <MenuItem>{item.name}</MenuItem>
                <MenuPrice>
                  {item.price.toLocaleString()}원 | {item.num} 개
                </MenuPrice>
              </MenuBox>
            </Shadow>
          ))}
        </MenuList>
      </RecommendBox>
    </Container>
  );
};

export default Index;

// 스타일 정의
const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View`
  position: absolute;
  top: 2rem;
  left: 20%;
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;

const Fix = styled.Image`
  width: 24px;
  height: 24px;
`;

const ItemImg = styled.Image`
  width: 100%;
  height: 330px;
  margin-top: 20px;
`;

const DetailBox = styled.View`
  width: 100%;
  height: 420px;
  background-color: white;
`;

const Contain = styled.View`
  padding-left: 20px;
`;

const ItemName = styled.Text`
  font-size: 24px;
  font-family: 'NanumSquareEB';
  padding-top: 30px;
  text-align: left;
`;

const ItemPrice = styled.Text`
  font-size: 16px;
  font-family: 'NanumSquareEB';
  color: #999999;
  padding-top: 3px;
  text-align: left;
`;

const Inventory = styled.Text`
  font-size: 16px;
  font-family: 'NanumSquareEB';
  padding-top: 20px;
  text-align: left;
`;

const ItemInventory = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 3px;
`;

const Num = styled.Text`
  color: black;
`;

const Date = styled.Text`
  color: #999999;
`;

const RecommendBox = styled.View`
  width: 100%;
  height: 469px;
  background-color: white;
`;

const RecommedText = styled.Text`
  font-size: 14px;
  margin-top: 0px;
  text-align: left;
  padding-left: 20px;
  font-family: 'NanumSquareEB';
`;

const MenuList = styled.ScrollView`
  padding-left: 15px;
`;

const MenuBox = styled.View`
  width: 120px;
  height: 160px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-right: 10px;
  align-items: center;
`;

const MenuImg = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;

const MenuItem = styled.Text`
  font-size: 10px;
  font-family: 'NanumSquareEB';
  text-align: left;
  width: 100%;
  padding-left: 7px;
`;

const MenuPrice = styled.Text`
  font-size: 10px;
  font-family: 'NanumSquareL';
  text-align: left;
  width: 100%;
  padding-left: 7px;
`;
