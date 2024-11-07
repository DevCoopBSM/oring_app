import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    // 3초 후 메인 화면으로 이동
    const timer = setTimeout(() => {
      navigation.replace('Main'); // 'Main'은 메인 화면의 라우트 이름입니다
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/doram.svg')} // 스플래시 이미지 경로를 수정하세요
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.3,
  },
});

export default Splash;
