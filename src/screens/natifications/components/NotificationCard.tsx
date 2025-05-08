import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import tw from '../../../lib/tailwind';
import {makeImage} from '../../../redux/api/baseApi';
import {useAcceptFriendRequestMutation} from '../../../redux/apiSlices/friendSlice';
import {useReadNotificationMutation} from '../../../redux/apiSlices/settingSlice';

const NotificationCard = ({item}: {item: any}) => {
  const [acceptFriendRequest, {isLoading: isAccepting}] =
    useAcceptFriendRequestMutation();
  const [readNotification] = useReadNotificationMutation();
  // handlers

  //   console.log(item?.read_at);
  const handleAcceptRequest = async (id: number) => {
    try {
      const response = await acceptFriendRequest({
        friend_id: id,
        notification_id: item?.id,
      }).unwrap();

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
    <View
      style={[
        tw` `,
        {
          opacity: item?.read_at == null ? 1 : 0.5,
        },
      ]}>
      {/*add request notification */}
      {/* <TouchableOpacity
        style={tw`p-2 bg-gray80 dark:bg-darkBg rounded-3xl flex-row items-center gap-4`}>
        <Image
          source={{
            uri: makeImage(item?.data?.sender_image),
          }}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View style={tw`flex-shrink`}>
          <Text
            style={tw`text-black dark:text-white text-base  font-WorkRegular font-400`}>
            {item.data?.message}
          </Text>
          {item?.type ===
            'App\\Notifications\\FriendInterationNotification' && (
            <>
              {item.accept_status ? (
                <View style={tw`rounded-3xl px-5 pt-1 pb-1.5`}>
                  <Text
                    style={tw`text-black dark:text-white text-base font-600 font-WorkSemiBold`}>
                    Accepted
                  </Text>
                </View>
              ) : (
                <View style={tw`flex-row items-center gap-2 mt-2`}>
                  <TouchableOpacity
                    onPress={() => handleAcceptRequest(item?.data?.sender_id)}
                    style={tw`bg-violet100 flex-row items-center gap-2 rounded-3xl px-5 pt-1 pb-1.5`}>
                    {isAccepting && (
                      <ActivityIndicator size="small" color={'white'} />
                    )}
                    <Text
                      style={tw`text-white text-base font-600 font-WorkSemiBold`}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`rounded-3xl px-5 pt-1 pb-1.5`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-600 font-WorkSemiBold`}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity> */}
      {/* Notification view */}

      <TouchableOpacity
        // disabled={item?.data?.read_at !== null}
        onPress={() => readNotification(item?.id)}
        style={tw`p-2 flex-row items-start gap-4 
             bg-white dark:bg-darkBg
          rounded-2xl`}
        key={item?.id}>
        <Image
          source={{uri: makeImage(item?.data?.sender_image)}}
          style={tw`h-12 w-12 rounded-full`}
        />
        <View style={tw`flex-shrink`}>
          <View>
            <Text style={tw`font-600 font-WorkSemiBold`}>
              {item?.data?.title || 'title'}
            </Text>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
              {item?.data?.message || 'subtitle'}
            </Text>
            <View style={tw`flex-row items-center gap-2 mt-1`}>
              <Text style={tw`text-gray60 text-xs font-WorkRegular font-400`}>
                {item?.time || 'time'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {item?.read_at == null ? (
        <View
          style={tw`absolute top-10 right-1 h-2 w-2 rounded-full bg-orange-500`}
        />
      ) : null}
    </View>
  );
};

export default NotificationCard;
