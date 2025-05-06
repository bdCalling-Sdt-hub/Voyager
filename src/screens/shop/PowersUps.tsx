import {Image, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconLock2} from '../../assets/icons/Icons';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useGetPowerUpsQuery} from '../../redux/apiSlices/equipmentSlice';

const PowersUps = () => {
  const {data: powerUpItems} = useGetPowerUpsQuery({});
  return (
    <View>
      {powerUpItems?.data?.powerups.map((item: any, index: number) => (
        <View style={tw`mt-6`} key={index}>
          <TouchableOpacity
            disabled={item?.status !== 'unlocked'}
            style={tw`border border-gray90 dark:border-darkBg rounded-2xl p-4`}>
            <View style={tw`w-full items-end justify-end h-4`}>
              {item?.status === 'locked' && <SvgXml xml={IconLock2} />}
            </View>
            <View style={tw`flex-row items-center  gap-2`}>
              <Image
                source={{
                  uri: makeImage(item?.avatar),
                }}
                style={tw`w-18 h-18`}
              />
              <View>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkSemiBold font-600`}>
                  {item?.option}
                </Text>
                <Text
                  style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
                  {item?.short_description}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              disabled={item?.status !== 'unlocked'}
              style={tw`flex-row items-center gap-2 border border-gray90 dark:border-darkBg rounded-full py-1.5 px-2 justify-center mt-4`}>
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkExtraBold `}>
                Buy
              </Text>
              <Image
                style={tw`h-5 w-5`}
                source={require('../../assets/images/coin.png')}
              />
              <Text style={tw`text-gold text-lg font-WorkSemiBold font-600`}>
                400
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default PowersUps;
