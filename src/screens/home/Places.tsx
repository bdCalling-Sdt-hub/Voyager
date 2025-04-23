import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconFilledHeart,
  IconSearch,
  IconWhiteHeart,
} from '../../assets/icons/Icons';
import {
  useGetBucketListAttractionsQuery,
  useGetBucketListBannerQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
  useLocationVisitMutation,
} from '../../redux/slice/ApiSlice';

import {SvgXml} from 'react-native-svg';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {NavigProps} from '../../utils/interface/NaviProps';
import {baseUrl} from '../utils/exports';

const Places = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = useState('attractions');

  // rtk query hooks
  const {data: bucketListCountries} = useGetBucketListCountriesQuery({});
  const {data: bucketListCities} = useGetBucketListCitiesQuery({});
  const {data: bucketListAttractions} = useGetBucketListAttractionsQuery({});
  const {data: bucketListBanner} = useGetBucketListBannerQuery({});
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

  const destinationData = (() => {
    switch (activePlace) {
      case 'cities':
        // setActiveColor('#FC5D88BF');
        return bucketListCities?.data?.cities?.data || null;
      case 'countries':
        // setActiveColor('#FFA94DBF');
        return bucketListCountries?.data?.countries?.data || null;
      case 'attractions':
        // setActiveColor('#8C78EABF');
        return bucketListAttractions?.data?.attractions?.data || null;
      default:
        return null;
    }
  })();

  const activeColor = () => {
    switch (activePlace) {
      case 'attractions':
        return '#FC5D88BF';
      case 'cities':
        return '#FFA94DBF';
      case 'countries':
        return '#8C78EABF';
      default:
        return '#FC5D88BF';
    }
  };

  return (
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
              source={
                bucketListBanner?.data?.freeBucketList?.photos[0]
                  ? {
                      uri:
                        baseUrl +
                        bucketListBanner?.data?.freeBucketList?.photos[0],
                    }
                  : require('../../assets/images/speedmeter.png')
              }
              style={tw`w-full h-14`}
            />
          </View>
          <View style={tw`w-[80%] flex-shrink`}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkSemiBold`}>
              Bucket list is near limit (
              {bucketListBanner?.data?.usedBucket || 0}/
              {bucketListBanner?.data?.freeBucketList?.bucketlist_space || 0})
            </Text>
            <Text style={tw`text-gray100 text-sm  font-WorkRegular`}>
              {bucketListBanner?.data?.freeBucketList?.short_description}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mt-4`}>
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
                activePlace === 'attractions' ? 'text-violet100' : 'text-white'
              }`}>
              07
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
              24
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
                activePlace === 'countries' ? 'text-violet100' : 'text-white'
              }`}>
              07
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-y-4 mt-4 pb-2`}>
          {destinationData?.map((item: any, index: number) => (
            <TouchableOpacity
              style={tw`flex-row items-center p-1 gap-4 rounded-2xl border-r border-b border-b-[${activeColor()}] border-r-[${activeColor()}]`}
              key={index}
              onPress={() => handleVisitLocation(item?.data)}>
              <Image
                source={require('../../assets/images/explore-card-2.png')}
                style={tw`rounded-2xl w-4/12 h-24`}
              />
              <View
                style={tw`flex-1 justify-between flex-row items-center gap-2`}>
                <View style={tw`gap-y-1`}>
                  <View style={tw``}>
                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
                        {item?.data?.name}
                      </Text>
                    </View>
                    <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
                      {item?.data?.location || 'Location'}
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-4`}>
                    <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                      <Image
                        source={require('../../assets/images/coin.png')}
                        style={tw`h-6 w-6`}
                      />
                      <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                        50 coins
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                      <Image
                        source={require('../../assets/images/trophy.png')}
                        style={tw`h-6 w-6`}
                      />
                      <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                        100 XP
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <SvgXml
                xml={
                  item?.bucketlist_status === 'bucketlisted'
                    ? IconFilledHeart
                    : IconWhiteHeart
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Places;
