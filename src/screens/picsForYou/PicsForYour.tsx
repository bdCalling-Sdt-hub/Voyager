import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconFilledHeart, IconSearch, IconWhiteHeart} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import places from '../../utils/json/places.json';
import {useGetPersonalizedQuery} from '../../../android/app/src/redux/slice/ApiSlice';
import {personalizedPicksTypes} from '../utils/types';
import {baseUrl} from '../utils/exports';

const PicsForYour = ({navigation, route}: NavigProps<null>) => {
  // rtk query hooks
  const {data: personalizedPicks} = useGetPersonalizedQuery({});

  const activeColor = (type: string) => {
    switch (type) {
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

  console.log('Picks for you: ', personalizedPicks);

  return (
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        title={'Picks For You'}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        isSearchVisible={true}
        searchBarShow={true}
        hideDestination={true}
        isIcon={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-y-4 mt-4 pb-2`}>
          {personalizedPicks?.data?.data?.map(
            (place: personalizedPicksTypes, index: number) => (
              <TouchableOpacity
                style={tw`flex-row items-center gap-2 rounded-2xl mt-6 p-1 ${
                  place?.type
                    ? `border-r border-b border-b-[${activeColor(
                        place?.type,
                      )}] border-r-[${activeColor(place?.type)}]`
                    : ''
                }`}
                key={index}
                onPress={() => {
                  navigation?.navigate('DestinationDetails',  {item: place});
                }}>
                <Image
                  source={{
                    uri:
                      baseUrl + place?.images[0] ||
                      'https://images.unsplash.com/photo-1709027615779-25af6606a61e?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={tw`rounded-2xl w-4/12 h-24`}
                />
                <View
                  style={tw`flex-1 justify-between flex-row items-center gap-2`}>
                  <View style={tw`gap-y-1`}>
                    <View style={tw``}>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
                          {place?.name}
                        </Text>
                      </View>
                      <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
                        {place?.description || 'Location'}
                      </Text>
                    </View>
                  </View>
                </View>
                <SvgXml xml={place?.bucketlist_status === "bucketlisted" ? IconFilledHeart : IconWhiteHeart} style={tw`mr-1.5`} />
              </TouchableOpacity>
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PicsForYour;
