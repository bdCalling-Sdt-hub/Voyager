import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import CircularProgress from '../../components/progressBar/CircularProgress';
import RangeSlider from '../../components/slider/RangeSlider';
import {SvgXml} from 'react-native-svg';
import places from '../../utils/json/places.json';
import {
  IconColoredRightArrow,
  IconFilledHeart,
  IconSearch,
  IconVerifiedLocation,
} from '../../assets/icons/Icons';

const Dashboard = ({navigation}: any) => {
  const [activePlace, setActivePlace] = useState('attractions');
  return (
    <>
      <ScrollView
        style={tw`px-[4%] bg-white`}
        keyboardShouldPersistTaps="always">
        <Header
          title="Dashbaord"
          containerStyle={tw`mt-2`}
          icon={IconSearch}
          IconRouteName="Dashboard"
          isSearchVisible={true}
          searchBarShow={true}
        />
        {/* visited location card */}
        <View style={tw`border border-gray90 p-4 rounded-2xl mt-4`}>
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
          <View
            style={tw`bg-violet80 
            flex-row rounded-2xl items-center mt-4`}>
            <View style={tw`w-4/12`}>
              <CircularProgress percentage={70} />
            </View>
            <View style={tw`gap-y-2`}>
              <Text style={tw`capitalize text-black text-sm font-WorkMedium`}>
                {activePlace} Visited
              </Text>
              <Text
                style={tw`capitalize text-violet100 text-2xl font-WorkSemiBold`}>
                45
              </Text>
            </View>
          </View>
          <View>
            <Text style={tw`text-gray100 text-xs font-WorkRegular mt-4 mb-2`}>
              Places you visited
            </Text>
            <ScrollView
              horizontal
              contentContainerStyle={tw`flex-row items-center gap-2`}
              showsHorizontalScrollIndicator={false}>
              <View>
                <Image source={require('../../assets/images/city-1.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
              <View>
                <Image source={require('../../assets/images/city-2.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
              <View>
                <Image source={require('../../assets/images/city-3.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
              <View>
                <Image source={require('../../assets/images/city-1.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
              <View>
                <Image source={require('../../assets/images/city-2.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
              <View>
                <Image source={require('../../assets/images/city-3.png')} />
                <SvgXml
                  xml={IconVerifiedLocation}
                  style={tw`absolute bottom-2 right-2`}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        {/* weekly progress */}
        <View style={tw`border border-gray90 p-4 rounded-2xl bg-pink80`}>
          <Text style={tw`text-black text-base font-WorkMedium mb-2`}>
            Weekly Quests Progress
          </Text>
          <Text style={tw`text-xs font-WorkMedium`}>Completed 1/3</Text>
          <View style={tw`mt-4`} pointerEvents="none">
            <RangeSlider color="#ff5c8d" value={33} />
          </View>
        </View>

        <View style={tw`border border-gray90 p-4 rounded-2xl bg-blue80 mt-4`}>
          <Text style={tw`text-black text-base font-WorkMedium mb-2`}>
            Bucket List Progress
          </Text>
          <Text style={tw`text-xs font-WorkMedium`}>Visited 14/40</Text>
          <View pointerEvents="none">
            <RangeSlider color="#32B1B4" containerStyle={tw`mt-4`} value={35} />
          </View>
        </View>

        <View style={tw`mt-8`}>
          <TouchableOpacity style={tw`flex-row items-center justify-between`}>
            <View style={tw``}>
              <Text style={tw`text-black text-base font-WorkMedium`}>
                Make Progress on Your Bucket List{' '}
              </Text>
              <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                Visit these places to check them off your list
              </Text>
            </View>
            <SvgXml xml={IconColoredRightArrow} />
          </TouchableOpacity>

          {places.map(place => (
            <TouchableOpacity style={tw`flex-row items-center gap-2 mt-6`} key={place.id} onPress={() => {navigation?.navigate('DestinationDetails')}}>
              <View style={tw`w-11/12 flex-row items-center gap-4`}>
                
                  <Image style={tw`w-4/12 rounded-2xl`} source={require('../../assets/images/place.png')} />
                
                <View style={tw`flex-shrink`}>
                  <Text style={tw`text-black font-WorkSemiBold text-[20px]`}>
                    {place?.title}
                  </Text>
                  <Text style={tw`text-gray100 font-WorkRegular text-xs`}>
                    {place?.subtitle}
                  </Text>
                </View>
              </View>
              <View>
                <SvgXml xml={IconFilledHeart} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
