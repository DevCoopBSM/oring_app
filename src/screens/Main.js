import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>메인</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
