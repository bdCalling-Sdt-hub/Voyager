import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import RangeSlider from '../../components/slider/RangeSlider';
import quests from '../../utils/json/quests.json';
import {SvgXml} from 'react-native-svg';
import {IconColoredRightArrow} from '../../assets/icons/Icons';

const WeeklyQuestions = () => {
  const [activeQuest, setActiveQuest] = React.useState('quests');
  return (
    <ScrollView style={tw`px-[4%] bg-white`}>
      <Header title="Quests" containerStyle={tw`mt-2`} />
      {/* visited location card */}
      <View style={tw``}>
        <View style={tw`flex-row bg-gray80 p-1 rounded-full`}>
          <TouchableOpacity
            style={tw`${
              activeQuest === 'quests' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActiveQuest('quests')}>
            <Text
              style={tw`${
                activeQuest === 'quests' ? 'text-white' : 'text-gray100'
              } text-xs font-WorkMedium`}>
              Weekly Quests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activeQuest === 'achievements' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActiveQuest('achievements')}>
            <Text
              style={tw`${
                activeQuest === 'achievements' ? 'text-white' : 'text-gray100'
              } text-xs font-WorkMedium`}>
              Achievements
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeQuest === 'quests' ? (
        <View>
          <View
            style={tw`bg-brown80 flex-row rounded-2xl items-center mt-4 py-3 pl-6 gap-4`}>
            <Image source={require('../../assets/images/time-stamp.png')} />
            <Text style={tw`text-brown100 text-base font-WorkMedium`}>
              4 days left
            </Text>
          </View>
          <View style={tw`border border-gray90 p-4 rounded-2xl bg-pink90 mt-4`}>
            <Text style={tw`text-black text-base font-WorkMedium mb-2`}>
              Weekly Quests Progress
            </Text>
            <Text style={tw`text-xs font-WorkMedium`}>Completed 1/3</Text>
            <RangeSlider color="#ff5c8d" containerStyle={tw`mt-4`} value={33} />
          </View>

          <View style={tw`mt-8`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-black text-base font-WorkMedium`}>
                Incomplete
              </Text>
            </View>

            <View style={tw`gap-y-4 mt-6`}>
              {quests?.quests?.map((item: any) => (
                <View
                  style={tw`flex-row items-center gap-3 border border-gray90 rounded-2xl p-4`}
                  key={item?.id}>
                  <View style={tw``}>
                    <Image
                      source={require('../../assets/images/quest-1.png')}
                    />
                  </View>
                  <View style={tw`flex-shrink gap-y-3`}>
                    <Text style={tw`text-black font-WorkRegular text-base `}>
                      {item?.question}
                    </Text>

                    <View style={tw`gap-4 flex-row items-center`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/coin.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          {item?.coins} Coins
                        </Text>
                      </View>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/trophy.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          {item?.trophy}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View style={tw`mt-6`}>
          <View style={tw`flex-row items-center gap-4`}>
            <Text style={tw`text-base text-black font-WorkMedium`}>
              Badges Earned
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-violet100 text-2xl font-WorkMedium`}>
                12{' '}
              </Text>
              <Text style={tw`text-violet100 text-xs font-WorkMedium`}>
                / 60
              </Text>
            </View>
            <SvgXml xml={IconColoredRightArrow} />
          </View>

          <View style={tw`flex-row items-center mt-4`}>
            <View style={tw`items-center justify-center flex-1`}>
              <Image
                source={require('../../assets/images/travel-expert.png')}
              />
              <Text style={tw`text-black text-[10px] font-WorkRegular`}>
                Travel Expert
              </Text>
            </View>
            <View style={tw`items-center justify-center flex-1`}>
              <Image
                source={require('../../assets/images/top-the-world.png')}
              />
              <Text style={tw`text-black text-[10px] font-WorkRegular`}>
                Top of the World
              </Text>
            </View>
            <View style={tw`items-center justify-center flex-1`}>
              <Image
                source={require('../../assets/images/cultural-explorer.png')}
              />
              <Text style={tw`text-black text-[10px] font-WorkRegular`}>
                Cultural Explorer
              </Text>
            </View>
          </View>

          <View>
            <View style={tw`flex-row items-center my-4`}>
              <Text style={tw`text-black text-base font-WorkMedium`}>
                Ongoing
              </Text>
            </View>
            <View style={tw`gap-y-4`}>
              <View style={tw`border border-gray90 p-4 rounded-2xl bg-white`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <Image
                    source={require('../../assets/images/city-hopper.png')}
                  />
                  <View>
                    <Text
                      style={tw`text-black text-base font-WorkRegular mb-1`}>
                      City Hopper
                    </Text>
                    <Text style={tw`text-[10px] font-WorkMedium text-gray100`}>
                      Visit 15 different cities
                    </Text>
                    <View style={tw`gap-4 flex-row items-center mt-3`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/coin.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          250 Coins
                        </Text>
                      </View>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/trophy.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          350 XP
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <RangeSlider
                  color="#8C78EA"
                  containerStyle={tw`mt-4`}
                  value={35}
                  trackColor="#E5D6FB"
                />
              </View>
              <View style={tw`border border-gray90 p-4 rounded-2xl bg-white`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <Image
                    source={require('../../assets/images/beach-explorer.png')}
                  />
                  <View>
                    <Text
                      style={tw`text-black text-base font-WorkRegular mb-1`}>
                      Beach Explorer
                    </Text>
                    <Text style={tw`text-[10px] font-WorkMedium text-gray100`}>
                      Visit 10 different beaches
                    </Text>
                    <View style={tw`gap-4 flex-row items-center mt-3`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/coin.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          200 Coins
                        </Text>
                      </View>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Image
                          source={require('../../assets/images/trophy.png')}
                        />
                        <Text
                          style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                          400 XP
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <RangeSlider
                  color="#8C78EA"
                  containerStyle={tw`mt-4`}
                  value={10}
                  trackColor="#E5D6FB"
                />
              </View>

              <View>
                <View style={tw`flex-row items-center my-4`}>
                  <Text style={tw`text-black text-base font-WorkMedium`}>
                    Locked
                  </Text>
                </View>
                <View style={tw`gap-y-4`}>
                  {quests?.quests?.map((item: any) => (
                    <View
                      style={tw`flex-row items-center gap-3 border border-gray90 rounded-2xl p-4`}
                      key={item?.id}>
                      <View style={tw``}>
                        <Image
                          source={require('../../assets/images/locked.png')}
                        />
                      </View>
                      <View style={tw`flex-shrink gap-y-3`}>
                        <Text
                          style={tw`text-black font-WorkRegular text-base `}>
                          {item?.question}
                        </Text>

                        <View style={tw`gap-4 flex-row items-center`}>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/coin.png')}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.coins} Coins
                            </Text>
                          </View>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/trophy.png')}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.trophy}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WeeklyQuestions;
