import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import Expend from './component/Expend';
import {IconLeftArrow} from '../../assets/icons/Icons';

const Faq = ({navigation}: any) => {
  return (
    <View style={tw`flex-1 bg-white px-[4%] pt-4 dark:bg-primaryDark`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}>
          <SvgXml xml={IconLeftArrow} />
        </TouchableOpacity>
      </View>

      <View style={tw`px-[4%] gap-1 mt-4`}>
        <Text
          style={tw`text-black dark:text-white font-WorkExtraBold text-2xl`}>
          Common Questions
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}>
        <Expend />
        <Expend />
        <Expend />
        <Expend />
        <Expend />
        <Expend />
      </ScrollView>
    </View>
  );
};

export default Faq;
