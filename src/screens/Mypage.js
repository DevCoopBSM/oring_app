import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logo from './assets/logo.png';
import setting from './assets/setting.png';
import conference from './assets/conference.png';
import refund from './assets/refund.png';
import help from './assets/help.png';
import arrow from './assets/arrow2.png';

const Index = () => {
  const navigation = useNavigation();

  const onConference = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.profile} />
      <Text style={styles.userName}>박강은</Text>
      <View style={styles.listBox}>
        <TouchableOpacity style={styles.box}>
          <Image source={setting} style={styles.listIcon} />
          <Text style={styles.listText}>정보 수정</Text>
          <Image source={arrow} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onConference}>
          <Image source={conference} style={styles.listIcon} />
          <Text style={styles.listText}>총회</Text>
          <Image source={arrow} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image source={refund} style={styles.listIcon} />
          <Text style={styles.listText}>환불 / 반품 목록</Text>
          <Image source={arrow} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image source={help} style={styles.listIcon} />
          <Text style={styles.listText}>고객 센터</Text>
          <Image source={arrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
      <Text style={styles.Copyright}>
        Copyright 2024. DEVCOOP All rights reserved
      </Text>
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
  profile: {
    width: 80,
    height: 100,
    marginTop: 50,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'NanumSquareEB',
    fontWeight: 800,
    paddingTop: 25,
  },
  listBox: {
    flexDirection: 'column',
    paddingLeft: 32,
    paddingTop: 30,
    paddingBottom: 128,
    gap: 8,
  },
  box: {
    width: 360,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listIcon: {
    width: 12,
    height: 12,
  },
  listText: {
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    paddingLeft: 16,
    flexGrow: 1,
  },
  arrow: {
    width: 4,
    height: 8,
    marginRight: 30,
  },
  Copyright: {
    color: '#999999',
    fontSize: 10,
    marginBottom: 20,
  },
});

export default Index;
