import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconFooterDot,
  IconVerifiedTik,
} from '../../../assets/icons/Icons';
import {useGetSubscriptionQuery} from '../../../redux/slice/SubsCription';

const Subscription = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {data, isLoading} = useGetSubscriptionQuery({});
  const subscriptionData = data?.data?.data || [];


  
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  if (isLoading) {
    return (
      <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
        <ScrollView style={tw`mt-3`}>
          <View style={tw`items-start`}>
            <TouchableOpacity
              style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
              onPress={() => navigation?.goBack()}>
              <SvgXml xml={IconClose} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  const selectedPlan = subscriptionData[selectedIndex];
  console.log('selectedPlan: ', selectedPlan);
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView style={tw`mt-3`}>
        {/* Header */}
        <View style={tw`items-start`}>
          <TouchableOpacity
            style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}
            onPress={() => navigation?.goBack()}>
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

          {/* Features (first plan features as example) */}
          <View style={tw`mt-8 gap-y-4`}>
            {selectedPlan?.features?.map((feature, index) => (
              <View key={index} style={tw`flex-row items-center gap-3`}>
                <SvgXml xml={IconVerifiedTik} />
                <Text
                  style={tw`text-gray70 dark:text-white text-base font-WorkMedium font-500`}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Subscription options */}
          <View style={tw`mt-6 gap-y-4`}>
            {subscriptionData.map((plan, index) => (
              <TouchableOpacity
                key={plan.id}
                style={tw`flex-row items-center justify-between w-full px-4 ${
                  selectedIndex === index
                    ? 'bg-radioBg dark:bg-violet100 border-violet100'
                    : 'bg-transparent border-gray90 dark:border-violet100'
                } border rounded-2xl h-16`}
                onPress={() => handleSelect(index)}>
                <View style={tw`flex-row items-center gap-3`}>
                  <View
                    style={tw`border ${
                      selectedIndex === index
                        ? 'border-violet100'
                        : 'border-gray90 dark:border-violet100'
                    } rounded-full`}>
                    <View
                      style={tw`border-[6px] ${
                        selectedIndex === index
                          ? 'border-violet100 dark:border-white'
                          : 'border-transparent'
                      } h-6 w-6 rounded-full`}
                    />
                  </View>
                  <Text
                    style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600`}>
                    {plan.duration === 'monthly' ? 'Monthly' : 'Annually'}
                  </Text>
                </View>
                <Text
                  style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                  ${plan.price}/{plan.duration === 'monthly' ? 'mo' : 'year'}
                </Text>

                {/* Save badge for yearly plan */}
                {plan.duration === 'yearly' && (
                  <View
                    style={tw`bg-violet100 dark:bg-darkBg border border-transparent dark:border-violet100 rounded px-2 py-1 absolute top-[-3] right-7`}>
                    <Text
                      style={tw`text-white text-xs font-WorkMedium font-500`}>
                      🔥 Save {plan.discount}%
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2`}
        onPress={() => navigation?.navigate('PaymentMethod', {plan: selectedPlan})}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Continue - ${selectedPlan?.price} Total
        </Text>
      </TouchableOpacity>

      {/* Footer */}
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



