import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCloseEye,
  IconDot,
  IconEye,
  IconSuccesTik,
} from '../../assets/icons/Icons';

import {SvgXml} from 'react-native-svg';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import tw from '../../lib/tailwind';
import {useUpdatePasswordMutation} from '../../redux/apiSlices/authApiSlice';

const UpdatePassword = ({navigation}: any) => {
  const [isSecureNewPass, setIsSecureNewPass] = useState(true);
  const [isSecureConfirmPass, setIsSecureConfirmPass] = useState(true);
  const [isSecureOldPass, setIsSecureOldPass] = useState(true);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // rtk query hooks
  const [updatePassword] = useUpdatePasswordMutation();

  const updatePasswordHandler = async (data: any) => {
    try {
      const response = await updatePassword({
        current_password: oldPassword,
        new_password: newPassword,
        c_password: confirmPassword,
      });
      console.log(response);
      console.log('response check : ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Password Update Failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        setIsSuccessModalVisible(true);
      }
    } catch (err: any) {
      Alert.alert(
        'Password Update Failed',
        err?.message || 'An error occurred.',
      );
    }
  };
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Header
          title={'Update Password'}
          titleStyle={tw``}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />
        <View style={tw`mt-8`}>
          <Text
            style={tw`text-black dark:text-white text-2xl font-WorkSemiBold`}>
            To create a secure password
          </Text>

          <View style={tw`mt-4 gap-y-2`}>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
                Use at least 8 characters
              </Text>
            </View>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
                Use a mix of letters, numbers, and special character (e.g. :
                #$!%)
              </Text>
            </View>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
                Try combining words and symbols into a unique phrase
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`gap-y-4 mt-8`}>
          <View style={tw`h-14`}>
            <InputText
              fromUP={true}
              placeholder="Old Password"
              placeholderTextColor={'#9A9C9D'}
              secureTextEntry={isSecureOldPass}
              svgSecondIcon={isSecureOldPass ? IconCloseEye : IconEye}
              onPress={() => setIsSecureOldPass(!isSecureOldPass)}
              onChangeText={text => setOldPassword(text)}
              value={oldPassword}
            />
          </View>
          <View style={tw`h-14`}>
            <InputText
              fromUP={true}
              placeholder="New Password"
              placeholderTextColor={'#9A9C9D'}
              secureTextEntry={isSecureNewPass}
              svgSecondIcon={isSecureNewPass ? IconCloseEye : IconEye}
              onPress={() => setIsSecureNewPass(!isSecureNewPass)}
              onChangeText={text => setNewPassword(text)}
              value={newPassword}
            />
          </View>
          <View style={tw`h-14`}>
            <InputText
              fromUP={true}
              placeholder="Confirm Password"
              placeholderTextColor={'#9A9C9D'}
              secureTextEntry={isSecureConfirmPass}
              svgSecondIcon={isSecureConfirmPass ? IconCloseEye : IconEye}
              onPress={() => setIsSecureConfirmPass(!isSecureConfirmPass)}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-4`}
          onPress={updatePasswordHandler}>
          <Text style={tw`text-center text-white text-base font-WorkMedium`}>
            Update Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <NormalModal
        visible={isSuccessModalVisible}
        setVisible={setIsSuccessModalVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white dark:bg-darkBg p-4 rounded-2xl`}>
        <View style={tw`items-center`}>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconSuccesTik} />
            <Text
              style={tw`text-black dark:text-white text-base font-WorkSemiBold font-500`}>
              You’re done!
            </Text>
          </View>
          <Text
            style={tw`text-black dark:text-white text-sm font-WorkRegular font-400 text-center mt-1`}>
            Your password has successfully updated.
          </Text>
          <View style={tw`w-full`}>
            <TouchableOpacity
              style={tw`bg-violet100 rounded-full p-2 mt-4`}
              onPress={() => {
                setIsSuccessModalVisible(false);
                navigation.goBack();
              }}>
              <Text
                style={tw`text-center text-white text-base font-WorkMedium`}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default UpdatePassword;
