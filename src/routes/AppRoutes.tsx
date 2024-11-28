import React, { useEffect } from 'react';
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
import Registration from '../screens/authentication/Registration';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import VerifyOTP from '../screens/authentication/VerifyOTP';
import SetNewPassword from '../screens/authentication/SetNewPassword';
import {AppProvider} from '../utils/context/AppContext';
import Friends from '../screens/friends/Friends';
import OthersProfile from '../screens/profile/OthersProfile';
import UpdatePassword from '../screens/authentication/UpdatePassword';
import { useDeviceContext, useAppColorScheme } from 'twrnc';
import tw from '../lib/tailwind';
import { useColorScheme } from 'react-native';
import SinglePlace from '../screens/singlePlace/SinglePlace';
import ProgressBucketlist from '../screens/progressBucketlist/ProgressBucketlist';
import Faq from '../screens/policyAndAbout/Faq';
import TermsAndConditions from '../screens/policyAndAbout/TermsAndConditions';
import PicsForYour from '../screens/picsForYou/PicsForYour';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  const colorMode = useColorScheme();
  console.log("color mode check: ", colorMode);
  useDeviceContext(tw);
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  useEffect(() => {
    setColorScheme("light");
  }, [colorMode]);

  return (
    <GestureHandlerRootView>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Login">
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
            <Stack.Screen name="SinglePlace" component={SinglePlace} />
            <Stack.Screen name="ProgressBucketlist" component={ProgressBucketlist} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PicsForYour" component={PicsForYour} />
            <Stack.Screen
              name="SubscriptionPlan"
              component={SubscriptionPlan}
            />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="OthersProfile" component={OthersProfile} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
