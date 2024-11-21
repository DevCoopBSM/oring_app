import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import homeIcon from './src/screens/assets/home.png';
import itemIcon from './src/screens/assets/item.png';
import chatIcon from './src/screens/assets/opinion.png';
import mypageIcon from './src/screens/assets/mypage.png';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// BottomTab 네비게이터 정의
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Item_List') {
            iconSource = itemIcon;
          } else if (route.name === 'Chat_Main') {
            iconSource = chatIcon;
          } else if (route.name === 'Mypage') {
            iconSource = mypageIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size || 24,
                height: size || 24,
                tintColor: color,
              }}
            />
          );
        },
        tabBarActiveTintColor: '#F49E15',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, title: '홈'}}
      />
      <Tab.Screen
        name="Item_List"
        component={Item_List}
        options={{headerShown: false, title: '상품'}}
      />
      <Tab.Screen
        name="Chat_Main"
        component={Chat_Main}
        options={{headerShown: false, title: '의견'}}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{headerShown: false, title: '마이페이지'}}
      />
    </Tab.Navigator>
  );
};

// 전체 App 네비게이터
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        {/* Splash 화면 */}
        <Stack.Screen name="Splash" component={Splash} />

        {/* BottomTab 네비게이터 */}
        <Stack.Screen name="BottomTab" component={BottomTab} />

        {/* 기타 개별 화면 */}
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Item_List" component={Item_List} />
        <Stack.Screen name="Chat_Main" component={Chat_Main} />
        <Stack.Screen name="User_Chat" component={User_Chat} />
        <Stack.Screen name="Manager_Chat" component={Manager_Chat} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="Charge" component={Charge} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="Item_Detail" component={Item_Detail} />
        <Stack.Screen name="Item_Insert" component={Item_Insert} />
        <Stack.Screen name="Item_Insert2" component={Item_Insert2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
