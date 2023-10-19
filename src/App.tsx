import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BootSplash from 'react-native-bootsplash';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ThirdScreen from './screens/ThirdScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide().catch((error): void => {
          console.log(error);
        });
      }}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
