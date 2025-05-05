import {FlatList, View} from 'react-native';

import React from 'react';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {useGetGlobalSearchQuery} from '../../redux/apiSlices/filterPropertySlice';
import {NavigProps} from '../../utils/interface/NaviProps';
import {HIGHT} from '../utils/utils';

const SearchScreen = ({navigation, route}: NavigProps<null>) => {
  // rtk query hooks
  const [filterData, setFilterData] = React.useState({
    selectedCategory: [],
    selectedSubCategory: [],
    selectedTime: [],
    selectedActivity: [],
  });
  const {data: SearchResults} = useGetGlobalSearchQuery(
    {
      search: '',
      per_page: 100,
      page: 1,
      ...filterData,
    },
    {
      skip: !filterData.search,
    },
  );

  console.log(filterData);

  return (
    <View style={tw`px-[4%] bg-white dark:bg-primaryDark h-full`}>
      <Header
        setFilterData={setFilterData}
        title="Search"
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        IconRouteName="Dashboard"
        isSearchVisible={true}
        searchBarShow={true}
        // hideFilterIcon={true}
      />

      <FlatList
        ListEmptyComponent={
          <EmptyCard title="No have any place's" hight={HIGHT * 0.7} />
        }
        contentContainerStyle={tw`gap-2 mt-4 pb-8`}
        data={SearchResults?.data?.data?.data}
        renderItem={({index, item}) => {
          return <AttractionCard item={item} />;
        }}
      />
    </View>
  );
};

export default SearchScreen;
