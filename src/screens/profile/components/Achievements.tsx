import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../lib/tailwind';

const Achievements = ({navigation}: any) => {
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
                5
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
                12
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
                400
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
                550
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
          style={tw`mt-8 rounded-2xl p-4 flex-row`}>
          <View style={tw`w-4/12 justify-center`}>
            <Image
              source={require('../../../assets/images/treasure-box.png')}
            />
          </View>
          <View style={tw`w-8/12 flex-shrink`}>
            <Text style={tw`text-black text-base font-WorkSemiBold`}>
              Shop: Unlock Exclusive {'\n'}Rewards
            </Text>
            <Text
              style={tw`text-black text-xs font-WorkRegular leading-[18px] mt-1`}>
              Use your coins to buy new avatars, digital items, and other in-app
              upgrades!
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default Achievements;
