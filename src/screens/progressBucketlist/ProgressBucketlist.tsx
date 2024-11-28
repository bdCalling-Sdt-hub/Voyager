import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconFilledHeart, IconSearch} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import places from '../../utils/json/places.json';

const ProgressBucketlist = ({navigation, route}: NavigProps<null>) => {

  return (
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}> 
      <Header
        title={"Travel Musts"}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        isSearchVisible={true}
        searchBarShow={false}
        hideDestination={true}
        isIcon={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-y-4 mt-4 pb-2`}>
        {places.map(place => (
            <TouchableOpacity
              style={tw`flex-row items-center gap-2 rounded-2xl mt-6 p-1 ${place?.color ? `border-r border-b border-b-[${place?.color}] border-r-[${place?.color}]` : ''}`}
              key={place.id}
              onPress={() => {
                navigation?.navigate('DestinationDetails');
              }}>
              <Image
            source={{uri: place?.image_url}}
            style={tw`rounded-2xl w-4/12 h-24`}
          />
          <View style={tw`flex-1 justify-between flex-row items-center gap-2`}>
            <View style={tw`gap-y-1`}>
              <View style={tw``}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
                    {place?.title}
                  </Text>
                </View>
                <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
                  {place?.subtitle || 'Location'}
                </Text>
              </View>
            </View>
          </View>
          <SvgXml xml={IconFilledHeart} style={tw`mr-1.5`} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressBucketlist;
