import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import CircularProgress from '../../components/progressBar/CircularProgress';
import RangeSlider from '../../components/slider/RangeSlider';
import {SvgXml} from 'react-native-svg';
import places from '../../utils/json/places.json';
import {
  IconColoredRightArrow,
  IconFilledHeart,
  IconTikWithCircle,
} from '../../assets/icons/Icons';

const Dashboard = () => {
  const [activePlace, setActivePlace] = React.useState('attractions');
  return (
    <ScrollView style={tw`px-[4%] bg-white`}>
      <Header title="Dashbaord" containerStyle={tw`mt-2`} />
      {/* visited location card */}
      <View style={tw`border border-gray90 p-4 rounded-2xl`}>
        <View style={tw`flex-row bg-gray80 p-1 rounded-full`}>
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
        <View style={tw`bg-green90 flex-row rounded-2xl items-center mt-4`}>
          <View style={tw`w-4/12`}>
            <CircularProgress percentage={70} />
          </View>
          <View style={tw`gap-y-2`}>
            <Text style={tw`capitalize text-black text-sm font-WorkRegular`}>
              {activePlace} Visited
            </Text>
            <Text
              style={tw`capitalize text-green100 text-[20px] font-WorkMedium`}>
              45
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={tw`flex-row items-center mt-4 gap-2`}
          showsHorizontalScrollIndicator={false}>
          <View>
            <Image source={require('../../assets/images/city-1.png')} />
          </View>
          <View>
            <Image source={require('../../assets/images/city-2.png')} />
          </View>
          <View>
            <Image source={require('../../assets/images/city-3.png')} />
          </View>
          <View>
            <Image source={require('../../assets/images/city-1.png')} />
          </View>
          <View>
            <Image source={require('../../assets/images/city-2.png')} />
          </View>
          <View>
            <Image source={require('../../assets/images/city-3.png')} />
          </View>
        </ScrollView>
      </View>

      {/* weekly progress */}
      <View style={tw`border border-gray90 p-4 rounded-2xl bg-pink90`}>
        <Text style={tw`text-black text-base font-WorkMedium mb-2`}>
          Weekly Quests Progress
        </Text>
        <Text style={tw`text-xs font-WorkMedium`}>Completed 1/3</Text>
        <RangeSlider color="#ff5c8d" containerStyle={tw`mt-4`} value={33} />
      </View>

      <View style={tw`border border-gray90 p-4 rounded-2xl bg-blue90 mt-4`}>
        <Text style={tw`text-black text-base font-WorkMedium mb-2`}>
          Bucket List Progress
        </Text>
        <Text style={tw`text-xs font-WorkMedium`}>Visited 14/40</Text>
        <RangeSlider color="#32B1B4" containerStyle={tw`mt-4`} value={35} />
      </View>

      <View style={tw`mt-8`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-black text-base font-WorkMedium`}>
            Make Progress on Your Bucket List{' '}
          </Text>
          <SvgXml xml={IconColoredRightArrow} />
        </View>
        <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
          Visit these places to check them off your list
        </Text>

        {places.map(place => (
          <View style={tw`flex-row items-center gap-2 mt-6`} key={place.id}>
            <View style={tw`w-4/12`}>
              <Image source={require('../../assets/images/place.png')} />
            </View>
            <View>
              <Text style={tw`text-black font-WorkMedium text-sm`}>
                {place?.title}
              </Text>
              <Text style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                {place?.subtitle}
              </Text>
              <View style={tw`gap-4 flex-row items-center mt-4`}>
                <SvgXml xml={IconFilledHeart} />
                <SvgXml xml={IconTikWithCircle} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
