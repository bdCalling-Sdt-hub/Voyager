import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../../../lib/tailwind';
import Header from '../../../components/header/Header';
import MySubscription from './components/MySubscription';
import InvoiceHistory from './components/InvoiceHistory';

const SubscriptionPlan = ({navigation}: any) => {
  const [myPlan, setMyPlan] = useState('my_subscription');
  return (
    <View style={tw`bg-white h-full px-[4%] pb-2`}>
      <View>
        {/* Header */}
        <Header
          title={'My Plan'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        <View style={tw`flex-row bg-gray80 p-1 rounded-full mb-4`}>
          <TouchableOpacity
            style={tw`${
              myPlan === 'my_subscription' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setMyPlan('my_subscription')}>
            <Text
              style={tw`${
                myPlan === 'my_subscription' ? 'text-white' : 'text-gray100'
              } text-xs font-WorkMedium`}>
              My Subscription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              myPlan === 'invoice_history' ? 'bg-violet100' : ''
            } py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setMyPlan('invoice_history')}>
            <Text
              style={tw`${
                myPlan === 'invoice_history' ? 'text-white' : 'text-gray100'
              } text-xs font-WorkMedium`}>
              Invoice History
            </Text>
          </TouchableOpacity>
        </View>

        {myPlan === 'my_subscription' ? (
          <MySubscription />
        ) : (
          <InvoiceHistory navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default SubscriptionPlan;
