import {FlatList, View} from 'react-native';
import {useGetPersonalizedQuery} from '../../redux/apiSlices/attractionApiSlice';

import React from 'react';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {NavigProps} from '../../utils/interface/NaviProps';
import {HIGHT} from '../utils/utils';

const SearchScreen = ({navigation, route}: NavigProps<null>) => {
  // rtk query hooks
  const {data: personalizedPicks} = useGetPersonalizedQuery({});

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
        ListEmptyComponent={
          <EmptyCard title="No have any place's" hight={HIGHT * 0.7} />
        }
        contentContainerStyle={tw`gap-2 mt-4 pb-8`}
        data={personalizedPicks?.data?.data}
        renderItem={({index, item}) => {
          return <AttractionCard item={item} />;
        }}
      />
    </View>
  );
};

export default SearchScreen;
