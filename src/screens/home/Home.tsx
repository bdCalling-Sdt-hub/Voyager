import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconFilter,
  IconSearch,
  IconWhiteSearch,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={tw`px-[4%] bg-white h-full`}>
      <View>
        <Header
          title="Explore"
          containerStyle={tw`mt-2`}
          IconContainer={tw`bg-black`}
          icon={IconWhiteSearch}
        />
        <View style={tw`bg-gray80 rounded-full flex-row items-center p-2`}>
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

        <View style={tw`mt-4`}>
          <Text style={tw`text-black text-base font-WorkMedium`}>
            Find Your Next Destination
          </Text>
        </View>
        <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
          Explore countries, cities, and attractions
        </Text>

        <View style={tw`flex-row gap-4 justify-between mt-6`}>
          <View style={tw`flex-1`}>
            <Image
              source={require('../../assets/images/attractions-cards.png')}
            />
            <Text style={tw`text-sm font-WorkMedium text-black`}>
              Attractions
            </Text>
          </View>
          <View style={tw`flex-1`}>
            <Image source={require('../../assets/images/cities-cards.png')} />
          </View>
          <View style={tw`flex-1`}>
            <Image
              source={require('../../assets/images/countries-cards.png')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
