import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import {
  IconCloseEye,
  IconDarkUser,
  IconEnvelop,
  IconEye,
  IconFacebook,
  IconGoogle,
  IconKey,
} from '../../assets/icons/Icons';
import {Checkbox} from 'react-native-ui-lib';
import {SvgXml} from 'react-native-svg';

const Login = ({navigation}: any) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  return (
    <ScrollView
      style={tw`px-[4%] bg-white h-full pt-3 dark:bg-primaryDark`}
      keyboardShouldPersistTaps="always">
      <View style={tw`py-2 items-center`}>
        <Text
          style={[
            tw`text-black dark:text-white text-2xl font-WorkMedium capitalize`,
          ]}>
          Welcome Back
        </Text>
      </View>

      <View style={tw`gap-y-4 mt-8`}>
        <View style={tw`h-14`}>
          <InputText
            fromUP={true}
            svgFirstIcon={IconEnvelop}
            placeholder="Email"
            placeholderTextColor={'#9A9C9D'}
          />
        </View>
        <View style={tw`h-14`}>
          <InputText
            fromUP={true}
            svgFirstIcon={IconKey}
            placeholder="Password"
            placeholderTextColor={'#9A9C9D'}
            secureTextEntry={isSecure}
            svgSecondIcon={isSecure ? IconCloseEye : IconEye}
            onPress={() => setIsSecure(!isSecure)}
          />
        </View>

        <View style={tw`flex-row items-center justify-end`}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('ForgotPassword');
            }}>
            <Text
              style={tw`text-violet100 text-sm font-WorkMedium font-500 underline`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-2`}
          onPress={() => {
            navigation?.navigate('BottomRoutes');
          }}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            Log In
          </Text>
        </TouchableOpacity>

        <View style={tw`flex-row items-center`}>
          <View style={tw`bg-gray90 flex-1 h-[1px]`} />
          <Text
            style={tw`mx-2 text-[#000000] text-xs font-WorkRegular font-400`}>
            or
          </Text>
          <View style={tw`bg-gray90 flex-1 h-[1px]`} />
        </View>

        <TouchableOpacity
          style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 dark:border-darkBg flex-row items-center gap-3 justify-center`}
          onPress={() => {
            //   navigation?.navigate('PaymentMethod');
          }}>
          <SvgXml xml={IconFacebook} />
          <Text
            style={tw`text-center text-black dark:text-white text-base font-WorkSemiBold font-600`}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 dark:border-darkBg flex-row items-center gap-3 justify-center`}
          onPress={() => {
            //   navigation?.navigate('PaymentMethod');
          }}>
          <SvgXml xml={IconGoogle} />
          <Text
            style={tw`text-center text-black dark:text-white text-base font-WorkSemiBold font-600`}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center justify-center`}>
          <Text
            style={tw`text-black dark:text-white text-sm font-WorkSemiBold font-600`}>
            New to VoyaBear?{' '}
          </Text>

          <Text
            style={tw`text-violet100 text-sm font-WorkSemiBold font-600 underline`}
            onPress={() => navigation?.navigate('Registration')}>
            Create Account
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
