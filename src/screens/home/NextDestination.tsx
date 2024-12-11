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
  IconFilledHeart,
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
  console.log('title', title);
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

  const activeColor = () => {
    switch (title) {
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
    <View style={tw`px-[4%] bg-white h-full dark:bg-primaryDark`}>
      <View>
      <Header
        title={title ||"Next Destination"}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        isSearchVisible={true}
        searchBarShow={true}
        hideDestination={true}
        isIcon={true}
      />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-y-4 mt-4 pb-2`}>
          {destinationData?.map((item: any, index: number) => (
            <TouchableOpacity
              style={tw`flex-row items-center p-1 gap-4 rounded-2xl border-r border-b border-b-[${activeColor()}] border-r-[${activeColor()}]`}
              key={index}
              onPress={() =>
                navigation?.navigate('DestinationDetails', {item})
              }>
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
                        {item?.name}
                      </Text>
                    </View>
                    <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
                      {item?.location || 'Location'}
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
              <SvgXml xml={IconFilledHeart} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NextDestination;
