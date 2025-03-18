import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {IconFilledNotification} from '../../assets/icons/Icons';
import FriendsList from '../profile/components/FriendsList';
import Request from './Request';
import AddFriends from './AddFriends';
import {
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
} from '../../../android/app/src/redux/slice/ApiSlice';

const Friends = ({title = 'Friends', navigation}: any) => {
  // states
  const [friendsOption, setFriendsOption] = useState('add_friends');

  // rkt query hooks
  const {data} = useGetFriendRequestsQuery({});
  const users = data?.data?.friend_requests?.data || [];
  const {data: friendsData} = useGetFriendsQuery({});
  const friends = friendsData?.data?.friends?.data || [];

  return (
    <View style={tw`bg-white dark:bg-primaryDark px-[4%] h-full`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        icon={IconFilledNotification}
        hideFilterIcon={true}
      />

      <View style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mt-4`}>
        <TouchableOpacity
          style={tw`${
            friendsOption === 'add_friends' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setFriendsOption('add_friends')}>
          <Text
            style={tw`${
              friendsOption === 'add_friends' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Add Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            friendsOption === 'requests' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center flex-row gap-1`}
          onPress={() => setFriendsOption('requests')}>
          <Text
            style={tw`${
              friendsOption === 'requests' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Request
          </Text>
          <View
            style={tw`h-5 w-5 ${
              friendsOption === 'requests' ? 'bg-white' : 'bg-gray100'
            } rounded-full text-center items-center justify-center`}>
            <Text
              style={tw`text-xs ${
                friendsOption === 'requests' ? 'text-violet100' : 'text-white'
              }`}>
              {users?.length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            friendsOption === 'friends' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center flex-row gap-1`}
          onPress={() => setFriendsOption('friends')}>
          <Text
            style={tw`${
              friendsOption === 'friends' ? 'text-white' : 'text-gray100'
            }  text-xs font-WorkMedium`}>
            Friends
          </Text>
          <View
            style={tw`h-5 w-5 ${
              friendsOption === 'friends' ? 'bg-white' : 'bg-gray100'
            } rounded-full text-center items-center justify-center`}>
            <Text
              style={tw`text-xs ${
                friendsOption === 'friends' ? 'text-violet100' : 'text-white'
              }`}>
              {friends?.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={tw`mt-4`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {friendsOption === 'add_friends' && (
          <AddFriends navigation={navigation} />
        )}
        {friendsOption === 'requests' && (
          <Request navigation={navigation} users={users} />
        )}
        {friendsOption === 'friends' && (
          <FriendsList navigation={navigation} friends={friends} />
        )}
      </ScrollView>
    </View>
  );
};

export default Friends;
