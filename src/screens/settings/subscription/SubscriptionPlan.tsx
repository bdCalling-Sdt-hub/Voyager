import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Image, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import tw from '../../../lib/tailwind';
import Header from '../../../components/header/Header';

import { useGetMysubscriptionQuery, useInvoichistoryQuery } from '../../../redux/slice/SubsCription';
import { SvgXml } from 'react-native-svg';
import {IconVerifiedTik} from '../../../assets/icons/Icons';
import { useGetProfileQuery } from '../../../redux/slice/AuthApis';

const { width: screenWidth } = Dimensions.get('screen');

const SubscriptionPlan = ({navigation}: any) => {
  // Fetch user data
  const {data: profileData, isLoading: isProfileLoading, error: profileError} = useGetProfileQuery({});
  const userId = profileData?.data?.id;

  // Fetch subscription data
  const {
    data: subscriptionData, 
    isLoading: isSubscriptionLoading, 
    error: subscriptionError
  } = useGetMysubscriptionQuery(userId ? {id: userId} : null, {
    skip: !userId
  });

  // Fetch invoice data
  const {data: invoiceData, isLoading: isInvoicesLoading, error: invoicesError} = useInvoichistoryQuery({});
  
  const [activeTab, setActiveTab] = useState<'my_subscription' | 'invoice_history'>('my_subscription');
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform subscription data to match our expected structure
  const plans = subscriptionData?.data?.map((item: any) => ({
    id: item.id,
    name: item.subscription?.name || 'Premium',
    price: item.subscription?.price || 0,
    period: item.subscription?.duration || 'yearly',
    renewal_date: new Date(), // You'll need to get this from your API
    status: 'Active', // You might need to get this from your API
    features: item.subscription?.features || [
      'Unlimited bucketlist items',
      'Premium customization features',
      'Ad-free experience'
    ],
    subscription: item.subscription // Keep the full subscription object
  })) || [];

  console.log('Transformed plans: ', plans);

  // Loading state
  if (isProfileLoading || isSubscriptionLoading || (activeTab === 'invoice_history' && isInvoicesLoading)) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white dark:bg-primaryDark`}>
        <ActivityIndicator size="large" color={tw.color('violet100')} />
      </View>
    );
  }

  // Error state
  if (profileError || subscriptionError || (activeTab === 'invoice_history' && invoicesError)) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white dark:bg-primaryDark`}>
        <Text style={tw`text-red-500`}>
          Error loading data. Please try again.
        </Text>
      </View>
    );
  }

  // Format price
  const formatPrice = (price: number, period: string) => {
    return `$${price}/${period === 'yearly' ? 'year' : 'month'}`;
  };

  // Format billing date
  const formatBillingDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Render plan item
  const renderPlanItem = ({item}: {item: any}) => (
   <View style={[tw`justify-center `, { width: screenWidth}]}>
     <View style={[tw`bg-gray80 dark:bg-darkBg p-4 rounded-2xl ml-3 `, { width: screenWidth - 60}]}>
      <View style={tw`flex-row items-center justify-between`}>
        <Image
          source={require('../../../assets/images/diamond.png')}
          style={tw`h-12 w-12`}
        />
        <View>
          <Text style={tw`text-black dark:text-white text-2xl font-WorkSemiBold`}>
            {item.name}
          </Text>
          <Text style={tw`text-gray100 dark:text-white text-xs font-WorkRegular`}>
            {item.status === 'Active' ? 'Current Subscription' : 'Available Plan'}
          </Text>
        </View>
        <Text style={tw`text-black dark:text-white text-base font-WorkMedium`}>
          {formatPrice(item.price, item.period)}
        </Text>
      </View>
      
      <View style={tw`mt-6 gap-y-4`}>
        {item.features?.map((feature: string, index: number) => (
          <View key={index} style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconVerifiedTik} />
            <Text style={tw`text-gray70 dark:text-white text-base font-WorkMedium`}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
      
      {item.status === 'Active' && (
        <Text style={tw`text-gray100 dark:text-white text-sm font-WorkRegular mt-4`}>
          Next Billing Date: {formatBillingDate(item.renewal_date)}
        </Text>
      )}
      
      <View style={tw`mt-6`}>
        {item.status === 'Active' ? (
          <>
            <TouchableOpacity
              style={tw`bg-transparent border border-violet100 rounded-full p-3 mt-2`}
              onPress={() => navigation.navigate('ChangePlan')}>
              <Text style={tw`text-center text-violet100 text-base font-WorkMedium`}>
                Change Plan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-violet100 border border-violet100 rounded-full p-3 mt-2`}
              onPress={() => navigation.navigate('CancelSubscription')}>
              <Text style={tw`text-center text-white text-base font-WorkMedium`}>
                Cancel Subscription
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={tw`bg-violet100 border border-violet100 rounded-full p-3 mt-2`}
            onPress={() => navigation.navigate('UpgradePlan', { planId: item.id })}>
            <Text style={tw`text-center text-white text-base font-WorkMedium`}>
              Upgrade to {item.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
   </View>
  );

  // Render subscription plans in horizontal FlatList
  const renderSubscriptionPlans = () => (
    <View style={tw`flex-1`}>
      {plans.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={plans}
            renderItem={renderPlanItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            snapToInterval={screenWidth}
            // windowSize={screenWidth}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset;
              const viewSize = event.nativeEvent.layoutMeasurement;
              const pageNum = Math.floor(contentOffset.x / viewSize.width);
              setCurrentIndex(pageNum);
            }}
            contentContainerStyle={tw`pb-4 `}
          />
          
          {/* Pagination indicators */}
          <View style={[tw`flex-row items-center justify-center ` , {width: screenWidth}]}>
            {plans.map((_, index) => (
              <View
                key={index}
                style={[
                  
                  index === currentIndex ? tw`bg-violet100 rounded-full w-4 h-2 mx-1` : tw`mx-1 w-2 h-2 bg-gray-600 rounded-full`,
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <Text style={tw`text-gray100 dark:text-gray300 text-center py-4`}>
          No subscription plans found.
        </Text>
      )}
    </View>
  );

  // Render invoice history
  const renderInvoiceHistory = () => (
    <View style={tw`bg-white dark:bg-primaryDark rounded-lg p-4`}>
      <Text style={tw`text-lg font-WorkSemiBold mb-4 dark:text-white`}>
        Invoice History
      </Text>
      
      {invoiceData?.data?.length > 0 ? (
        <FlatList
          data={invoiceData.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={tw`bg-gray80 dark:bg-darkBg p-3 rounded-lg mb-2`}
              onPress={() => navigation.navigate('InvoiceDetails', { invoiceId: item.id })}
            >
              <Text style={tw`font-WorkSemiBold dark:text-white`}>
                {item.subscription_name || 'Premium'} Plan ({item.plan})
              </Text>
              <Text style={tw`text-gray100 dark:text-gray300`}>
                Amount: ${item.amount}
              </Text>
              <Text style={tw`text-gray100 dark:text-gray300`}>
                Billing Date: {item.billing_date}
              </Text>
              <Text style={tw`${item.status === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                Status: {item.status}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={tw`text-gray100 dark:text-gray300 text-center py-4`}>
          No invoice history found.
        </Text>
      )}
    </View>
  );

  return (
    <View style={tw`bg-white h-full px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'My Plan'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-WorkSemiBold dark:text-white`}>
            Hello, {profileData?.data?.full_name || 'User'}
          </Text>
        </View>

        <View style={tw`flex-row bg-gray80 dark:bg-darkBg p-1 rounded-full mb-4`}>
          <TouchableOpacity
            style={tw`${activeTab === 'my_subscription' ? 'bg-violet100' : ''} py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActiveTab('my_subscription')}>
            <Text style={tw`${activeTab === 'my_subscription' ? 'text-white' : 'text-gray100'} text-xs font-WorkMedium`}>
              My Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${activeTab === 'invoice_history' ? 'bg-violet100' : ''} py-4 rounded-full flex-1 justify-center items-center`}
            onPress={() => setActiveTab('invoice_history')}>
            <Text style={tw`${activeTab === 'invoice_history' ? 'text-white' : 'text-gray100'} text-xs font-WorkMedium`}>
              Invoice History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'my_subscription' ? renderSubscriptionPlans() : renderInvoiceHistory()}
      </ScrollView>
    </View>
  );
};

export default SubscriptionPlan;