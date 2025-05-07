import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';
import {AvatarData} from '../utils/types';
import AvatarCard from './components/AvatarCard';

const Avatar = ({avatarData}: any) => {
  // rtk query hooks
  // console.log(avatarData);
  return (
    <View style={tw`flex-row flex-wrap my-4  justify-between gap-3`}>
      {avatarData?.map((avatar: AvatarData, index: number) => (
        <AvatarCard key={index} avatar={avatar} />
      ))}
    </View>
  );
};

export default Avatar;
