import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getItemDetails } from '../services/itemDetails'; // itemDetails에서 가져오기
import { fetchRecommendedProducts } from '../services/ProductService'; // 추천 상품 가져오기
import detail_arrow from './assets/back.png';
import detail_fix from './assets/fix.png';
import defaultImage from './assets/items/picnic_red.jpg'; // 대체 이미지

const ItemDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId } = route.params; // 아이템 ID를 route에서 가져옴
  const [itemDetails, setItemDetails] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const details = await getItemDetails(itemId); // itemDetails의 getItemDetails 호출
        setItemDetails(details);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedProductsData = async () => {
      try {
        const products = await fetchRecommendedProducts(); // 추천 상품 가져오기
        setRecommendedProducts(products);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchItemDetails();
    fetchRecommendedProductsData();
  }, [itemId]);

  const onBack = () => {
    navigation.goBack();
  };

  const onFix = () => {
    navigation.navigate('Item_Insert');
  };

  if (loading) {
    return <Text>로딩 중...</Text>; // 로딩 상태 표시
  }

  if (!itemDetails) {
    return <Text>아이템 정보를 불러오지 못했습니다.</Text>; // 에러 처리
  }

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
      <ItemImg source={itemDetails.itemImage ? { uri: itemDetails.itemImage } : defaultImage} />
      <DetailBox>
        <Contain>
          <ItemName>{itemDetails.itemName}</ItemName>
          <ItemPrice>{itemDetails.itemPrice.toLocaleString()}원</ItemPrice>
          <Inventory>재고</Inventory>
          <ItemInventory>
            <Num>{itemDetails.itemQuantity}개</Num>
            <Date>· 2024.07.09 기준</Date>
          </ItemInventory>
        </Contain>
      </DetailBox>
      <RecommendBox>
        <RecommedText>오늘의 추천 상품이에요! 🥰</RecommedText>
        <MenuList horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={recommendedProducts}
            keyExtractor={item => item.itemId.toString()}
            renderItem={({ item }) => (
              <MenuBox>
                <MenuImg source={{ uri: item.itemImage }} />
                <MenuItem>{item.itemName}</MenuItem>
                <MenuPrice>
                  {item.itemPrice.toLocaleString()}원 | {item.itemQuantity} 개
                </MenuPrice>
              </MenuBox>
            )}
            horizontal
            style={{ paddingLeft: 15, marginTop: 15 }}
          />
        </MenuList>
      </RecommendBox>
    </Container>
  );
};

export default ItemDetail;

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const Arrow = styled.Image`
  width: 30px;
  height: 30px;
`;

const Fix = styled.Image`
  width: 30px;
  height: 30px;
`;

const ItemImg = styled.Image`
  width: 250px;
  height: 250px;
  margin-top: 20px;
  resize-mode: contain;
`;

const DetailBox = styled.View`
  background-color: white;
  padding: 20px;
  width: 100%;
`;

const Contain = styled.View`
  padding-left: 20px;
`;

const ItemName = styled.Text`
  font-size: 24px;
  font-family: 'NanumSquareEB';
  padding-top: 25px;
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
  background-color: white;
  padding: 20px;
`;

const RecommedText = styled.Text`
  font-size: 16px;
  font-weight: 900;
  font-family: 'NanumSquareEB';
  margin-bottom: 10px;
`;

const MenuList = styled.View`
  padding-left: 15px;
  margin-top: 15px;
`;

const MenuBox = styled.View`
  width: 120px;
  height: 160px;
  border-radius: 15px;
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
