import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconColoredTik,
  IconFilledHeart,
  IconFilter,
  IconSearch,
  IconTikWithCircle,
} from '../../assets/icons/Icons';
import desticaions from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';
import NormalModal from '../../components/modals/NormalModal';
import {Checkbox, RadioButton, RadioGroup} from 'react-native-ui-lib';

const Places = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = useState('attractions');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const {title}: any = route?.params || '';

  const destinationData = (() => {
    switch (activePlace) {
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
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        IconRouteName={'Home'}
        IconContainer={tw`${isSearchVisible ? 'bg-black' : ''}`}
        icon={IconSearch}
        onPressSearch={() => setSearchVisible(!isSearchVisible)}
        isSearchVisible={isSearchVisible}
      />

      <View style={tw`flex-row bg-gray80 p-1 rounded-full mt-4`}>
        <TouchableOpacity
          style={tw`${
            activePlace === 'attractions' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('attractions')}>
          <Text
            style={tw`${
              activePlace === 'attractions' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Attractions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            activePlace === 'cities' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('cities')}>
          <Text
            style={tw`${
              activePlace === 'cities' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Cities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            activePlace === 'countries' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('countries')}>
          <Text
            style={tw`${
              activePlace === 'countries' ? 'text-white' : 'text-gray100'
            }  text-xs font-WorkMedium`}>
            Countries
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={tw`gap-y-4 mt-6`}
        showsVerticalScrollIndicator={false}>
        {destinationData?.map((item: any, index: number) => (
          <TouchableOpacity
            style={tw`flex-row items-center gap-4`}
            key={index}
            onPress={() => navigation?.navigate('DestinationDetails', {item})}>
            <Image
              source={require('../../assets/images/explore-card-2.png')}
              style={tw`rounded-2xl w-4/12 h-24`}
            />
            <View
              style={tw`flex-1 justify-between flex-row items-center gap-2`}>
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
      </ScrollView>
    </View>
  );
};

export default Places;
