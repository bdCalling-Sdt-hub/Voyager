import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';
import {LStorage} from '../utils/utils';

const VerifyOTP = ({navigation, route}: any) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const {email} = route.params;

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

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input if value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOTP({otp: otp.join('')});
      const token = response?.data?.message;
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
        navigation?.navigate('BottomRoutes');
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
          {otp.map((digit, index) => (
            <View
              key={index}
              style={tw`flex-1 h-12 rounded-lg border bg-white dark:bg-darkBg border-[#D1D1D1] dark:border-darkBg justify-center items-center`}>
              <TextInput
                ref={el => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={value => handleChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                textAlign="center"
                placeholder="0"
                placeholderTextColor={'#E7E7E9'}
                maxLength={1}
                style={tw`text-center font-WorkBold font-700 text-[34px] p-0`}
              />
            </View>
          ))}
        </View>

        {/* Submit OTP Button */}
        <TouchableOpacity
          disabled={otp.join('')?.length !== 6}
          style={tw`bg-violet100 rounded-full p-3 mt-4 ${
            otp.join('')?.length === 6 ? '' : 'opacity-80'
          }`}
          onPress={handleVerifyOtp}>
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
