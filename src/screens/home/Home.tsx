import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconColoredRightArrow,
  IconFilledHeart,
  IconSearch,
  IconWhiteHeart,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import personalized from '../../utils/json/personalized.json';
import {NavigProps} from '../../utils/interface/NaviProps';
import {
  useGetPersonalizedQuery,
  useGetTopDestinationQuery,
  useLocationVisitMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';
import {personalizedPicksTypes} from '../utils/types';
import {baseUrl} from '../utils/exports';

const Home = ({navigation}: NavigProps<null>) => {
  // rtk query hooks
  const {data: personalizedPicks} = useGetPersonalizedQuery({});
  const {data: topDestination} = useGetTopDestinationQuery({});
  const [locationVisit] = useLocationVisitMutation();

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
    <View style={tw`h-full px-[4%] bg-white dark:bg-primaryDark`}>
      <ScrollView
        contentContainerStyle={tw``}
        showsVerticalScrollIndicator={false}>
        <View style={tw`pb-2`}>
          <Header
            title="Explore"
            containerStyle={tw`mt-2`}
            icon={IconSearch}
            IconRouteName="Dashboard"
            isSearchVisible={true}
            searchBarShow={true}
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

            <View style={tw`flex-row gap-4 justify-between mt-6`}>
              <TouchableOpacity
                style={tw`flex-1`}
                onPress={() => {
                  navigation?.navigate('NextDestination', {
                    title: 'attractions',
                  });
                }}>
                <Image
                  source={require('../../assets/images/attractions-cards.png')}
                />
                <Text
                  style={tw`text-sm font-WorkMedium text-black dark:text-white text-center mt-2`}>
                  Attractions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1`}
                onPress={() => {
                  navigation?.navigate('NextDestination', {
                    title: 'cities',
                  });
                }}>
                <Image
                  source={require('../../assets/images/cities-cards.png')}
                />
                <Text
                  style={tw`text-sm font-WorkMedium text-black dark:text-white text-center mt-2`}>
                  Cities
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1`}
                onPress={() => {
                  navigation?.navigate('NextDestination', {
                    title: 'countries',
                  });
                }}>
                <Image
                  source={require('../../assets/images/countries-cards.png')}
                />
                <Text
                  style={tw`text-sm font-WorkMedium text-black dark:text-white text-center mt-2`}>
                  Countries
                </Text>
              </TouchableOpacity>
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
              {personalizedPicks?.data?.map(
                (item: personalizedPicksTypes, index: number) => (
                  <TouchableOpacity
                    style={tw`rounded-2xl overflow-hidden mt-6`}
                    key={index}
                    // onPress={() => {
                    //   navigation?.navigate('DestinationDetails', {item});
                    // }}
                    onPress={() => handleVisitLocation(item)}>
                    <ImageBackground
                      source={{uri: baseUrl + item?.images[0]}}
                      resizeMode="cover"
                      style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
                      <View style={tw`gap-y-3 items-end w-full`}>
                        <SvgXml
                          xml={item?.name ? IconFilledHeart : IconWhiteHeart}
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
              {topDestination?.data?.map((item, index) => (
                <TouchableOpacity
                  style={tw`rounded-2xl overflow-hidden mt-6`}
                  key={index}>
                  <ImageBackground
                    source={require('../../assets/images/sky-tower.png')}
                    resizeMode="cover"
                    style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
                    <View style={tw`gap-y-3 items-end w-full`}>
                      <SvgXml xml={IconFilledHeart} />
                      {/* <SvgXml
                      xml={
                        item?.isVerified ? IconVerifiedTik : IconTikWithCircle
                      }
                    /> */}
                    </View>
                    <View
                      style={tw`bg-white dark:bg-darkBg p-3 w-full rounded-2xl`}>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={tw`text-black dark:text-white text-sm font-WorkMedium`}>
                          {item?.details?.city}
                        </Text>
                      </View>
                      <Text
                        style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                        {item?.details?.description}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
