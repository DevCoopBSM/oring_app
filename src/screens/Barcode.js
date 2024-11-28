import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useNavigation, useRoute} from '@react-navigation/native';

const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [barcodeValue, setBarcodeValue] = useState('');
  const cameraRef = useRef(null);

  const onBarcodeRead = event => {
    if (event.nativeEvent && event.nativeEvent.codeStringValue) {
      const scannedValue = event.nativeEvent.codeStringValue;
      setBarcodeValue(scannedValue);
      Alert.alert('바코드 스캔 완료', `스캔된 바코드: ${scannedValue}`, [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('Item_Insert2', {
              scannedBarcode: scannedValue,
            });
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onBarcodeRead}
          style={styles.camera}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.barcodeText}>
          {barcodeValue
            ? `스캔된 바코드: ${barcodeValue}`
            : '바코드를 스캔해주세요'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 3,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  barcodeText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarcodeScannerScreen;
