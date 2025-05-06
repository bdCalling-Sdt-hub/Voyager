import React from 'react';
import {ScrollView} from 'react-native';
import AttractionCard from '../../../components/cards/AttractionCard';
import tw from '../../../lib/tailwind';

const Visited = ({navigation, data}: any) => {
  return (
    <ScrollView
      contentContainerStyle={tw`gap-2 mt-2`}
      showsVerticalScrollIndicator={false}>
      {data?.map((item: any, index: number) => (
        <AttractionCard item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default Visited;
