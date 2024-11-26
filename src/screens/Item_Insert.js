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

const BarcodeScannerScreen = () => {
  const [barcodeValue, setBarcodeValue] = useState(''); // 바코드 값 저장
  const cameraRef = useRef(null);

  const onBarcodeRead = event => {
    if (event.nativeEvent && event.nativeEvent.codeStringValue) {
      const scannedValue = event.nativeEvent.codeStringValue;
      setBarcodeValue(scannedValue);
      Alert.alert('Barcode Scanned', `Value: ${scannedValue}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          cameraType={CameraType.Back} // 후면 카메라 사용
          scanBarcode={true} // 바코드 스캔 활성화
          onReadCode={onBarcodeRead} // 바코드 읽기 콜백
          style={styles.camera}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.barcodeText}>
          {barcodeValue ? `Scanned Barcode: ${barcodeValue}` : 'Scan a barcode'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setBarcodeValue('')}>
        <Text style={styles.resetButtonText}>Reset</Text>
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
  resetButton: {
    backgroundColor: '#2B8E1B',
    paddingVertical: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarcodeScannerScreen;
