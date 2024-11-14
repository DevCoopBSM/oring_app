import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Index = () => {
  const user = [
    {
      id: '2308 박강은',
      code: 2023000012,
      amount: 1400,
      chargetime: '2024-07-09 12:33:24',
    },
  ];

  const payItems = [
    {
      day: '7월 9일',
      item: '온라인 충전',
      time: '18:55',
      price: '-1,300',
      amount: 5400,
    },
    {
      day: '7월 9일',
      item: '오프라인 결제',
      time: '12:35',
      price: '-1,300',
      amount: 6700,
    },
    {
      day: '7월 9일',
      item: '온라인 충전',
      time: '12:33',
      price: '5,000',
      amount: 8000,
    },
  ];
  const payItems2 = [
    {
      day: '7월 8일',
      item: '오프라인 결제',
      time: '18:15',
      price: '-1,700',
      amount: 3000,
    },
    {
      day: '7월 8일',
      item: '오프라인 결제',
      time: '12:40',
      price: '-1,300',
      amount: 4700,
    },
  ];

  const renderPayItems = items => (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.payBox}>
          <View style={styles.payContain}>
            <Text style={styles.payTime}>{item.time}</Text>
            <Text style={styles.payTitle}>{item.item}</Text>
            <View style={styles.amountContain}>
              <View style={styles.amountinfo}>
                <Text
                  style={[
                    styles.payText,
                    {color: item.price.includes('-') ? '#999999' : '#F49E15'},
                  ]}>
                  {item.price}원
                </Text>
                <Text style={styles.amount}>
                  {item.amount.toLocaleString()}원
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.userAmountBox}>
        <View style={styles.info}>
          <Text style={styles.userInfo}>
            {user[0].id} {user[0].code}
          </Text>
          <Text style={styles.userAmount}>
            {user[0].amount.toLocaleString()}원
          </Text>
          <Text style={styles.chargeTime}>{user[0].chargetime}</Text>
        </View>
        <TouchableOpacity style={styles.chargeBtn}>
          <Text style={styles.chargeBtnText}>충전하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyBox}>
        <View style={styles.dayBox}>
          <Text style={styles.day}>7월 9일</Text>
        </View>
        {renderPayItems(payItems)}
        <View style={styles.dayBox}>
          <Text style={styles.day}>7월 8일</Text>
        </View>
        {renderPayItems(payItems2)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf4',
    alignItems: 'center',
  },
  userAmountBox: {
    width: '100%',
    height: 240,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    fontFamily: 'NanumSquareB',
    marginBottom: 0,
    fontWeight: 700,
  },
  info: {
    alignItems: 'left',
    marginRight: 150,
    marginBottom: 10,
  },
  userAmount: {
    fontSize: 32,
    fontFamily: 'NanumSquareEB',
    marginTop: 10,
    fontWeight: 700,
  },
  chargeTime: {
    fontSize: 12,
    fontFamily: 'NanumSquareB',
    color: '#cccccc',
    marginTop: 5,
  },
  chargeBtn: {
    width: '80%',
    height: 40,
    backgroundColor: '#f49e15',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  chargeBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NanumSquareB',
    fontWeight: 700,
  },
  historyBox: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  dayBox: {
    width: '100%',
    height: 45,
    alignItems: 'left',
    justifyContent: 'center',
  },
  day: {
    fontSize: 12,
    fontFamily: 'NanumSquareB',
    marginLeft: 20,
    marginTop: 10,
  },
  payBox: {
    width: '100%',
    height: 53,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  payContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payTitle: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: 'NanumSquareB',
    marginLeft: 50,
    fontWeight: 700,
    textAlign: 'left',
  },
  payTime: {
    fontSize: 12,
    fontFamily: 'NanumSquareB',
  },
  amountContain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
  },
  payText: {
    fontSize: 12,
  },
  amount: {
    fontSize: 10,
    color: '#cccccc',
    fontFamily: 'NanumSquareB',
    textAlign: 'center',
  },
});

export default Index;
