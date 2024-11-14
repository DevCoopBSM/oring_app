import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
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
  const sidebarRef = useRef(null);

  const onBack = () => {
    navigation.goBack();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Refresh = () => {
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {text: inputValue, isUser: true},
      ]);
      setInputValue('');
    }
  };

  useEffect(() => {
    setMessages([
      {
        isUser: false,
        profilePic: happyoring,
        nickname: '2107 이예흔',
        text: '민트초코 아이스크림 언제 들어오나요?',
      },
    ]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Image source={arrow} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={plus} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {isOpen && (
          <View style={styles.overlay}>
            <View style={styles.sidebar} ref={sidebarRef}>
              <TouchableOpacity onPress={Refresh} style={styles.newChatBtn}>
                <Text style={styles.newChatBtnText}>새 채팅하기</Text>
              </TouchableOpacity>
              <ScrollView style={styles.listBox}>
                <Text style={styles.dateText}>오늘</Text>
                <View style={styles.messageBox}>
                  <Text style={styles.listText}>
                    민트초코 아이스크림은 언제 들어오나요?
                  </Text>
                </View>
                <Text style={styles.dateText}>어제</Text>
                <View style={styles.messageBox}>
                  <Text style={styles.listText}>매점 문 언제 열어요?</Text>
                </View>
                <View style={styles.messageBox}>
                  <Text style={styles.listText}>민트초코 먹고 싶어요ㅠㅠ</Text>
                </View>
                <View style={styles.messageBox}>
                  <Text style={styles.listText}>
                    매점부 들어가고 싶은데 어떻게하면 ...
                  </Text>
                </View>
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
                style={[styles.message, msg.isUser ? styles.userText : null]}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={chat_plus} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="친절한 답변을 남겨주세요!"
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Image
                source={inputValue.trim() ? send_on : send_off}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
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
