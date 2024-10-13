import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {
  IconColoredRightArrow,
  IconFilledHeart,
  IconFilter,
  IconHeart,
  IconSearch,
  IconTikWhiteWithCircle,
  IconTikWithCircle,
  IconVerifiedTik,
  IconWhiteFilledHeart,
  IconWhiteHeart,
  IconWhiteSearch,
} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import personalized from '../../utils/json/personalized.json';
import {NavigProps} from '../../utils/interface/NaviProps';

const Home = ({navigation}: NavigProps<null>) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  console.log(isSearchVisible);
  return (
    <ScrollView contentContainerStyle={tw`px-[4%] bg-white`}>
      <View>
        <Header
          title="Explore"
          containerStyle={tw`mt-2`}
          IconContainer={tw`${isSearchVisible ? 'bg-black' : ''}`}
          icon={IconSearch}
          onPressSearch={() => setSearchVisible(!isSearchVisible)}
          isSearchVisible={isSearchVisible}
        />
        <View>
          <View style={tw`mt-4`}>
            <Text style={tw`text-black text-base font-WorkMedium`}>
              Find Your Next Destination
            </Text>
          </View>
          <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
            Explore countries, cities, and attractions
          </Text>

          <View style={tw`flex-row gap-4 justify-between mt-6`}>
            <TouchableOpacity
              style={tw`flex-1`}
              onPress={() => {
                navigation?.navigate('NextDestination', {
                  title: 'attractions',
                });
              }}>
              <Image
                source={require('../../assets/images/attractions-cards.png')}
              />
              <Text
                style={tw`text-sm font-WorkMedium text-black text-center mt-2`}>
                Attractions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1`}
              onPress={() => {
                navigation?.navigate('NextDestination', {
                  title: 'cities',
                });
              }}>
              <Image source={require('../../assets/images/cities-cards.png')} />
              <Text
                style={tw`text-sm font-WorkMedium text-black text-center mt-2`}>
                Cities
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1`}
              onPress={() => {
                navigation?.navigate('NextDestination', {
                  title: 'countries',
                });
              }}>
              <Image
                source={require('../../assets/images/countries-cards.png')}
              />
              <Text
                style={tw`text-sm font-WorkMedium text-black text-center mt-2`}>
                Countries
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`mt-6`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between`}
            onPress={() => {
              navigation?.navigate('Places', {title: 'picks for you'});
            }}>
            <View style={tw``}>
              <Text style={tw`text-black text-base font-WorkMedium`}>
                Personalized Picks
              </Text>
              <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                Destinations that match your interests
              </Text>
            </View>
            <SvgXml xml={IconColoredRightArrow} />
          </TouchableOpacity>

          <ScrollView
            horizontal
            contentContainerStyle={tw`gap-4`}
            showsHorizontalScrollIndicator={false}>
            {personalized.map(item => (
              <TouchableOpacity
                style={tw`rounded-2xl overflow-hidden mt-6`}
                key={item.id}
                onPress={() => {
                  navigation?.navigate('DestinationDetails');
                }}>
                <ImageBackground
                  source={require('../../assets/images/explore-card-1.png')}
                  resizeMode="cover"
                  style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
                  <View style={tw`gap-y-3 items-end w-full`}>
                    <SvgXml
                      xml={item?.isFav ? IconFilledHeart : IconWhiteHeart}
                    />
                  </View>
                  <View style={tw`bg-white p-3 w-full rounded-2xl`}>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-black text-sm font-WorkMedium`}>
                        {item.title}
                      </Text>
                    </View>
                    <Text style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                      {item.subtitle}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={tw`mt-6`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between`}
            onPress={() => {
              navigation?.navigate('Places', {title: 'top destinations'});
            }}>
            <View style={tw``}>
              <Text style={tw`text-black text-base font-WorkMedium`}>
                Top Destinations
              </Text>
              <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                Discover popular attractions around the globe
              </Text>
            </View>
            <SvgXml xml={IconColoredRightArrow} />
          </TouchableOpacity>

          <ScrollView
            horizontal
            contentContainerStyle={tw`gap-4`}
            showsHorizontalScrollIndicator={false}>
            {personalized.map(item => (
              <TouchableOpacity
                style={tw`rounded-2xl overflow-hidden mt-6`}
                key={item.id}>
                <ImageBackground
                  source={require('../../assets/images/sky-tower.png')}
                  resizeMode="cover"
                  style={tw`h-[260px] w-82 justify-between items-center rounded-2xl p-4`}>
                  <View style={tw`gap-y-3 items-end w-full`}>
                    <SvgXml
                      xml={item?.isFav ? IconFilledHeart : IconWhiteHeart}
                    />
                    {/* <SvgXml
                      xml={
                        item?.isVerified ? IconVerifiedTik : IconTikWithCircle
                      }
                    /> */}
                  </View>
                  <View style={tw`bg-white p-3 w-full rounded-2xl`}>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-black text-sm font-WorkMedium`}>
                        {item.title}
                      </Text>
                    </View>
                    <Text style={tw`text-gray100 font-WorkRegular text-[10px]`}>
                      {item.subtitle}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
