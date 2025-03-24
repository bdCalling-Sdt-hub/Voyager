import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import RangeSlider from '../../components/slider/RangeSlider';
import quests from '../../utils/json/quests.json';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconColoredRightArrow,
  IconSearch,
  IconShare,
  IconSuccessTik,
  IconVerifiedTik,
} from '../../assets/icons/Icons';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import NormalModal from '../../components/modals/NormalModal';
import {BottomSheetProvider} from '@gorhom/bottom-sheet/lib/typescript/contexts';
import {NavigProps} from '../../utils/interface/NaviProps';
import {useFocusEffect} from '@react-navigation/native';
import {useGetWeeklyQuestsQuery} from '../../../android/app/src/redux/slice/ApiSlice';

interface SheetData {
  title?: string;
  subtitle?: string;
  image?: string;
}
const WeeklyQuestions = ({route}: NavigProps<null>) => {
  const {screen} = route?.params || {};
  const [activeQuest, setActiveQuest] = useState(screen || 'quests');
  const [achievementsPopupVisible, setAchievementsPopupVisible] =
    useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      if (screen) {
        setActiveQuest(screen);
        console.log('Screen focused, state updated with screen:', screen);
      } else {
        console.log('Screen focused, but no screen value found.');
      }

      return () => {
        setActiveQuest(activeQuest);
      };
    }, [screen]),
  );

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
          style={[
            props.style,
            tw`absolute inset-0 bg-black bg-opacity-50 transition-all`,
          ]}
        />
      </TouchableWithoutFeedback>
    );
  };

  // rtk query hooks
  const {data} = useGetWeeklyQuestsQuery({});
  const weeklyQuests = data?.data?.weekly_quests || [];

  const incompleteQuests = weeklyQuests.filter(
    quest => quest.complete_status === 'incomplete',
  );
  const completeQuests = weeklyQuests.filter(
    quest => quest.complete_status === 'complete',
  );
  console.log('weekly quests data: ', completeQuests);

  return (
    <>
      <ScrollView
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
                4 days left
              </Text>
            </View>
            <View
              style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-pink90 dark:bg-darkBg mt-4`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium mb-2`}>
                Weekly Quests Progress
              </Text>
              <Text style={tw`text-xs font-WorkMedium`}>
                Completed {data?.data?.completedCount || 0}/
                {data?.data?.total_quest || 0}
              </Text>
              <View pointerEvents="none">
                <RangeSlider
                  color="#ff5c8d"
                  containerStyle={tw`mt-4`}
                  value={33}
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
                  {incompleteQuests?.map((item: any) => (
                    <View
                      style={tw`flex-row items-center gap-3 border border-gray90 dark:bg-darkBg dark:border-darkBg rounded-2xl p-4`}
                      key={item?.id}>
                      <View style={tw``}>
                        <Image
                          source={require('../../assets/images/quest-1.png')}
                        />
                      </View>
                      <View style={tw`flex-shrink gap-y-3`}>
                        <Text
                          style={tw`text-black dark:text-white font-WorkRegular text-base `}>
                          {item?.name}
                        </Text>

                        <View style={tw`gap-4 flex-row items-center`}>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/coin.png')}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_coins} Coins
                            </Text>
                          </View>
                          <View style={tw`flex-row items-center gap-2`}>
                            <Image
                              source={require('../../assets/images/trophy.png')}
                            />
                            <Text
                              style={tw`text-gray100 text-[10px] font-WorkRegular`}>
                              {item?.bonus_xp} XP
                            </Text>
                          </View>
                        </View>
                      </View>
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
                  {completeQuests?.map((item: any) => (
                    <View
                      style={tw`flex-row items-center justify-between gap-3 border dark:bg-darkBg border-gray90 dark:border-darkBg rounded-2xl p-4`}
                      key={item?.id}>
                      <View style={tw``}>
                        <Image
                          source={require('../../assets/images/quest-1.png')}
                        />
                      </View>
                      <View style={tw`flex-shrink gap-y-3`}>
                        <Text
                          style={tw`text-black dark:text-white font-WorkRegular text-base `}>
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
                    12{' '}
                  </Text>
                  <Text style={tw`text-violet100 text-xs font-WorkMedium`}>
                    / 60
                  </Text>
                </View>
              </View>
              <SvgXml xml={IconColoredRightArrow} />
            </View>

            <View style={tw`flex-row items-center mt-4`}>
              <TouchableOpacity
                style={tw`items-center justify-center flex-1`}
                onPress={() =>
                  handleExpand({
                    title: 'Travel Expert',
                    subtitle: 'Travel Expert Hey there, \nhow are you',
                    image: require('../../assets/images/travel-expert.png'),
                  })
                }>
                <Image
                  source={require('../../assets/images/travel-expert.png')}
                />
                <Text
                  style={tw`text-black dark:text-white text-[10px] font-WorkRegular`}>
                  Travel Expert
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`items-center justify-center flex-1`}
                onPress={() =>
                  handleExpand({
                    title: 'Top of the World',
                    subtitle: 'You visited 10 countries to earn \nthis badge',
                    image: require('../../assets/images/top-the-world.png'),
                  })
                }>
                <Image
                  source={require('../../assets/images/top-the-world.png')}
                />
                <Text
                  style={tw`text-black dark:text-white text-[10px] font-WorkRegular`}>
                  Top of the World
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`items-center justify-center flex-1`}
                onPress={() =>
                  handleExpand({
                    title: 'Cultural Explorer',
                    subtitle: 'Cultural Explorer Hey there, \nhow are you',
                    image: require('../../assets/images/cultural-explorer.png'),
                  })
                }>
                <Image
                  source={require('../../assets/images/cultural-explorer.png')}
                />
                <Text
                  style={tw`text-black dark:text-white text-[10px] font-WorkRegular`}>
                  Cultural Explorer
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={tw`flex-row items-center my-4`}>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                  Ongoing
                </Text>
              </View>
              <View style={tw`gap-y-4`}>
                <View
                  style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-white dark:bg-darkBg`}>
                  <View style={tw`flex-row items-center gap-3`}>
                    <Image
                      source={require('../../assets/images/city-hopper.png')}
                    />
                    <View>
                      <Text
                        style={tw`text-black dark:text-white text-base font-WorkRegular mb-1`}>
                        City Hopper
                      </Text>
                      <Text
                        style={tw`text-[10px] font-WorkMedium text-gray100`}>
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
                  {/* tresure progressbar */}
                  <View style={tw`flex-row items-center justify-between mt-3`}>
                    <View style={tw`bg-violet90 h-3.5 rounded-full w-10/12`}>
                      <View
                        style={tw`bg-violet100 w-[35%] h-full rounded-full items-end justify-center`}>
                        <Image
                          source={require('../../assets/images/tressure.png')}
                          style={tw`h-8 w-8 absolute right-[-1]`}
                        />
                      </View>
                    </View>
                    <View style={tw`w-2/12`}>
                      <Text
                        style={tw`ml-3 text-violet100 text-base font-WorkMedium text-base`}>{`35%`}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-white dark:bg-darkBg`}>
                  <View style={tw`flex-row items-center gap-3`}>
                    <Image
                      source={require('../../assets/images/beach-explorer.png')}
                    />
                    <View>
                      <Text
                        style={tw`text-black text-base font-WorkRegular mb-1`}>
                        Beach Explorer
                      </Text>
                      <Text
                        style={tw`text-[10px] font-WorkMedium text-gray100`}>
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
                  {/* tresure progressbar */}
                  <View style={tw`flex-row items-center justify-between mt-3`}>
                    <View style={tw`bg-violet90 h-3.5 rounded-full w-10/12`}>
                      <View
                        style={tw`bg-violet100 w-[75%] h-full rounded-full items-end justify-center`}>
                        <Image
                          source={require('../../assets/images/tressure.png')}
                          style={tw`h-8 w-8 absolute right-[-1]`}
                        />
                      </View>
                    </View>
                    <View style={tw`w-2/12`}>
                      <Text
                        style={tw`ml-3 text-violet100 text-base font-WorkMedium text-base`}>{`75%`}</Text>
                    </View>
                  </View>
                </View>

                <View style={tw`pb-2`}>
                  <View style={tw`flex-row items-center my-4`}>
                    <Text
                      style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                      Locked
                    </Text>
                  </View>
                  <View style={tw`gap-y-4`}>
                    {quests?.quests?.map((item: any) => (
                      <View
                        style={tw`flex-row items-center gap-3 border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl p-4`}
                        key={item?.id}>
                        <View style={tw``}>
                          <Image
                            source={require('../../assets/images/locked.png')}
                          />
                        </View>
                        <View style={tw`flex-shrink gap-y-3`}>
                          <Text
                            style={tw`text-black dark:text-white font-WorkRegular text-base `}>
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
          <View style={tw`px-4 flex-1 py-2 bg-white dark:bg-darkBg`}>
            <View style={tw`items-center`}>
              <Image source={sheetData?.image} style={tw`h-22 w-22`} />
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
