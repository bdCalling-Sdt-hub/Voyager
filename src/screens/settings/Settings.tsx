import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconCart,
  IconDangerLogout,
  IconFaq,
  IconLock,
  IconProfileSettings,
  IconSearch,
  IconTravelPreferences,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import NormalModal from '../../components/modals/NormalModal';

const Settings = ({title = 'Settings', navigation}: any) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  return (
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        IconContainer={tw`${isSearchVisible ? 'bg-black' : ''}`}
        icon={IconSearch}
        onPressSearch={() => setSearchVisible(!isSearchVisible)}
        isSearchVisible={isSearchVisible}
        hideFilterIcon={true}
      />

      <View style={tw`mt-4 gap-y-2`}>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('ProfileSettings')}>
          <SvgXml xml={IconProfileSettings} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Profile Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('Preferences')}>
          <SvgXml xml={IconTravelPreferences} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Travel Preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('AccountSettings')}>
          <SvgXml xml={IconLock} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Account Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('UpdatePassword')}>
          <SvgXml xml={IconLock} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Update Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('Subscription')}>
          <SvgXml xml={IconCart} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Subscription & Billing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('Faq')}>
          <SvgXml xml={IconFaq} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            FAQs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <SvgXml xml={IconCart} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl`}
          onPress={() => setLogoutModalVisible(true)}>
          <SvgXml xml={IconDangerLogout} />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <NormalModal
        visible={logoutModalVisible}
        setVisible={setLogoutModalVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white dark:bg-darkBg p-4 rounded-2xl`}>
        <View>
          <Text
            style={tw`text-center text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
            Log Out
          </Text>
          <Text
            style={tw`text-gray60 dark:text-white text-center text-sm font-WorkRegular font-400 mt-2`}>
            Are you sure do you want to logout?
          </Text>

          <View style={tw`flex-row gap-6 mt-5 justify-between`}>
            <TouchableOpacity
              style={tw`bg-white py-1 rounded-full justify-center items-center border-[2px] border-transparent px-4`}
              onPress={() => {
                navigation?.navigate('Login');
                setLogoutModalVisible(false);
              }}>
              <Text style={tw`text-violet100 font-WorkSemiBold text-sm`}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-violet100 py-1 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={() => {
                setLogoutModalVisible(false);
              }}>
              <Text style={tw`text-white font-WorkSemiBold text-sm`}>
                Not Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default Settings;
