import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import BottomRoutes from './bottomRoutes';
import NextDestination from '../screens/home/NextDestination';
import DestinationDetails from '../screens/home/components/DestinationDetails';
import Places from '../screens/home/Places';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Notifications from '../screens/natifications/Notifications';
import Settings from '../screens/settings/Settings';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="BottomRoutes">
          <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
          <Stack.Screen name="NextDestination" component={NextDestination} />
          <Stack.Screen
            name="DestinationDetails"
            component={DestinationDetails}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
