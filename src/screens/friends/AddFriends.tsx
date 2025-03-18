import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconAdd, IconClose} from '../../assets/icons/Icons';
import users from '../../utils/json/users.json';
import {
  useGetFriendForAddQuery,
  useSendFriendRequestMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';
import {baseUrl} from '../utils/exports';

const AddFriends = ({navigation}: any) => {
  // rtk query hooks
  const {data} = useGetFriendForAddQuery({});
  const [sendFriendRequest, {isLoading}] = useSendFriendRequestMutation();
  const addFriends = data?.data?.data || [];


  console.log("add friends: ", addFriends?.length)
  // handlers
  const handleSendFriendRequest = async (id: number) => {
    try {
      const response = await sendFriendRequest({id});
      console.log('response of send friend request: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Sending friend request failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        // navigation?.navigate('OthersProfile');
      }
    } catch (err: any) {
      Alert.alert(
        'Sending friend request Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  console.log('add friends: ', addFriends);
  return (
    <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
      {addFriends?.map((item: any) => (
        <TouchableOpacity
          style={tw`w-[48%] dark:bg-darkBg dark:border-darkBg items-center bg-white p-4 rounded-2xl mb-2.5 border border-gray90`}
          key={item?.id}
          onPress={() => {
            navigation?.navigate('OthersProfile');
          }}>
          <TouchableOpacity style={tw`items-end w-full`}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <Image
            source={
              item?.image
                ? {uri: baseUrl + item?.image}
                : require('../../assets/images/avatar5.png')
            }
            style={tw`w-14 h-14 rounded-full`}
          />
          <Text
            style={tw`text-black dark:text-white text-sm font-WorkMedium font-500 my-1`}>
            {item?.full_name}
          </Text>

          <TouchableOpacity
            onPress={() => handleSendFriendRequest(item?.id)}
            disabled={isLoading || item?.status === 'pending'}
            style={tw`flex-row w-full justify-center items-center gap-2 border border-violet100 rounded-full py-1 px-2 ${
              item?.status === 'not_friend' ? '' : 'bg-violet100'
            }`}>
            {item?.status === 'not_friend' && <SvgXml xml={IconAdd} />}
            <Text
              style={tw`text-base font-WorkMedium font-500 ${
                item?.status === 'not_friend' ? 'text-violet100' : 'text-white'
              }`}>
              {isLoading
                ? 'Sending...'
                : item?.status === 'not_friend'
                ? 'Add'
                : item?.status === 'pending'
                ? 'Pending'
                : 'Already Friend'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AddFriends;
