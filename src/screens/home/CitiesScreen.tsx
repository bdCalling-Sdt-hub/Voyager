import {FlatList, RefreshControl, View} from 'react-native';
import {HIGHT, PrimaryColor} from '../utils/utils';

import React from 'react';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import LoadingModal from '../../components/modals/LoadingModal';
import tw from '../../lib/tailwind';
import {useGetCityQuery} from '../../redux/apiSlices/attractionApiSlice';
import {NavigProps} from '../../utils/interface/NaviProps';

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

  return (
    <View style={tw`px-[4%] bg-white h-full dark:bg-primaryDark`}>
      <LoadingModal visible={citiesLoadingFetching} />
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
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={citiesRefetch}
            colors={[PrimaryColor]}
          />
        }
        ListEmptyComponent={
          <EmptyCard title="No have any place's" hight={HIGHT * 0.7} />
        }
        data={cities?.data?.data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`pb-10 pt-2 gap-2`}
        renderItem={({item}) => <AttractionCard item={item} />}
      />
    </View>
  );
};

export default CitiesScreen;
