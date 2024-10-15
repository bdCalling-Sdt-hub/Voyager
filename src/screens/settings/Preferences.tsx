import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import {Checkbox, RadioButton, RadioGroup} from 'react-native-ui-lib';

const activityType = [
  {id: 1, label: 'Adventure'},
  {id: 2, label: 'Historical'},
  {id: 3, label: 'Cultural'},
  {id: 4, label: 'Nature'},
  {id: 5, label: 'Relaxation'},
];

const Preferences = ({navigation}: any) => {
  const [locationType, setLocationType] = useState('');
  const [visitedStatus, setVisitedStatus] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = value => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const toggleVisitedStatus = (status: string) => {
    if (visitedStatus.includes(status)) {
      // If the status is already selected, remove it
      setVisitedStatus(visitedStatus.filter(item => item !== status));
    } else {
      // If the status is not selected, add it
      setVisitedStatus([...visitedStatus, status]);
    }
  };
  return (
    <View style={tw`h-full bg-white px-[4%] pb-2`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'Preferences for you'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        {/* body */}
        <View>
          {/* header */}
          <View style={tw`flex-row items-center justify-between w-full`}>
            <Text style={tw`text-black text-base font-WorkSemiBold`}>
              Your Preferences
            </Text>
          </View>

          {/* location type */}
          <View style={tw`mt-2`}>
            <Text style={tw`text-lg text-black font-WorkMedium`}>
              Location Type
            </Text>
            <RadioGroup
              onValueChange={(value: any) => setLocationType(value)}
              style={tw`gap-y-3 mt-1`}>
              <RadioButton label="Cities" value="cities" color="#8C78EA" />

              <RadioButton
                label="Attractions"
                value="attractions"
                color="#8C78EA"
              />

              <RadioButton
                label="Countries"
                value="countries"
                color="#8C78EA"
              />
            </RadioGroup>
          </View>

          {/* visited Status */}
          <View style={tw`mt-5`}>
            <Text style={tw`text-lg text-black font-WorkMedium`}>
              Place Type
            </Text>
            <View style={tw`flex-row flex-wrap gap-3 mt-1`}>
              {['historycal', 'Family_Friendly', 'architecture', 'biking'].map(
                type => (
                  <TouchableOpacity
                    key={type}
                    style={tw`${
                      visitedStatus.includes(type) ? 'bg-violet100' : 'bg-white'
                    } py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-2`}
                    onPress={() => toggleVisitedStatus(type)}>
                    <Text
                      style={tw`${
                        visitedStatus.includes(type)
                          ? 'text-white'
                          : 'text-violet100'
                      } font-WorkMedium text-sm capitalize`}>
                      {type.replace('_', '-')}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
          {/* activity type */}
          <View style={tw`gap-y-3 mt-5`}>
            <Text style={tw`text-black text-base font-WorkSemiBold`}>
              Activity Type
            </Text>

            {activityType.map(item => (
              <Checkbox
                key={item.id}
                color={'#8C78EA'}
                value={selectedItems.includes(item.label)}
                label={item.label}
                onValueChange={() => handleCheckboxChange(item.label)}
              />
            ))}
          </View>

          <View
            style={tw`flex-row gap-6 mt-5 justify-between border-t border-t-dotted border-t-dottedBorder pt-6`}>
            <TouchableOpacity
              style={tw`bg-white py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={() => {}}>
              <Text style={tw`text-violet100 font-WorkSemiBold text-sm`}>
                Clear all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-violet100 py-2 rounded-full justify-center items-center border-[2px] border-violet100 px-4`}
              onPress={() => {
                navigation?.navigate('Settings');
              }}>
              <Text style={tw`text-white font-WorkSemiBold text-sm`}>
                Save Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;
