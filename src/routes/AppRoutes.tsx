import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Dashbaord from '../screens/dashboard/Dashbaord';
import Home from '../screens/home/Home';
import BottomRoutes from './bottomRoutes';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="BottomRoutes">
        <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
        {/* <Stack.Screen name="Dashboard" component={Dashbaord} /> */}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
