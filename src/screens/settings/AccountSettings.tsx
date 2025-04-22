import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton, RadioGroup, Switch} from 'react-native-ui-lib';

import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {useAppContext} from '../../utils/context/AppContext';
import {LStorage} from '../utils/utils';
import CountryDropdown from './CountryDropdown';

const AccountSettings = ({navigation}: any) => {
  const {toggleColorScheme, colorScheme} = useAppContext();
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] =
    useState(true);
  const [isInAppNotificationEnabled, setIsInAppNotificationEnabled] =
    useState(false);

  const handlePushNotification = () =>
    setIsPushNotificationEnabled(previousState => !previousState);

  const handleEmailNotification = () =>
    setIsEmailNotificationEnabled(previousState => !previousState);

  const handleInAppNotification = () =>
    setIsInAppNotificationEnabled(previousState => !previousState);

  return (
    <View style={tw`h-full bg-white dark:bg-primaryDark px-[4%] pb-2`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'Account Settings'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        {/* body */}
        <View>
          {/* Language */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-2`}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkSemiBold font-600 mb-3`}>
              Languages
            </Text>
            <CountryDropdown
              placeholderText="Select Language"
              searchPlaceholder="Search languages"
            />
          </View>

          {/* Theme */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
            <View style={tw`gap-y-2`}>
              <View style={tw`mt-2`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkSemiBold font-600 mb-3`}>
                  Theme
                </Text>
                <RadioGroup
                  initialValue={colorScheme}
                  onValueChange={(value: any) => {
                    LStorage.setString('mode', value);
                    toggleColorScheme();
                  }}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Light Mode"
                    value="light"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Dark Mode"
                    value="dark"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                </RadioGroup>
              </View>
            </View>
          </View>

          {/* Notification Settings */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
            <View style={tw`gap-y-2`}>
              <View>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkSemiBold font-600 mb-3`}>
                  Notification Settings
                </Text>
                <View style={tw`gap-y-4`}>
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
                      Push Notifications
                    </Text>
                    <Switch
                      value={isPushNotificationEnabled}
                      onValueChange={handlePushNotification}
                      onColor="#8C78EA"
                      offColor={colorScheme === 'light' ? '#E6E6E8' : '#141518'}
                    />
                  </View>
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
                      E-mail Notifications
                    </Text>
                    <Switch
                      value={isEmailNotificationEnabled}
                      onValueChange={handleEmailNotification}
                      onColor="#8C78EA"
                      offColor={colorScheme === 'light' ? '#E6E6E8' : '#141518'}
                    />
                  </View>
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
                      In-app Notifications
                    </Text>
                    <Switch
                      value={isInAppNotificationEnabled}
                      onValueChange={handleInAppNotification}
                      onColor="#8C78EA"
                      offColor={colorScheme === 'light' ? '#E6E6E8' : '#141518'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2`}
        onPress={() => {
          navigation?.navigate('Settings');
        }}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettings;
