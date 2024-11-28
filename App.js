import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import HomeIcon from './src/screens/assets/footer_home.svg';
import ItemIcon from './src/screens/assets/footer_item.svg';
import ChatIcon from './src/screens/assets/footer_chat.svg';
import MypageIcon from './src/screens/assets/footer_mypage.svg';
import HomeIcon_On from './src/screens/assets/footer_home_on.svg';
import ItemIcon_On from './src/screens/assets/footer_item_on.svg';
import ChatIcon_On from './src/screens/assets/footer_chat_on.svg';
import MypageIcon_On from './src/screens/assets/footer_mypage_on.svg';
import Logo from './src/screens/assets/header.svg';
import AlarmIcon from './src/screens/assets/alarm.svg';
import Splash from './src/screens/Splash';
import Main from './src/screens/Main';
import Home from './src/screens/Home';
import Item_List from './src/screens/Items_List';
import User_Chat from './src/screens/User_Chat';
import Manager_Chat from './src/screens/Manager_Chat';
import Alarm from './src/screens/Alarm';
import Charge from './src/screens/Charge';
import Mypage from './src/screens/Mypage';
import Chat_Main from './src/screens/Chat_Main';
import Item_Detail from './src/screens/Item_Detail';
import Item_Insert from './src/screens/Item_Insert';
import Item_Insert2 from './src/screens/Item_Insert2';
import Barcode from './src/screens/Barcode';
import Conference from './src/screens/Conference';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = focused ? HomeIcon_On : HomeIcon;
          } else if (route.name === 'Item_List') {
            IconComponent = focused ? ItemIcon_On : ItemIcon;
          } else if (route.name === 'Conference') {
            IconComponent = focused ? ChatIcon_On : ChatIcon;
          } else if (route.name === 'Mypage') {
            IconComponent = focused ? MypageIcon_On : MypageIcon;
          }

          return <IconComponent width={size || 22} height={size || 22} />;
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'NanumSquareOTF',
          fontWeight: '700',
        },
        tabBarActiveTintColor: '#B9BBB9', // 활성화된 탭의 글자색 (회색)
        tabBarInactiveTintColor: '#B9BBB9', // 비활성화된 탭의 글자색 (회색)
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 55,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, title: '홈'}}
      />
      <Tab.Screen
        name="Item_List"
        component={Item_ListStack} // 스택으로 연결
        options={{headerShown: false, title: '상품'}}
      />
      <Tab.Screen
        name="Conference"
        component={Conference}
        options={{headerShown: false, title: '총회'}}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{headerShown: false, title: '마이페이지'}}
      />
    </Tab.Navigator>
  );
};
const Item_ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Item_List"
        component={Item_List}
        options={{headerShown: false}} // Header 숨기기
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={({navigation, route}) => ({
          headerShown: true,
          headerTitle: () => {
            // Item_List에서는 재고추가 버튼만 보이고 다른 화면에서는 알림 아이콘
            if (route.name === 'Item_List') {
              return (
                <View style={styles.imageContain}>
                  <Pressable onPress={() => navigation.navigate('BottomTab')}>
                    <Logo width={120} height={40} />
                  </Pressable>
                  <Pressable
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Item_Insert')}>
                    <Text style={styles.addButtonText}>재고추가</Text>
                  </Pressable>
                </View>
              );
            } else {
              return (
                <View style={styles.imageContain}>
                  <Pressable onPress={() => navigation.navigate('BottomTab')}>
                    <Logo width={120} height={40} />
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Alarm')}>
                    <AlarmIcon width={20} height={20} />
                  </Pressable>
                </View>
              );
            }
          },
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: 'white'},
          headerBackVisible: false,
        })}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Item_List" component={Item_List} />
        <Stack.Screen name="Chat_Main" component={Chat_Main} />
        <Stack.Screen name="User_Chat" component={User_Chat} />
        <Stack.Screen name="Conference" component={Conference} />
        <Stack.Screen name="Manager_Chat" component={Manager_Chat} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="Charge" component={Charge} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="Item_Detail" component={Item_Detail} />
        <Stack.Screen name="Item_Insert" component={Item_Insert} />
        <Stack.Screen name="Item_Insert2" component={Item_Insert2} />
        <Stack.Screen name="Barcode" component={Barcode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  imageContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F49E15',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  notificationIcon: {
    fontSize: 20,
    color: '#F49E15',
  },
});

export default App;
