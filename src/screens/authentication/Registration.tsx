import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCloseEye,
  IconDarkUser,
  IconEnvelop,
  IconEye,
  IconGoogle,
  IconKey,
} from '../../assets/icons/Icons';
import {
  useGetUserNameQuery,
  useSignUpMutation,
} from '../../redux/apiSlices/authApiSlice';

import {SvgXml} from 'react-native-svg';
import {Checkbox} from 'react-native-ui-lib';
import InputText from '../../components/inputs/InputText';
import tw from '../../lib/tailwind';

const Registration = ({navigation}: any) => {
  // state
  const [isSecure, setIsSecure] = useState(true);
  const [isCheck, setIsCheck] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const [username, setUserName] = useState('');

  // RTK Query Hooks
  const [signUp, {isLoading}] = useSignUpMutation();
  const {data, refetch} = useGetUserNameQuery(username, {skip: !username});

  // Refetch data whenever fullName changes
  useEffect(() => {
    if (username) {
      refetch();
    }
  }, [username, refetch]);

  console.log('response check', data?.data[0]?.user_name);

  // handlers
  const handleRegister = async () => {
    try {
      const response = await signUp({
        full_name: fullName,
        user_name: username,
        email,
        password,
        c_password: confirmPassword,
      });

      console.log('response: ', response);

      if (response?.error?.success === false) {
        Alert.alert(
          'Sign Up Failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      }

      navigation?.navigate('VerifyOTP', {email: email});
    } catch (err: any) {
      Alert.alert('Sign Up Failed', err?.m0essage || 'An error occurred.');
    }
  };
  return (
    <View style={tw`flex-1`}>
      <ScrollView
        style={tw`px-[4%] bg-white dark:bg-primaryDark`}
        contentContainerStyle={tw`pb-10 pt-4`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={tw`py-2 items-center`}>
          <Text
            style={[
              tw`text-black dark:text-white text-2xl font-WorkMedium capitalize`,
            ]}>
            Welcome to Voyabear
          </Text>
        </View>

        <View style={tw`gap-y-4 mt-8`}>
          <View style={tw`h-14`}>
            <InputText
              svgFirstIcon={IconDarkUser}
              fromUP={true}
              placeholder="Full Name"
              placeholderTextColor={'#9A9C9D'}
              onChangeText={text => setFullName(text)}
            />
          </View>
          <View>
            <View style={tw`h-14`}>
              <InputText
                svgFirstIcon={IconDarkUser}
                fromUP={true}
                placeholder="Username"
                placeholderTextColor={'#9A9C9D'}
                onChangeText={text => setUserName(text.toLowerCase())}
                style={tw`lowercase text-black dark:text-white`}
              />
            </View>
            {data?.data[0]?.user_name !== undefined && (
              <Text style={tw`text-sm text-red font-WorkRegular`}>
                This username is already taken
              </Text>
            )}
            {username.includes(' ') && (
              <Text style={tw`text-sm text-red font-WorkRegular`}>
                Username should not contain spaces
              </Text>
            )}
          </View>
          <View style={tw`h-14`}>
            <InputText
              svgFirstIcon={IconEnvelop}
              placeholder="Email"
              fromUP={true}
              placeholderTextColor={'#9A9C9D'}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={tw`h-14`}>
            <InputText
              svgFirstIcon={IconKey}
              placeholder="Password"
              fromUP={true}
              placeholderTextColor={'#9A9C9D'}
              secureTextEntry={isSecure}
              svgSecondIcon={isSecure ? IconCloseEye : IconEye}
              onPress={() => setIsSecure(!isSecure)}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View>
            <View style={tw`h-14`}>
              <InputText
                svgFirstIcon={IconKey}
                placeholder="Confirm Password"
                fromUP={true}
                placeholderTextColor={'#9A9C9D'}
                secureTextEntry={isConfirmSecure}
                svgSecondIcon={isConfirmSecure ? IconCloseEye : IconEye}
                onPress={() => setIsConfirmSecure(!isConfirmSecure)}
                onChangeText={text => setConfirmPassword(text)}
              />
            </View>
            {password !== confirmPassword &&
              password !== '' &&
              confirmPassword !== '' && (
                <Text style={tw`text-sm text-red font-WorkRegular`}>
                  Passwords do not match
                </Text>
              )}
          </View>

          <TouchableOpacity
            onPress={() => {
              {
                setIsCheck(!isCheck);
              }
            }}
            style={tw`flex-row items-center gap-2`}>
            <Checkbox color={isCheck ? '#8C78EA' : '#EFEFEF'} value={isCheck} />
            <Text
              style={tw`text-xs text-black dark:text-white font-WorkRegular font-400`}>
              I agree to the{' '}
              <Text
                style={tw`text-violet100`}
                onPress={() => {
                  navigation?.navigate('TermsAndConditions');
                }}>
                Terms and Conditions{' '}
              </Text>{' '}
              and{' '}
              <Text
                style={tw`text-violet100`}
                onPress={() => {
                  navigation?.navigate('PrivacyPolicy');
                }}>
                Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-violet100 rounded-full p-3 mt-2 ${
              !isCheck ||
              !fullName ||
              !email ||
              !password ||
              data?.data[0]?.user_name !== undefined ||
              username.includes(' ') ||
              password !== confirmPassword
                ? 'opacity-70'
                : 'opacity-100'
            }`}
            disabled={
              !isCheck ||
              !email ||
              !password ||
              !fullName ||
              data?.data[0]?.user_name !== undefined ||
              username.includes(' ') ||
              password !== confirmPassword
            }
            onPress={handleRegister}>
            <Text
              style={tw`text-center text-white text-base font-WorkMedium font-500`}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={tw`flex-row items-center`}>
            <View style={tw`bg-gray90 flex-1 h-[1px]`} />
            <Text
              style={tw`mx-2 text-black dark:text-white text-xs font-WorkRegular font-400`}>
              or
            </Text>
            <View style={tw`bg-gray90 flex-1 h-[1px]`} />
          </View>

          {/* <TouchableOpacity
          style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 flex-row items-center gap-3 justify-center`}
          onPress={() => {}}>
          <SvgXml xml={IconFacebook} />
          <Text
            style={tw`text-center text-black dark:text-white text-base font-WorkSemiBold font-600`}>
            Continue with Facebook
          </Text>
        </TouchableOpacity> */}

          <TouchableOpacity
            style={tw`bg-transparent rounded-full p-3 mt-2 border border-gray90 flex-row items-center gap-3 justify-center`}
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
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('Login');
              }}>
              <Text
                style={tw`text-violet100 font-normal font-WorkSemiBold font-600 underline`}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Registration;
