import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Logo from './assets/logoSVG.svg';

const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo 
        width={width * 0.7}
        height={height * 0.3}
        style={styles.logo}
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
    // SVG 컴포넌트에 추가 스타일이 필요한 경우 여기에 추가
  },
});

export default Splash;
