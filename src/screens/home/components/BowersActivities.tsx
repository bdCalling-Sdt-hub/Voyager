import {ActivityIndicator, TouchableOpacity, View} from 'react-native';

import {IconLeftArrow} from '../../../assets/icons/Icons';
import {NavigProps} from '../../../utils/interface/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {WebView} from 'react-native-webview';
import tw from '../../../lib/tailwind';

const BowersActivities = ({navigation, route}: NavigProps<string>) => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-row  my-1 mx-2  items-center`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw` h-12 w-12 flex-row dark:bg-darkBg items-center bg-white justify-center rounded-full border border-gray90 dark:border-darkBg`}>
          <SvgXml xml={IconLeftArrow} />
        </TouchableOpacity>
        {/* <Text style={tw`text-black text-xl dark:text-white`}>
          {route?.params?.url}
        </Text> */}
      </View>
      <WebView
        renderLoading={() => (
          <ActivityIndicator size="large" color={PrimaryColor} />
        )}
        source={{uri: route?.params?.url}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default BowersActivities;
