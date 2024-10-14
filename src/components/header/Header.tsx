import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconFilter,
  IconLeftArrow,
  IconSearch,
} from '../../assets/icons/Icons';
import {useNavigation} from '@react-navigation/native';
import {NavigProps} from '../../utils/interface/NaviProps';
import NormalModal from '../modals/NormalModal';
import {Checkbox, RadioButton, RadioGroup} from 'react-native-ui-lib';

interface Props {
  title: string;
  imageContainer?: any;
  titleContainer?: any;
  IconContainer?: any;
  titleStyle?: any;
  containerStyle?: any;
  icon?: any;
  isIcon?: boolean;
  IconRouteName?: string;
  onPressSearch?: () => void;
  isSearchVisible?: boolean;
}

const activityType = [
  {id: 1, label: 'Adventure'},
  {id: 2, label: 'Historical'},
  {id: 3, label: 'Cultural'},
  {id: 4, label: 'Nature'},
  {id: 5, label: 'Relaxation'},
];

const Header = ({
  title,
  imageContainer,
  titleContainer,
  IconContainer,
  titleStyle,
  containerStyle,
  icon,
  isIcon,
  IconRouteName,
  onPressSearch,
  isSearchVisible,
}: Props) => {
  const navigation: any = useNavigation();
  const [filterModal, setFilterModal] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [visitedStatus, setVisitedStatus] = useState<string>('');

  const handleCheckboxChange = value => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  return (
    <>
      <View
        style={[
          tw`flex-row items-center justify-between py-2`,
          containerStyle,
        ]}>
        <TouchableOpacity
          style={[tw``, imageContainer]}
          onPress={() => {
            if (IconRouteName) {
              if (isIcon) {
                navigation?.navigate(IconRouteName);
              } else {
                navigation?.goBack();
              }
            } else {
              navigation?.goBack();
            }
          }}>
          {isIcon ? (
            <View
              style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}>
              <SvgXml xml={IconLeftArrow} />
            </View>
          ) : (
            <Image
              source={require('../../assets/images/user.png')}
              style={tw`h-12 w-12 rounded-full`}
            />
          )}
        </TouchableOpacity>
        <View style={[tw``, titleContainer]}>
          <Text
            style={[
              tw`text-black text-2xl font-WorkMedium capitalize`,
              titleStyle,
            ]}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            tw`border border-gray90 rounded-full h-10 w-10 flex items-center justify-center`,
            IconContainer,
          ]}
          onPress={onPressSearch}>
          <SvgXml xml={icon || IconSearch} />
        </TouchableOpacity>
      </View>
      {isSearchVisible && (
        <View style={tw`bg-gray80 rounded-full flex-row items-center p-1`}>
          <View
            style={tw`bg-white rounded-full flex-row items-center gap-4 flex-1 pl-4`}>
            <SvgXml xml={IconSearch} />
            <TextInput placeholder="Search" style={tw`w-[85%]`} />
          </View>
          <View>
            <TouchableOpacity
              style={tw`h-12 w-12 flex items-center justify-center rounded-full ml-2 bg-white`}
              onPress={() => setFilterModal(true)}>
              <SvgXml xml={IconFilter} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <NormalModal
        visible={filterModal}
        setVisible={setFilterModal}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View>
          {/* header */}
          <View style={tw`flex-row items-center justify-between w-full`}>
            <Text style={tw`text-black text-base font-WorkSemiBold`}>
              Filters
            </Text>
            <TouchableOpacity onPress={() => setFilterModal(false)}>
              <SvgXml xml={IconClose} />
            </TouchableOpacity>
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
              Visited Status
            </Text>
            <View style={tw`flex-row gap-3 mt-1`}>
              <TouchableOpacity
                style={tw`${
                  visitedStatus === 'visited' ? 'bg-violet100' : 'bg-white'
                } py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
                onPress={() => setVisitedStatus('visited')}>
                <Text
                  style={tw`
                  ${
                    visitedStatus === 'visited'
                      ? 'text-white'
                      : 'text-violet100'
                  } font-WorkMedium text-sm`}>
                  Visited
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`${
                  visitedStatus === 'notVisited' ? 'bg-violet100' : 'bg-white'
                } py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
                onPress={() => setVisitedStatus('notVisited')}>
                <Text
                  style={tw`${
                    visitedStatus === 'notVisited'
                      ? 'text-white'
                      : 'text-violet100'
                  } font-WorkMedium text-sm`}>
                  Not Visited
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`${
                  visitedStatus === 'inProgress' ? 'bg-violet100' : 'bg-white'
                } py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
                onPress={() => setVisitedStatus('inProgress')}>
                <Text
                  style={tw`${
                    visitedStatus === 'inProgress'
                      ? 'text-white'
                      : 'text-violet100'
                  } font-WorkMedium text-sm`}>
                  In Progress
                </Text>
              </TouchableOpacity>
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

          <View style={tw`flex-row gap-6 mt-5`}>
            <TouchableOpacity
              style={tw`bg-white py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
              onPress={() => {}}>
              <Text style={tw`text-violet100 font-WorkSemiBold text-sm`}>
                Clear all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-violet100 py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
              onPress={() => setFilterModal(false)}>
              <Text style={tw`text-white font-WorkSemiBold text-sm`}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NormalModal>
    </>
  );
};

export default Header;
