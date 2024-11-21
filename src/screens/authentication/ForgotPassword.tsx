import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import {IconEnvelop} from '../../assets/icons/Icons';

const ForgotPassword = ({navigation}: any) => {
  return (
    <View style={tw`h-full bg-white px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Header
          title={'Forgot Password'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        {/* body */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
            Enter your E-mail address to get OPT
          </Text>
        </View>

        <View style={tw`h-14 mt-4`}>
          <InputText
            fromUP={true}
            svgFirstIcon={IconEnvelop}
            placeholder="Enter your E-mail"
            placeholderTextColor={'#9A9C9D'}
          />
        </View>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-4`}
          onPress={() => {
            navigation?.navigate('VerifyOTP');
          }}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            Get OTP
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
