import {Alert, FlatList, View} from 'react-native';
import {
  useGetCityQuery,
  useLocationVisitMutation,
} from '../../redux/apiSlices/attractionApiSlice';

import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import {IconSearch} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Wander} from 'react-native-animated-spinkit';
import tw from '../../lib/tailwind';

const CitiesScreen = ({navigation, route}: NavigProps<null>) => {
  const {title} = route?.params || {};

  // rkt query hooks

  const {
    data: cities,
    isLoading: citiesLoading,
    isFetching: citiesLoadingFetching,
    refetch: citiesRefetch,
  } = useGetCityQuery({});

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
      <Spinner
        animation="fade"
        spinnerKey="AttractionGroup"
        // textStyle={tw`text-white text-base`}
        // textContent="Loading"
        size={40}
        customIndicator={<Wander size={30} color={'white'} />}
        overlayColor={'rgba(123, 99, 235,0.2)'}
        visible={citiesLoadingFetching}
      />
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
        data={cities?.data?.data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
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

export default CitiesScreen;
