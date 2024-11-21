import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconFilledNotification,
  IconNotification,
} from '../../assets/icons/Icons';
import notifications from '../../utils/json/notifications.json';

const Notifications = ({navigation}: any) => {
  const title = 'Notifications';
  return (
    <View style={tw`bg-white px-[4%] h-full dark:bg-primaryDark`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        icon={IconFilledNotification}
      />
      {/* body */}
      <ScrollView style={tw`mt-4`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-black dark:text-white text-sm font-WorkRegular font-400`}>
            Today
          </Text>
          <TouchableOpacity>
            <Text style={tw`text-violet100 text-sm font-WorkMedium font-500`}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>

        {/* notifications */}
        <View style={tw`mt-4 gap-y-2`}>
          {/*add request notification */}
          <TouchableOpacity
            style={tw`p-2 bg-gray80 dark:bg-darkBg rounded-3xl flex-row items-center gap-4`}>
            <Image
              source={require('../../assets/images/avatar1.png')}
              style={tw`w-16 h-16 rounded-full`}
            />
            <View style={tw`flex-shrink`}>
              <Text style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
                <Text style={tw`font-600 font-WorkSemiBold`}>Anika Marley</Text>{' '}
                sent you an add Request
              </Text>
              <View style={tw`flex-row items-center gap-2 mt-2`}>
                <TouchableOpacity
                  style={tw`bg-violet100 rounded-3xl px-5 pt-1 pb-1.5`}>
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
            </View>
          </TouchableOpacity>
          {/* Notification view */}
          {notifications?.map((item: any) => (
            <TouchableOpacity
              style={tw`p-2 flex-row items-center gap-4`}
              key={item?.id}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-12 w-12 rounded-full`}
              />
              <View style={tw`flex-shrink`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkRegular font-400`}>
                  <Text style={tw`font-600 font-WorkSemiBold`}>
                    {item?.title}
                  </Text>{' '}
                  {item?.subtitle}
                </Text>
                <View style={tw`flex-row items-center gap-2 mt-1`}>
                  <Text
                    style={tw`text-gray60 text-xs font-WorkRegular font-400`}>
                    {item?.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
