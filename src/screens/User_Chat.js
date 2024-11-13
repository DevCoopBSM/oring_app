import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import arrow from './assets/arrow.png';
import plus from './assets/plus.png';
import send_off from './assets/send_off.png';
import send_on from './assets/send_on.png';
import chat_plus from './assets/chat_plus.png';
import happyoring from './assets/happyoring.png';

const ChatPage = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const onBack = () => {
    navigation.goBack();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Refresh = () => {
    setMessages([
      {
        isUser: false,
        profilePic: happyoring,
        nickname: '공간 AriSori',
        text: `안녕하세요 매점 아리소리입니다! 문의 확인은 매점부원들이 휴대폰을 공식적으로 되찾는 오후 4시 반 이후부터 가능합니다.`,
      },
    ]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {text: inputValue, isUser: true},
      ]);
      setInputValue('');

      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            isUser: false,
            profilePic: happyoring,
            nickname: '매점부 박강은',
            text: '내일 오후 3시에 입고될 예정입니다',
          },
        ]);
      }, 3000);
    }
  };

  useEffect(() => {
    setMessages([
      {
        isUser: false,
        profilePic: happyoring,
        nickname: '공간 AriSori',
        text: `안녕하세요 매점 아리소리입니다! 문의 확인은 매점부원들이 휴대폰을 공식적으로 되찾는 오후 4시 반 이후부터 가능합니다.`,
      },
    ]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Image source={arrow} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={plus} style={styles.plus} />
          </TouchableOpacity>
        </View>
        {isOpen && (
          <View style={styles.overlay}>
            <View style={styles.sidebar}>
              <TouchableOpacity onPress={Refresh} style={styles.newChatBtn}>
                <Text style={styles.newChatBtnText}>새 채팅하기</Text>
              </TouchableOpacity>
              <ScrollView>
                <Text style={styles.dateText}>오늘</Text>
                <Text style={styles.listText}>
                  민트초코 아이스크림은 언제 들어오나요?
                </Text>
                <Text style={styles.dateText}>어제</Text>
                <Text style={styles.listText}>매점 문 언제 열어요?</Text>
              </ScrollView>
            </View>
          </View>
        )}
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.isUser ? styles.userMessage : styles.otherMessage,
              ]}>
              {!msg.isUser && (
                <View style={styles.profile}>
                  <Image source={msg.profilePic} style={styles.profilePic} />
                  <Text style={styles.nickname}>{msg.nickname}</Text>
                </View>
              )}
              <Text
                style={[
                  styles.message,
                  msg.isUser ? styles.userMessageText : null,
                ]}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={chat_plus} style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="매점부에게 질문을 남겨주세요!"
            onFocus={() => setIsOpen(false)}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Image
              source={inputValue.trim() ? send_on : send_off}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  icon: {width: 24, height: 24},
  arrow: {width: 24, height: 24},
  plus: {width: 24, height: 24},
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    zIndex: 11,
  },
  newChatBtn: {
    padding: 12,
    backgroundColor: '#f49e15',
    borderRadius: 10,
    alignItems: 'center',
  },
  newChatBtnText: {color: '#fff', fontSize: 16},
  listBox: {flex: 1, marginTop: 16},
  dateText: {fontSize: 14, color: '#555', marginTop: 10},
  messageBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  listText: {color: '#000'},

  chatContainer: {flex: 1, padding: 16},
  messageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  userMessageText: {
    color: '#fff',
  },
  userMessage: {alignSelf: 'flex-end', backgroundColor: '#f49e15'},
  otherMessage: {alignSelf: 'flex-start', backgroundColor: '#fff'},
  userText: {color: '#fff'},
  message: {color: '#000'},

  profile: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  profilePic: {width: 30, height: 30, borderRadius: 15},
  nickname: {marginLeft: 8, fontWeight: 'bold'},

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {flex: 1, padding: 8},
});

export default ChatPage;
