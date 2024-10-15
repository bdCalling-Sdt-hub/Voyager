import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconCart,
  IconDangerLogout,
  IconLock,
  IconProfileSettings,
  IconSearch,
  IconTravelPreferences,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';

const Settings = ({title = 'Settings', navigation}: any) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  return (
    <View style={tw`px-[4%] bg-white h-full`}>
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
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 rounded-2xl`}
          onPress={() => navigation.navigate('ProfileSettings')}>
          <SvgXml xml={IconProfileSettings} />
          <Text style={tw`text-black text-base font-WorkMedium font-500`}>
            Profile Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 rounded-2xl`}
          onPress={() => navigation.navigate('Preferences')}>
          <SvgXml xml={IconTravelPreferences} />
          <Text style={tw`text-black text-base font-WorkMedium font-500`}>
            Travel Preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 rounded-2xl`}
          onPress={() => navigation.navigate('AccountSettings')}>
          <SvgXml xml={IconLock} />
          <Text style={tw`text-black text-base font-WorkMedium font-500`}>
            Account Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 rounded-2xl`}>
          <SvgXml xml={IconCart} />
          <Text style={tw`text-black text-base font-WorkMedium font-500`}>
            Subscription & Billing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 p-4 border border-gray90 rounded-2xl`}>
          <SvgXml xml={IconDangerLogout} />
          <Text style={tw`text-black text-base font-WorkMedium font-500`}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
