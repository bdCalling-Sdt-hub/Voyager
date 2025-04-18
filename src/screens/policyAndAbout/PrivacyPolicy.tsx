import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconLeftArrow} from '../../assets/icons/Icons';

const PrivacyPolicy = ({navigation}: any) => {
  return (
    <View style={tw`flex-1 px-[4%] pb-[4%] bg-white dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-row mt-4 mb-2`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}>
            <SvgXml xml={IconLeftArrow} />
          </TouchableOpacity>
        </View>
        <View style={tw`gap-1 border-b border-b-gray90 pb-6 mb-4`}>
          <Text
            style={tw`text-black dark:text-white font-WorkRegular text-base`}>
            AGREEMENT
          </Text>
          <Text
            style={tw`text-black dark:text-white font-WorkBold text-[32px]`}>
            Privacy Policy
          </Text>
          <Text
            style={tw`text-gray100 dark:text-white font-WorkRegular text-sm`}>
            Last updated on 5/12/2024
          </Text>
        </View>

        <View style={tw` gap-2 mb-4`}>
          <Text style={tw`text-black dark:text-white font-WorkBold text-xl`}>
            Privacy Policy
          </Text>
          <Text
            style={tw`text-gray70 font-WorkRegular dark:text-white mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Vero facere reiciendis
            dolor! A, quis dolor reiciendis libero officia, optio dolore impedit
            corrupti incidunt neque ullam quam consequatur animi maxime sed.
          </Text>
        </View>
        <View style={tw` gap-2 mb-4`}>
          <Text style={tw`text-black dark:text-white font-WorkBold text-xl`}>
            Privacy Summary
          </Text>
          <Text
            style={tw`text-gray70 font-WorkRegular dark:text-white mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
