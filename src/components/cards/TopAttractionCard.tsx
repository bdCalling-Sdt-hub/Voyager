import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAddToBucketListMutation,
  useRemoveFromBucketListMutation,
} from '../../redux/apiSlices/bucketApiSlice';

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useAppColorScheme} from 'twrnc';
import {IconFilledHeart} from '../../assets/icons/Icons';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useLocationVisitMutation} from '../../redux/apiSlices/attractionApiSlice';
import {PrimaryColor} from '../../screens/utils/utils';

interface TopAttractionCardProps {
  item: any;
}

const TopAttractionCard = ({item}: TopAttractionCardProps) => {
  //   console.log(item, 'TopAttractionCard');

  const navigation = useNavigation();
  const [colorScheme] = useAppColorScheme(tw);
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
        type: item.type,
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

  // rtk query hooks
  const [locationVisit] = useLocationVisitMutation();

  // handlers
  const handleVisitLocation = async (item: any) => {
    const data = {type: item?.type, visited: '1'};
    try {
      const response = await locationVisit({id: item?.id, data}).unwrap();
      if (response?.error?.success === false) {
        Alert.alert(
          'Adding to bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        (navigation as any)?.navigate('DestinationDetails', {item});
      }
    } catch (err: any) {
      Alert.alert(
        'Visit Location Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  return (
    <TouchableOpacity
      style={tw`rounded-2xl overflow-hidden mt-6`}
      onPress={() =>
        (navigation as any)?.navigate('DestinationDetails', {
          item: item,
        })
      }>
      {item?.images![0] && (
        <ImageBackground
          source={{uri: makeImage(item?.images![0])}}
          resizeMode="cover"
          style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
          <View style={tw`gap-y-3 items-end w-full`}>
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
  <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z" stroke="${tw.color(
    'white',
  )}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
                  }
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`bg-white dark:bg-darkBg p-3 w-full rounded-2xl`}>
            <View style={tw`flex-row items-center`}>
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkMedium`}>
                {item?.city}
              </Text>
            </View>
            <Text style={tw`text-gray100 font-WorkRegular text-[10px]`}>
              {item?.description}
            </Text>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

export default TopAttractionCard;
