import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconVerifiedTik} from '../../../../assets/icons/Icons';

const MySubscription = ({navigation}: any) => {
  return (
    <View>
      <View style={tw`bg-gray80 dark:bg-darkBg p-4 rounded-2xl`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Image
            source={require('../../../../assets/images/diamond.png')}
            style={tw`h-12 w-12`}
          />
          <View>
            <Text style={tw`text-black dark:text-white text-2xl font-WorkSemiBold font-600`}>
              Premium
            </Text>
            <Text style={tw`text-gray100 dark:text-white text-xs font-WorkRegular font-400`}>
              Current Subscription
            </Text>
          </View>
          <Text style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
            $29.99/year
          </Text>
        </View>
        <View style={tw`mt-6 gap-y-4`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconVerifiedTik} />
            <Text style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
              Unlimited bucketlist items
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconVerifiedTik} />
            <Text style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
              Premium customization features
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconVerifiedTik} />
            <Text style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
              Ad-free experience
            </Text>
          </View>
        </View>
        <Text style={tw`text-gray100 dark:text-white text-sm font-WorkRegular font-400 mt-4`}>
          Next Billing Date: 24 Aug, 2025
        </Text>
      </View>
      <View style={tw`mt-6`}>
        <TouchableOpacity
          style={tw`bg-transparent border border-violet100 rounded-full p-3 mt-2`}
          onPress={() => {
            console.log('Subscription has been cancel');
          }}>
          <Text
            style={tw`text-center text-violet100 text-base font-WorkMedium font-500`}>
            Change Plan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-violet100 border border-violet100 rounded-full p-3 mt-2`}
          onPress={() => {
            console.log('Subscription has been cancel');
          }}>
          <Text
            style={tw`text-center text-white text-base font-WorkMedium font-500`}>
            Cancel Subscription
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MySubscription;
