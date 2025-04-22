/**
 * @format
 */

import {AppRegistry, SafeAreaView} from 'react-native';

import React from 'react';
import {name as appName} from './app.json';
import tw from './src/lib/tailwind';
import AppRoutes from './src/routes/AppRoutes';
import {AppProvider} from './src/utils/context/AppContext';

const MainApp = () => (
  <SafeAreaView style={tw`flex-1`}>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </SafeAreaView>
);

AppRegistry.registerComponent(appName, () => MainApp);
