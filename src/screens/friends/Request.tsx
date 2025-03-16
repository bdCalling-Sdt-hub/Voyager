import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
// import users from '../../utils/json/users.json';
import {useAcceptFriendRequestMutation, useGetFriendRequestsQuery} from '../../../android/app/src/redux/slice/ApiSlice';
import {baseUrl} from '../utils/exports';
const Request = ({navigation}: any) => {
  // rtk query hooks
  const {data} = useGetFriendRequestsQuery({});
  const [acceptFriendRequest, {isLoading: isAccepting}] = useAcceptFriendRequestMutation();

  const users = data?.data?.friend_requests?.data || [];
  
  const handleAcceptRequest = async (id: number) => {
    try {
      const response = await acceptFriendRequest({id});
      console.log('response of accept friend request: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Accepting friend request failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        // navigation?.navigate('OthersProfile');
      }
    } catch (err: any) {
      Alert.alert(
        'Accepting friend request Failed',
        err?.message || 'An error occurred.',
      );
    }
  };
  return (
    <View style={tw`gap-y-2`}>
      {users?.map((item: any) => (
        <TouchableOpacity
          style={tw`px-2 py-1 rounded-3xl border border-gray80 flex-row items-center gap-4`}
          key={item?.id}>
          <Image
            source={{
              uri: item?.image
                ? baseUrl + item?.image
                : 'https://i.pravatar.cc/150?img=5',
            }}
            style={tw`w-16 h-16 rounded-full`}
          />
          <View style={tw`flex-shrink`}>
            <Text
              style={tw`text-black dark:text-white text-base font-600 font-WorkSemiBold`}>
              {item?.full_name || 'No Name Available'}
            </Text>
            <Text
              style={tw`text-black dark:text-white text-base font-400 font-WorkRegular mb-2`}>
              {item?.user_name || 'No username Available'}
            </Text>
            {item?.status === 'accepted' ? (
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`border-[2px] border-violet100 w-full pt-1 pb-2 justify-center rounded-full items-center`}
                  onPress={() => {
                    navigation?.navigate('OthersProfile');
                  }}>
                  <Text style={tw`text-violet100 text-base font-WorkSemiBold`}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-2`}>
                <TouchableOpacity
                  onPress={() => handleAcceptRequest(item?.id)}
                  style={tw`bg-violet100 border-[2px] border-violet100 w-20 pt-1 pb-2 justify-center rounded-full items-center`}>
                  <Text style={tw`text-white text-base font-WorkSemiBold`}>
                    {isAccepting ? 'Accepting...' : 'Accept'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`w-20 pt-1 border-[2px] border-transparent pb-2 justify-center rounded-full items-center`}>
                  <Text
                    style={tw`text-black dark:text-white text-base font-WorkSemiBold`}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Request;
