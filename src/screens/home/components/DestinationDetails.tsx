import React, {useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  IconBottomArrow,
  IconBrowse,
  IconClock,
  IconColoredHeart,
  IconColoredLocation,
  IconLeftArrow,
  IconLogout,
  IconMuseum,
  IconTicket,
  IconTik,
  IconTopArrow,
} from '../../../assets/icons/Icons';
import {
  useGetMarkAsVisitedQuery,
  useMarkAsVisitedMutation,
} from '../../../redux/apiSlices/attractionApiSlice';
import {
  useAddToBucketListMutation,
  useGetBucketListCheckQuery,
  useRemoveFromBucketListMutation,
} from '../../../redux/apiSlices/bucketApiSlice';

import {SvgXml} from 'react-native-svg';
import Swiper from 'react-native-swiper';
import {Fader} from 'react-native-ui-lib';
import {useAppColorScheme} from 'twrnc';
import NormalModal from '../../../components/modals/NormalModal';
import tw from '../../../lib/tailwind';
import {NavigProps} from '../../../utils/interface/NaviProps';
import {baseUrl} from '../../utils/exports';

const DestinationDetails = ({navigation, route}: NavigProps<null>) => {
  const {item} = route?.params || {};
  const [colorScheme] = useAppColorScheme(tw);
  const [expanded, setExpanded] = useState(false);
  const [saveBucketListModalVisible, setSaveBucketListModalVisible] =
    useState(false);
  const [addOnBucketListModalVisible, setAddOnBucketListModalVisible] =
    useState(false);
  const fullText = item?.description || 'N/A';

  const words = fullText.split(' ');

  const initialText = expanded ? fullText : words.slice(0, 25).join(' ');

  // rtk query hooks
  const [addToBucketList, {isLoading}] = useAddToBucketListMutation();
  const [removeFromBucketList, {isLoading: isLoadingRemove}] =
    useRemoveFromBucketListMutation();
  const {data: bucketListCheck} = useGetBucketListCheckQuery({
    id: item?.id,
    type: item?.type,
  });
  const [markAsVisited, {isLoading: isLoadingVisited}] =
    useMarkAsVisitedMutation();
  const {data: markAsVisitedCheck} = useGetMarkAsVisitedQuery({
    id: item?.id,
    type: item?.type,
  });

  const visitedStatus = markAsVisitedCheck?.data?.userEntity?.visit_status;

  const handleBucketList = async () => {
    const data = {type: item?.type, bucketlist_status: 'bucketlisted'};
    try {
      const response = await addToBucketList({id: item?.id, data});
      if (response?.error?.success === false) {
        Alert.alert(
          'Adding to bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      }
    } catch (err: any) {
      Alert.alert(
        'Adding to bucket list Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  const handleRemoveBucketList = async () => {
    try {
      const response = await removeFromBucketList({
        id: bucketListCheck?.data?.id,
      });
      console.log('reponse check of remove bucket list: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Removing from bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      }
    } catch (err: any) {
      Alert.alert(
        'Removing from bucket list Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  const handleVisited = async () => {
    const data = {type: item?.type, visit_status: 'visited'};
    try {
      const response = await markAsVisited({id: item?.id, data});
      console.log('response of mark as visited: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Marking as visited failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        setSaveBucketListModalVisible(true);
      }
    } catch (err: any) {
      Alert.alert(
        'Marking as visited Failed',
        err?.message || 'An error occurred.',
      );
    }
  };
  // console.log('main id from item: ', item);
  // console.log('Item: ', item);
  // console.log('remove id check: ', bucketListCheck?.data);
  // console.log("mark as visited check: ", visitedStatus);
  return (
    <View style={tw`bg-white h-full dark:bg-primaryDark`}>
      <View style={tw`h-66`}>
        <Swiper
          dot={
            <View
              style={tw`bg-white dark:bg-darkBg w-2 h-2 rounded-full mx-1`}
            />
          } // Dot styling
          activeDot={
            <View style={tw`bg-violet100 w-2 h-2 rounded-full mx-1`} />
          }
          paginationStyle={tw`bottom-2`}
          loop={false}>
          {item?.images?.map((image: any, index: number) => (
            <View style={tw`flex-1`} key={index}>
              <Image
                source={{uri: baseUrl + image}}
                style={tw`w-full h-66`}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
        <>
          <TouchableOpacity
            style={tw`bg-white dark:bg-darkBg h-10 w-10 rounded-full items-center justify-center absolute top-4 right-[4%]`}>
            <SvgXml xml={IconLogout} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white dark:bg-darkBg h-10 w-10 rounded-full items-center justify-center absolute top-4 left-[4%]`}
            onPress={() => navigation?.goBack()}>
            <SvgXml xml={IconLeftArrow} />
          </TouchableOpacity>
        </>
      </View>
      <ScrollView style={tw`px-[4%] pt-6`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`w-6/10`}>
            <Text
              style={tw`text-black dark:text-white text-[20px] font-WorkMedium`}>
              {item?.name || 'N/A'}
            </Text>
          </View>
          <View style={tw`w-4/10`}>
            <View style={tw`flex-row gap-4 mt-2`}>
              <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                <Image
                  source={require('../../../assets/images/coin.png')}
                  style={tw`h-6 w-6`}
                />
                <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                  {item?.coins || 'N/A'} coins
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                <Image
                  source={require('../../../assets/images/trophy.png')}
                  style={tw`h-6 w-6`}
                />
                <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                  {item?.xp || 'N/A'} XP
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={tw`flex-row items-center justify-between pb-4 mb-4 border-b border-b-gray90`}>
          <View style={tw`flex-row items-center gap-2 mt-2`}>
            <SvgXml xml={IconColoredLocation} />
            <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
              {item?.city || 'N/A'}, {item?.country || 'N/A'}
            </Text>
          </View>

          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <Text
              style={tw`text-violet100 font-WorkMedium text-sm border-b border-b-violet100`}
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps?q=${item?.latitude},${item?.longitude}n `,
                )
              }>
              Browse Activities
            </Text>
            <SvgXml xml={IconBrowse} />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={tw`text-sm font-WorkRegular text-black dark:text-white leading-6`}>
            {initialText}
          </Text>
          {!expanded && (
            <Fader
              visible={true}
              position={Fader.position.BOTTOM}
              size={130}
              tintColor={colorScheme === 'dark' ? '#141518' : '#ffffff'}
            />
          )}

          <TouchableOpacity
            style={tw`flex-row gap-2 items-center justify-center mt-2`}
            onPress={() => setExpanded(!expanded)}>
            <Text
              style={tw`text-violet100
            `}>
              {expanded ? 'See Less' : 'See More'}
            </Text>
            <SvgXml xml={!expanded ? IconBottomArrow : IconTopArrow} />
          </TouchableOpacity>
        </View>

        <View style={tw`bg-gray80 dark:bg-darkBg p-4 rounded-2xl mt-6`}>
          <View
            style={tw`flex-row items-center gap-4 border-b border-b-gray90 dark:border-secDarkBg py-4`}>
            <SvgXml xml={IconMuseum} style={tw`flex-shrink`} />
            <Text
              style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}>
              {item?.location || 'N/A'}
            </Text>
          </View>
          <View
            style={tw`flex-row items-center gap-4 border-b border-b-gray90 dark:border-secDarkBg py-4`}>
            <SvgXml xml={IconClock} style={tw`flex-shrink`} />
            <View>
              {item?.visit_hours?.map((hour: any, index: number) => (
                <Text
                  style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}
                  key={index}>
                  {hour || 'N/A'}
                </Text>
              ))}
            </View>
          </View>
          <View style={tw`flex-row items-center gap-4 py-4`}>
            <SvgXml xml={IconTicket} style={tw`flex-shrink`} />
            <View>
              {item?.prices?.map((price: any, index: number) => (
                <Text
                  style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}
                  key={index}>
                  {price || 'N/A'}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={tw`mt-6`}>
          <Text
            style={tw`text-black dark:text-white text-[20px] font-WorkMedium mb-6`}>
            Location
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`w-full h-[300px]`}
            initialRegion={{
              latitude: Number(item?.latitude),
              longitude: Number(item?.longitude),
              latitudeDelta: Math.abs(Number(item?.latitude)) * 0.001, // Adjust as needed
              longitudeDelta: Math.abs(Number(item?.longitude)) * 0.001, // Adjust as needed
            }}>
            <Marker
              coordinate={{
                latitude: Number(item?.latitude),
                longitude: Number(item?.longitude),
              }}
              title={item?.location}
              description={item?.description}
            />
          </MapView>
        </View>
      </ScrollView>

      <View style={tw`flex-row items-center gap-4 pb-4 pt-2 px-[4%]`}>
        <TouchableOpacity
          style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1 ${
            bucketListCheck?.data?.bucketlist_status === 'bucketlisted'
              ? 'bg-violet100'
              : ''
          }`}
          onPress={
            bucketListCheck?.data?.bucketlist_status === 'bucketlisted'
              ? handleRemoveBucketList
              : handleBucketList
          }
          disabled={isLoading || isLoadingRemove}>
          <SvgXml
            xml={
              bucketListCheck?.data?.bucketlist_status === 'bucketlisted'
                ? IconTik
                : IconColoredHeart
            }
          />
          <Text
            style={tw`text-sm font-WorkRegular text-violet100 ${
              bucketListCheck?.data?.bucketlist_status === 'bucketlisted'
                ? 'text-white'
                : ''
            }`}>
            {isLoading
              ? 'Adding...'
              : isLoadingRemove
              ? 'Removing...'
              : 'Bucket List'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVisited}
          disabled={isLoadingVisited || visitedStatus === 'visited'}
          style={tw`border-violet100 ${
            visitedStatus !== 'not_visited' ? 'bg-violet100' : ''
          } border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1`}>
          {visitedStatus !== 'not_visited' && <SvgXml xml={IconTik} />}
          <Text
            style={tw`text-sm font-WorkRegular ${
              visitedStatus !== 'not_visited' ? 'text-white' : 'text-violet100'
            }`}>
            {visitedStatus === 'not_visited' ? 'Mark As Visited' : 'Visited'}
          </Text>
        </TouchableOpacity>
      </View>

      <NormalModal
        visible={addOnBucketListModalVisible}
        setVisible={setAddOnBucketListModalVisible}
        disabled
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`flex-col items-center justify-between`}>
          <Text
            style={tw`text-2xl text-black font-WorkBold font-bold mt-2 text-center`}>
            Added to bucket list successfully
          </Text>
          <Text
            style={tw`text-black text-base font-WorkRegular mt-2 text-center`}>
            This place has been added to your bucket list
          </Text>
          <TouchableOpacity
            onPress={() => setAddOnBucketListModalVisible(false)}
            style={tw`border-violet100 bg-violet100 border py-2 mt-2 w-full rounded-full flex-row items-center justify-center gap-3`}>
            <Text style={tw`text-sm font-WorkRegular text-white`}>Done</Text>
          </TouchableOpacity>
        </View>
      </NormalModal>

      <NormalModal
        visible={saveBucketListModalVisible}
        setVisible={setSaveBucketListModalVisible}
        disabled
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`flex-col items-center justify-between`}>
          <Text style={tw`text-4xl`}>🎉</Text>
          <Text style={tw`text-2xl text-black font-WorkBold font-bold mt-2`}>
            Congratulations!
          </Text>
          <View style={tw`flex-row items-center gap-3 mt-3`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Image
                source={require('../../../assets/images/coin.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                {item?.coins} coins
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-1`}>
              <Image
                source={require('../../../assets/images/trophy.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                {item?.xp} XP
              </Text>
            </View>
          </View>
          <Text
            style={tw`text-black text-base font-WorkRegular mt-3 text-center`}>
            You’ve received {item?.coins} coins & {'\n'}
            {item?.xp} XP
          </Text>
          <TouchableOpacity
            onPress={() => setSaveBucketListModalVisible(false)}
            style={tw`border-violet100 bg-violet100 border py-2 mt-2 w-full rounded-full flex-row items-center justify-center gap-3`}>
            <Text style={tw`text-sm font-WorkRegular text-white`}>Done</Text>
          </TouchableOpacity>
        </View>
      </NormalModal>
    </View>
  );
};

export default DestinationDetails;
