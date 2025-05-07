import {View} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import PowersUpsCard from './components/PowersUpsCard';

const PowersUps = ({powerUpItems}: any) => {
  return (
    <View style={tw`gap-3 pb-4 pt-3`}>
      {powerUpItems?.map((item: any, index: number) => (
        <PowersUpsCard key={index} item={item} />
      ))}
    </View>
  );
};

export default PowersUps;
