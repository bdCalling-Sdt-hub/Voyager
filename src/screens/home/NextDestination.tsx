import {Alert, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import {
  useGetAttractionsQuery,
  useGetCityQuery,
  useGetCountryQuery,
  useLocationVisitMutation,
} from '../../redux/apiSlices/attractionApiSlice';

import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import {IconSearch} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import tw from '../../lib/tailwind';

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
  const [locationVisit] = useLocationVisitMutation();

  // handlers
  const handleVisitLocation = async (item: any) => {
    const data = {type: item?.type, visited: '1'};
    try {
      const response = await locationVisit({id: item?.id, data});
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
      Alert.alert(
        'Visit Location Failed',
        err?.message || 'An error occurred.',
      );
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
        contentContainerStyle={tw`pb-10 pt-2 gap-2`}
        renderItem={({item}) => (
          <AttractionCard
            item={item}
            handleVisitLocation={handleVisitLocation}
          />
        )}
      />
    </View>
  );
};

export default NextDestination;
