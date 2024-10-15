import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconClose, IconVerifiedTik} from '../../../assets/icons/Icons';

const Subscription = ({navigation}: any) => {
  return (
    <View style={tw`bg-white h-full px-[4%]`}>
      <View style={tw`mt-3`}>
        {/* Header */}
        <View style={tw`items-end`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}
            onPress={() => {
              navigation?.goBack();
            }}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View style={tw`items-center mt-4`}>
          <Image source={require('../../../assets/images/diamond.png')} />
          <Text
            style={tw`text-black text-2xl font-WorkBold font-700 leading-9 mt-4 text-center`}>
            Unlock Premium {'\n'}Travel Experience
          </Text>
          {/* package details list */}
          <View style={tw`mt-8 gap-y-4`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text style={tw`text-gray70 text-base font-WorkMedium font-500`}>
                Unlimited bucketlist items
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text style={tw`text-gray70 text-base font-WorkMedium font-500`}>
                Premium customization features
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text style={tw`text-gray70 text-base font-WorkMedium font-500`}>
                Ad-free experience
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Subscription;
