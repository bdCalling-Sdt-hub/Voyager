import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconAcceptedCards,
  IconClose,
  IconWarn,
} from '../../../assets/icons/Icons';
import Header from '../../../components/header/Header';
import InputText from '../../../components/inputs/InputText';

const PaymentMethod = ({navigation}: any) => {
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title={'Payment Method'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
          leftIcon={IconClose}
        />

        {/* body */}
        <View>
          <View
            style={tw`h-12 bg-gray90 dark:bg-darkBg rounded-2xl items-center flex-row gap-2 justify-center`}>
            <SvgXml xml={IconWarn} />
            <Text
              style={tw`text-black dark:text-white text-sm font-WorkMedium font-500 py-1`}>
              You won’t be charged until you pay.
            </Text>
          </View>

          {/* Card Information */}
          <View style={tw`mt-4`}>
            <Text
              style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600 mb-4`}>
              Card Information
            </Text>
            <View style={tw`gap-y-4`}>
              <View>
                <Text
                  style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Name on card
                </Text>
                <View style={tw`h-12`}>
                  <InputText
                   fromUP={true}
                    placeholder="John Smith"
                    placeholderTextColor={'#BBBCBD'}
                    style={tw`text-black text-base font-WorkMedium font-500`}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={tw`mb-1 text-[#000000] text-sm font-WorkMedium font-500`}>
                  Card number
                </Text>
                <View style={tw`h-12`}>
                  <InputText 
                  fromUP={true}
                    placeholder="1234 1234 1234 1234"
                    placeholderTextColor={'#BBBCBD'}
                    style={tw`text-black text-base font-WorkMedium font-500`}
                    svgSecondIcon={IconAcceptedCards}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Expiration date
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="MM/YY"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Security code
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="CVC"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`mt-4`}>
            <Text
              style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600 mb-4`}>
              Billing Information
            </Text>
            <View style={tw`gap-y-4`}>
              <View>
                <Text
                  style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Street Address
                </Text>
                <View style={tw`h-12`}>
                  <InputText
                  fromUP={true}
                    placeholder="Your Address"
                    placeholderTextColor={'#BBBCBD'}
                    style={tw`text-black text-base font-WorkMedium font-500`}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    City
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="Enter City"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Region
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="Enter Region"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Postal Code
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="1234"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Country
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                    fromUP={true}
                      placeholder="Enter Country"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2`}
        onPress={() => {
          navigation?.navigate('SubscriptionPlan');
        }}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Save Card
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;
