import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import CountryDropdown from './CountryDropdown';

const ProfileSettings = () => {
  return (
    <View style={tw`bg-white px-[4%] h-full`}>
      <Header
        title={'Profile Settings'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        hideRightIcon={true}
      />

      {/* body */}
      <View>
        <View style={tw`items-center`}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/avatar1.png')}
              style={tw`h-18 w-18 rounded-full`}
            />
          </TouchableOpacity>
          <Text style={tw`text-gray100 text-sm font-WorkRegular font-400 mt-2`}>
            Upload profile picture or choose avatar
          </Text>
        </View>

        <View style={tw`bg-gray80 rounded-2xl p-4 mt-6`}>
          <Text style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
            General Information
          </Text>

          <View style={tw`gap-y-2`}>
            <View style={tw`h-12`}>
              <InputText
                placeholder="You Name"
                defaultValue="Henry William"
                style={tw`text-black text-base font-WorkMedium font-500`}
              />
            </View>
            <CountryDropdown />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSettings;
