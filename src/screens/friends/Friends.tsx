import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {IconFilledNotification} from '../../assets/icons/Icons';

const Friends = ({title = 'Friends'}) => {
  const [friendsOption, setFriendsOption] = useState('add_friends');
  return (
    <View style={tw`bg-white px-[4%] h-full`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        icon={IconFilledNotification}
        hideFilterIcon={true}
      />

      <View style={tw`flex-row bg-gray80 p-1 rounded-full mt-4`}>
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
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setFriendsOption('requests')}>
          <Text
            style={tw`${
              friendsOption === 'requests' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            friendsOption === 'friends' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setFriendsOption('friends')}>
          <Text
            style={tw`${
              friendsOption === 'friends' ? 'text-white' : 'text-gray100'
            }  text-xs font-WorkMedium`}>
            Friends
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Friends;
