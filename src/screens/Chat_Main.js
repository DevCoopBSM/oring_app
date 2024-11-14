import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logo from './assets/logo.png';

const Index = () => {
  const navigation = useNavigation();

  const onChat = () => {
    navigation.navigate('User_Chat');
  };

  const onList = () => {
    navigation.navigate('Manager_Chat');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>매점의 소리를 들려주세요!</Text>
      <Text style={styles.text}>
        매점 이용 중 궁금하거나 불편한 점이 있다면{'\n'}
        매점부에게 알려주세요.
      </Text>
      <Text style={styles.guide}>
        타인에 대한 조롱 또는 비방, 비난으로 인해 발생하는 문제에 대한 책임은
        {'\n'}
        온전히 본인에게 있습니다.
      </Text>
      <TouchableOpacity style={styles.chatBtn} onPress={onChat}>
        <Text style={styles.chatBtnText}>채팅하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listBtn} onPress={onList}>
        <Text style={styles.listBtnText}>채팅 기록 조회하기기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 56,
    height: 68,
  },
  title: {
    fontSize: 24,
    fontFamily: 'NanumSquareEB',
    paddingTop: 16,
    fontWeight: 800,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
    paddingTop: 8,
    lineHeight: 25,
  },
  guide: {
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
    fontFamily: 'NanumSquareL',
    paddingTop: 16,
    lineHeight: 18,
  },
  chatBtn: {
    width: 350,
    height: 48,
    backgroundColor: '#f49e15',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  chatBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
  listBtn: {
    width: 350,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F49E15',
    borderStyle: 'solid',
    marginTop: 16,
  },
  listBtnText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
});

export default Index;
