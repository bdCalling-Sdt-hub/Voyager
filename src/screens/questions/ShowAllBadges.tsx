import {FlatList, Image, Text, TouchableOpacity} from 'react-native';

import React from 'react';
import {View} from 'react-native-ui-lib';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {NavigProps} from '../../utils/interface/NaviProps';

const ShowAllBadges = ({navigation, route}: NavigProps<{badgeData: any}>) => {
  const {badgeData} = route.params;
  return (
    <View style={tw`flex-1 bg-white px-[4%] pt-4 dark:bg-primaryDark`}>
      <Header
        title={'All Badges'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        hideRightIcon={true}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={badgeData}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
              key={item?.id}
              style={tw`items-center self-start gap-1 w-1/3  p-2`}>
              <Image
                style={tw`h-14 aspect-square rounded-2xl`}
                source={{
                  uri: makeImage(item?.photo),
                }}
              />
              <Text
                style={tw`text-black dark:text-white text-[10px] font-WorkRegular`}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShowAllBadges;
