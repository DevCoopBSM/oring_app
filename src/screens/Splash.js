import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Logo from './assets/splash.svg';

const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomTab');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo
        width={width * 0.5}
        height={height * 0.2}
        style={{marginBottom: 230}}
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
});

export default Splash;
