import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  useGetAvatarQuery,
  useGetDigitalSouvenirQuery,
  useGetPowerUpsQuery,
} from '../../redux/apiSlices/equipmentSlice';

import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import Avatar from './Avatar';
import DigitalSouvenirs from './DigitalSouvenirs';
import PowersUps from './PowersUps';

const Shop = () => {
  const [activePlace, setActivePlace] = useState('avatar');

  const {
    data: powerUpItems,
    isLoading: powerUpLoading,
    isFetching: powerUpFetching,
    refetch: powerUpRefetch,
  } = useGetPowerUpsQuery({});
  const {
    data: digitalSouvenirs,
    isLoading: digitalLoading,
    isFetching: digitalFetching,
    refetch: digitalRefetch,
  } = useGetDigitalSouvenirQuery({});

  const {
    data: avatarData,
    isLoading: avatarLoading,
    isFetching: avatarFetching,
    refetch: avatarRefetch,
  } = useGetAvatarQuery({});

  return (
    <View style={tw`h-full bg-white dark:bg-primaryDark px-[4%] pb-2`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
          title={'Shop'}
          rightComponent={
            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-3`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                300
              </Text>
            </TouchableOpacity>
          }
        />
        {/* banner */}
        <TouchableOpacity
          onPress={() => {
            //   navigation.navigate('Shop');
          }}>
          <LinearGradient
            colors={['#EFC7CF', '#AFBCF3']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={tw`mt-8 rounded-2xl p-4 flex-row`}>
            <View style={tw`w-4/12 justify-center`}>
              <Image source={require('../../assets/images/clock.png')} />
            </View>
            <View style={tw`w-8/12 flex-shrink`}>
              <Text style={tw`text-black text-base font-WorkSemiBold`}>
                Limited-Time Offer
              </Text>
              <Text
                style={tw`text-black text-xs font-WorkRegular leading-[18px] mt-1`}>
                Don't miss out! Grab these exclusive items before they're gone!
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* tabs */}
        <View
          style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mt-6`}>
          <TouchableOpacity
            style={tw`${
              activePlace === 'avatar' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActivePlace('avatar')}>
            <Text
              style={tw`${
                activePlace === 'avatar' ? 'text-white' : 'text-gray100'
              } text-xs font-WorkMedium`}>
              Avatar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activePlace === 'digital_souvenirs' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActivePlace('digital_souvenirs')}>
            <Text
              style={tw`${
                activePlace === 'digital_souvenirs'
                  ? 'text-white'
                  : 'text-gray100'
              } text-xs font-WorkMedium`}>
              Digital Souvenirs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activePlace === 'power_ups' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActivePlace('power_ups')}>
            <Text
              style={tw`${
                activePlace === 'power_ups' ? 'text-white' : 'text-gray100'
              }  text-xs font-WorkMedium`}>
              Power-Ups
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {activePlace === 'power_ups' ? (
            <PowersUps powerUpItems={powerUpItems?.data?.powerups} />
          ) : activePlace === 'digital_souvenirs' ? (
            <DigitalSouvenirs
              digitalSouvenirs={digitalSouvenirs?.data?.digital_items}
            />
          ) : (
            <Avatar avatarData={avatarData?.data?.avatars} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;
