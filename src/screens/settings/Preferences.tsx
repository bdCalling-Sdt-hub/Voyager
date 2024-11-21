import {ScrollView, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';

const activityType = [
  {id: 1, label: 'Mountains'},
  {id: 2, label: 'Beaches'},
  {id: 3, label: 'Forests'},
  {id: 4, label: 'Deserts'},
  {id: 5, label: 'Lakes'},
  {id: 6, label: 'Rivers'},
  {id: 7, label: 'Waterfalls'},
  {id: 8, label: 'National Parks'},
  {id: 9, label: 'Wildlife'},
  {id: 10, label: 'Caves'},
  {id: 11, label: 'Hiking'},
  {id: 12, label: 'Camping'},
  {id: 13, label: 'Skiing'},
  {id: 14, label: 'Surfing'},
  {id: 15, label: 'Scuba Diving'},
  {id: 16, label: 'Rock Climbing'},
  {id: 17, label: 'Road Trips'},
  {id: 18, label: 'History'},
];

const Preferences = ({navigation}: any) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Store IDs of selected items

  const toggleSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      // Remove the item if it's already selected
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else if (selectedItems.length < 5) {
      // Add the item if less than 5 are selected
      setSelectedItems([...selectedItems, id]);
    } else {
      // Alert the user if they try to select more than 5 items
      Alert.alert(
        'Limit Reached',
        'You can only select up to 5 preferences.',
        [{text: 'OK'}],
      );
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]); // Clear all selections
  };

  const handleContinue = () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        'No Selection',
        'Please select at least one preference to continue.',
        [{text: 'OK'}],
      );
      return;
    }

    // Proceed to the next step with the selected data
    navigation?.navigate('Settings', {selectedItems});
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

        {/* body */}
        <View>
          {/* header */}
          <View style={tw``}>
            <Text style={tw`text-black dark:text-white text-3xl font-WorkSemiBold`}>
              Travel Interests
            </Text>
            <Text style={tw`text-gray70 dark:text-white text-sm font-WorkRegular`}>
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
                    selectedItems.includes(type.id) ? 'bg-violet100' : 'bg-white dark:bg-primaryDark'
                  } py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
                  onPress={() => toggleSelection(type.id)}>
                  <Text
                    style={tw`${
                      selectedItems.includes(type.id)
                        ? 'text-white'
                        : 'text-violet100'
                    } font-WorkMedium text-sm`}>
                    {type.label}
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
              style={tw`bg-violet100 py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={handleContinue}>
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
