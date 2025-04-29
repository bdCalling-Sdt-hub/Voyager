import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  useGetBucketListAttractionsQuery,
  useGetBucketListBannerQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
} from '../../redux/apiSlices/bucketApiSlice';

import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import {IconSearch} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import {PrimaryColor} from '../utils/utils';
import {RefreshControl} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {Wander} from 'react-native-animated-spinkit';
import {makeImage} from '../../redux/api/baseApi';
import tw from '../../lib/tailwind';
import {useLocationVisitMutation} from '../../redux/apiSlices/attractionApiSlice';

const Places = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = useState('attractions');

  // rtk query hooks
  const {
    data: bucketListCountries,
    isLoading: countriesLoading,
    isFetching: countriesFetching,
    refetch: countriesRefetch,
  } = useGetBucketListCountriesQuery({});
  const {
    data: bucketListCities,
    isLoading: citiesLoading,
    isFetching: citiesFetching,
    refetch: citiesRefetch,
  } = useGetBucketListCitiesQuery({});
  const {
    data: bucketListAttractions,
    isLoading: attractionsLoading,
    isFetching: attractionsFetching,
    refetch: attractionsRefetch,
  } = useGetBucketListAttractionsQuery({});
  const {
    data: bucketListBanner,
    isLoading: bannerLoading,
    isFetching: bannerFetching,
    refetch: bannerRefetch,
  } = useGetBucketListBannerQuery({});
  const [locationVisit, {isLoading}] = useLocationVisitMutation();

  // handlers
  const handleVisitLocation = async (item: any) => {
    const data = {type: item?.type, visited: '1'};
    try {
      const response = await locationVisit({id: item?.id, data});
      console.log('reponse check of visit location: ', response);
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
        spinnerKey="places"
        // textStyle={tw`text-white text-base`}
        // textContent="Loading"
        size={40}
        customIndicator={<Wander size={30} color={'white'} />}
        overlayColor={'rgba(123, 99, 235,0.2)'}
        visible={
          citiesFetching ||
          attractionsFetching ||
          bannerFetching ||
          countriesFetching
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[PrimaryColor]}
            onRefresh={() => {
              countriesRefetch();
              citiesRefetch();
              attractionsRefetch();
              bannerRefetch();
            }}
          />
        }
        style={tw`bg-white dark:bg-primaryDark `}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
          <Header
            title="Bucket List"
            containerStyle={tw`mt-2`}
            icon={IconSearch}
            IconRouteName="Dashboard"
            isSearchVisible={true}
            searchBarShow={true}
            hideDestination={true}
          />

          {bucketListBanner?.data?.freeBucketList?.user_types === 'Free' && (
            <TouchableOpacity
              style={tw`flex-row items-center my-4 gap-2 border border-gray90 dark:border-darkBg p-4 rounded-2xl`}
              onPress={() => {
                navigation?.navigate('Subscription');
              }}>
              <View style={tw`w-[20%]`}>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: makeImage(
                      bucketListBanner?.data?.freeBucketList?.photos![0],
                    ),
                  }}
                  style={tw`w-full h-14`}
                />
              </View>
              <View style={tw`w-[80%] flex-shrink`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkSemiBold`}>
                  Bucket list is near limit (
                  {bucketListBanner?.data?.usedBucket || 0}/
                  {bucketListBanner?.data?.freeBucketList?.bucketlist_space ||
                    0}
                  )
                </Text>
                <Text style={tw`text-gray100 text-sm  font-WorkRegular`}>
                  {bucketListBanner?.data?.freeBucketList?.short_description}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View
            style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mt-4`}>
            <TouchableOpacity
              style={tw`${
                activePlace === 'attractions' ? 'bg-violet100' : ''
              } py-2 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('attractions')}>
              <Text
                style={tw`${
                  activePlace === 'attractions' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Attractions
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'attractions' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'attractions'
                      ? 'text-violet100'
                      : 'text-white'
                  }`}>
                  {bucketListAttractions?.data?.attractions?.data?.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${
                activePlace === 'cities' ? 'bg-violet100' : ''
              } py-2 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('cities')}>
              <Text
                style={tw`${
                  activePlace === 'cities' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Cities
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'cities' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'cities' ? 'text-violet100' : 'text-white'
                  }`}>
                  {bucketListCities?.data?.cities?.data?.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${
                activePlace === 'countries' ? 'bg-violet100' : ''
              } py-2 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('countries')}>
              <Text
                style={tw`${
                  activePlace === 'countries' ? 'text-white' : 'text-gray100'
                }  text-xs font-WorkMedium`}>
                Countries
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'countries' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'countries'
                      ? 'text-violet100'
                      : 'text-white'
                  }`}>
                  {bucketListCountries?.data?.countries?.data?.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`gap-2  mt-4 pb-2`}>
            {activePlace === 'attractions' && (
              <>
                {bucketListAttractions?.data?.attractions?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard
                      key={index}
                      item={item?.data}
                      handleVisitLocation={handleVisitLocation}
                    />
                  ),
                )}
              </>
            )}
            {activePlace === 'cities' && (
              <>
                {bucketListCities?.data?.cities?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard
                      key={index}
                      item={item?.data}
                      handleVisitLocation={handleVisitLocation}
                    />
                  ),
                )}
              </>
            )}
            {activePlace === 'countries' && (
              <>
                {bucketListCountries?.data?.countries?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard
                      key={index}
                      item={item?.data}
                      handleVisitLocation={handleVisitLocation}
                    />
                  ),
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Places;
