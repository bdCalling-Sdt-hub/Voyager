import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
} from '../../redux/apiSlices/settingSlice';
import {HIGHT, PrimaryColor} from '../utils/utils';

import React from 'react';
import {IconFilledNotification} from '../../assets/icons/Icons';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import NotificationCard from './components/NotificationCard';

const Notifications = ({navigation}: any) => {
  const title = 'Notifications';

  // rkt query hooks
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isFetching: isFetchingNotifications,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery({});

  const [readAllNotification] = useReadAllNotificationMutation();
  // console.log('notification data: ', notifications);

  return (
    <View style={tw`bg-white px-[4%] h-full dark:bg-primaryDark`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        icon={IconFilledNotification}
      />
      {/* body */}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pt-4 pb-10 gap-3`}
        data={notifications?.data}
        refreshControl={
          <RefreshControl
            tintColor={PrimaryColor}
            colors={[PrimaryColor]}
            refreshing={false}
            onRefresh={refetchNotifications}
          />
        }
        ListEmptyComponent={() => {
          return (
            <EmptyCard
              title={'No notifications'}
              hight={HIGHT * 0.7}
              isLoading={isFetchingNotifications || isLoadingNotifications}
            />
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View style={tw`flex-row items-center justify-between`}>
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkRegular font-400`}>
                Today
              </Text>
              {notifications?.data?.filter(
                (item: any) => item?.read_at === null,
              ) && (
                <TouchableOpacity
                  onPress={() => {
                    readAllNotification({});
                  }}>
                  <Text
                    style={tw`text-violet100 text-sm font-WorkMedium font-500`}>
                    Mark all as read
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <>
              {/* notifications */}
              {!notifications?.data?.length && (
                <View style={tw`mt-6`}>
                  <Text
                    style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
                    No notifications
                  </Text>
                </View>
              )}

              <NotificationCard key={index} item={item} />
            </>
          );
        }}
      />
    </View>
  );
};

export default Notifications;
