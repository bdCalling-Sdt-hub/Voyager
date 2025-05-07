import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';
import SouvenirsCard from './components/SouvenirsCard';

const DigitalSouvenirs = ({digitalSouvenirs}: any) => {
  // rtk query hooks

  return (
    <View style={tw`flex-row flex-wrap my-4  justify-between gap-3`}>
      {digitalSouvenirs?.map((digital: any, index: number) => (
        <SouvenirsCard key={index} digital={digital} />
      ))}
    </View>
  );
};

export default DigitalSouvenirs;
