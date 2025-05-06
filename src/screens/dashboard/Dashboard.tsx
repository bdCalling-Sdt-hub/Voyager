import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconColoredRightArrow,
  IconSearch,
  IconVerifiedLocation,
} from '../../assets/icons/Icons';
import {
  useAppDashboardQuery,
  useGetBucketListDataQuery,
  useGetWeeklyQuestProgressQuery,
} from '../../redux/apiSlices/dashboardApiSlice';

import {RefreshControl} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import LoadingModal from '../../components/modals/LoadingModal';
import CircularProgress from '../../components/progressBar/CircularProgress';
import RangeSlider from '../../components/slider/RangeSlider';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useGetBucketListProgressQuery} from '../../redux/apiSlices/bucketApiSlice';
import {PrimaryColor} from '../utils/utils';

const Dashboard = ({navigation}: any) => {
  const [activePlace, setActivePlace] = useState('attractions');

  // rtk query hooks
  const {
    data: appDashboard,
    isFetching: appDashboardFetching,
    isLoading: appDashboardLoading,
    refetch: appDashboardRefetch,
  } = useAppDashboardQuery({});
  const {
    data: weeklyQuest,
    isFetching: weeklyQuestFetching,
    isLoading: weeklyQuestLoading,
    refetch: weeklyQuestRefetch,
  } = useGetWeeklyQuestProgressQuery({});
  const {
    data: bucketListProgress,
    isFetching: bucketListProgressFetching,
    isLoading: bucketListProgressLoading,
    refetch: bucketListProgressRefetch,
  } = useGetBucketListProgressQuery({});
  const {
    data: bucketListData,
    isFetching: bucketListDataFetching,
    isLoading: bucketListDataLoading,
    refetch: bucketListDataRefetch,
  } = useGetBucketListDataQuery({});

  return (
    <>
      <LoadingModal
        visible={
          appDashboardLoading ||
          weeklyQuestLoading ||
          bucketListProgressLoading ||
          bucketListDataLoading
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={false}
            onRefresh={() => {
              appDashboardRefetch();
              weeklyQuestRefetch();
              bucketListDataRefetch();
              bucketListProgressRefetch();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        style={tw`px-[4%] bg-white dark:bg-primaryDark`}
        contentContainerStyle={tw`pb-10`}
        keyboardShouldPersistTaps="always">
        <Header
          title="Dashboard"
          containerStyle={tw`mt-2`}
          icon={IconSearch}
          IconRouteName="Dashboard"
          isSearchVisible={true}
          searchBarShow={true}
          hideFilterIcon={true}
          searchNavigate
        />
        {/* visited location card */}
        <View
          style={tw`border border-gray90 dark:border-gray-700 p-4 rounded-2xl my-4`}>
          <View style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full`}>
            <TouchableOpacity
              style={tw`flex-row gap-1 ${
                activePlace === 'attractions' ? 'bg-violet100' : ''
              } py-3 rounded-full flex-1 justify-center items-center`}
              onPress={() => setActivePlace('attractions')}>
              <Text
                style={tw`${
                  activePlace === 'attractions' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Attractions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row gap-1  ${
                activePlace === 'cities' ? 'bg-violet100' : ''
              } py-3 rounded-full flex-1 justify-center items-center`}
              onPress={() => setActivePlace('cities')}>
              <Text
                style={tw`${
                  activePlace === 'cities' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Cities
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row gap-1 ${
                activePlace === 'countries' ? 'bg-violet100' : ''
              } py-3 rounded-full flex-1 justify-center items-center`}
              onPress={() => setActivePlace('countries')}>
              <Text
                style={tw`${
                  activePlace === 'countries' ? 'text-white' : 'text-gray100'
                }  text-xs font-WorkMedium`}>
                Countries
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (activePlace === 'attractions') {
                navigation.navigate('SinglePlace', {
                  title: activePlace,
                  data: appDashboard?.data?.visitedAttraction,
                });
              }
              if (activePlace === 'cities') {
                navigation.navigate('SinglePlace', {
                  title: activePlace,
                  data: appDashboard?.data?.visitedCity,
                });
              }
              if (activePlace === 'countries') {
                navigation.navigate('SinglePlace', {
                  title: activePlace,
                  data: appDashboard?.data?.visitedCountry,
                });
              }
            }}
            style={tw`bg-violet80 dark:bg-darkBg 
            flex-row rounded-2xl items-center mt-4`}>
            <View style={tw`w-4/12`}>
              <CircularProgress
                percentage={
                  activePlace === 'attractions'
                    ? appDashboard?.data?.attractionProgress || 0
                    : activePlace === 'cities'
                    ? appDashboard?.data?.cityProgress || 0
                    : appDashboard?.data?.countyProgress || 0
                }
              />
            </View>
            <View style={tw`gap-y-2`}>
              <Text
                style={tw`capitalize text-black dark:text-white text-sm font-WorkMedium`}>
                {activePlace} Visited
              </Text>
              <Text style={tw`text-violet100 text-2xl font-WorkSemiBold`}>
                {activePlace === 'attractions'
                  ? appDashboard?.data?.totalAttractionVisited || 0
                  : activePlace === 'cities'
                  ? appDashboard?.data?.totalCityVisited || 0
                  : appDashboard?.data?.totalCountryVisited || 0}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-gray100 text-xs font-WorkRegular mt-4 mb-2`}>
              Places you visited
            </Text>

            <>
              <FlatList
                data={
                  activePlace === 'attractions'
                    ? appDashboard?.data?.visitedCity
                    : activePlace === 'cities'
                    ? appDashboard?.data?.visitedCity
                    : appDashboard?.data?.visitedCountry || []
                }
                horizontal
                contentContainerStyle={tw`flex-row items-center gap-2`}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString() + item?.id}
                renderItem={({index, item}) => {
                  // console.log(makeImage(item?.images[0]));
                  return (
                    <TouchableOpacity disabled>
                      <Image
                        style={tw`w-24 h-22 rounded-lg`}
                        key={index}
                        source={{
                          uri: makeImage(item?.images![0]),
                        }}
                      />
                      <SvgXml
                        xml={IconVerifiedLocation}
                        style={tw`absolute bottom-2 right-2`}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          </View>
        </View>

        {/* weekly progress */}
        <TouchableOpacity
          style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg p-4 rounded-2xl bg-pink80`}
          onPress={() => navigation.navigate('Quests', {screen: 'quests'})}>
          <Text
            style={tw`text-black dark:text-white text-base font-WorkMedium mb-2`}>
            Weekly Quests Progress
          </Text>
          <Text style={tw`text-xs text-black dark:text-white font-WorkMedium`}>
            Completed {weeklyQuest?.data?.completedCount || 0}/
            {weeklyQuest?.data?.total_quest || 0} quests
          </Text>
          <View style={tw`mt-4`} pointerEvents="none">
            <RangeSlider
              color="#ff5c8d"
              value={weeklyQuest?.data?.questProgress || 0}
            />
          </View>
        </TouchableOpacity>

        {/* bucket list progress */}
        {bucketListProgress?.data?.coin && (
          <TouchableOpacity
            style={tw`border border-gray90 dark:border-darkBg p-4 rounded-2xl bg-blue80 dark:bg-darkBg mt-4`}
            onPress={() => navigation.navigate('BucketList')}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkMedium mb-2`}>
              Bucket List Progress
            </Text>
            <Text
              style={tw`text-xs font-WorkMedium text-black dark:text-white`}>
              Visited {bucketListProgress?.data?.usedBuckets || 0}/
              {bucketListProgress?.data?.totalBucketSpace || 0}
            </Text>
            <View pointerEvents="none">
              <RangeSlider
                color="#32B1B4"
                containerStyle={tw`mt-4`}
                value={bucketListProgress?.data?.progress || 0}
              />
            </View>
            {bucketListProgress?.data?.message && (
              <View style={tw`mt-2`}>
                <Text style={tw`text-sm font-serif text-[#32B1B4] `}>
                  {bucketListProgress?.data?.message}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <View style={tw`mt-8 pb-2`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between`}
            onPress={() => {
              // navigation.navigate('ProgressBucketlist');
              navigation.navigate('BucketList');
            }}>
            <View style={tw`w-11/12`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium`}>
                Make Progress on Your Bucket List{' '}
              </Text>
              <Text style={tw`text-gray100 font-WorkRegular text-sm mt-1`}>
                Visit these places to check them off your list
              </Text>
            </View>
            <SvgXml xml={IconColoredRightArrow} />
          </TouchableOpacity>

          <View style={tw`gap-2 mt-4`}>
            <FlatList
              scrollEnabled={false}
              data={bucketListData?.data?.data || []}
              renderItem={({item, index}) => {
                return (
                  <AttractionCard
                    key={index + item?.id + item?.type + Math.random() * 6000}
                    item={item}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
