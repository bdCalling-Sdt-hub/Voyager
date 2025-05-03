import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAddToBucketListMutation,
  useRemoveFromBucketListMutation,
} from '../../redux/apiSlices/bucketApiSlice';
import {PrimaryColor, makeColor} from '../../screens/utils/utils';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useAppColorScheme} from 'twrnc';
import {IconFilledHeart} from '../../assets/icons/Icons';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';

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
    entity_id: string;
  };
  handleVisitLocation?: (item: any) => void;
  removeHeartBtn?: boolean;
  disabled?: boolean;
  visited?: boolean;
}

export default function AttractionCard({
  item,
  handleVisitLocation,
  removeHeartBtn: heartBtn,
  disabled = false,
  visited = false,
}: AttractionCardProps) {
  // console.log(item);
  const [colorScheme] = useAppColorScheme(tw);
  const [addToBucketList, {isLoading}] = useAddToBucketListMutation();
  const [removeFromBucketList, {isLoading: isLoadingRemove}] =
    useRemoveFromBucketListMutation();
  const handleBucketList = async () => {
    const data = {type: item?.type};
    try {
      const response = await addToBucketList({id: item?.id, data}).unwrap();
      console.log(response);
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
        type: item?.type,
      }).unwrap();
      // console.log('reponse check of remove bucket list: ', response);
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
      disabled={disabled}
      style={tw`flex-row items-center p-1 pb-2 my-1 gap-4 rounded-2xl border-r-2 border-b-2 border-b-[${makeColor(
        item?.type,
      )}] border-r-[${makeColor(item?.type)}]`}
      onPress={() => handleVisitLocation && handleVisitLocation(item)}>
      <Image
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
              numberOfLines={1}
              style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
              {item?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={tw`text-gray100 font-WorkRegular text-sm`}>
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
      {heartBtn || (
        <TouchableOpacity
          onPress={() => {
            if (item?.bucketlist_status === 'bucketlisted') {
              handleRemoveBucketList();
            } else {
              handleBucketList();
            }
          }}
          style={tw`absolute right-4`}>
          {isLoading || isLoadingRemove ? (
            <ActivityIndicator
              size={'small'}
              color={colorScheme === 'dark' ? 'white' : PrimaryColor}
            />
          ) : (
            <SvgXml
              xml={
                item?.bucketlist_status === 'bucketlisted'
                  ? IconFilledHeart
                  : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z" stroke="${
    colorScheme === 'dark' ? tw.color('white') : tw.color('gray-500')
  }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
              }
            />
          )}
        </TouchableOpacity>
      )}
      {visited || (
        <TouchableOpacity style={tw`absolute right-4`}>
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 50 50" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#fb8098" d="M25 2c2.34 0 4.19 2.91 6.31 3.6 2.19.71 5.39-.53 7.22.8 1.84 1.34 1.64 4.78 2.98 6.62 1.33 1.82 4.67 2.69 5.38 4.88.68 2.1-1.49 4.76-1.49 7.1s2.17 5 1.48 7.11c-.71 2.19-4.05 3.06-5.38 4.88-1.34 1.84-1.14 5.28-2.98 6.62-1.82 1.33-5.03.08-7.22.8-2.11.68-3.96 3.59-6.3 3.59s-4.19-2.91-6.31-3.6c-2.19-.71-5.39.53-7.22-.8-1.84-1.34-1.64-4.78-2.98-6.62-1.33-1.82-4.67-2.69-5.38-4.88C2.43 30 4.6 27.34 4.6 25s-2.17-5-1.48-7.11c.71-2.19 4.05-3.06 5.38-4.88 1.34-1.84 1.14-5.28 2.98-6.62 1.82-1.33 5.03-.08 7.22-.8C20.81 4.91 22.66 2 25 2z" opacity="1" data-original="#fff"></path><circle cx="25" cy="25" r="14" fill="#e7e7ff" opacity="1" data-original="#fff" class=""></circle><path d="M46.9 25c0-.74.37-1.71.72-2.64.58-1.52 1.24-3.24.69-4.94-.57-1.76-2.15-2.78-3.55-3.68-.81-.52-1.64-1.06-2.04-1.61-.41-.57-.67-1.54-.92-2.48-.43-1.59-.91-3.4-2.39-4.47-1.46-1.07-3.32-.97-4.96-.89-.98.05-1.99.1-2.67-.12-.63-.2-1.35-.79-2.12-1.42C28.35 1.7 26.88.5 25 .5s-3.35 1.2-4.65 2.25c-.77.62-1.49 1.21-2.12 1.42-.68.22-1.7.17-2.68.12-1.64-.08-3.5-.18-4.96.89-1.47 1.07-1.95 2.88-2.38 4.47-.25.94-.51 1.91-.92 2.48-.4.55-1.24 1.09-2.04 1.62-1.39.9-2.98 1.92-3.55 3.68-.55 1.69.11 3.42.69 4.93.35.93.71 1.9.71 2.64s-.37 1.71-.72 2.64c-.58 1.52-1.24 3.24-.69 4.94.57 1.76 2.15 2.78 3.55 3.68.81.52 1.64 1.06 2.04 1.62.41.57.67 1.54.92 2.48.43 1.59.91 3.4 2.39 4.47 1.46 1.06 3.32.97 4.96.89.98-.05 1.99-.1 2.68.12.63.2 1.35.79 2.12 1.42 1.3 1.06 2.77 2.25 4.65 2.25s3.35-1.2 4.65-2.25c.77-.62 1.49-1.21 2.12-1.42.68-.22 1.7-.17 2.67-.12 1.64.08 3.5.18 4.96-.89 1.48-1.07 1.96-2.88 2.39-4.47.25-.94.51-1.91.92-2.48.4-.55 1.24-1.09 2.04-1.61 1.4-.9 2.98-1.92 3.55-3.69.55-1.69-.11-3.42-.69-4.93-.35-.94-.71-1.91-.71-2.65zm-2.08 3.71c.42 1.11.86 2.25.64 2.94-.24.75-1.3 1.43-2.32 2.09-1.04.67-2.11 1.36-2.84 2.37-.74 1.02-1.07 2.26-1.4 3.47-.31 1.17-.64 2.37-1.26 2.82-.61.44-1.84.38-3.04.32-1.25-.06-2.54-.13-3.75.26-1.16.38-2.14 1.17-3.09 1.94-.96.78-1.95 1.58-2.76 1.58s-1.8-.8-2.75-1.58c-.95-.77-1.93-1.57-3.09-1.95-.76-.25-1.54-.31-2.33-.31-.47 0-.95.02-1.42.05-1.2.06-2.44.12-3.04-.32-.62-.45-.94-1.66-1.26-2.83-.32-1.2-.66-2.45-1.4-3.46-.73-1-1.8-1.7-2.84-2.37-1.02-.66-2.08-1.34-2.32-2.09-.22-.69.21-1.83.64-2.94.45-1.18.91-2.4.91-3.7s-.47-2.52-.92-3.71c-.42-1.11-.86-2.25-.64-2.94.24-.75 1.3-1.43 2.32-2.09 1.04-.67 2.11-1.36 2.84-2.37.74-1.02 1.07-2.26 1.4-3.47.31-1.17.64-2.37 1.25-2.82.61-.44 1.85-.38 3.04-.32 1.25.06 2.54.13 3.75-.26 1.16-.38 2.14-1.17 3.09-1.94C23.2 4.3 24.18 3.5 25 3.5c.81 0 1.8.8 2.75 1.58.95.77 1.93 1.57 3.09 1.94 1.21.39 2.5.33 3.75.26 1.2-.06 2.44-.12 3.04.32.62.45.94 1.66 1.26 2.83.32 1.2.66 2.45 1.4 3.46.73 1 1.8 1.7 2.84 2.37 1.02.66 2.08 1.35 2.32 2.09.22.69-.21 1.83-.64 2.94-.45 1.19-.91 2.41-.91 3.71s.46 2.52.92 3.71z" fill="orange" opacity="1" data-original="orange" class=""></path><path d="m29.94 19.12-8.39 8.39-2.49-2.49a1.49 1.49 0 0 0-2.12 0 1.49 1.49 0 0 0 0 2.12l3.55 3.55a1.499 1.499 0 0 0 2.12 0l9.45-9.46c.59-.59.59-1.54 0-2.12-.59-.57-1.53-.57-2.12.01z" fill="orange" opacity="1" data-original="orange" class=""></path><path d="M25 9.5C16.45 9.5 9.5 16.45 9.5 25S16.45 40.5 25 40.5 40.5 33.55 40.5 25 33.55 9.5 25 9.5zm0 28c-6.89 0-12.5-5.61-12.5-12.5S18.11 12.5 25 12.5 37.5 18.11 37.5 25 31.89 37.5 25 37.5z" fill="orange" opacity="1" data-original="orange" class=""></path></g></svg>`}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
