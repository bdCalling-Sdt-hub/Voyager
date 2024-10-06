import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import BottomRoutes from './bottomRoutes';
import NextDestination from '../screens/home/NextDestination';
import DestinationDetails from '../screens/home/components/DestinationDetails';
import Places from '../screens/home/Places';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="BottomRoutes">
        <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
        <Stack.Screen name="NextDestination" component={NextDestination} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Places" component={Places} />
        <Stack.Screen
          name="DestinationDetails"
          component={DestinationDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
