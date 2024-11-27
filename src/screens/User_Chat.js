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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import arrow from './assets/arrow.png';
import plus from './assets/plus.png';
import send_off from './assets/send_off.png';
import send_on from './assets/send_on.png';
import chat_plus from './assets/chat_plus.png';
import happyoring from './assets/happyoring.png';
import { initializeWebSocket, subscribeToChat, sendMessage, disconnect, resetChatState, getChatRoomInfo, reconnectWebSocket, validateToken } from '../services/ChatService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatPage = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);

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
    setChatRoomId(null);
    resetChatState();
    setIsOpen(false);
  };

  useEffect(() => {
    let mounted = true;
    
    const setupWebSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Initiating WebSocket setup');
        const client = await initializeWebSocket();
        
        if (!mounted) return;
        
        if (client) {
          console.log('WebSocket client created successfully');
          setIsWebSocketReady(true);
          
          if (chatRoomId) {
            subscribeToChat(chatRoomId, (receivedMessage) => {
              if (mounted) {
                console.log('Received message:', receivedMessage);
                setMessages(prevMessages => [...prevMessages, {
                  isUser: receivedMessage.userName === '박강은',
                  text: receivedMessage.message,
                  nickname: receivedMessage.userName
                }]);
              }
            });
          }
        }
      } catch (error) {
        console.error('WebSocket setup failed:', error);
        if (mounted) {
          setIsWebSocketReady(false);
          Alert.alert('연결 오류', '인증에 실패했습니다. 다시 로그인해주세요.', [
            {
              text: '확인',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth', screen: 'Login' }],
                });
              },
            },
          ]);
        }
      }
    };

    setupWebSocket();

    return () => {
      mounted = false;
      disconnect();
    };
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        if (!isWebSocketReady) {
          console.log('WebSocket not ready, attempting to reconnect...');
          const client = await reconnectWebSocket();
          if (client) {
            setIsWebSocketReady(true);
          }
        }

        console.log('Attempting to send message:', inputValue);
        const result = await sendMessage(inputValue, chatRoomId);
        
        // 메시지 전송 성공 처리
        setMessages(prevMessages => [
          ...prevMessages,
          {
            text: inputValue,
            isUser: true,
            nickname: '박강은'
          }
        ]);
        setInputValue('');
        break;
      } catch (error) {
        console.error('Send message error:', error);
        retryCount++;
        if (retryCount === maxRetries) {
          Alert.alert('전송 오류', '메시지 전송에 실패했습니다. 다시 시도해주세요.');
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  };

  // messageSet을 처리하는 함수 추가
  const processMessageSet = (messageSet) => {
    if (!messageSet) return;
    
    const newMessages = messageSet.map(msg => ({
      isUser: msg.userName === '박강은',
      text: msg.message,
      nickname: msg.userName,
      messageTime: msg.messageTime
    }));
    
    setMessages(prevMessages => [...prevMessages, ...newMessages]);
  };

  useEffect(() => {
    if (chatRoomId) {
      // 채팅방 메시지 히스토리 가져오기
      const fetchMessageHistory = async () => {
        try {
          const chatRoomInfo = await getChatRoomInfo();
          if (chatRoomInfo.messageSet) {
            processMessageSet(chatRoomInfo.messageSet);
          }
        } catch (error) {
          console.error('Error fetching message history:', error);
        }
      };
      
      fetchMessageHistory();
    }
  }, [chatRoomId]);

  // 채팅 기록을 날짜별로 그룹화하는 함수
  const groupedHistory = chatHistory.reduce((acc, chat) => {
    const dateStr = chat.date.toLocaleDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(chat);
    return acc;
  }, {});

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
