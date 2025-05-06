import {Image, Text, TouchableOpacity} from 'react-native';

import React from 'react';
import tw from '../../../lib/tailwind';
import {makeImage} from '../../../redux/api/baseApi';

const Badge = ({
  item,
  handleExpand,
  style,
}: {
  item: any;
  handleExpand: any;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      key={item?.id}
      style={[tw`items-center self-start gap-1  p-2`, style]}
      onPress={() =>
        handleExpand({
          title: item?.name,
          subtitle: item?.description,
          image: makeImage(item?.photo),
        })
      }>
      <Image
        style={tw`h-14 aspect-square rounded-2xl`}
        source={{
          uri: makeImage(item?.photo),
        }}
      />
      <Text
        numberOfLines={1}
        style={tw`text-black text-center dark:text-white text-[10px] w-20 font-WorkRegular`}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Badge;
