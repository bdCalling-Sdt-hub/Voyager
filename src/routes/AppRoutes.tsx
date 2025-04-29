import React, {useEffect} from 'react';

import AccountSettings from '../screens/settings/AccountSettings';
import AttractionsScreen from '../screens/home/AttractionsScreen';
import BottomRoutes from './bottomRoutes';
import BowersActivities from '../screens/home/components/BowersActivities';
import CitiesScreen from '../screens/home/CitiesScreen';
import CountriesScreen from '../screens/home/CountriesScreen';
import DestinationDetails from '../screens/home/components/DestinationDetails';
import Faq from '../screens/policyAndAbout/Faq';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import Friends from '../screens/friends/Friends';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import Login from '../screens/authentication/Login';
import {NavigationContainer} from '@react-navigation/native';
import Notifications from '../screens/natifications/Notifications';
import OthersProfile from '../screens/profile/OthersProfile';
import PaymentMethod from '../screens/settings/subscription/PaymentMethod';
import PicsForYour from '../screens/picsForYou/PicsForYour';
import Preferences from '../screens/settings/Preferences';
import PrivacyPolicy from '../screens/policyAndAbout/PrivacyPolicy';
import ProfileSettings from '../screens/settings/ProfileSettings';
import ProgressBucketlist from '../screens/progressBucketlist/ProgressBucketlist';
import {Provider} from 'react-redux';
import Registration from '../screens/authentication/Registration';
import SetNewPassword from '../screens/authentication/SetNewPassword';
import Settings from '../screens/settings/Settings';
import Shop from '../screens/shop/Shop';
import SinglePlace from '../screens/singlePlace/SinglePlace';
import Splash from '../screens/splash/Splash';
import Subscription from '../screens/settings/subscription/Subscription';
import SubscriptionPlan from '../screens/settings/subscription/SubscriptionPlan';
import TermsAndConditions from '../screens/policyAndAbout/TermsAndConditions';
import TravelPreferences from '../screens/authentication/TravelPreference';
import UpdatePassword from '../screens/authentication/UpdatePassword';
import VerifyOTP from '../screens/authentication/VerifyOTP';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from '../redux/store';
import tw from '../lib/tailwind';
import {useAppContext} from '../utils/context/AppContext';

LogBox.ignoreAllLogs();

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();

  const {colorScheme, setColorScheme} = useAppContext();

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  return (
    <Provider key={colorScheme} store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarColor:
                colorScheme === 'light' ? 'white' : tw.color('bg-primaryDark'),
              statusBarStyle: colorScheme === 'light' ? 'dark' : 'light',
              statusBarAnimation: 'fade',
            }}
            initialRouteName="Splash">
            <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
            <Stack.Screen name="Attractions" component={AttractionsScreen} />
            <Stack.Screen name="Cities" component={CitiesScreen} />
            <Stack.Screen name="Countries" component={CountriesScreen} />
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
            <Stack.Screen
              name="ProgressBucketlist"
              component={ProgressBucketlist}
            />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
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
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                statusBarColor: tw.color('bg-violet100'),
                statusBarStyle: 'light',
                statusBarAnimation: 'fade',
              }}
            />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen
              name="BowersActivities"
              component={BowersActivities}
            />
            <Stack.Screen
              name="TravelPreferences"
              component={TravelPreferences}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default AppRoutes;
