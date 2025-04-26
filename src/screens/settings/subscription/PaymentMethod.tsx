import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from '../../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import {
  IconAcceptedCards,
  IconClose,
  IconWarn,
} from '../../../assets/icons/Icons';
import Header from '../../../components/header/Header';
import InputText from '../../../components/inputs/InputText';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { 
  useCreatePaymentIntentMutation, 
  usePaymentSuccessMutation 
} from '../../../redux/slice/SubsCription';

const PaymentMethod = ({ navigation, route }: any) => {
  const { plan } = route.params;
  const { id, price: cost, duration } = plan;

  const stripe = useStripe();
  const {confirmPayment,loading} = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState<any>(null);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [paymentSuccess] = usePaymentSuccessMutation();


  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  
  const [formData, setFormData] = useState({
    nameOnCard: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    subscriptionId: id,
    status: 'paid',
  });

  // Create or refresh payment intent
  const createNewPaymentIntent = async () => {
    try {
      const response = await createPaymentIntent({ 
        amount: cost * 100,
        payment_method:'pm_card_visa'
      });

      console.log('payment intent response: ', response?.data?.client_secret);
      
      if (response?.data?.data?.client_secret) {
        setClientSecret(response?.data?.data?.client_secret);
       setTransactionId(response?.data?.data?.id);
        return response?.data?.data?.client_secret;
      }
      throw new Error('No client secret received');
    } catch (error) {
      console.error('Payment intent error:', error);
      Alert.alert('Error', 'Failed to initialize payment');
      return null;
    }
  };

  // Initialize payment intent on mount
  useEffect(() => {
    createNewPaymentIntent();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayPress = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Validate form fields
    const requiredFields = ['nameOnCard', 'streetAddress', 'city', 'region', 'postalCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill all required fields');
      setIsProcessing(false);
      return;
    }

    // Check card details
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please complete card details');
      setIsProcessing(false);
      return;
    }

    // Ensure we have a valid client secret
    let currentClientSecret = clientSecret;
    if (!currentClientSecret) {
      currentClientSecret = await createNewPaymentIntent();
      if (!currentClientSecret) {
        setIsProcessing(false);
        return;
      }
    }

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await confirmPayment(currentClientSecret,{
        paymentMethodType : "Card",
      
        paymentMethodData: {
          billingDetails:{
             name : formData.nameOnCard,
            address : {
              city : formData.city,
              country : formData.country,
              line1 : formData.streetAddress,
              postalCode : formData.postalCode,
              state : formData.region,
              line2 : ''
            },
          
           } 
         }
      });

      console.log('payment intent SUCCESS: ',paymentIntent);

      if (error) {
        console.log('payment intent error: ', error);
        if (error.code === 'Failed' && error.message.includes('No such payment_intent')) {
          // Handle expired payment intent
          const newSecret = await createNewPaymentIntent();
          if (newSecret) {
            Alert.alert(
              'Session Expired', 
              'Please try your payment again',
              [{ text: 'OK' }]
            );
          }
        } else {
          Alert.alert('Payment Error', error.message || 'Payment failed');
        }
        return;
      }

      console.log('payment intent: ', paymentIntent);

      if (paymentIntent?.status === "Succeeded") {
        const paymentData = {
          subscription_id: id,
          transaction_id: paymentIntent.id,
          name: formData.nameOnCard,
          address: formData.streetAddress,
          city: formData.city,
          region: formData.region,
          postal_code: formData.postalCode,
          country: formData.country,
          status: 'paid'
        };

        try {
          await paymentSuccess(paymentData).unwrap();
          Alert.alert(
            'Payment Successful',
            `Transaction ID: ${paymentIntent.id}\nAmount: $${cost.toFixed(2)}`,
            [{
              text: 'OK',
              onPress: () => navigation.navigate('SubscriptionPlan', { 
                paymentSuccess: true,
                transactionId: paymentIntent.id
              })
            }]
          );
        } catch (apiError) {
          console.error('API Error:', apiError);
          Alert.alert(
            'Payment Recorded',
            'Payment succeeded but we had trouble saving your details. Please contact support.',
            [{ text: 'OK', onPress: () => navigation.navigate('SubscriptionPlan') }]
          );
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'Payment Method'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
          leftIcon={IconClose}
          onLeftIconPress={() => navigation.goBack()}
        />

        <View>
          <View style={tw`h-12 bg-gray90 dark:bg-darkBg rounded-2xl items-center flex-row gap-2 justify-center`}>
            <SvgXml xml={IconWarn} />
            <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500 py-1`}>
              You won't be charged until you pay.
            </Text>
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600 mb-4`}>
              Card Information
            </Text>
            <View style={tw`gap-y-4`}>
              <View>
                <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Name on card
                </Text>
                <View style={tw`h-12`}>
                  <InputText
                    fromUP={true}
                    placeholder="John Smith"
                    placeholderTextColor={'#BBBCBD'}
                    style={tw`text-black text-base font-WorkMedium font-500`}
                    value={formData.nameOnCard}
                    onChangeText={(text) => handleInputChange('nameOnCard', text)}
                  />
                </View>
              </View>
              
              <View>
                <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Card details
                </Text>
                <View style={tw`h-16 mb-2`}>
                  <CardField
                    postalCodeEnabled={false}
                    placeholder={{
                      number: '4242 4242 4242 4242',
                      expiration: 'MM/YY',
                      cvc: 'CVC'
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 8,
                      fontSize: 16,
                    }}
                    style={{
                      width: '100%',
                      height: 50,
                      marginVertical: 0,
                    }}
                    onCardChange={setCardDetails}
                  />
                </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconAcceptedCards} />
                  <Text style={tw`text-gray-500 text-xs`}>Secure payment powered by Stripe</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-black dark:text-white text-[20px] font-WorkSemiBold font-600 mb-4`}>
              Billing Information
            </Text>
            <View style={tw`gap-y-4`}>
              <View>
                <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Street Address
                </Text>
                <View style={tw`h-12`}>
                  <InputText
                    fromUP={true}
                    placeholder="Your Address"
                    placeholderTextColor={'#BBBCBD'}
                    style={tw`text-black text-base font-WorkMedium font-500`}
                    value={formData.streetAddress}
                    onChangeText={(text) => handleInputChange('streetAddress', text)}
                  />
                </View>
              </View>

              <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    City
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                      fromUP={true}
                      placeholder="Enter City"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                      value={formData.city}
                      onChangeText={(text) => handleInputChange('city', text)}
                    />
                  </View>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Region
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                      fromUP={true}
                      placeholder="Enter Region"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                      value={formData.region}
                      onChangeText={(text) => handleInputChange('region', text)}
                    />
                  </View>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Postal Code
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                      fromUP={true}
                      placeholder="1234"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                      value={formData.postalCode}
                      onChangeText={(text) => handleInputChange('postalCode', text)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`mb-1 text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Country
                  </Text>
                  <View style={tw`h-12`}>
                    <InputText
                      fromUP={true}
                      placeholder="Enter Country"
                      placeholderTextColor={'#BBBCBD'}
                      style={tw`text-black text-base font-WorkMedium font-500`}
                      value={formData.country}
                      onChangeText={(text) => handleInputChange('country', text)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg`}>
            <Text style={tw`text-lg font-WorkSemiBold text-black dark:text-white mb-2`}>
              Plan Summary
            </Text>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-gray-600 dark:text-gray-300`}>Plan:</Text>
              <Text style={tw`text-black dark:text-white`}>{duration}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600 dark:text-gray-300`}>Price:</Text>
              <Text style={tw`text-black dark:text-white`}>${cost.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2 ${isProcessing ? 'opacity-70' : ''}`}
        onPress={handlePayPress}
        disabled={isProcessing}>
        <Text style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          {isProcessing ? 'Processing...' : `Pay $${cost.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;