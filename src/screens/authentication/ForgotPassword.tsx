import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {IconEnvelop} from '../../assets/icons/Icons';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import tw from '../../lib/tailwind';
import {useForgetPasswordMutation} from '../../redux/slice/ApiSlice';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');

  // RTK Query Hooks
  const [forgetPassword, {isLoading}] = useForgetPasswordMutation();

  const handleForgetPassword = async () => {
    try {
      const response = await forgetPassword({email});
      console.log('response: ', response);
      navigation?.navigate('VerifyOTP', {email: email, from: 'forgot'});
    } catch (err: any) {
      Alert.alert('Sign Up Failed', err?.m0essage || 'An error occurred.');
    }
  };
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
          <Text
            style={tw`text-black dark:text-white text-lg font-WorkMedium font-600`}>
            We will send an OTP to your registered email
          </Text>
        </View>

        <View style={tw`h-14 mt-4`}>
          <InputText
            fromUP={true}
            svgFirstIcon={IconEnvelop}
            placeholder="Email"
            placeholderTextColor={'#9A9C9D'}
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-4 ${
            email ? 'opacity-100' : 'opacity-70'
          }`}
          disabled={!email}
          onPress={() => {
            handleForgetPassword();
          }}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            {isLoading ? 'Loading...' : 'Get OTP'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
