import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addInventoryItem} from '../services/addItemAuth';

const Index = ({barcode}) => {
  const navigation = useNavigation();
  const [showItem, setShowItem] = useState('');
  const [productName, setProductName] = useState('');
  const [barcodeInput, setBarcodeInput] = useState(barcode || '');
  const [quantity, setQuantity] = useState('');
  const [reasonText, setreasonText] = useState('');

  const handleSave = async () => {
    try {
      const response = await addInventoryItem({
        itemCode: barcodeInput,
        itemName: productName,
        itemQuantity: quantity,
        reason: reasonText,
      });

      console.log('Success:', response);
      alert(response.results[0].message);

      setProductName('');
      setBarcodeInput('');
      setQuantity('');
      setreasonText('');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const onInsert = () => {
    navigation.navigate('Item_Insert2');
  };

  const handleIncrease = () => {
    setQuantity(prev => (prev === '' ? 1 : parseInt(prev, 10) + 1));
  };

  const handleDecrease = () => {
    setQuantity(prev => {
      const newValue = prev === '' ? 0 : parseInt(prev, 10) - 1;
      return newValue > 0 ? newValue : '';
    });
  };

  const handleQuantityChange = text => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setQuantity(numericValue.toString());
    } else if (text === '') {
      setQuantity('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>재고 추가</Text>
      <View style={styles.header}>
        <TouchableOpacity style={styles.inactiveTab} onPress={onInsert}>
          <Text style={styles.inactiveTabText}>기준 재고 입고</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>변동 재고 입고</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>상품명</Text>
        <TextInput
          style={styles.input}
          placeholder="입고할 상품명을 입력해주세요."
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.label}>바코드 입력</Text>
        <TextInput
          style={styles.input}
          placeholder="상품의 바코드를 입력해주세요."
          value={barcodeInput}
          onChangeText={setBarcodeInput}
        />
        <Text style={styles.label}>상품 개수</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            placeholder="재고 개수를 입력해주세요."
            value={quantity === '' ? '' : quantity.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleIncrease}>
            <Image source={require('./assets/up.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecrease}>
            <Image source={require('./assets/down.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>이유</Text>
          <TextInput
            style={styles.input}
            placeholder="재고 변동의 이유를 알려주세요."
            value={reasonText}
            onChangeText={setreasonText}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherButton}>
          <Text style={styles.otherButtonText}>다른 상품 추가하기</Text>
        </TouchableOpacity>
        {showItem && (
          <View style={styles.itemDisplay}>
            <Text>
              현재 입력된 상품:{'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;동아_샤프펜_샤프심_지우개
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'NanumSquareEB',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    flex: 1,
    backgroundColor: '#f49e15',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 800,
    fontFamily: 'NanumSquareB',
  },
  inactiveTab: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveTabText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: 800,
    fontFamily: 'NanumSquareB',
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'NanumSquareB',
    marginBottom: 5,
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
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#f49e15',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
  otherButton: {
    borderWidth: 1,
    borderColor: '#f49e15',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  otherButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
  itemDisplay: {
    marginTop: 20,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Index;
