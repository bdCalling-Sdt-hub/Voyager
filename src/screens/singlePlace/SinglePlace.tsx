import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconFilledHeart, IconSearch} from '../../assets/icons/Icons';
import destinations from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';

const SinglePlace = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = useState('attractions');
  const {title}: any = route?.params || '';

  const destinationData = (() => {
    switch (activePlace) {
      case 'cities':
        // setActiveColor('#FC5D88BF');
        return destinations?.data?.cities || null;
      case 'countries':
        // setActiveColor('#FFA94DBF');
        return destinations?.data?.countries || null;
      case 'attractions':
        // setActiveColor('#8C78EABF');
        return destinations?.data?.attractions || null;
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
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        title={title}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        IconRouteName="Dashboard"
        isSearchVisible={true}
        searchBarShow={false}
        hideDestination={true}
        isIcon={true}
      />



    
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

export default SinglePlace;
