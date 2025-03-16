import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import tw from '../../../lib/tailwind';
import users from '../../../utils/json/users.json';
import { useGetFriendsQuery, useSendFriendRequestMutation } from '../../../../android/app/src/redux/slice/ApiSlice';
import { baseUrl } from '../../utils/exports';
const FriendsList = ({navigation}: any) => {
  const {data} = useGetFriendsQuery({});
  const friends = data?.data?.friends?.data || [];
  
  return (
    <View style={tw`gap-y-2`}>
      {friends?.map((item: any) => (
        <TouchableOpacity
          style={tw`px-2 py-1 rounded-3xl border border-gray80 dark:bg-darkBg dark:border-darkBg flex-row items-center gap-4`}
          key={item?.user_id}
          onPress={() => {
            navigation?.navigate('OthersProfile', {id: item?.user_id});
          }}>
          <Image
            source={{
              uri: baseUrl + item?.image,
            }}
            style={tw`w-16 h-16 rounded-full`}
          />
          <View style={tw`flex-shrink`}>
            <Text
              style={tw`text-black dark:text-white text-base font-600 font-WorkSemiBold`}>
              {item?.full_name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FriendsList;
