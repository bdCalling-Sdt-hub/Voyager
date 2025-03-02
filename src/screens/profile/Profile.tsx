import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconAdd,
  IconNotification,
  IconSettings,
} from '../../assets/icons/Icons';
import Achievements from './components/Achievements';
import Visited from './components/Visited';
import FriendsList from './components/FriendsList';
import {useGetProfileQuery} from '../../../android/app/src/redux/slice/ApiSlice';
import { baseUrl } from '../utils/exports';

const Profile = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState(0);

  // rtk query hooks
  const {data: profileData, isLoading, error} = useGetProfileQuery({});
  const {full_name, email, image, user_name, signup_date} = profileData?.data || {};

  console.log("profile data: ", profileData?.data)
  return (
    <ScrollView style={tw`px-[4%] pt-2 bg-white dark:bg-primaryDark h-full`} showsVerticalScrollIndicator={false}>
      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-start justify-between py-2`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
            onPress={() => navigation?.navigate('Settings')}>
            <SvgXml xml={IconSettings} />
          </TouchableOpacity>
          <View style={[tw``]}>
            <Image
              source={{uri: baseUrl + image}}
              style={tw`h-24 w-24 rounded-full`}
            />
          </View>
          <TouchableOpacity
            style={[
              tw`border border-gray90 dark:border-darkBg rounded-full h-10 w-10 flex items-center justify-center`,
            ]}
            onPress={() => {
              navigation?.navigate('Notifications');
            }}>
            <SvgXml xml={IconNotification} />
            <View
              style={tw`bg-gold h-4 w-4 rounded-full items-center justify-center absolute top-1 right-1`}>
              <Text style={tw`text-white text-[8px] text-center`}>12</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={tw`text-black dark:text-white text-2xl font-WorkMedium text-center`}>
          {full_name || "N/A"}
        </Text>
        <Text style={tw`text-center text-gray70`}>{user_name || "N/A"}</Text>
        <View style={tw`flex-row items-center mt-6`}>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Joined
            </Text>
            <Text
              style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
            {signup_date?.slice(0, 4) || "N/A"}
            </Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Friends
            </Text>
            <Text
              style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
              10
            </Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Country
            </Text>
            <Image
              source={{uri: 'https://flagsapi.com/US/flat/64.png'}}
              style={tw`h-5 w-7 mt-1`}
            />
          </View>
        </View>
        <View style={tw`items-center mt-6 gap-y-4`}>
          <TouchableOpacity
            style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}
            onPress={() => navigation?.navigate('Friends')}>
            <SvgXml xml={IconAdd} />
            <Text style={tw`text-sm font-WorkMedium text-violet100 font-500`}>
              Add Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`border-pink100 bg-pink100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}
            onPress={() => navigation?.navigate('Subscription')}>
            <Text style={tw`text-sm font-WorkSemiBold text-white font-600`}>
              Upgrade to Premium
            </Text>
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <View style={tw`mt-12 mb-6 flex-row items-center gap-4`}>
          <TouchableOpacity
            style={tw`${
              activeTab === 0 ? 'border-b-[2px] border-b-violet100' : ''
            }  pb-2`}
            onPress={() => setActiveTab(0)}>
            <Text
              style={tw` ${
                activeTab === 0 ? 'text-violet100' : 'text-gray100 dark:text-white'
              } text-sm font-WorkBold font-700`}>
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activeTab === 1 ? 'border-b-[2px] border-b-violet100' : ''
            } flex-row items-center pb-2`}
            onPress={() => setActiveTab(1)}>
            <Text
              style={tw` ${
                activeTab === 1 ? 'text-violet100' : 'text-gray100 dark:text-white'
              } text-sm font-WorkBold font-700`}>
              Visited {''}
            </Text>
            <View
              style={tw`${
                activeTab === 1 ? 'bg-violet100' : 'bg-gray100 dark:bg-secDarkBg'
              } px-1 py-0.5 rounded`}>
              <Text style={tw`text-white text-[10px]`}>03</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activeTab === 2 ? 'border-b-[2px] border-b-violet100' : ''
            } flex-row items-center pb-2`}
            onPress={() => setActiveTab(2)}>
            <Text
              style={tw` ${
                activeTab === 2 ? 'text-violet100' : 'text-gray100 dark:text-white'
              } text-sm font-WorkBold font-700`}>
              Friends{' '}
            </Text>
            <View
              style={tw`${
                activeTab === 2 ? 'bg-violet100' : 'bg-gray100 dark:bg-secDarkBg'
              } px-1 py-0.5 rounded`}>
              <Text style={tw`text-white text-[10px]`}>09</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* achievements */}
        {activeTab === 0 ? (
          <Achievements navigation={navigation} />
        ) : activeTab === 1 ? (
          <Visited />
        ) : activeTab === 2 ? (
          <FriendsList navigation={navigation} />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Profile;
