import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Main from './src/screens/Main';
import Item_List from './src/screens/Items_List';
import User_Chat from './src/screens/User_Chat';
import Manager_Chat from './src/screens/Manager_Chat';
import Alarm from './src/screens/Alarm';
import Charge from './src/screens/Charge';

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
        <Stack.Screen name="Item_List" component={Item_List} />
        <Stack.Screen name="User_Chat" component={User_Chat} />
        <Stack.Screen name="Manager_Chat" component={Manager_Chat} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="Charge" component={Charge} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
