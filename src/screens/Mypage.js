import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from './assets/logoSVG.svg';
import SettingIcon from './assets/setting.svg';
import ConferenceIcon from './assets/conference.svg';
import RefundIcon from './assets/refund.svg';
import HelpIcon from './assets/help.svg';
import ArrowIcon from './assets/arrow2.svg';

const Index = () => {
  const navigation = useNavigation();

  const onConference = () => {
    navigation.navigate('start');
  };

  return (
    <View style={styles.container}>
      <Logo width={80} height={100} style={styles.profile} />
      <Text style={styles.userName}>박강은</Text>
      <View style={styles.listBox}>
        <TouchableOpacity style={styles.box}>
          <SettingIcon width={16} height={16} style={styles.listIcon} />
          <Text style={styles.listText}>정보 수정</Text>
          <ArrowIcon width={8} height={16} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onConference}>
          <ConferenceIcon width={16} height={16} style={styles.listIcon} />
          <Text style={styles.listText}>총회</Text>
          <ArrowIcon width={8} height={16} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <RefundIcon width={16} height={16} style={styles.listIcon} />
          <Text style={styles.listText}>환불 / 반품 목록</Text>
          <ArrowIcon width={8} height={16} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <HelpIcon width={16} height={16} style={styles.listIcon} />
          <Text style={styles.listText}>고객 센터</Text>
          <ArrowIcon width={8} height={16} style={styles.arrow} />
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
    marginTop: 10,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'NanumSquareEB',
    fontWeight: '800',
    paddingTop: 18,
  },
  listBox: {
    flexDirection: 'column',
    paddingLeft: 32,
    paddingTop: 30,
    paddingBottom: 70,
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
    marginLeft: 10,
  },
  listText: {
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    paddingLeft: 16,
    flexGrow: 1,
  },
  arrow: {
    marginRight: 30,
  },
  Copyright: {
    color: '#999999',
    fontSize: 10,
  },
});

export default Index;
