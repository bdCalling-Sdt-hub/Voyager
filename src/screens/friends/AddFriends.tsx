import React, {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {IconAdd, IconClose} from '../../assets/icons/Icons';
import {
  useCancelFriendRequestMutation,
  useGetFriendForAddQuery,
  useSendFriendRequestMutation,
  useUnfriendUserMutation,
} from '../../redux/slice/ApiSlice';

import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import {baseUrl} from '../utils/exports';

const AddFriends = ({navigation}: any) => {
  // rtk query hooks
  const {data} = useGetFriendForAddQuery({});
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [unfriendUser] = useUnfriendUserMutation();
  const addFriends = data?.data?.data || [];

  // State to track loading states for each button
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: 'sending' | 'canceling' | 'unfriending' | null;
  }>({});

  // handlers

  // send friend request
  const handleSendFriendRequest = async (id: number) => {
    console.log('Send Request Handler Called');
    setLoadingStates(prev => ({...prev, [id]: 'sending'}));
    try {
      const response = await sendFriendRequest({id});
      console.log('response of send friend request: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Sending friend request failed',
          response?.error?.message || 'An error occurred.',
        );
      } else {
        // navigation?.navigate('OthersProfile');
      }
    } catch (err: any) {
      Alert.alert(
        'Sending friend request Failed',
        err?.message || 'An error occurred.',
      );
    } finally {
      setLoadingStates(prev => ({...prev, [id]: null}));
    }
  };

  // cancel friend request
  const handleCancelFriendRequest = async (id: number) => {
    console.log('Cancel Request Handler Called');
    setLoadingStates(prev => ({...prev, [id]: 'canceling'}));
    try {
      const response = await cancelFriendRequest({id});
      console.log('response of cancel friend request: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Canceling friend request failed',
          response?.error?.message || 'An error occurred.',
        );
      }
    } catch (err: any) {
      Alert.alert(
        'Canceling friend request Failed',
        err?.message || 'An error occurred.',
      );
    } finally {
      setLoadingStates(prev => ({...prev, [id]: null}));
    }
  };

  // unfriend user
  const handleUnfriendUser = async (id: number) => {
    console.log('Unfriend User Handler Called');
    setLoadingStates(prev => ({...prev, [id]: 'unfriending'}));
    try {
      const response = await unfriendUser({id});
      console.log('response of unfriend user: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Unfriend user failed',
          response?.error?.message || 'An error occurred.',
        );
      }
    } catch (err: any) {
      Alert.alert('Unfriend user Failed', err?.message || 'An error occurred.');
    } finally {
      setLoadingStates(prev => ({...prev, [id]: null}));
    }
  };
  return (
    <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
      {addFriends?.map((item: any) => {
        const isLoading = loadingStates[item.id] === 'sending';
        const isLoadingCancel = loadingStates[item.id] === 'canceling';
        const isLoadingUnfriend = loadingStates[item.id] === 'unfriending';

        return (
          <TouchableOpacity
            style={tw`w-[48%] dark:bg-darkBg dark:border-darkBg items-center bg-white p-4 rounded-2xl mb-2.5 border border-gray90`}
            key={item?.id}
            onPress={() => {
              navigation?.navigate('OthersProfile', {id: item?.id, item: item});
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
              onPress={() =>
                item?.status === 'pending'
                  ? handleCancelFriendRequest(item?.id)
                  : item?.status === 'accepted'
                  ? handleUnfriendUser(item?.id)
                  : handleSendFriendRequest(item?.id)
              }
              disabled={isLoading || isLoadingCancel || isLoadingUnfriend}
              style={tw`flex-row w-full justify-center items-center gap-2 border border-violet100 rounded-full py-1 px-2 ${
                item?.status === 'not_friend' || item?.status === 'canceled'
                  ? 'bg-violet100'
                  : ''
              }`}>
              {item?.status === 'not_friend' && <SvgXml xml={IconAdd} />}
              <Text
                style={tw`text-base font-WorkMedium font-500 ${
                  item?.status === 'not_friend' || item?.status === 'canceled'
                    ? 'text-white'
                    : 'text-violet100'
                }`}>
                {isLoading
                  ? 'Sending...'
                  : isLoadingCancel
                  ? 'Canceling...'
                  : isLoadingUnfriend
                  ? 'Unfriending...'
                  : item?.status === 'not_friend'
                  ? 'Add'
                  : item?.status === 'canceled'
                  ? 'Add'
                  : item?.status === 'pending'
                  ? 'Cancel'
                  : item?.status === 'accepted'
                  ? 'Unfriend'
                  : 'Add'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AddFriends;
