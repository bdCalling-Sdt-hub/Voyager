import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import {
  IconCloseEye,
  IconDarkUser,
  IconEnvelop,
  IconKey,
} from '../../assets/icons/Icons';
import {Checkbox} from 'react-native-ui-lib';

const Login = () => {
  const [isSecure, setIsSecure] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  return (
    <View style={tw`px-[4%] bg-white h-full`}>
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
            svgSecondIcon={isSecure ? IconCloseEye : IconCloseEye}
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
      </View>
    </View>
  );
};

export default Login;
