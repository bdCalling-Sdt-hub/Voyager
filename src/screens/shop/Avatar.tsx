import {Image, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconLock2} from '../../assets/icons/Icons';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useGetAvatarQuery} from '../../redux/apiSlices/equipmentSlice';
import {AvatarData} from '../utils/types';

const Avatar = ({data}: any) => {
  // rtk query hooks
  const {data: avatarData} = useGetAvatarQuery({});

  return (
    <View style={tw`flex-row flex-wrap my-4  justify-between gap-3`}>
      {avatarData?.data?.avatars?.map((avatar: AvatarData, index: number) => (
        <TouchableOpacity
          disabled={avatar?.status !== 'unlocked'}
          key={index}
          style={[
            tw`w-[48%] items-center bg-white dark:bg-primaryDark p-3 rounded-2xl `,
            {
              borderColor: 'rgba(0,0,0,.1)',
              borderWidth: 1,
              opacity: avatar?.status === 'locked' ? 0.5 : 1,
            },
          ]}>
          <View style={tw`w-full items-end justify-end h-4`}>
            {avatar?.status === 'locked' && <SvgXml xml={IconLock2} />}
          </View>
          <Image
            // tintColor={'rgba(0,0,0,.1)'}
            // blurRadius={100}

            resizeMode="contain"
            source={{uri: makeImage(avatar?.avatar)}}
            style={tw`h-16 aspect-square rounded-full`}
          />
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium font-500 my-1`}>
            {avatar?.name || 'No Name Available'}
          </Text>

          <TouchableOpacity
            disabled={avatar?.status !== 'locked'}
            style={[
              tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`,
            ]}>
            <Image
              source={require('../../assets/images/coin.png')}
              style={tw`h-7 w-7`}
            />

            <Text
              style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
              {avatar?.cost}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Avatar;
