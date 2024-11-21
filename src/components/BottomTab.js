import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import Home from '../screens/Home';
import Item_List from '../screens/Items_List';
import Chat_Main from '../screens/Chat_Main';
import Mypage from '../screens/Mypage';
import homeIcon from '../screens/assets/home.png';
import itemIcon from '../screens/assets/item.png';
import chatIcon from '../screens/assets/opinion.png';
import mypageIcon from '../screens/assets/mypage.png';

const Tab = createBottomTabNavigator();

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
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          );
        },
        tabBarActiveTintColor: '#42a5f5',
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
        options={{headerShown: false, title: '아이템 리스트'}}
      />
      <Tab.Screen
        name="Chat_Main"
        component={Chat_Main}
        options={{headerShown: false, title: '채팅'}}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{headerShown: false, title: '마이페이지'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
