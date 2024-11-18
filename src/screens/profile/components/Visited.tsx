import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import destinationData from '../../../utils/json/destinations.json';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconFilledHeart} from '../../../assets/icons/Icons';

const Visited = ({navigation}: any) => {
  return (
    <ScrollView
      contentContainerStyle={tw`gap-y-4 mt-6`}
      showsVerticalScrollIndicator={false}>
      {destinationData?.data?.countries?.map((item: any, index: number) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-1 gap-4 rounded-2xl border-r border-b border-b-[${item?.color}] border-r-[${item?.color}]`}
          key={index}
          onPress={() => navigation?.navigate('DestinationDetails', {item})}>
          <Image
            source={require('../../../assets/images/explore-card-2.png')}
            style={tw`rounded-2xl w-4/12 h-24`}
          />
          <View style={tw`flex-1 justify-between flex-row items-center gap-2`}>
            <View style={tw`gap-y-1`}>
              <View style={tw``}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-black font-WorkSemiBold text-[20px]`}>
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
                    source={require('../../../assets/images/coin.png')}
                    style={tw`h-6 w-6`}
                  />
                  <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                    50 coins
                  </Text>
                </View>

                <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                  <Image
                    source={require('../../../assets/images/trophy.png')}
                    style={tw`h-6 w-6`}
                  />
                  <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                    100 XP
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <SvgXml xml={IconFilledHeart} style={tw`mr-1.5`} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Visited;
