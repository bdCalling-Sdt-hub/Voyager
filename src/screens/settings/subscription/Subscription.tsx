import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconClose,
  IconFooterDot,
  IconVerifiedTik,
} from '../../../assets/icons/Icons';
// PaymentScreen.ts
import {useStripe} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {
  useCreatePaymentIntentMutation,
  useGetSubscriptionQuery,
  usePaymentSuccessMutation,
} from '../../../redux/apiSlices/subsCription';

import {SvgXml} from 'react-native-svg';
import tw from '../../../lib/tailwind';

const Subscription = ({navigation}: any) => {
  const {
    initPaymentSheet,
    presentPaymentSheet,
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = useStripe();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {data, isLoading} = useGetSubscriptionQuery({});
  const subscriptionData = data?.data?.data || [];

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [paymentSuccess] = usePaymentSuccessMutation();

  const handlePayment = async (cost: number) => {
    try {
      const response = await createPaymentIntent({
        amount: cost * 100,
        payment_method_types: ['card'], // Just 'card' is sufficient
        currency: 'usd',
      }).unwrap();

      const clientSecret = response?.data?.client_secret;

      if (!clientSecret) {
        Alert.alert('Error', 'Payment initialization failed');
        return;
      }

      // Initialize payment sheet with Google Pay config
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        allowsDelayedPaymentMethods: false,
        merchantDisplayName: 'Your Business Name',
        returnURL: 'yourapp://stripe-redirect', // Important for Apple Pay

        // Google Pay configuration
        googlePay: {
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          testEnv: true, // Set to false in production
        },

        // Apple Pay configuration
        applePay: {
          merchantCountryCode: 'US',
        },

        appearance: {
          colors: {
            primary: '#635BFF',
          },
        },
      });

      if (error) {
        console.warn('Error initializing payment sheet:', error);
        Alert.alert('Error', error.message);
        return;
      }

      // Present the payment sheet - Google Pay will appear as an option if available
      const {error: sheetError} = await presentPaymentSheet();

      if (sheetError) {
        console.warn('Error presenting payment sheet:', sheetError);
        Alert.alert('Error', sheetError.message);
      } else {
        // Payment success
        await paymentSuccess({
          paymentId: response.data.id,
          amount: cost,
          planId: selectedPlan.id,
        }).unwrap();

        Alert.alert('Success', 'Payment successful!');
        navigation.navigate('PaymentSuccess');
      }
    } catch (error) {
      console.warn('Payment error:', error);
      Alert.alert('Error', 'Payment failed');
    }
  };

  // const pay = async (cost: number) => {
  //   const response = await createPaymentIntent({
  //     amount: cost * 100,
  //     payment_method_types: ['card'], // Include all payment methods
  //     currency: 'usd', // Make sure to specify currency
  //   }).unwrap();

  //   const clientSecret = response?.data?.client_secret;

  //   if (!clientSecret) {
  //     console.error('No client secret received');
  //     return;
  //   }

  //   const {error} = await confirmPlatformPayPayment(clientSecret, {
  //     googlePay: {
  //       testEnv: true,
  //       merchantName: 'My merchant name',
  //       merchantCountryCode: 'US',
  //       currencyCode: 'USD',
  //       billingAddressConfig: {
  //         format: PlatformPay.BillingAddressFormat.Full,
  //         isPhoneNumberRequired: true,
  //         isRequired: true,
  //       },
  //     },
  //   });

  //   if (error) {
  //     Alert.alert(error.code, error.message);
  //     // Update UI to prompt user to retry payment (and possibly another payment method)
  //     return;
  //   }
  //   Alert.alert('Success', 'The payment was confirmed successfully.');
  // };

  React.useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({googlePay: {testEnv: true}}))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);

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
  // console.log('selectedPlan: ', selectedPlan);
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
        onPress={() =>
          // navigation?.navigate('PaymentMethod', {plan: selectedPlan})
          handlePayment(selectedPlan?.price)
        }>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Continue - ${selectedPlan?.price} Total
        </Text>
      </TouchableOpacity>
      {/* <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={() => pay(selectedPlan?.price)}
        style={{
          width: '100%',
          height: 50,
        }}
      /> */}

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
