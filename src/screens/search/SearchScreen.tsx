import React, {useState} from 'react';
import {FlatList, View} from 'react-native';

import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {useGetGlobalSearchQuery} from '../../redux/apiSlices/filterPropertySlice';
import {NavigProps} from '../../utils/interface/NaviProps';
import {HIGHT} from '../utils/utils';

const SearchScreen = ({navigation, route}: NavigProps<{search: string}>) => {
  // rtk query hooks
  const [filterData, setFilterData] = React.useState({
    selectedCategory: [],
    selectedSubCategory: [],
    selectedTime: [],
    selectedActivity: [],
  });
  const [search, setSearch] = useState<string>('');
  const {data: SearchResults, isFetching: searchFetching} =
    useGetGlobalSearchQuery({
      search: search,
      per_page: 100,
      page: 1,
      subcategories: filterData?.selectedSubCategory,
      category: filterData?.selectedCategory,
      best_visit_times: filterData?.selectedTime,
      activity_levels: filterData?.selectedActivity,
    });

  React.useEffect(() => {
    if (route?.params?.search) setSearch(route?.params?.search);
  }, [route?.params?.search]);

  return (
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        setFilterData={setFilterData}
        title="Search"
        searchValue={search}
        setSearchText={setSearch}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        IconRouteName="Dashboard"
        isSearchVisible={true}
        searchBarShow={true}
        // hideFilterIcon={true}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyCard
            isLoading={searchFetching}
            title="No have any place's"
            hight={HIGHT * 0.6}
          />
        }
        contentContainerStyle={tw`gap-2 mt-4 pb-8`}
        data={SearchResults?.data?.data}
        keyExtractor={(item, index) =>
          item?.id + index + 'search' + item?.type + item?.name
        }
        renderItem={({index, item}) => {
          return <AttractionCard item={item} />;
        }}
      />
    </View>
  );
};

export default SearchScreen;
