import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {IconFilledHeart, IconSearch} from '../../assets/icons/Icons';
import {SvgXml} from 'react-native-svg';
import desticaions from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';
import {
  useGetAttractionsQuery,
  useGetCityQuery,
  useGetCountryQuery,
  useLocationVisitMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';

const NextDestination = ({navigation, route}: NavigProps<null>) => {
  const {title} = route?.params || {};
  const [destinationData, setDestinationData] = useState([]);

  const fetchMoreData = () => {
    console.log('Fetching more data...');
    setTimeout(() => {
      setDestinationData(prevData => [...prevData, ...prevData]);
    }, 1500);
  };

  const activeColor = () => {
    switch (title) {
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

  // rkt query hooks
  const {data: attractions} = useGetAttractionsQuery({});
  const {data: cities} = useGetCityQuery({});
  const {data: countries} = useGetCountryQuery({});

  const data = (() => {
    switch (title) {
      case 'attractions':
        return attractions?.data?.data;
      case 'cities':
        return cities?.data?.data;
      case 'countries':
        return countries?.data?.data;
      default:
        return attractions?.data?.data;
    }
  })();

  // rtk query hooks
  const [locationVisit, {isLoading}] = useLocationVisitMutation();

  // handlers
  const handleVisitLocation = async (item: any) => {
    const data = {type: item?.type, visited: '1'};
    try {
      const response = await locationVisit({id: item?.id, data});
      console.log(
        'reponse check of visit location from next destination: ',
        response,
      );
      if (response?.error?.success === false) {
        Alert.alert(
          'Adding to bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        navigation?.navigate('DestinationDetails', {item});
      }
    } catch (err: any) {
      Alert.alert('Login Failed', err?.message || 'An error occurred.');
    }
  };

  return (
    <View style={tw`px-[4%] bg-white h-full dark:bg-primaryDark`}>
      <Header
        title={title || 'Next Destination'}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        isSearchVisible={true}
        searchBarShow={true}
        hideDestination={true}
        isIcon={true}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <TouchableOpacity
            style={tw`flex-row items-center p-1 gap-4 rounded-2xl border-r border-b border-b-[${activeColor()}] border-r-[${activeColor()}]`}
            onPress={() => handleVisitLocation(item)}>
            <Image
              source={require('../../assets/images/explore-card-2.png')}
              style={tw`rounded-2xl w-4/12 h-24`}
            />
            <View
              style={tw`flex-1 justify-between flex-row items-center gap-2`}>
              <View style={tw`gap-y-1`}>
                <View>
                  <Text
                    style={tw`text-black dark:text-white font-WorkSemiBold text-[20px]`}>
                    {item?.name}
                  </Text>
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
                      {item?.coins} coins
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                    <Image
                      source={require('../../assets/images/trophy.png')}
                      style={tw`h-6 w-6`}
                    />
                    <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                      {item?.xp} XP
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <SvgXml xml={IconFilledHeart} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NextDestination;
