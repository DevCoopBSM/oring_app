import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import oringE from './assets/logoE.png';
import logo from './assets/logo.png';
import mail from './assets/mail.png';
import password_img from './assets/password.png';

const Index = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = email !== '' && password !== '';

  const onClick = () => {
    if (isFormFilled) navigation.navigate('Charge');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.contain}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoImg} />
          <Image source={oringE} style={styles.logoText} />
        </View>
        <Text style={styles.welcome}>오링에 온 걸{'\n'}환영해요!</Text>
        <Text style={styles.text}>
          로그인 후 더 다양한 기능을 누려보세요 :)
        </Text>
        <View style={styles.input}>
          <View style={styles.inputWrapper}>
            <Image source={mail} style={styles.icon} />
            <TextInput
              style={styles.mail}
              placeholder="이메일"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image source={password_img} style={styles.icon} />
            <TextInput
              style={styles.password}
              placeholder="비밀번호"
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
          disabled={!isFormFilled}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        <Text style={styles.text}>이메일 찾기 | 비밀번호 찾기 | 회원가입</Text>
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
  },
  logoImg: {
    width: 33,
    height: 33,
  },
  logoText: {
    width: 105,
    height: 32,
    marginLeft: 8,
  },
  welcome: {
    fontSize: 22,
    color: 'white',
    marginTop: 8,
    marginBottom: 20,
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
    marginBottom: 8,
  },
  icon: {
    position: 'absolute',
    width: 16,
    height: 18,
    left: 12,
  },
  mail: {
    width: 200,
    height: 40,
    paddingLeft: 32,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
  },
  password: {
    width: 200,
    height: 40,
    paddingLeft: 32,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
  },
  login: {
    width: 220,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
