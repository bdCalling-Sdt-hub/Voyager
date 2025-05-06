import {FlatList, RefreshControl, View} from 'react-native';
import {HIGHT, PrimaryColor} from '../utils/utils';

import React from 'react';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {useGetCityQuery} from '../../redux/apiSlices/attractionApiSlice';
import {NavigProps} from '../../utils/interface/NaviProps';

const CitiesScreen = ({navigation, route}: NavigProps<null>) => {
  const {title} = route?.params || {};

  // rkt query hooks
  const [filterData, setFilterData] = React.useState({
    selectedCategory: [],
    selectedSubCategory: [],
    selectedTime: [],
    selectedActivity: [],
  });
  const [search, setSearch] = React.useState<string>('');

  const {
    data: cities,
    isLoading: citiesLoading,
    isFetching: citiesFetching,
    refetch: citiesRefetch,
  } = useGetCityQuery({
    search: search,
    per_page: 100,
    page: 1,
    subcategories: filterData?.selectedSubCategory,
    category: filterData?.selectedCategory,
    best_visit_times: filterData?.selectedTime,
    activity_levels: filterData?.selectedActivity,
  });

  // rtk query hooks

  return (
    <View style={tw`px-[4%] bg-white h-full dark:bg-primaryDark`}>
      {/* <LoadingModal visible={citiesLoadingFetching} /> */}
      <Header
        title={title || 'Next Destination'}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        isSearchVisible={true}
        searchBarShow={true}
        hideDestination={true}
        isIcon={true}
        searchValue={search}
        setFilterData={setFilterData}
        setSearchText={setSearch}
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
          <EmptyCard
            isLoading={citiesFetching}
            title="No have any place's"
            hight={HIGHT * 0.7}
          />
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
