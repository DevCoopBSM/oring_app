import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Logo from './assets/logoSVG.svg';

const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Item_Insert');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo width={width * 0.7} height={height * 0.3} />
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
