import {Alert, FlatList, View} from 'react-native';
import {
  useGetPersonalizedQuery,
  useLocationVisitMutation,
} from '../../redux/apiSlices/attractionApiSlice';

import AttractionCard from '../../components/cards/AttractionCard';
import Header from '../../components/header/Header';
import {IconSearch} from '../../assets/icons/Icons';
import {NavigProps} from '../../utils/interface/NaviProps';
import React from 'react';
import tw from '../../lib/tailwind';

const SearchScreen = ({navigation, route}: NavigProps<null>) => {
  // rtk query hooks
  const {data: personalizedPicks} = useGetPersonalizedQuery({});

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
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        title="Search"
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        IconRouteName="Dashboard"
        isSearchVisible={true}
        searchBarShow={true}
        // hideFilterIcon={true}
      />

      <FlatList
        contentContainerStyle={tw`gap-2 mt-4 pb-8`}
        data={personalizedPicks?.data?.data}
        renderItem={({index, item}) => {
          return (
            <AttractionCard
              item={item}
              handleVisitLocation={handleVisitLocation}
            />
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;
