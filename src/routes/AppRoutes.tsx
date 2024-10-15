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
import ProfileSettings from '../screens/settings/ProfileSettings';
import Preferences from '../screens/settings/Preferences';
import AccountSettings from '../screens/settings/AccountSettings';
import Subscription from '../screens/settings/subscription/Subscription';
import PaymentMethod from '../screens/settings/subscription/PaymentMethod';
import SubscriptionPlan from '../screens/settings/subscription/SubscriptionPlan';
import Shop from '../screens/shop/Shop';
import Login from '../screens/authentication/Login';

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
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
          <Stack.Screen name="Preferences" component={Preferences} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="Subscription" component={Subscription} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
