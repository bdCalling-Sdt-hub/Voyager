import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../lib/tailwind';
import { useGetAchievementsQuery, useGetShopBannerQuery } from '../../../../android/app/src/redux/slice/ApiSlice';

const Achievements = ({navigation}: any) => {

  // rtk query hooks
  const {data, isLoading} = useGetAchievementsQuery({});
  const {data: shopBannerData} = useGetShopBannerQuery({});

  const {level, level_icon, badges, xp, coins} = data?.data || {};
  const {name: shopName, photos, short_description: description} = shopBannerData?.data || {};
  return (
    <>
      <View style={tw`gap-y-4`}>
        <View style={tw`flex-row items-center gap-4`}>
          <View
            style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
            <Image source={require('../../../assets/images/level.png')} />
            <View>
              <Text
                style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                {level}
              </Text>
              <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                Level
              </Text>
            </View>
          </View>
          <View
            style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
            <Image source={require('../../../assets/images/badges.png')} />
            <View>
              <Text
                style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                {badges}
              </Text>
              <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                Badges
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-4`}>
          <View
            style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
            <Image source={require('../../../assets/images/coin.png')} />
            <View>
              <Text
                style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                {coins}
              </Text>
              <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                Coins
              </Text>
            </View>
          </View>
          <View
            style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
            <Image source={require('../../../assets/images/trophy.png')} />
            <View>
              <Text style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                {xp}
              </Text>
              <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                Souvenirs
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Shop');
        }}>
        <LinearGradient
          colors={['#E1A0F0', '#F8C1CF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={tw`mt-8 rounded-2xl p-4 flex-row items-center`}>
          <View style={tw`w-4/12 justify-center`}>
            <Image
              source={require('../../../assets/images/treasure-box.png')}
              // source={{uri: baseUrl + photos[0]}}
            />
          </View>
          <View style={tw`w-8/12 flex-shrink`}>
            <Text style={tw`text-black text-base font-WorkSemiBold`}>
              Shop: {shopName}
            </Text>
            <Text
              style={tw`text-black text-xs font-WorkRegular leading-[18px] mt-1`}>
             {description}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default Achievements;
