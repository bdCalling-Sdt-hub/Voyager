import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useState} from 'react';
import {
  useAddToBucketListMutation,
  useRemoveFromBucketListMutation,
} from '../../../redux/apiSlices/bucketApiSlice';
import {
  useGetSinglePlaceAndImagesQuery,
  useMarkAsVisitedMutation,
} from '../../../redux/apiSlices/attractionApiSlice';

import {Fader} from 'react-native-ui-lib';
import {NavigProps} from '../../../utils/interface/NaviProps';
import NormalModal from '../../../components/modals/NormalModal';
import {PrimaryColor} from '../../utils/utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {SvgXml} from 'react-native-svg';
import Swiper from 'react-native-swiper';
import {Wander} from 'react-native-animated-spinkit';
import {makeImage} from '../../../redux/api/baseApi';
import tw from '../../../lib/tailwind';
import {useAppColorScheme} from 'twrnc';

const DestinationDetails = ({navigation, route}: NavigProps<null>) => {
  const {item} = route?.params || {};
  const [colorScheme] = useAppColorScheme(tw);
  const [expanded, setExpanded] = useState(false);
  const [saveBucketListModalVisible, setSaveBucketListModalVisible] =
    useState(false);
  const [addOnBucketListModalVisible, setAddOnBucketListModalVisible] =
    useState(false);

  // rtk query hooks
  const {
    data: singlePlace,
    isFetching: singlePlaceFetching,
    isLoading: singlePlaceLoading,
    refetch: singlePlaceRefetch,
  } = useGetSinglePlaceAndImagesQuery(
    {
      place_type: item?.type,
      place_id: item?.id,
      place_image: false,
    },
    {
      skip: !item?.id,
    },
  );

  // console.log(singlePlace, 'singlePlaceAndImages');

  const [addToBucketList, {isLoading}] = useAddToBucketListMutation();
  const [removeFromBucketList, {isLoading: isLoadingRemove}] =
    useRemoveFromBucketListMutation();

  const [markAsVisited, {isLoading: isLoadingVisited}] =
    useMarkAsVisitedMutation();

  const fullText = item?.description || 'N/A';

  const words = fullText.split(' ');

  const initialText = expanded ? fullText : words.slice(0, 25).join(' ');

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
        if (!singlePlaceFetching) {
          setSaveBucketListModalVisible(true);
        }
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
    <View style={tw`flex-1`} key={singlePlace?.id}>
      <Spinner
        animation="fade"
        spinnerKey="DestinationDetails"
        // textStyle={tw`text-white text-base`}
        // textContent="Loading"
        size={40}
        customIndicator={<Wander size={30} color={'white'} />}
        overlayColor={'rgba(123, 99, 235,0.2)'}
        visible={singlePlaceFetching}
      />
      {singlePlace?.id && (
        <View style={tw`bg-white flex-1 dark:bg-primaryDark`}>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={[PrimaryColor]}
                onRefresh={singlePlaceRefetch}
                refreshing={false}
              />
            }
            contentContainerStyle={tw`pb-8`}
            showsVerticalScrollIndicator={false}>
            <View style={tw`h-66`}>
              <Swiper
                dot={
                  <View
                    style={tw`bg-gray-500 dark:bg-darkBg w-2 h-2 rounded-full mx-1`}
                  />
                } // Dot styling
                activeDot={
                  <View style={tw`bg-violet100 w-2 h-2 rounded-full mx-1`} />
                }
                paginationStyle={tw`bottom-2`}
                loop={false}>
                {singlePlace?.images?.map((image: any, index: number) => (
                  <View style={tw`flex-1`} key={index}>
                    <Image
                      key={index + image + new Date().getTime()}
                      source={{uri: makeImage(image)}}
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

            <View style={tw`px-4 pt-4`}>
              <View style={tw`flex-row items-center `}>
                <View style={tw`w-6/10`}>
                  <Text
                    style={tw`text-black dark:text-white text-[20px] font-WorkMedium`}>
                    {singlePlace?.name || 'N/A'}
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
                        {singlePlace?.coins || 'N/A'} coins
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                      <Image
                        source={require('../../../assets/images/trophy.png')}
                        style={tw`h-6 w-6`}
                      />
                      <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                        {singlePlace?.xp || 'N/A'} XP
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
                    {singlePlace?.city || 'N/A'},{' '}
                    {singlePlace?.country || 'N/A'}
                  </Text>
                </View>

                <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                  <Text
                    style={tw`text-violet100 font-WorkMedium text-sm border-b border-b-violet100`}
                    onPress={() =>
                      (navigation as any)?.push('BowersActivities', {
                        url: 'https://www.viator.com/',
                      })
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
                    {singlePlace?.location || 'N/A'}
                  </Text>
                </View>
                <View
                  style={tw`flex-row items-center gap-4 border-b border-b-gray90 dark:border-secDarkBg py-4`}>
                  <SvgXml xml={IconClock} style={tw`flex-shrink`} />
                  <View>
                    {singlePlace?.visit_hours?.map(
                      (hour: any, index: number) => (
                        <Text
                          style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}
                          key={index}>
                          {hour || 'N/A'}
                        </Text>
                      ),
                    )}
                  </View>
                </View>
                <View style={tw`flex-row items-center gap-4 py-4`}>
                  <SvgXml xml={IconTicket} style={tw`flex-shrink`} />
                  <View>
                    {singlePlace?.prices?.map((price: any, index: number) => (
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
                <View style={tw`w-full h-[300px] rounded-lg overflow-hidden`}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    liteMode={true}
                    mapType={'standard'}
                    style={tw`w-full h-[300px] `}
                    initialRegion={{
                      latitude: Number(singlePlace?.latitude),
                      longitude: Number(singlePlace?.longitude),
                      latitudeDelta: 0.22,
                      longitudeDelta: 0.22,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: Number(singlePlace?.latitude),
                        longitude: Number(singlePlace?.longitude),
                      }}
                      title={singlePlace?.location}
                      description={singlePlace?.description}
                    />
                  </MapView>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={tw`flex-row items-center gap-4 pb-4 pt-2 px-[4%]`}>
            <TouchableOpacity
              style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1 ${
                singlePlace?.bucketlist_status === 'bucketlisted'
                  ? 'bg-violet100'
                  : ''
              }`}
              onPress={
                singlePlace?.bucketlist_status === 'bucketlisted'
                  ? handleRemoveBucketList
                  : handleBucketList
              }
              disabled={isLoading || isLoadingRemove}>
              {isLoadingRemove || isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={
                    singlePlace?.bucketlist_status === 'bucketlisted'
                      ? 'white'
                      : PrimaryColor
                  }
                />
              ) : (
                <>
                  {singlePlace?.bucketlist_status === 'bucketlisted' ? (
                    <SvgXml xml={IconTik} />
                  ) : (
                    <SvgXml width={20} height={20} xml={IconColoredHeart} />
                  )}
                </>
              )}

              <Text
                style={tw`text-sm font-WorkRegular text-violet100 ${
                  singlePlace?.bucketlist_status === 'bucketlisted'
                    ? 'text-white'
                    : ''
                }`}>
                Bucket List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleVisited}
              disabled={
                isLoadingVisited ||
                singlePlace?.mark_visited_status === 'visited'
              }
              style={tw`border-violet100 ${
                singlePlace?.mark_visited_status !== 'not_visited'
                  ? 'bg-violet100'
                  : ''
              } border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1`}>
              {singlePlace?.mark_visited_status !== 'not_visited' && (
                <SvgXml xml={IconTik} />
              )}
              {isLoadingVisited && (
                <ActivityIndicator size="small" color={PrimaryColor} />
              )}
              <Text
                style={tw`text-sm font-WorkRegular ${
                  singlePlace?.mark_visited_status !== 'not_visited'
                    ? 'text-white'
                    : 'text-violet100'
                }`}>
                {singlePlace?.mark_visited_status === 'not_visited'
                  ? 'Mark As Visited'
                  : 'Visited'}
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
                <Text style={tw`text-sm font-WorkRegular text-white`}>
                  Done
                </Text>
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
              <Text
                style={tw`text-2xl text-black font-WorkBold font-bold mt-2`}>
                Congratulations!
              </Text>
              <View style={tw`flex-row items-center gap-3 mt-3`}>
                <View style={tw`flex-row items-center gap-1`}>
                  <Image
                    source={require('../../../assets/images/coin.png')}
                    style={tw`h-6 w-6`}
                  />
                  <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                    {singlePlace?.coins} coins
                  </Text>
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Image
                    source={require('../../../assets/images/trophy.png')}
                    style={tw`h-6 w-6`}
                  />
                  <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                    {singlePlace?.xp} XP
                  </Text>
                </View>
              </View>
              <Text
                style={tw`text-black text-base font-WorkRegular mt-3 text-center`}>
                You’ve received {item?.coins} coins & {'\n'}
                {singlePlace?.xp} XP
              </Text>
              <TouchableOpacity
                onPress={() => setSaveBucketListModalVisible(false)}
                style={tw`border-violet100 bg-violet100 border py-2 mt-2 w-full rounded-full flex-row items-center justify-center gap-3`}>
                <Text style={tw`text-sm font-WorkRegular text-white`}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </NormalModal>
        </View>
      )}
    </View>
  );
};

export default DestinationDetails;
