import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  useGetBucketListAttractionsQuery,
  useGetBucketListBannerQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
} from '../../redux/apiSlices/bucketApiSlice';

import {RefreshControl} from 'react-native-gesture-handler';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import LoadingModal from '../../components/modals/LoadingModal';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {NavigProps} from '../../utils/interface/NaviProps';
import {PrimaryColor} from '../utils/utils';

const BucketList = ({navigation, route}: NavigProps<null>) => {
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

  // handlers

  return (
    <>
      <LoadingModal
        visible={
          citiesLoading ||
          attractionsLoading ||
          bannerLoading ||
          countriesLoading
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
            hideFilterIcon={true}
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
                  {bucketListAttractions?.data?.attractions?.data?.length || 0}
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
                  {bucketListCities?.data?.cities?.data?.length || 0}
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
                  {bucketListCountries?.data?.countries?.data?.length || 0}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`gap-2  mt-4 pb-2`}>
            {activePlace === 'attractions' && (
              <>
                {bucketListAttractions?.data?.attractions?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard key={index} item={item?.data} />
                  ),
                )}
              </>
            )}
            {activePlace === 'cities' && (
              <>
                {bucketListCities?.data?.cities?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard key={index} item={item?.data} />
                  ),
                )}
              </>
            )}
            {activePlace === 'countries' && (
              <>
                {bucketListCountries?.data?.countries?.data?.map(
                  (item: any, index: number) => (
                    <AttractionCard key={index} item={item?.data} />
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

export default BucketList;
