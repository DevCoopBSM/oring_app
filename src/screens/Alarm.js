import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const Index = () => {
  const menuItems = [
    {
      title: '슈퍼콘_민트초코맛이 품절 직전이에요!',
      text: ' 다 팔리기 전에 얼른 가서 사는 건 어때요?',
      time: '방금 전',
    },
    {
      title: '슈퍼콘_초코맛 품절 직전이에요!',
      text: ' 다 팔리기 전에 얼른 가서 사는 건 어때요?',
      time: '30분 전',
    },
    {
      title: '30분뒤에 총회가 시작됩니다',
      text: '제 시간에 맞추어 참여 부탁드립니다',
      time: '50분 전',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.alarmBox}>
            <View style={styles.alarmContain}>
              <Text style={styles.alarmTitle}>{item.title}</Text>
              <Text style={styles.alarmTime}>{item.time}</Text>
            </View>
            <Text style={styles.alarmText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: 'black',
    fontFamily: 'NanumSquareEB',
    marginBottom: 20,
    marginRight: 325,
  },
  alarmBox: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  alarmContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alarmTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: 'black',
    fontFamily: 'NanumSquareB',
    marginLeft: 10,
  },
  alarmText: {
    fontSize: 10,
    color: 'black',
    fontFamily: 'NanumSquareL',
    marginTop: 5,
    marginLeft: 10,
  },
  alarmTime: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'NanumSquareB',
  },
});

export default Index;
