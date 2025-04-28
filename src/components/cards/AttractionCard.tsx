import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {IconFilledHeart, IconWhiteHeart} from '../../assets/icons/Icons';
import {
  useAddToBucketListMutation,
  useRemoveFromBucketListMutation,
} from '../../redux/apiSlices/bucketApiSlice';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {makeColor} from '../../screens/utils/utils';
import {makeImage} from '../../redux/api/baseApi';
import tw from '../../lib/tailwind';

interface AttractionCardProps {
  item: {
    name: string;
    type: 'attraction' | 'city' | 'country';
    xp: number;
    id: string;
    country: string;
    city: string;
    country_code: string;
    city_code: string;
    location: string;
    coins: number;
    images: string[];
    bucketlist_status: string;
  };
  handleVisitLocation: (item: any) => void;
}

export default function AttractionCard({
  item,
  handleVisitLocation,
}: AttractionCardProps) {
  console.log(item);
  const [addToBucketList, {isLoading}] = useAddToBucketListMutation();
  const [removeFromBucketList, {isLoading: isLoadingRemove}] =
    useRemoveFromBucketListMutation();
  const handleBucketList = async () => {
    const data = {type: item?.type, bucketlist_status: 'bucketlisted'};
    try {
      const response = await addToBucketList({id: item?.id, data}).unwrap();
      if (response?.error?.success === false) {
        Alert.alert(
          'Warning',
          response?.error?.message || 'An error occurred.',
        );
        return;
      }
    } catch (err: any) {
      Alert.alert('Warning', err?.message || 'An error occurred.');
    }
  };

  const handleRemoveBucketList = async () => {
    try {
      const response = await removeFromBucketList({
        id: item?.id,
      }).unwrap();
      console.log('reponse check of remove bucket list: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Warning',
          response?.error?.message || 'An error occurred.',
        );
        return;
      }
    } catch (err: any) {
      Alert.alert('Warning', err?.message || 'An error occurred.');
    }
  };
  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-1 pb-2 my-1 gap-4 rounded-2xl border-r-2 border-b-2 border-b-[${makeColor(
        item?.type,
      )}] border-r-[${makeColor(item?.type)}]`}
      onPress={() => handleVisitLocation(item)}>
      <Image
        key={item?.id}
        resizeMode="cover"
        source={{
          uri: makeImage(item?.images![0]),
        }}
        style={tw`rounded-2xl w-4/12 h-24`}
      />
      <View style={tw`flex-1 justify-between flex-row items-center gap-2`}>
        <View style={tw`gap-y-1`}>
          <View>
            <Text
              style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
              {item?.name}
            </Text>
            <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
              {item?.location || 'Location'}
            </Text>
          </View>
          <View style={tw`flex-row gap-4`}>
            <View style={tw`flex-row items-center gap-1 flex-shrink`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                {item?.coins} coins
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-1 flex-shrink`}>
              <Image
                source={require('../../assets/images/trophy.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                {item?.xp} XP
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (item?.bucketlist_status === 'bucketlisted') {
            handleRemoveBucketList();
          } else {
            handleBucketList();
          }
        }}
        style={tw`absolute right-4`}>
        <SvgXml
          xml={
            item?.bucketlist_status === 'bucketlisted'
              ? IconFilledHeart
              : IconWhiteHeart
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
