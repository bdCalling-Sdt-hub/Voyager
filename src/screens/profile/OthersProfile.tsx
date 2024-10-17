import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconAdd,
  IconFilledHeart,
  IconLeftArrow,
  IconNotification,
  IconSettings,
  IconWhiteAdd,
} from '../../assets/icons/Icons';
import destinations from '../../utils/json/destinations.json';

const OthersProfile = ({navigation}: any) => {
  const [activePlace, setActivePlace] = useState('attractions');
  const [isReqSend, setIsReqSend] = useState(false);

  const destinationData = (() => {
    switch (activePlace) {
      case 'cities':
        return destinations?.data?.cities || null;
      case 'countries':
        return destinations?.data?.countries || null;
      case 'attractions':
        return destinations?.data?.attractions || null;
      default:
        return null;
    }
  })();

  return (
    <ScrollView style={tw`px-[4%] pt-2 bg-white h-full`}>
      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-start justify-between py-2`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}
            onPress={() => navigation?.goBack()}>
            <SvgXml xml={IconLeftArrow} />
          </TouchableOpacity>
          <View style={[tw``]}>
            <Image
              source={require('../../assets/images/user.png')}
              style={tw`h-24 w-24 rounded-full`}
            />
          </View>
          <View
            style={[
              tw`opacity-0 border border-gray90 rounded-full h-10 w-10 flex items-center justify-center`,
            ]}>
            <SvgXml xml={IconNotification} />
          </View>
        </View>
        <Text style={tw`text-black text-2xl font-WorkMedium text-center`}>
          Midul Hosen
        </Text>
        <View style={tw`items-center`}>
          <Image
            source={{uri: 'https://flagsapi.com/BD/flat/64.png'}}
            style={tw`h-5 w-7 mt-1`}
          />
        </View>
        <View style={tw`flex-row items-center mt-6`}>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Joined</Text>
            <Text style={tw`text-black text-lg font-WorkSemiBold`}>2024</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Friends</Text>
            <Text style={tw`text-black text-lg font-WorkSemiBold`}>10</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Mutual</Text>
            <Text style={tw`text-black text-lg font-WorkSemiBold`}>8</Text>
          </View>
        </View>
        <View style={tw`items-center mt-6 gap-y-4`}>
          <TouchableOpacity
            style={tw`${
              isReqSend
                ? 'border-placeholderColor bg-placeholderColor '
                : 'border-violet100 bg-violet100 '
            } border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}
            onPress={() => {
              setIsReqSend(!isReqSend);
            }}>
            {isReqSend ? (
              <Text style={tw`text-sm font-WorkMedium text-white font-500`}>
                Cancel Request
              </Text>
            ) : (
              <>
                <SvgXml xml={IconWhiteAdd} />

                <Text style={tw`text-sm font-WorkMedium text-white font-500`}>
                  Add Friends
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`gap-y-4 mt-6`}>
          <View style={tw`flex-row items-center gap-4`}>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkBold font-700`}>
                  5
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                  Level
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/badges.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkBold font-700`}>
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
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/coin.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkBold font-700`}>
                  400
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                  Coins
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/trophy.png')} />
              <View>
                <Text style={tw`text-black text-[20px] font-WorkBold font-700`}>
                  550
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                  Points
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={tw`my-4`}>
          <View>
            <Text style={tw`text-black text-base font-WorkMedium font-500`}>
              Travel Stats
            </Text>
            <Text style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
              Attractions, cities, and countries they've visited!
            </Text>
          </View>

          <View style={tw`gap-y-2`}>
            <View style={tw`flex-row gap-2 mt-3`}>
              <View style={tw`bg-[#FFEFF3] p-4 rounded-2xl flex-1`}>
                <Text style={tw`text-black text-sm font-WorkRegular font-400`}>
                  Attractions
                </Text>
                <Text
                  style={tw`text-black text-2xl font-WorkSemiBold font-600`}>
                  7
                </Text>
              </View>
              <View style={tw`bg-[#FFF6ED] p-4 rounded-2xl flex-1`}>
                <Text style={tw`text-black text-sm font-WorkRegular font-400`}>
                  Cities
                </Text>
                <Text
                  style={tw`text-black text-2xl font-WorkSemiBold font-600`}>
                  14
                </Text>
              </View>
            </View>
            <View style={tw`flex-row`}>
              <View style={tw`bg-[#F4F2FD] p-4 rounded-2xl flex-1`}>
                <Text style={tw`text-black text-sm font-WorkRegular font-400`}>
                  Countries
                </Text>
                <Text
                  style={tw`text-black text-2xl font-WorkSemiBold font-600`}>
                  12
                </Text>
              </View>
            </View>

            <View style={tw`mt-2`}>
              <Text style={tw`text-black text-base font-WorkMedium font-500`}>
                Shared Adventures
              </Text>
              <Text style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
                Discover places you both want to visit and plan your next trip
                together!
              </Text>
            </View>
          </View>
        </View>

        {/* tabs */}
        <View>
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
                onPress={() =>
                  navigation?.navigate('DestinationDetails', {item})
                }>
                <Image
                  source={require('../../assets/images/explore-card-2.png')}
                  style={tw`rounded-2xl w-4/12 h-24`}
                />
                <View
                  style={tw`flex-1 justify-between flex-row items-center gap-2`}>
                  <View style={tw`gap-y-1`}>
                    <View style={tw``}>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={tw`text-black font-WorkSemiBold text-[20px]`}>
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
      </View>
    </ScrollView>
  );
};

export default OthersProfile;
