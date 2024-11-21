import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import tw from '../../../../lib/tailwind';

const data = [
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Annually',
    amount: '$29.99',
    status: 'Paid',
  },
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Monthly',
    amount: '$2.99',
    status: 'Paid',
  },
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Monthly',
    amount: '$2.99',
    status: 'Paid',
  },
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Monthly',
    amount: '$2.99',
    status: 'Paid',
  },
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Monthly',
    amount: '$2.99',
    status: 'Paid',
  },
  {
    id: '#23456',
    date: '23 Jan, 23',
    plan: 'Monthly',
    amount: '$2.99',
    status: 'Pending',
  },
];

const InvoiceHistory = ({navigation}: any) => {
  const renderItem = ({item}: {item: any}) => (
    <View style={tw`flex-row justify-between py-2 border-b border-gray-200 dark:border-darkBg`}>
      <Text style={tw`w-1/5 text-tableBody dark:text-white text-[9px]`}>{item.id}</Text>
      <Text style={tw`w-1/5 text-tableBody dark:text-white text-[9px]`}>{item.date}</Text>
      <Text style={tw`w-1/5 text-tableBody dark:text-white text-[9px]`}>{item.plan}</Text>
      <Text style={tw`w-1/5 text-tableBody dark:text-white text-[9px]`}>{item.amount}</Text>
      <Text
        style={tw`w-1/5 text-center text-[9px] ${
          item.status === 'Paid'
            ? 'text-[#89B09A] bg-[#F5F9F6] dark:bg-darkBg'
            : 'text-[#E89A46] bg-[#FFF6ED]'
        } px-2 py-1 rounded-full`}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View>
      <View style={tw`p-4`}>
        <Text style={tw`text-tableBody dark:text-white text-base font-WorkSemiBold font-600`}>
          Invoice
        </Text>
        <Text
          style={tw`mt-1 mb-2 text-gray100 text-xs font-WorkRegular font-400`}>
          Effortlessly handle your billing and invoices right here.
        </Text>
        {/* Table Header */}
        <View
          style={tw`flex-row justify-between py-2 border-b border-gray-300 dark:border-darkBg`}>
          <Text
            style={tw`w-1/5 text-gray100 text-[9px] font-WorkMedium font-500`}>
            Invoice ID
          </Text>
          <Text
            style={tw`w-1/5 text-gray100 text-[9px] font-WorkMedium font-500`}>
            Billing Date
          </Text>
          <Text
            style={tw`w-1/5 text-gray100 text-[9px] font-WorkMedium font-500`}>
            Plan
          </Text>
          <Text
            style={tw`w-1/5 text-gray100 text-[9px] font-WorkMedium font-500`}>
            Amount
          </Text>
          <Text
            style={tw`w-1/5 text-gray100 text-[9px] font-WorkMedium font-500 text-center`}>
            Status
          </Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-6`}
        onPress={() => {
          navigation?.navigate('Settings');
        }}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Download
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvoiceHistory;
