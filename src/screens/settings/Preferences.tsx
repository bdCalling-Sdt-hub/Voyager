import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  useAddTravelInterestMutation,
  useGetTravelPreferencesQuery,
} from '../../redux/slice/ApiSlice';

import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';

const Preferences = ({navigation}: any) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedName, setSelectedName] = useState<[]>([]);

  // rtk query hooks
  const {data} = useGetTravelPreferencesQuery({});
  const [addTravelInterest, {isLoading}] = useAddTravelInterestMutation();
  const activityType = data?.data || [];

  const toggleSelection = (id: number, name: string) => {
    if (selectedItems.includes(id)) {
      // নির্বাচিত আইটেম থাকলে তা সরিয়ে ফেলবো
      setSelectedItems(selectedItems.filter(item => item !== id));
      setSelectedName(selectedName.filter(item => item !== name));
    } else if (selectedItems.length < 5) {
      // সর্বোচ্চ ৫টা আইটেম নির্বাচন করা যাবে
      setSelectedItems([...selectedItems, id]);
      setSelectedName([...selectedName, name]);
    } else {
      Alert.alert('Limit Reached', 'You can only select up to 5 preferences.', [
        {text: 'OK'},
      ]);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setSelectedName([]);
  };

  // const handleContinue = () => {
  //   navigation?.navigate('Settings', {selectedItems});
  // };

  const handleContinue = async () => {
    try {
      const response = await addTravelInterest({name: selectedName});
      console.log('response of add travel interest: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Adding to bucket list failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        navigation?.navigate('Settings');
      }
    } catch (err: any) {
      Alert.alert(
        'Adding to bucket list Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  return (
    <View style={tw`h-full bg-white px-[4%] pb-2 dark:bg-primaryDark`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'Preferences for you'}
          titleStyle={tw``}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />
        <View>
          {/* header */}
          <View style={tw``}>
            <Text
              style={tw`text-black dark:text-white text-3xl font-WorkSemiBold`}>
              Travel Interests
            </Text>
            <Text
              style={tw`text-gray70 dark:text-white text-sm font-WorkRegular`}>
              Pick up to 5 attractions, cities, or countries you're excited
              about visiting.
            </Text>
          </View>

          {/* Activity Selection */}
          <View style={tw`mt-5`}>
            <View style={tw`flex-row flex-wrap gap-3 mt-1`}>
              {activityType.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={tw`${
                    selectedItems.includes(type.id)
                      ? 'bg-violet100'
                      : 'bg-white dark:bg-primaryDark'
                  } py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
                  onPress={() => toggleSelection(type.id, type.name)}>
                  <Text
                    style={tw`${
                      selectedItems.includes(type.id)
                        ? 'text-white'
                        : 'text-violet100'
                    } font-WorkMedium text-sm`}>
                    {type?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Actions */}
          <View
            style={tw`flex-row gap-6 mt-5 justify-between border-t border-t-dotted border-t-dottedBorder dark:border-t-secDarkBg pt-6`}>
            <TouchableOpacity
              style={tw`bg-white dark:bg-primaryDark py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={handleClearAll}>
              <Text style={tw`text-violet100 font-WorkSemiBold text-sm`}>
                Clear all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-violet100 ${
                selectedItems.length === 0 ? 'opacity-70' : ''
              } py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={handleContinue}
              disabled={selectedItems.length === 0 ? true : false}>
              <Text style={tw`text-white font-WorkSemiBold text-sm`}>
                Continue {selectedItems.length}/5
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;
