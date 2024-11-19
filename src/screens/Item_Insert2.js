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

const Index = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(''); // 상품 개수 초기 상태

  const onInsert = () => {
    navigation.navigate('Item_Insert');
  };

  const handleIncrease = () => {
    setCount(prevCount => (prevCount === '' ? 1 : prevCount + 1));
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleChange = text => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setCount(numericValue);
    } else if (text === '') {
      setCount('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>재고 추가</Text>
      <View style={styles.header}>
        <View style={styles.head}>
          <Text style={styles.headText}>기준 제고 입고</Text>
        </View>
        <TouchableOpacity style={styles.head2} onPress={onInsert}>
          <Text style={styles.head2Text}>변동 제고 입고</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contain}>
        {/* 회사명 입력 */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            회사명<Text style={styles.color}>*</Text>
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="새로운 상품의 회사 이름을 입력해주세요."
        />

        {/* 상품명 입력 */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            상품명<Text style={styles.color}>*</Text>
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="상품의 이름을 입력해주세요."
        />

        {/* 부가 사항 */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>부가 사항</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="부가사항을 입력해주세요."
        />

        {/* 바코드 입력 */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            바코드 입력<Text style={styles.color}>*</Text>
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="터치 시 카메라로 전환됩니다."
        />

        {/* 상품 개수 입력 */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            상품 개수<Text style={styles.color}>*</Text>
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.amountInput}
            value={count === '' ? '' : String(count)}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder="재고 갯수를 입력해주세요." // 초반 placeholder
          />
          <TouchableOpacity onPress={handleIncrease}>
            <Image source={up} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecrease}>
            <Image source={down} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>저장하기</Text>
        </TouchableOpacity>

        {/* 다른 상품 추가하기 버튼 */}
        <TouchableOpacity style={styles.otherBtn}>
          <Text style={styles.otherBtnText}>다른 상품 추가하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'NanumSquareEB',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  head: {
    flex: 1,
    backgroundColor: '#F49E15',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  head2: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 800,
    fontFamily: 'NanumSquareB',
  },
  head2Text: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: 800,
    fontFamily: 'NanumSquareB',
  },
  contain: {
    alignSelf: 'stretch',
  },
  textContainer: {
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'NanumSquareB',
  },
  color: {
    color: '#FF0000',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
  saveBtn: {
    backgroundColor: '#F49E15',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
  otherBtn: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F49E15',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  otherBtnText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
});

export default Index;
