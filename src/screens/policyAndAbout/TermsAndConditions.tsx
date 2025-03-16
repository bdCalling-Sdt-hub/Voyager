import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconLeftArrow} from '../../assets/icons/Icons';
import { useGetTermsAndConditionsQuery } from '../../../android/app/src/redux/slice/ApiSlice';

const TermsAndConditions = ({navigation}: any) => {

  // rkt query hooks
  const {data} = useGetTermsAndConditionsQuery({});
  return (
    <View style={tw`flex-1 px-[4%] pb-[4%] bg-white dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-row mt-4 mb-2`}>
          <TouchableOpacity onPress={() => navigation?.goBack()}
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}>
            <SvgXml xml={IconLeftArrow} />
          </TouchableOpacity>
        </View>
        <View style={tw`gap-1 border-b border-b-gray90 pb-6 mb-4`}>
          <Text style={tw`text-black dark:text-white font-WorkRegular text-base`}>
            AGREEMENT
          </Text>
          <Text style={tw`text-black dark:text-white font-WorkBold text-[32px]`}>
            Terms of Service
          </Text>
          <Text style={tw`text-gray100 dark:text-white font-WorkRegular text-sm`}>
            Last updated on 5/12/2024
          </Text>
        </View>

          <View style={tw` gap-2 mb-4`}>
            <Text style={tw`text-black dark:text-white font-WorkBold text-xl`}>
              Clause 
            </Text>
            <Text
              style={tw`text-gray70 font-WorkRegular dark:text-white mt-1 leading-6`}>
              {data?.data?.content}
            </Text>
          </View>
      </ScrollView>

      {/* <Button
        title="Accept & Continue"
        containerStyle={tw` border-primary mt-4`}
        onPress={() => navigation.navigate('Settings')}
      /> */}
    </View>
  );
};

export default TermsAndConditions;
