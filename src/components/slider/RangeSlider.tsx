import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Slider} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

const RangeSlider = ({color, containerStyle, value}: any) => {
  return (
    <View style={[tw`flex-row justify-between`, containerStyle]}>
      <Slider
        containerStyle={tw`w-13/15`}
        value={value}
        minimumValue={0}
        maximumValue={100}
        thumbTintColor={color} //circle color
        minimumTrackTintColor={color} //range color
        maximumTrackTintColor="#ffffff"
        thumbStyle={tw`w-7 h-7 border-2 border-white bg-pink100 rounded-full`}
        trackStyle={tw`h-3.5 rounded-full`}
      />
      <View style={tw`w-2/15`}>
        <Text
          style={tw`ml-3 text-[${color}] font-WorkMedium text-base`}>{`${value}%`}</Text>
      </View>
    </View>
  );
};

export default RangeSlider;
