/**
 * @format
 */

import {AppRegistry, SafeAreaView} from 'react-native';

import React from 'react';
import {name as appName} from './app.json';
import tw from './src/lib/tailwind';
import AppRoutes from './src/routes/AppRoutes';
import {AppProvider} from './src/utils/context/AppContext';
import { StripeProvider } from '@stripe/stripe-react-native';

const MainApp = () => (
  <SafeAreaView style={tw`flex-1`}>
    <StripeProvider
     publishableKey='pk_test_51POeYv2NSuQ25xW6zMKymPTrox0Gf3o6Z4UVD9Mr73Ih6uHHgKQ3ivp1gX9xGJagw60X622JgGBCsxN1t8mFoevF00CYMbWMQz'
    >

    <AppProvider>
      <AppRoutes />
    </AppProvider>
    </StripeProvider>
  </SafeAreaView>
);

AppRegistry.registerComponent(appName, () => MainApp);
