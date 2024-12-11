import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {
  IconClose,
  IconCloseEye,
  IconDot,
  IconEye,
  IconSuccesTik,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';

const SetNewPassword = ({navigation}: any) => {
  const [isSecureNewPass, setIsSecureNewPass] = useState(true);
  const [isSecureConfirmPass, setIsSecureConfirmPass] = useState(true);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {/* Header */}
        <Header
          title={'Change Password'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
          leftIcon={IconClose}
        />
        <View style={tw`mt-8`}>
          <Text style={tw`text-black dark:text-white text-2xl font-WorkSemiBold`}>
            To create a secure password
          </Text>

          <View style={tw`mt-4 gap-y-2`}>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
              Use at least 8 characters
              </Text>
            </View>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
                Use a mix of letters, numbers, and special character (e.g. :
                #$!%)
              </Text>
            </View>
            <View style={tw`flex-row items-center flex-shrink gap-2`}>
              <SvgXml xml={IconDot} />
              <Text style={tw`text-gray70 dark:text-white text-base font-WorkRegular font-400`}>
                Try combining words and symbols into a unique phrase
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`gap-y-4 mt-8`}>
          <View style={tw`h-14`}>
            <InputText
              fromUP={true}
              placeholder="Create New Password"
              placeholderTextColor={'#9A9C9D'}
              secureTextEntry={isSecureNewPass}
              svgSecondIcon={isSecureNewPass ? IconCloseEye : IconEye}
              onPress={() => setIsSecureNewPass(!isSecureNewPass)}
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
            />
          </View>
        </View>

        <TouchableOpacity
          style={tw`bg-violet100 rounded-full p-3 mt-4`}
          onPress={() => {
            setIsSuccessModalVisible(true);
          }}>
          <Text style={tw`text-center text-white text-base font-WorkMedium`}>
            Change Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <NormalModal
        visible={isSuccessModalVisible}
        setVisible={setIsSuccessModalVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white dark:bg-primaryDark p-8 rounded-2xl`}>
        <View>
          <View style={tw`flex-row items-center gap-2 justify-center`}>
            <SvgXml xml={IconSuccesTik} />
            <Text style={tw`text-black dark:text-white text-base font-WorkSemiBold font-500`}>
              You’re done!
            </Text>
          </View>
          <Text style={tw`text-black dark:text-white text-sm font-WorkRegular font-400 text-center mt-1`}>
            Your password has successfully changed.
          </Text>
          <View style={tw`w-full`}>
          <TouchableOpacity
            style={tw`bg-violet100 rounded-full p-2 mt-4`}
            onPress={() => {
              setIsSuccessModalVisible(false);
              navigation.navigate('TravelPreferences');
            }}>
            <Text style={tw`text-center text-white text-base font-WorkMedium`}>
              Done
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default SetNewPassword;
