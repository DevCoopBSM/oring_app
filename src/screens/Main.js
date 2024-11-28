import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from './assets/logo.svg';
import OringE from './assets/oring_text.svg';
import Mail from './assets/mail.svg';
import Password from './assets/password.svg';
import {login} from '../services/Auth';
import Welcome from './assets/welcome.svg';

const Index = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormFilled = email !== '' && password !== '';

  const onClick = async () => {
    if (!isFormFilled) return;

    setLoading(true);
    try {
      if (!email.includes('@')) {
        Alert.alert('입력 오류', '올바른 이메일 형식을 입력해주세요.');
        return;
      }

      if (password.length < 4) {
        Alert.alert('입력 오류', '비밀번호는 4자 이상이어야 합니다.');
        return;
      }

      console.log('Attempting login with:', {email, password: '***'});
      const response = await login(email, password);
      console.log('Login response received:', response);

      if (response.success) {
        console.log('Login successful:', response);
        navigation.navigate('BottomTab');
      } else {
        Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        '로그인 실패',
        error.message ||
          '로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.contain}>
        <View style={styles.logo}>
          <Logo width={33} height={33} />
          <OringE width={81} height={32} />
        </View>
        <Welcome width={183} height={80} style={styles.welcome} />
        <Text style={styles.text}>
          로그인 후 더 다양한 기능을 누려보세요 :)
        </Text>
        <View style={styles.input}>
          <View style={styles.inputWrapper}>
            <Mail width={20} height={20} />
            <TextInput
              style={styles.mail}
              placeholder="이메일"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Password width={20} height={20} />
            <TextInput
              style={styles.password}
              placeholder="비밀번호"
              placeholderTextColor="#999999"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.login,
            isFormFilled ? styles.loginActive : styles.loginInactive,
          ]}
          onPress={onClick}
          disabled={!isFormFilled || loading}>
          <Text style={styles.loginText}>
            {loading ? '로딩중...' : '로그인'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f49e15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain: {
    marginBottom: 120,
  },
  background: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 800,
    height: 800,
    borderRadius: 800,
    top: 150,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 20,
  },
  welcome: {
    marginTop: 8,
    marginLeft: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  input: {
    marginTop: 16,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    width: 220,
    height: 45,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  mail: {
    flex: 1,
    height: '100%',
    paddingLeft: 8,
    color: 'black',
  },
  password: {
    flex: 1,
    height: '100%',
    paddingLeft: 8,
    color: 'black',
  },
  login: {
    width: 220,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 8,
  },
  loginActive: {
    backgroundColor: '#F49E15',
  },
  loginInactive: {
    backgroundColor: '#CCCCCC',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Index;
