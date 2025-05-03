import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '../../redux/apiSlices/authApiSlice';
import {LStorage, PrimaryColor} from '../utils/utils';

import {OtpInput} from 'react-native-otp-entry';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';

const VerifyOTP = ({navigation, route}: any) => {
  const [otp, setOtp] = useState<string>('');
  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);
  const {email, from} = route.params;

  // Masking the email address
  // Masking the email address
  const maskInput = (input: string): string => {
    try {
      const [localPart, domainPart] = input.split('@');
      const maskedLocalPart = localPart.slice(0, -3).replace(/./g, '*');
      const lastThreeChars = localPart.slice(-3);
      return `${maskedLocalPart}${lastThreeChars}@${domainPart}`;
    } catch {
      return input;
    }
  };

  const maskedEmail = maskInput(email);
  // rtk query hooks
  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();

  // Resend OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(prev => prev - 1), 1000);
    } else if (seconds === 0) {
      clearInterval(interval!);
      setIsActive(false);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const formatSecondsToMinutes = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60); // Calculate the minutes
    const seconds = totalSeconds % 60; // Calculate the remaining seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // handlers
  const handleVerifyOtp = async (textOtp: string) => {
    try {
      const response = await verifyOTP({otp: textOtp});
      const token = response?.data?.data;
      console.log('Response: ', response);
      console.log('Token: ', token);

      if (!token) {
        return Alert.alert(
          'Otp Verification Failed',
          'No token returned from the server.',
        );
      }

      LStorage.setString('userToken', token);

      if (LStorage.getString('userToken') === token) {
        if (from === 'forgot') {
          navigation?.navigate('SetNewPassword', {email: email});
        } else {
          navigation?.navigate('TravelPreferences');
        }
        setIsActive(false);
        setSeconds(0);
        // navigation?.navigate('SetNewPassword');
      } else {
        Alert.alert('Storage Error', 'Failed to store token.');
      }
    } catch (err: any) {
      Alert.alert(
        'Otp Verification Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOTP({
        email,
      });

      console.log('response: ', response);
      setSeconds(119);
      setIsActive(true);
    } catch (err: any) {
      Alert.alert('Sign Up Failed', err?.m0essage || 'An error occurred.');
    }
  };

  return (
    <View style={tw`h-full bg-white px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Header
          title="Verify OTP"
          titleStyle={tw`normal-case`}
          containerStyle={tw`mt-2`}
          isIcon
          hideRightIcon
        />

        {/* OTP Verification Info */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-black dark:text-white text-lg font-WorkMedium`}>
            Enter the code sent To {maskedEmail}
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={tw`flex-row gap-3 my-2`}>
          <OtpInput
            numberOfDigits={6}
            focusColor={PrimaryColor}
            autoFocus={false}
            hideStick={true}
            placeholder="0"
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            // onFocus={() => console.log("Focused")}
            // onBlur={() => console.log("Blurred")}
            // onTextChange={(text) => console.log(text)}
            onFilled={async text => {
              console.log(`OTP is ${text}`);
              setOtp(text);
              handleVerifyOtp(text);
            }}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: tw`my-4`,
              pinCodeContainerStyle: tw`h-14 w-14 justify-center items-center  `,
              pinCodeTextStyle: tw`text-deepBlue300 text-4xl font-NunitoSansBold  `,
              placeholderTextStyle: tw`text-[#D5D7DA] text-4xl font-NunitoSansBold`,
            }}
          />
        </View>

        {/* Submit OTP Button */}
        <TouchableOpacity
          disabled={otp?.length !== 6}
          style={tw`bg-violet100 rounded-full p-3 mt-4 ${
            otp?.length === 6 ? '' : 'opacity-80'
          }`}
          onPress={() => handleVerifyOtp(otp)}>
          <Text style={tw`text-center text-white text-base font-WorkMedium`}>
            Verify OTP
          </Text>
        </TouchableOpacity>

        {seconds === 0 ? (
          <View style={tw`flex-row items-center justify-center mt-4`}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
              Didn’t receive code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text
                style={tw`text-violet100 text-base font-WorkSemiBold font-600`}>
                Send again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-row items-center justify-center mt-4`}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
              OTP expires in{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={tw`text-violet100 text-base font-WorkSemiBold font-600`}>
                {formatSecondsToMinutes(seconds)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default VerifyOTP;
