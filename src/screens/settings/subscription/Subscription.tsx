import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconFooterDot,
  IconVerifiedTik,
} from '../../../assets/icons/Icons';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';

const Subscription = ({navigation}: any) => {
  const [subscription, setSubscription] = useState(0);
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView style={tw`mt-3`}>
        {/* Header */}
        <View style={tw`items-start`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
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
            style={tw`text-black dark:text-white text-2xl font-WorkBold font-700 leading-9 mt-4 text-center`}>
            Unlock Premium {'\n'}Travel Experience
          </Text>
          {/* package details list */}
          <View style={tw`mt-8 gap-y-4`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
                Unlimited bucketlist items
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
                Premium customization features
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml xml={IconVerifiedTik} />
              <Text
                style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
                Ad-free experience
              </Text>
            </View>
          </View>

          <View style={tw`mt-6 gap-y-4`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between w-full px-4 ${
                subscription === 0
                  ? 'bg-radioBg dark:bg-violet100 border-violet100'
                  : 'bg-transparent border-gray90 dark:border-violet100'
              } border  rounded-2xl h-16`}
              onPress={() => setSubscription(0)}>
              <View style={tw`flex-row items-center gap-3`}>
                <View
                  style={tw`border ${
                    subscription === 0
                      ? 'border-violet100'
                      : 'border-gray90 dark:border-violet100'
                  } rounded-full`}>
                  <View
                    style={tw`border-[6px] ${
                      subscription === 0
                        ? 'border-violet100 dark:border-white'
                        : 'border-transparent'
                    } h-6 w-6 rounded-full`}
                  />
                </View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600`}>
                  Monthly
                </Text>
              </View>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                $29.99/year
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between w-full px-4 ${
                subscription === 1
                  ? 'bg-radioBg border-violet100 dark:bg-violet100'
                  : 'bg-transparent border-gray90 dark:border-violet100'
              } border  rounded-2xl h-16`}
              onPress={() => setSubscription(1)}>
              <View style={tw`flex-row items-center gap-3`}>
                <View
                  style={tw`border ${
                    subscription === 1 ? 'border-violet100' : 'border-gray90 dark:border-violet100'
                  } rounded-full`}>
                  <View
                    style={tw`border-[6px] ${
                      subscription === 1
                        ? 'border-violet100 dark:border-white'
                        : 'border-transparent'
                    } h-6 w-6 rounded-full`}
                  />
                </View>
                <Text
                  style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600`}>
                  Annually
                </Text>
              </View>
              <Text style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                $29.99/year
              </Text>
              <View
                style={tw`bg-violet100 dark:bg-darkBg border border-transparent dark:border-violet100 rounded px-2 py-1 absolute top-[-3] right-7`}>
                <Text style={tw`text-white text-xs font-WorkMedium font-500`}>
                  🔥 Save 15%
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2`}
        onPress={() => {
          navigation?.navigate('PaymentMethod');
        }}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Continue - $29.99 Total
        </Text>
      </TouchableOpacity>
      <View style={tw`flex-row items-center justify-center mt-2`}>
        <Text
          style={tw`text-gray70 text-xs font-WorkMedium font-500 text-center`}>
          No hidden fees{' '}
        </Text>
        <SvgXml xml={IconFooterDot} />
        <Text
          style={tw`text-gray70 text-xs font-WorkMedium font-500 text-center`}>
          {' '}
          Cancel anytime
        </Text>
      </View>
    </View>
  );
};

export default Subscription;
