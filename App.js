import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
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
