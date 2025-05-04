import {FlatList, View} from 'react-native';

import React from 'react';
import {IconSearch} from '../../assets/icons/Icons';
import AttractionCard from '../../components/cards/AttractionCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {NavigProps} from '../../utils/interface/NaviProps';
import {HIGHT} from '../utils/utils';

const SinglePlace = ({navigation, route}: NavigProps<null>) => {
  const {title, data}: any = route?.params || '';

  return (
    <View style={tw`flex-1 px-[4%] bg-white dark:bg-primaryDark `}>
      <Header
        title={title}
        containerStyle={tw`mt-2`}
        icon={IconSearch}
        IconRouteName="Dashboard"
        isSearchVisible={true}
        searchBarShow={false}
        hideDestination={true}
        isIcon={true}
      />

      <FlatList
        ListEmptyComponent={
          <EmptyCard title="No have any place's" hight={HIGHT * 0.7} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pt-4 pb-10 gap-2`}
        data={data}
        renderItem={({item, index}) => (
          <AttractionCard
            disabled
            visited
            removeHeartBtn
            item={item}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default SinglePlace;
