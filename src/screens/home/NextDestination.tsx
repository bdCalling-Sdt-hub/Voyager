import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {
  IconFilter,
  IconHeart,
  IconSearch,
  IconTikWithCircle,
  IconWhiteSearch,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import desticaions from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';

const NextDestination = ({navigation, route}: NavigProps<null>) => {
  const {title} = route?.params || {};
  const destinationData = (() => {
    switch (title) {
      case 'cities':
        return desticaions?.data?.cities || null;
      case 'countries':
        return desticaions?.data?.countries || null;
      case 'attractions':
        return desticaions?.data?.attractions || null;
      default:
        return null;
    }
  })();

  return (
    <View style={tw`px-[4%] bg-white h-full`}>
      <View>
      <Header
          title={title || 'Next Destination'}
          containerStyle={tw`mt-2`}
          icon={IconSearch}
          IconRouteName="Dashboard"
          isSearchVisible={true}
          searchBarShow={true}
        />
      </View>

      <ScrollView contentContainerStyle={tw`gap-y-4 mt-6`} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        {destinationData?.map((item: any, index: number) => (
          <TouchableOpacity
            style={tw`flex-row items-center gap-4`}
            key={index}
            onPress={() => navigation?.navigate('DestinationDetails', {item})}>
            <Image
              source={require('../../assets/images/explore-card-2.png')}
              style={tw`rounded-2xl w-4/12 h-24`}
            />
            <View style={tw`gap-y-4`}>
              <View>
                <Text style={tw`text-black font-WorkMedium text-base`}>
                  {item?.name}
                </Text>
                <Text style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                  {item?.location}
                </Text>
              </View>
              <View style={tw`flex-row gap-4`}>
                <SvgXml xml={IconHeart} />
                <SvgXml xml={IconTikWithCircle} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NextDestination;
