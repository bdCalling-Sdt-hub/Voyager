import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import shop from '../../utils/json/shop.json';
import { useGetAvatarQuery } from '../../../android/app/src/redux/slice/ApiSlice';
import { AvatarData } from '../utils/types';
import { SvgXml } from 'react-native-svg';
import { IconLock2 } from '../../assets/icons/Icons';
import { baseUrl } from '../utils/exports';

const Avatar = ({data}: any) => {

  // rtk query hooks
  const {data: avatarData} = useGetAvatarQuery({});
  const avatars = avatarData?.data?.avatars || [];
  return (
    <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
      {avatars?.map((avatar: AvatarData, index: number) => (
            <TouchableOpacity
            disabled={avatar?.status !== 'unlocked'}
              key={index}
              style={tw`w-[48%] items-center bg-white dark:bg-primaryDark p-4 rounded-2xl mb-2.5`}>
              <View style={tw`w-full items-end justify-end h-4`}>
                {avatar?.status === 'locked' && (
                  <SvgXml xml={IconLock2} />
                )}
              </View>
              <Image
                source={
                  avatar?.avatar
                    ? {uri: baseUrl + avatar?.avatar}
                    : require('../../assets/images/avatar2.png')
                }
                style={tw`w-14 h-14 rounded-full`}
              />
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium font-500 my-1`}>
                {avatar?.name || 'No Name Available'}
              </Text>

              <TouchableOpacity
              disabled={avatar?.status !== 'locked'}
                style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
                {avatar?.status === 'locked' && (
                  <Image
                  source={require('../../assets/images/coin.png')}
                  style={tw`h-7 w-7`}
                />
                )}
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  {avatar?.status === 'locked' ? (avatar?.cost || 0) : 'Unlocked'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
    </View>
  );
};

export default Avatar;
