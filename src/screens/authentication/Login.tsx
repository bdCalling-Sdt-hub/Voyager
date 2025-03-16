import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import {
  IconCloseEye,
  IconEnvelop,
  IconEye,
  IconFacebook,
  IconGoogle,
  IconKey,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import {useLoginMutation} from '../../../android/app/src/redux/slice/ApiSlice';
import {LStorage} from '../utils/utils';

const Login = ({navigation}: any) => {
  // state
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // RTK Query Hooks
  const [login, {isLoading}] = useLoginMutation();

  // handlers
  const handleLogin = async () => {
    try {
      const response = await login({email, password});
      const token = response?.data?.data?.token;

      if (!token) {
        return Alert.alert(
          'Login Failed',
          // 'No token returned from the server.'
          'Username or Password is incorrect.'
          ,
        );
      }

      LStorage.setString('userToken', token);

      if (LStorage.getString('userToken') === token) {
        navigation?.replace('BottomRoutes');
      } else {
        Alert.alert('Storage Error', 'Failed to store token.');
      }
    } catch (err: any) {
      Alert.alert('Login Failed', err?.message || 'An error occurred.');
    }
  };

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
            onChangeText={text => setEmail(text)}
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
            onChangeText={text => setPassword(text)}
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
          onPress={handleLogin}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            {isLoading ? 'Logging in...' : 'Log In'}
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
