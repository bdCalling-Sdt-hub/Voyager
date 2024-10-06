import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import CircularProgress from '../../components/progressBar/CircularProgress';
import RangeSlider from '../../components/slider/RangeSlider';
import {SvgXml} from 'react-native-svg';
import {
  IconColoredTik,
  IconFilter,
  IconHeart,
  IconSearch,
  IconTikWithCircle,
} from '../../assets/icons/Icons';
import desticaions from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';

const Places = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = React.useState('attractions');
  const {title}: any = route?.params || null;

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
    <View style={tw`px-[4%] bg-white`}>
      <Header
        title={title || 'Places'}
        containerStyle={tw`mt-2`}
        isIcon={true}
      />
      <View style={tw`bg-gray80 rounded-full flex-row items-center p-1`}>
        <View
          style={tw`bg-white rounded-full flex-row items-center gap-4 flex-1 pl-4`}>
          <SvgXml xml={IconSearch} />
          <TextInput placeholder="Search" />
        </View>
        <View>
          <TouchableOpacity
            style={tw`h-12 w-12 flex items-center justify-center rounded-full ml-2 bg-white`}>
            <SvgXml xml={IconFilter} />
          </TouchableOpacity>
        </View>
      </View>
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
      <ScrollView contentContainerStyle={tw`gap-y-4 mt-6`}>
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
                <SvgXml
                  xml={title === 'visited' ? IconColoredTik : IconTikWithCircle}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Places;
