import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';

const PowersUps = () => {
  const powerUpItems = Array.from({length: 6});
  return (
    <View>
      {powerUpItems.map((_, index) => (
        <View style={tw`mt-6`} key={index}>
          <View style={tw`border border-gray90 rounded-2xl p-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Image
                source={require('../../assets/images/powerUps.png')}
                style={tw`w-18 h-18`}
              />
              <View>
                <Text
                  style={tw`text-black text-base font-WorkSemiBold font-600`}>
                  Boost XP & coins
                </Text>
                <Text
                  style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
                  Apply a multiplier (x2) to the rewards of your next completed
                  challenge.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gray90 rounded-full py-1.5 px-2 justify-center mt-4`}>
              <Text style={tw`text-black text-sm font-WorkBold font-700`}>
                Equip
              </Text>
              <Image source={require('../../assets/images/coin.png')} />
              <Text style={tw`text-gold text-lg font-WorkSemiBold font-600`}>
                400
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PowersUps;
