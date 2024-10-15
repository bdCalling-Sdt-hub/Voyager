import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import shop from '../../utils/json/shop.json';

const Avatar = ({data}: any) => {
  return (
    <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
      {data?.map((item: any) => (
        <View
          style={tw`w-[48%] items-center bg-white p-4 rounded-2xl mb-2.5 border border-gray90`}>
          <Image
            source={require('../../assets/images/avatar3.png')}
            style={tw`w-14 h-14 rounded-full`}
          />
          <Text style={tw`text-black text-base font-WorkMedium font-500 my-1`}>
            {item?.title}
          </Text>

          <TouchableOpacity
            style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
            <Image
              source={require('../../assets/images/coin.png')}
              style={tw`h-7 w-7`}
            />
            <Text style={tw`text-black text-sm font-WorkMedium font-500`}>
              {item?.coins}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Avatar;
