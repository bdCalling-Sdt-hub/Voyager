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

const Registration = ({navigation}: any) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  return (
    <ScrollView
      style={tw`px-[4%] bg-white h-full pt-3`}
      keyboardShouldPersistTaps="always">
      <View style={tw`py-2 items-center`}>
        <Text style={[tw`text-black text-2xl font-WorkMedium capitalize`]}>
          Create Account
        </Text>
      </View>

      <View style={tw`gap-y-4 mt-8`}>
        <View style={tw`h-14`}>
          <InputText
            svgFirstIcon={IconDarkUser}
            placeholder="Enter your Full Name"
            placeholderTextColor={'#9A9C9D'}
          />
        </View>
        <View style={tw`h-14`}>
          <InputText
            svgFirstIcon={IconEnvelop}
            placeholder="Enter your E-mail"
            placeholderTextColor={'#9A9C9D'}
          />
        </View>
        <View style={tw`h-14`}>
          <InputText
            svgFirstIcon={IconKey}
            placeholder="Create Password"
            placeholderTextColor={'#9A9C9D'}
            secureTextEntry={isSecure}
            svgSecondIcon={isSecure ? IconCloseEye : IconEye}
            onPress={() => setIsSecure(!isSecure)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            {
              setIsCheck(!isCheck);
            }
          }}
          style={tw`flex-row items-center gap-2`}>
          <Checkbox color={isCheck ? '#8C78EA' : '#EFEFEF'} value={isCheck} />
          <Text style={tw`text-xs font-WorkRegular font-400`}>
            Agree to{' '}
            <Text style={tw`text-violet100`}>Terms and Conditions</Text> and
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-2`}
          onPress={() => {
            //   navigation?.navigate('PaymentMethod');
          }}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            Sign Up
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
          style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 flex-row items-center gap-3 justify-center`}
          onPress={() => {
            //   navigation?.navigate('PaymentMethod');
          }}>
          <SvgXml xml={IconFacebook} />
          <Text
            style={tw`text-center text-black text-base font-WorkSemiBold font-600`}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 flex-row items-center gap-3 justify-center`}
          onPress={() => {
            //   navigation?.navigate('PaymentMethod');
          }}>
          <SvgXml xml={IconGoogle} />
          <Text
            style={tw`text-center text-black text-base font-WorkSemiBold font-600`}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`text-black text-sm font-WorkSemiBold font-600`}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Login');
            }}>
            <Text
              style={tw`text-violet100 font-sm font-WorkSemiBold font-600 underline`}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;
