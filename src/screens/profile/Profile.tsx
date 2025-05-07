import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconAdd,
  IconNotification,
  IconSettings,
} from '../../assets/icons/Icons';

import {SvgXml} from 'react-native-svg';
import LoadingModal from '../../components/modals/LoadingModal';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useGetVisitedQuery} from '../../redux/apiSlices/attractionApiSlice';
import {useGetProfileQuery} from '../../redux/apiSlices/authApiSlice';
import {useGetFriendsQuery} from '../../redux/apiSlices/friendSlice';
import {useGetNotificationsQuery} from '../../redux/apiSlices/settingSlice';
import {PrimaryColor} from '../utils/utils';
import Achievements from './components/Achievements';
import FriendsList from './components/FriendsList';
import Visited from './components/Visited';

const Profile = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState(0);

  // rtk query hooks
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: refetchProfile,
  } = useGetProfileQuery({});

  const {
    data: visitedData,
    isLoading: isLoadingVisited,
    isFetching: isFetchingVisited,
    refetch: refetchVisited,
  } = useGetVisitedQuery({});

  const {
    data: friendsData,
    isLoading: isLoadingFriends,
    isFetching: isFetchingFriends,
    refetch: refetchFriends,
  } = useGetFriendsQuery({});

  const {
    data: notification = [],
    isLoading: isLoadingNotification,
    isFetching: isFetchingNotification,
    refetch: refetchNotification,
  } = useGetNotificationsQuery({});

  // Fetch user data

  // console.log(friendsData?.data?.total_friends);

  // console.log(
  //   notification?.data
  //     ?.filter((im: any) => im.read_at == null)
  //     .length?.toString(),
  // );

  return (
    <>
      <LoadingModal
        visible={
          isFetchingProfile ||
          isFetchingVisited ||
          isFetchingFriends ||
          isFetchingNotification
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={PrimaryColor}
            colors={[PrimaryColor]}
            onRefresh={() => {
              refetchNotification();
              refetchProfile();
              refetchVisited();
              refetchFriends();
            }}
          />
        }
        style={tw`px-[4%] pt-2 bg-white dark:bg-primaryDark h-full`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`mb-4`}>
          <View style={tw`flex-row items-start justify-between py-2`}>
            <TouchableOpacity
              style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
              onPress={() => navigation?.navigate('Settings')}>
              <SvgXml xml={IconSettings} />
            </TouchableOpacity>
            <View style={[tw``]}>
              <Image
                source={{uri: makeImage(profileData?.data?.image)}}
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
              {notification?.data?.filter((im: any) => im.read_at == null)
                .length ? (
                <View
                  style={tw`bg-gold h-4 w-4 rounded-full items-center justify-center absolute top-1 right-1`}>
                  <Text style={tw`text-white text-[8px] text-center`}>
                    {notification?.data?.filter((im: any) => im.read_at == null)
                      .length || ''}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
          <Text
            style={tw`text-black dark:text-white text-2xl font-WorkMedium text-center`}>
            {profileData?.data?.full_name || 'N/A'}
          </Text>
          <Text style={tw`text-center text-gray70`}>
            {profileData?.data?.user_name || 'N/A'}
          </Text>
          <View style={tw`flex-row items-center mt-6`}>
            <View style={tw`items-center flex-1`}>
              <Text
                style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
                Joined
              </Text>
              <Text
                style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
                {profileData?.data?.signup_date?.slice(0, 4) || 'N/A'}
              </Text>
            </View>
            <View style={tw`items-center flex-1`}>
              <Text
                style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
                Friends
              </Text>
              <Text
                style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
                {friendsData?.data?.total_friends || '0'}
              </Text>
            </View>
            <View style={tw`items-center flex-1`}>
              <Text
                style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
                Country
              </Text>
              <Image
                source={{
                  uri: `https://flagsapi.com/${profileData?.data?.country_abbreviated}/flat/64.png`,
                }}
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
            {profileData?.data?.user_type === 'Free' && (
              <TouchableOpacity
                style={tw`border-pink100 bg-pink100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}
                onPress={() => navigation?.navigate('Subscription')}>
                <Text style={tw`text-sm font-WorkSemiBold text-white font-600`}>
                  Upgrade to Premium
                </Text>
              </TouchableOpacity>
            )}
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
                  activeTab === 0
                    ? 'text-violet100'
                    : 'text-gray100 dark:text-white'
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
                  activeTab === 1
                    ? 'text-violet100'
                    : 'text-gray100 dark:text-white'
                } text-sm font-WorkBold font-700`}>
                Visited {''}
              </Text>
              <View
                style={tw`${
                  activeTab === 1
                    ? 'bg-violet100'
                    : 'bg-gray100 dark:bg-secDarkBg'
                } px-1 py-0.5 rounded`}>
                <Text style={tw`text-white text-[10px]`}>
                  {visitedData?.data?.count}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${
                activeTab === 2 ? 'border-b-[2px] border-b-violet100' : ''
              } flex-row items-center pb-2`}
              onPress={() => setActiveTab(2)}>
              <Text
                style={tw` ${
                  activeTab === 2
                    ? 'text-violet100'
                    : 'text-gray100 dark:text-white'
                } text-sm font-WorkBold font-700`}>
                Friends{' '}
              </Text>
              <View
                style={tw`${
                  activeTab === 2
                    ? 'bg-violet100'
                    : 'bg-gray100 dark:bg-secDarkBg'
                } px-1 py-0.5 rounded`}>
                <Text style={tw`text-white text-[10px]`}>
                  {friendsData?.data?.total_friends}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* achievements */}
          {activeTab === 0 ? (
            <Achievements navigation={navigation} key={profileData?.data?.id} />
          ) : activeTab === 1 ? (
            <Visited
              navigation={navigation}
              data={visitedData?.data?.paginated_data?.data}
            />
          ) : activeTab === 2 ? (
            <FriendsList
              navigation={navigation}
              friends={friendsData?.data?.friends?.data}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
