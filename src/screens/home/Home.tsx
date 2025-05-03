import {
  Alert,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconColoredRightArrow,
  IconFilledHeart,
  IconSearch,
  IconWhiteHeart,
} from '../../assets/icons/Icons';
import {
  useGetPersonalizedQuery,
  useGetSinglePlaceAndImagesQuery,
  useGetTopDestinationQuery,
  useLocationVisitMutation,
} from '../../redux/apiSlices/attractionApiSlice';

import React from 'react';
import {Wander} from 'react-native-animated-spinkit';
import Spinner from 'react-native-loading-spinner-overlay';
import {SvgXml} from 'react-native-svg';
import TopAttractionCard from '../../components/cards/TopAttractionCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {NavigProps} from '../../utils/interface/NaviProps';
import {baseUrl} from '../utils/exports';
import {personalizedPicksTypes} from '../utils/types';
import {PrimaryColor} from '../utils/utils';

const Home = ({navigation}: NavigProps<null>) => {
  // rtk query hooks
  const {
    data: personalizedPicks = [],
    isFetching: personalizedPicksFetching,
    isLoading: personalizedPicksLoading,
    refetch: personalizedPicksRefetch,
  } = useGetPersonalizedQuery({});
  const {
    data: topDestination = [],
    isFetching: topDestinationFetching,
    isLoading: topDestinationLoading,
    refetch: topDestinationRefetch,
  } = useGetTopDestinationQuery({});

  const {
    data: singlePlaceAndImages,
    isFetching: singlePlaceAndImageFetching,
    isLoading: singlePlaceAndImagesLoading,
    refetch: singlePlaceRefetch,
  } = useGetSinglePlaceAndImagesQuery({
    place_image: true,
  });

  const [locationVisit] = useLocationVisitMutation();

  // console.log(singlePlaceAndImages, 'singlePlaceAndImages');

  // handlers
  const handleVisitLocation = async (item: any) => {
    const data = {type: item?.type, visited: '1'};
    try {
      const response = await locationVisit({id: item?.id, data});
      if (response?.error?.success === false) {
        Alert.alert(
          'Adding to bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        navigation?.navigate('DestinationDetails', {item});
      }
    } catch (err: any) {
      Alert.alert(
        'Visit Location Failed',
        err?.message || 'An error occurred.',
      );
    }
  };
  return (
    <>
      <Spinner
        animation="fade"
        spinnerKey="home"
        // textStyle={tw`text-white text-base`}
        // textContent="Loading"
        size={40}
        customIndicator={<Wander size={30} color={'white'} />}
        overlayColor={'rgba(123, 99, 235,0.2)'}
        visible={
          personalizedPicksFetching ||
          topDestinationFetching ||
          singlePlaceAndImageFetching
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={false}
            onRefresh={() => {
              personalizedPicksRefetch();
              topDestinationRefetch();
              singlePlaceRefetch();
            }}
          />
        }
        contentContainerStyle={tw``}
        style={tw`px-[4%] bg-white dark:bg-primaryDark`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`pb-2`}>
          <Header
            title="Explore"
            containerStyle={tw`mt-2`}
            icon={IconSearch}
            IconRouteName="Dashboard"
            isSearchVisible={true}
            searchBarShow={true}
            hideFilterIcon={true}
          />
          <View>
            <View style={tw`mt-4`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                Find Your Next Destination
              </Text>
            </View>
            <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
              Explore countries, cities, and attractions
            </Text>

            <View style={tw`flex-row gap-4 justify-between mt-6 px-4 h-38`}>
              <>
                {singlePlaceAndImages?.data?.attractions?.length && (
                  <>
                    {Object.keys(singlePlaceAndImages?.data)?.map(
                      (Place: any, index: number) => {
                        return (
                          <View key={index + Place + 'place'}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={tw`flex-1`}
                              onPress={() => {
                                if (Place === 'attractions') {
                                  navigation?.navigate('Attractions', {
                                    title: Place,
                                  });
                                } else if (Place === 'cities') {
                                  navigation?.navigate('Cities', {
                                    title: Place,
                                  });
                                } else {
                                  navigation?.navigate('Countries', {
                                    title: Place,
                                  });
                                }
                              }}>
                              <View
                                style={tw`h-32 items-center justify-center`}>
                                {(
                                  (Place === 'attractions' &&
                                    singlePlaceAndImages?.data?.attractions) ||
                                  (Place === 'cities' &&
                                    singlePlaceAndImages?.data?.cities) ||
                                  (Place === 'countries' &&
                                    singlePlaceAndImages?.data?.countries)
                                )?.map((item: any, index: number) => {
                                  return (
                                    <Image
                                      key={item?.id + index}
                                      style={[
                                        tw`${
                                          index == 0 ? '' : `absolute`
                                        } w-20 border-2 shadow border-white rounded-lg h-30`,
                                        {
                                          zIndex: index == 0 ? 1 : -1,
                                          opacity: index == 0 ? 1 : 0.7,
                                          transform:
                                            index == 1
                                              ? [
                                                  {scale: 0.9},
                                                  {translateY: -6},
                                                  {scaleX: 1},
                                                  {rotate: '15deg'},
                                                ]
                                              : index == 2
                                              ? [
                                                  {scale: 0.9},
                                                  {translateY: -11},
                                                  {rotate: '-10deg'},
                                                ]
                                              : [],
                                        },
                                      ]}
                                      source={{
                                        uri: makeImage(item?.images![0]),
                                      }}
                                    />
                                  );
                                })}
                              </View>
                              <Text
                                style={tw`text-sm font-WorkMedium text-black dark:text-white text-center mt-2 capitalize`}>
                                {Place}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      },
                    )}
                  </>
                )}
              </>
            </View>
          </View>

          <View style={tw`mt-6`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between`}
              onPress={() => {
                navigation?.navigate('PicsForYour');
              }}>
              <View style={tw`w-11/12`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                  Personalized Picks
                </Text>
                <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                  Destinations that match your interests
                </Text>
              </View>
              <SvgXml xml={IconColoredRightArrow} />
            </TouchableOpacity>

            <ScrollView
              horizontal
              contentContainerStyle={tw`gap-4`}
              showsHorizontalScrollIndicator={false}>
              {personalizedPicks?.data?.data?.map(
                (item: personalizedPicksTypes, index: number) => (
                  <TouchableOpacity
                    key={item?.id + index}
                    style={tw`rounded-2xl overflow-hidden mt-6`}
                    onPress={() => handleVisitLocation(item)}>
                    <ImageBackground
                      source={{uri: baseUrl + item?.images[0]}}
                      resizeMode="cover"
                      style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
                      <View style={tw`gap-y-3 items-end w-full`}>
                        <SvgXml
                          xml={
                            item?.bucketlist_status === 'bucketlisted'
                              ? IconFilledHeart
                              : IconWhiteHeart
                          }
                        />
                      </View>
                      <View
                        style={tw`bg-white dark:bg-darkBg p-3 w-full rounded-2xl`}>
                        <View style={tw`flex-row items-center`}>
                          <Text
                            style={tw`text-black dark:text-white text-sm font-WorkMedium`}>
                            {item?.name}
                          </Text>
                        </View>
                        <Text
                          style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                          {item?.description}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </View>
          <View style={tw`mt-6`}>
            <TouchableOpacity style={tw`flex-row items-center justify-between`}>
              <View style={tw`w-full`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                  Top Destinations
                </Text>
                <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                  Discover popular attractions around the globe
                </Text>
              </View>
              {/* <SvgXml xml={IconColoredRightArrow} /> */}
            </TouchableOpacity>

            <ScrollView
              horizontal
              contentContainerStyle={tw`gap-4`}
              showsHorizontalScrollIndicator={false}>
              {topDestination?.data?.map((item: any, index: number) => (
                <TopAttractionCard key={index} item={item?.data} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
