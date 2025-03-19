import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconAdd,
  IconFilledHeart,
  IconLeftArrow,
  IconNotification,
  IconWhiteAdd,
} from '../../assets/icons/Icons';
import {
  useCancelFriendRequestMutation,
  useGetOthersProfileQuery,
  useGetUserFriendAttractionsQuery,
  useSendFriendRequestMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';

const OthersProfile = ({navigation, route}: any) => {
  const {id, item} = route?.params || {};
  const [activePlace, setActivePlace] = useState('attractions');
  const [isReqSend, setIsReqSend] = useState(
    item?.status === 'pending' || item?.status === 'not_friend',
  );

  // rtk query hooks
  const {data} = useGetOthersProfileQuery({id});
  const [sendFriendRequest, {isLoading}] = useSendFriendRequestMutation();
  const [cancelFriendRequest, {isLoading: isLoadingCancel}] =
    useCancelFriendRequestMutation();
  const {data: userAttractions} = useGetUserFriendAttractionsQuery({id});
  const {
    attractions,
    badges,
    cities,
    coins,
    countries,
    full_name,
    level,
    mutual_friends_count,
    points,
    total_friends,
  } = data?.data || {};

  const attractionsData = userAttractions?.data?.attractions;

  const activeColor = () => {
    switch (activePlace) {
      case 'attractions':
        return '#FC5D88BF';
      case 'cities':
        return '#FFA94DBF';
      case 'countries':
        return '#8C78EABF';
      default:
        return '#FC5D88BF';
    }
  };

  console.log('add friend info: ', item);
  console.log('status check: ', isReqSend);

  const handleSendFriendRequest = async () => {
    try {
      const response = await sendFriendRequest({id});
      console.log('response of send friend request: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Sending friend request failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        setIsReqSend(true);
      }
    } catch (err: any) {
      Alert.alert(
        'Sending friend request Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      const response = await cancelFriendRequest({id});
      console.log('response of cancel friend request: ', response);
      if (response?.error?.success === false || response?.error?.message) {
        Alert.alert(
          'Canceling friend request failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        setIsReqSend(false);
      }
    } catch (err: any) {
      Alert.alert(
        'Canceling friend request Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  return (
    <ScrollView style={tw`px-[4%] pt-2 bg-white h-full dark:bg-primaryDark`}>
      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-start justify-between py-2`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
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
        <Text
          style={tw`text-black dark:text-white text-2xl font-WorkMedium text-center`}>
          {full_name || 'N/A'}
        </Text>
        <View style={tw`items-center`}>
          <Image
            source={{uri: 'https://flagsapi.com/BD/flat/64.png'}}
            style={tw`h-5 w-7 mt-1`}
          />
        </View>
        <View style={tw`flex-row items-center mt-6`}>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Joined
            </Text>
            <Text
              style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
              2024
            </Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Friends
            </Text>
            <Text
              style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
              {total_friends || 'N/A'}
            </Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkMedium`}>
              Mutual
            </Text>
            <Text
              style={tw`text-black dark:text-white text-lg font-WorkSemiBold`}>
              {mutual_friends_count || 'N/A'}
            </Text>
          </View>
        </View>
        <View style={tw`items-center mt-6 gap-y-4`}>
          {item?.status !== 'accepted' && (
            <TouchableOpacity
              onPress={
                isReqSend ? handleCancelFriendRequest : handleSendFriendRequest
              }
              disabled={isLoading}
              style={tw`flex-row w-full justify-center items-center gap-2 border border-violet100 rounded-full py-2 ${
                isReqSend ? '' : 'bg-violet100'
              }`}>
              {isReqSend && <SvgXml xml={IconAdd} />}
              <Text
                style={tw`text-base font-WorkMedium font-500 ${
                  isReqSend ? 'text-violet100' : 'text-white'
                }`}>
                {isLoading
                  ? 'Sending...'
                  : item?.status === 'not_friend'
                  ? 'Add Friend'
                  : isReqSend
                  ? 'Cancel Request'
                  : 'Add Friend'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={tw`gap-y-4 mt-6`}>
          <View style={tw`flex-row items-center gap-4`}>
            <View
              style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/level.png')} />
              <View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                  {level || 'N/A'}
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                  Level
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/badges.png')} />
              <View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                  {badges?.toString() || 'N/A'}
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
              <Image source={require('../../assets/images/coin.png')} />
              <View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                  {coins?.toString() || 'N/A'}
                </Text>
                <Text style={tw`text-gray100 text-sm font-WorkMedium font-500`}>
                  Coins
                </Text>
              </View>
            </View>
            <View
              style={tw`border border-gray90 dark:border-darkBg dark:bg-darkBg rounded-2xl flex-row items-center gap-4 p-4 flex-1`}>
              <Image source={require('../../assets/images/trophy.png')} />
              <View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkBold font-700`}>
                  {points?.toString() || 'N/A'}
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
            <Text
              style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
              Travel Stats
            </Text>
            <Text style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
              Attractions, cities, and countries they've visited!
            </Text>
          </View>

          <View style={tw`gap-y-2`}>
            <View style={tw`flex-row gap-2 mt-3`}>
              <View
                style={tw`bg-[#FFEFF3] dark:bg-darkBg p-4 rounded-2xl flex-1`}>
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkRegular font-400`}>
                  Attractions
                </Text>
                <Text
                  style={tw`text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
                  {attractions?.toString() || 'N/A'}
                </Text>
              </View>
              <View
                style={tw`bg-[#FFF6ED] dark:bg-darkBg p-4 rounded-2xl flex-1`}>
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkRegular font-400`}>
                  Cities
                </Text>
                <Text
                  style={tw`text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
                  {cities?.toString() || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row`}>
              <View
                style={tw`bg-[#F4F2FD] dark:bg-darkBg p-4 rounded-2xl flex-1`}>
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkRegular font-400`}>
                  Countries
                </Text>
                <Text
                  style={tw`text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
                  {countries?.toString() || 'N/A'}
                </Text>
              </View>
            </View>

            <View style={tw`mt-2`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
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
          <View
            style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mt-4`}>
            <TouchableOpacity
              style={tw`${
                activePlace === 'attractions' ? 'bg-violet100' : ''
              } py-2 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('attractions')}>
              <Text
                style={tw`${
                  activePlace === 'attractions' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Attractions
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'attractions' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'attractions'
                      ? 'text-violet100'
                      : 'text-white'
                  }`}>
                  {attractionsData?.count.toString() || 'N/A'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${
                activePlace === 'cities' ? 'bg-violet100' : ''
              } py-4 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('cities')}>
              <Text
                style={tw`${
                  activePlace === 'cities' ? 'text-white' : 'text-gray100'
                } text-xs font-WorkMedium`}>
                Cities
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'cities' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'cities' ? 'text-violet100' : 'text-white'
                  }`}>
                  24
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${
                activePlace === 'countries' ? 'bg-violet100' : ''
              } py-4 rounded-full flex-1 justify-center items-center flex-row gap-1`}
              onPress={() => setActivePlace('countries')}>
              <Text
                style={tw`${
                  activePlace === 'countries' ? 'text-white' : 'text-gray100'
                }  text-xs font-WorkMedium`}>
                Countries
              </Text>
              <View
                style={tw`h-5 w-5 ${
                  activePlace === 'countries' ? 'bg-white' : 'bg-gray100'
                } rounded-full text-center items-center justify-center`}>
                <Text
                  style={tw`text-xs ${
                    activePlace === 'countries'
                      ? 'text-violet100'
                      : 'text-white'
                  }`}>
                  07
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={tw`gap-y-4 mt-6`}
            showsVerticalScrollIndicator={false}>
            {attractionsData?.data?.map((item: any, index: number) => (
              <TouchableOpacity
                style={tw`flex-row items-center p-1 gap-4 rounded-2xl border-r border-b border-b-[${activeColor()}] border-r-[${activeColor()}]`}
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
                          style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
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
