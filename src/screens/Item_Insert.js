import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import up from './assets/up.png';
import down from './assets/down.png';
import {addInventoryItem} from '../services/addItemAuth';

const Index = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [company, setCompany] = useState('');
  const [productName, setProductName] = useState('');
  const [explain, setExplain] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleChange = text => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setCount(numericValue);
    } else {
      setCount(0);
    }
  };

  const handleSave = async () => {
    if (!company || !productName || !barcode || count <= 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      const response = await addInventoryItem({
        company,
        productName,
        explain,
        barcode,
        quantity: count,
      });

      alert(response.results[0].message);

      // Reset fields
      setCompany('');
      setProductName('');
      setExplain('');
      setBarcode('');
      setCount(0);
    } catch (error) {
      alert(error.message);
    }
  };

  const onBarcodePress = () => {
    navigation.navigate('Barcode', {
      onBarcodeScan: scannedBarcode => setBarcode(scannedBarcode),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>재고 추가</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>회사명 *</Text>
        <TextInput
          style={styles.input}
          placeholder="회사명을 입력하세요."
          value={company}
          onChangeText={setCompany}
        />

        <Text style={styles.label}>상품명 *</Text>
        <TextInput
          style={styles.input}
          placeholder="상품명을 입력하세요."
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>부가 사항</Text>
        <TextInput
          style={styles.input}
          placeholder="부가 사항을 입력하세요."
          value={explain}
          onChangeText={setExplain}
        />

        <Text style={styles.label}>바코드 *</Text>
        <TouchableOpacity onPress={onBarcodePress}>
          <TextInput
            style={styles.input}
            placeholder="터치 시 바코드를 입력하세요."
            value={barcode}
            editable={false}
          />
        </TouchableOpacity>

        <Text style={styles.label}>상품 개수 *</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={count.toString()}
            onChangeText={handleChange}
          />
          <TouchableOpacity onPress={handleIncrease}>
            <Image source={up} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecrease}>
            <Image source={down} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    backgroundColor: '#f49e15',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Index;
