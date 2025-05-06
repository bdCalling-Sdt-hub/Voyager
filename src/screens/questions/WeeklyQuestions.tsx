import React, {useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  IconClose,
  IconColoredRightArrow,
  IconLock,
  IconSearch,
  IconShare,
  IconSuccessTik,
} from '../../assets/icons/Icons';
import {
  useCompletedAchievementMutation,
  useCompletedQuestMutation,
  useGetEarnBadgesQuery,
  useGetQuestAchievementsQuery,
  useGetWeeklyQuestsQuery,
} from '../../redux/apiSlices/questSlice';

import BottomSheet from '@gorhom/bottom-sheet';
import {RefreshControl} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import Header from '../../components/header/Header';
import LoadingModal from '../../components/modals/LoadingModal';
import NormalModal from '../../components/modals/NormalModal';
import RangeSlider from '../../components/slider/RangeSlider';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {NavigProps} from '../../utils/interface/NaviProps';
import {PrimaryColor} from '../utils/utils';
import Badge from './components/Badge';

interface SheetData {
  title?: string;
  subtitle?: string;
  image?: string;
}
const WeeklyQuestions = ({route, navigation}: NavigProps<null>) => {
  // const {screen} = route?.params || {};
  const [activeQuest, setActiveQuest] = useState('quests');
  const [achievementsPopupVisible, setAchievementsPopupVisible] =
    useState<boolean>(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (screen) {
  //       setActiveQuest(screen);
  //       console.log('Screen focused, state updated with screen:', screen);
  //     } else {
  //       console.log('Screen focused, but no screen value found.');
  //     }

  //     return () => {
  //       setActiveQuest(activeQuest);
  //     };
  //   }, [screen]),
  // );

  const bottomSheetRef = useRef(null);

  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // configure snap points
  const snapPoints = useMemo(() => ['50%'], []);

  // function to handle expanding the bottom sheet
  const handleExpand = (data: SheetData) => {
    bottomSheetRef.current?.expand();
    setSheetData(data);
    setIsSheetOpen(true);
  };

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  const renderBackdrop = props => {
    if (!isSheetOpen) return null;
    return (
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <View
          style={[props.style, tw`absolute inset-0 bg-black bg-opacity-50 `]}
        />
      </TouchableWithoutFeedback>
    );
  };

  // rtk query hooks
  const {
    data: weeklyQuests,
    isLoading: weeklyQuestsLoading,
    isFetching: weeklyQuestsFetching,
    refetch: weeklyQuestsRefetch,
  } = useGetWeeklyQuestsQuery({});
  const {
    data: questAchievements,
    isLoading: questAchievementsLoading,
    isFetching: questAchievementsFetching,
    refetch: questAchievementsRefetch,
  } = useGetQuestAchievementsQuery({});

  const {data: earnBadges, refetch: earnBadgesRefetch} = useGetEarnBadgesQuery(
    {},
  );

  const [completedQuest] = useCompletedQuestMutation();
  const [completedAchievement] = useCompletedAchievementMutation();

  const handleCompleteQuest = async (id: number) => {
    try {
      await completedQuest(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoadingModal visible={weeklyQuestsLoading || questAchievementsLoading} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[PrimaryColor]}
            onRefresh={() => {
              weeklyQuestsRefetch();
              questAchievementsRefetch();
              earnBadgesRefetch();
            }}
          />
        }
        style={tw`px-[4%] bg-white dark:bg-primaryDark`}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Quests"
          containerStyle={tw`mt-2`}
          icon={IconSearch}
          IconRouteName="Dashboard"
          isSearchVisible={true}
        />
        {/* visited location card */}
        <View style={tw`mt-2`}>
          <View style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full`}>
            <TouchableOpacity
              style={tw`${
                activeQuest === 'quests' ? 'bg-violet100' : ''
              } py-3 rounded-full flex-1 justify-center items-center`}
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
              } py-3 rounded-full flex-1 justify-center items-center`}
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
              style={tw`bg-brown70 dark:bg-darkBg flex-row rounded-2xl items-center mt-4 py-3 pl-6 gap-4`}>
              <Image source={require('../../assets/images/time-stamp.png')} />
              <Text style={tw`text-brown100 text-base font-WorkMedium`}>
                {weeklyQuests?.data?.daysLeftForWeek} days left
              </Text>
            </View>
            <View
              style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-pink90 dark:bg-darkBg mt-4`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium mb-2`}>
                Weekly Quests Progress
              </Text>
              <Text style={tw`text-xs font-WorkMedium`}>
                Completed {weeklyQuests?.data?.completedCount || 0}/
                {weeklyQuests?.data?.total_quest || 0}
              </Text>
              <View pointerEvents="none">
                <RangeSlider
                  color="#ff5c8d"
                  containerStyle={tw`mt-4`}
                  value={Number(weeklyQuests?.data?.progressPercentage) || 0}
                />
              </View>
            </View>

            <View style={tw`mt-8`}>
              <View>
                <View style={tw`flex-row items-center`}>
                  <Text
                    style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                    Incomplete
                  </Text>
                </View>

                <View style={tw`gap-y-4 mt-6`}>
                  {weeklyQuests?.data?.incomplete?.map((item: any) => (
                    <View
                      style={[
                        tw`flex-row items-center gap-3 border ${
                          item?.status == 'locked'
                            ? 'border-gray90'
                            : 'border-orange-400'
                        }  dark:bg-darkBg dark:border-darkBg rounded-2xl p-4`,
                        {
                          opacity: item?.status == 'locked' ? 0.8 : 1,
                        },
                      ]}
                      key={item?.id}>
                      <View style={tw``}>
                        <Image
                          key={item?.id + 'quest-images'}
                          source={{
                            uri: makeImage(item?.icons),
                          }}
                          style={tw`w-16 h-16`}
                        />
                      </View>
                      <View style={tw`flex-1 gap-y-3`}>
                        <Text
                          style={tw`text-black dark:text-white font-WorkRegular text-base `}>
                          {item?.name}
                        </Text>

                        <View style={tw`gap-4 flex-row items-center`}>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/coin.png')}
                              style={tw`w-6 h-6`}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_coins} Coins
                            </Text>
                          </View>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/trophy.png')}
                              style={tw`w-6 h-6`}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_xp} XP
                            </Text>
                          </View>
                        </View>
                      </View>
                      {item?.status == 'unlocked' ? (
                        <TButton
                          title="Claim"
                          onPress={() => handleCompleteQuest(item?.id)}
                          titleStyle={tw`text-xs`}
                          containerStyle={tw`bg-orange-400 w-16 h-8 rounded-full`}
                        />
                      ) : (
                        <View style={tw`opacity-50`}>
                          <SvgXml xml={IconLock} />
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              <View style={tw`mt-6`}>
                <View style={tw`flex-row items-center`}>
                  <Text
                    style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                    Completed
                  </Text>
                </View>

                <View style={tw`gap-y-4 mt-6 pb-2`}>
                  {weeklyQuests?.data?.complete?.map((item: any) => (
                    <View
                      style={[
                        tw`flex-row items-center gap-3 border 
                          border-gray90
                          dark:bg-darkBg dark:border-darkBg rounded-2xl p-4`,
                        {
                          opacity: item?.status == 'locked' ? 0.8 : 1,
                        },
                      ]}
                      key={item?.id}>
                      <View style={tw``}>
                        <Image
                          key={item?.id + 'quest-images'}
                          source={{
                            uri: makeImage(item?.icons),
                          }}
                          style={tw`w-16 h-16`}
                        />
                      </View>
                      <View style={tw`flex-1 gap-y-3`}>
                        <Text
                          style={tw`text-black dark:text-white font-WorkRegular text-base `}>
                          {item?.name}
                        </Text>

                        <View style={tw`gap-4 flex-row items-center`}>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/coin.png')}
                              style={tw`w-6 h-6`}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_coins} Coins
                            </Text>
                          </View>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/trophy.png')}
                              style={tw`w-6 h-6`}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_xp} XP
                            </Text>
                          </View>
                        </View>
                      </View>
                      <SvgXml xml={IconSuccessTik} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={tw`mt-6`}>
            <View style={tw`flex-row items-center justify-between gap-4`}>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={tw`text-base text-black dark:text-white font-WorkMedium`}>
                  Badges Earned{' '}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-violet100 text-2xl font-WorkMedium`}>
                    {earnBadges?.data?.earned_achievements}
                  </Text>
                  <Text style={tw`text-violet100 text-xs font-WorkMedium`}>
                    / {earnBadges?.data?.total_achievements}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  (navigation as any)?.navigate('ShowAllBadges', {
                    badgeData: earnBadges?.data?.badges,
                  });
                }}>
                <SvgXml xml={IconColoredRightArrow} />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center mt-4`}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={earnBadges?.data?.badges}
                renderItem={({item}) => (
                  <Badge handleExpand={handleExpand} item={item} />
                )}
              />
            </View>

            <View>
              <View style={tw`flex-row items-center my-4`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                  Ongoing
                </Text>
              </View>
              <View style={tw`gap-y-4`}>
                {questAchievements?.data?.ongoing?.map((item: any) => (
                  <View
                    style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-white dark:bg-darkBg`}
                    key={item?.id}>
                    <View style={tw`flex-row items-center gap-3`}>
                      <Image
                        key={item?.id}
                        style={tw` h-16 aspect-square rounded-2xl`}
                        source={{uri: makeImage(item?.photos)}}
                      />
                      <View style={tw`flex-shrink`}>
                        <Text
                          style={tw`text-black dark:text-white text-base font-WorkRegular mb-1`}>
                          {item?.name}
                        </Text>
                        <Text
                          style={tw`text-[10px] font-WorkMedium text-gray100`}>
                          {item?.choose_option}
                        </Text>
                        <View style={tw`gap-4 flex-row items-center mt-3`}>
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
                              {item?.xp} XP
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/* tresure progressbar */}
                    <View
                      style={tw`flex-row items-center justify-between mt-3`}>
                      <View style={tw`bg-violet90 h-3.5 rounded-full w-10/12`}>
                        <View
                          style={tw`bg-violet100 w-[${
                            item?.progress || '8'
                          }%] h-full rounded-full items-end justify-center`}>
                          <Image
                            source={require('../../assets/images/tressure.png')}
                            style={tw`h-8 w-8 absolute right-[-1]`}
                          />
                        </View>
                      </View>
                      <View style={tw`w-2/12`}>
                        <Text
                          style={tw`ml-3 text-violet100 text-base font-WorkMedium`}>{`${item?.progress}%`}</Text>
                      </View>
                    </View>
                  </View>
                ))}

                <View style={tw`pb-6`}>
                  <View style={tw`flex-row items-center my-4`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                      Locked
                    </Text>
                  </View>
                  <View style={tw`gap-y-4`}>
                    {questAchievements?.data?.locked?.map((item: any) => {
                      // console.log(makeImage(item?.photos));
                      return (
                        <View
                          style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-white dark:bg-darkBg opacity-50`}
                          key={item?.id}>
                          <View style={tw`flex-row items-center gap-3`}>
                            <Image
                              key={item?.id}
                              style={tw` h-16 aspect-square rounded-2xl`}
                              source={{uri: makeImage(item?.photos)}}
                            />
                            <View style={tw`flex-shrink`}>
                              <Text
                                numberOfLines={2}
                                style={tw`text-black dark:text-white text-base font-WorkRegular mb-1`}>
                                {item?.name}
                              </Text>
                              <Text
                                style={tw`text-[10px] font-WorkMedium text-gray100`}>
                                {item?.choose_option}
                              </Text>
                              <View
                                style={tw`gap-4 flex-row items-center mt-3`}>
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
                                    {item?.xp} XP
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          {/* tresure progressbar */}
                          {/* <View
                            style={tw`flex-row items-center justify-between mt-3`}>
                            <View
                              style={tw`bg-violet90 h-3.5 rounded-full w-10/12`}>
                              <View
                                style={tw`bg-violet100 w-[${
                                  item?.progress || '8'
                                }%] h-full rounded-full items-end justify-center`}>
                                <Image
                                  source={require('../../assets/images/tressure.png')}
                                  style={tw`h-8 w-8 absolute right-[-1]`}
                                />
                              </View>
                            </View>
                            <View style={tw`w-2/12`}>
                              <Text
                                style={tw`ml-3 text-violet100 text-base font-WorkMedium`}>{`${
                                item?.progress || '0'
                              }%`}</Text>
                            </View>
                          </View> */}
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <BottomSheet
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        onClose={handleClose}
        snapPoints={snapPoints}
        index={-1}
        // handleIndicatorStyle={tw`bg-black`}
        handleStyle={tw`bg-white dark:bg-darkBg`}
        enablePanDownToClose>
        <>
          <View style={tw`px-4 flex-1 mt-6 py-2 bg-white dark:bg-darkBg`}>
            <View style={tw`items-center`}>
              <Image
                source={{
                  uri: sheetData?.image,
                }}
                style={tw`h-22 w-22`}
              />
            </View>
            <Text
              style={tw`text-2xl text-center font-WorkBold text-black dark:text-white font-bold mt-6`}>
              {sheetData?.title || 'Question Title'}
            </Text>
            <Text
              style={tw`text-base text-gray70 dark:text-white font-WorkMedium text-center mt-2`}>
              {sheetData?.subtitle}
            </Text>
            <View style={tw`items-center`}>
              <TouchableOpacity
                style={tw`bg-violet100 p-3 mt-6 flex-row gap-2 items-center justify-center w-5/12 rounded-full`}>
                <SvgXml xml={IconShare} />
                <Text style={tw`text-white text-sm font-WorkSemiBold`}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </BottomSheet>

      <NormalModal
        visible={achievementsPopupVisible}
        setVisible={setAchievementsPopupVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`p-4`}>
          <View style={tw`items-end`}>
            <SvgXml xml={IconClose} />
          </View>
          <View style={tw`items-center`}>
            <Image
              source={require('../../assets/images/achievements.png')}
              style={tw`w-24 h-24`}
            />
            <Text
              style={tw`text-2xl text-center font-WorkBold text-black font-bold mt-6`}>
              Reached Level 5!
            </Text>
            <Text
              style={tw`text-base text-gray70 font-WorkMedium text-center mt-2`}>
              Your adventures are paying off! Keep exploring to unlock even more
              rewards
            </Text>
            <View style={tw`items-center`}>
              <TouchableOpacity
                style={tw`bg-violet100 px-8 py-3 mt-6 flex-row gap-2 items-center justify-center rounded-full`}>
                {/* <SvgXml xml={IconShare} /> */}
                <Text style={tw`text-white text-sm font-WorkSemiBold`}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </NormalModal>
    </>
  );
};

export default WeeklyQuestions;
