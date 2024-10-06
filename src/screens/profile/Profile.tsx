import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconAdd, IconSearch, IconSettings} from '../../assets/icons/Icons';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  return (
    <View style={tw`px-[4%] pt-2 bg-white h-full`}>
      <View>
        <View style={tw`flex-row items-start justify-between py-2`}>
          <TouchableOpacity style={[tw``]}>
            <View
              style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}>
              <SvgXml xml={IconSettings} />
            </View>
          </TouchableOpacity>
          <View style={[tw``]}>
            <Image
              source={require('../../assets/images/user.png')}
              style={tw`h-24 w-24 rounded-full`}
            />
          </View>
          <View
            style={[
              tw`border border-gray90 rounded-full h-10 w-10 flex items-center justify-center`,
            ]}>
            <SvgXml xml={IconSearch} />
          </View>
        </View>
        <Text style={tw`text-black text-2xl font-WorkMedium text-center`}>
          Henry William
        </Text>
        <View style={tw`items-center mt-2`}>
          <Image
            source={require('../../assets/images/country-flag.png')}
            style={tw`h-5 w-7`}
          />
        </View>
        <View style={tw`flex-row items-center mt-6`}>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-black text-sm font-WorkRegular`}>Joined</Text>
            <Text style={tw`text-violet100 text-base font-WorkMedium`}>
              2024
            </Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-black text-sm font-WorkRegular`}>
              Followers
            </Text>
            <Text style={tw`text-violet100 text-base font-WorkMedium`}>10</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-black text-sm font-WorkRegular`}>
              Following
            </Text>
            <Text style={tw`text-violet100 text-base font-WorkMedium`}>8</Text>
          </View>
        </View>
        <View style={tw`items-center mt-6`}>
          <TouchableOpacity
            style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-5/10`}>
            <SvgXml xml={IconAdd} />
            <Text style={tw`text-sm font-WorkRegular text-violet100`}>
              Bucket List
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`gap-y-4 mt-8`}>
          <View style={tw`flex-row items-center gap-4`}>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkMedium`}>
                  5
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkRegular`}>
                  Level
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkMedium`}>
                  12
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkRegular`}>
                  Badges
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-4`}>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkMedium`}>
                  400
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkRegular`}>
                  Coins
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkMedium`}>
                  550
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkRegular`}>
                  Points
                </Text>
              </View>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={['#E1A0F0', '#F8C1CF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={tw`mt-12 rounded-2xl p-4 flex-row`}>
          <View style={tw`w-4/12`}>
            <Image source={require('../../assets/images/treasure-box.png')} />
          </View>
          <View style={tw`w-8/12 flex-shrink`}>
            <Text style={tw`text-black text-base font-WorkMedium`}>
              Shop: Unlock Exclusive {'\n'}Rewards
            </Text>
            <Text
              style={tw`text-black text-sm font-WorkRegular leading-[13px] mt-1`}>
              Use your coins to buy new avatars, digital items, and other in-app
              upgrades!
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Profile;
