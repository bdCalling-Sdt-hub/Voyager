import {Checkbox, RadioButton, RadioGroup} from 'react-native-ui-lib';
import {
  IconClose,
  IconFilter,
  IconLeftArrow,
  IconSearch,
  experiType1,
  experiType2,
} from '../../assets/icons/Icons';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

import NormalModal from '../modals/NormalModal';
import {SvgXml} from 'react-native-svg';
import {baseUrl} from '../../screens/utils/exports';
import tw from '../../lib/tailwind';
import {useAppColorScheme} from 'twrnc';
import {useAppContext} from '../../utils/context/AppContext';
import {useGetProfileQuery} from '../../redux/apiSlices/authApiSlice';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
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
  hideFilterIcon?: boolean;
  hideRightIcon?: boolean;
  leftIcon?: any;
  middleComponent?: any;
  searchBarShow?: boolean;
  hideDestination?: boolean;
  rightComponent?: any;
}

const activityType = [
  {id: 1, label: 'Relax'},
  {id: 2, label: 'Moderate'},
  {id: 3, label: 'Active'},
];

const experienceType = [
  {label: 'Adventure', icon: experiType1},
  {label: 'Cultural', icon: experiType1},
  {label: 'Relation', icon: experiType2},
  {label: 'food', icon: experiType2},
  {label: 'Nature', icon: experiType1},
];

const bestTravelTime = [
  {label: 'Summer', icon: experiType2},
  {label: 'Rainy', icon: experiType2},
  {label: 'Winter', icon: experiType1},
  {label: 'Autumn', icon: experiType1},
  {label: 'Late-Autumn', icon: experiType2},
  {label: 'Spring', icon: experiType2},
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
  hideFilterIcon,
  hideRightIcon,
  leftIcon,
  middleComponent,
  searchBarShow,
  hideDestination,
  rightComponent,
}: Props) => {
  const navigation: any = useNavigation();
  const [filterModal, setFilterModal] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [visitedStatus, setVisitedStatus] = useState<string>('');
  const [colorScheme] = useAppColorScheme(tw);

  // rtk query hooks
  const {data} = useGetProfileQuery({});
  const {coins, badges, level, image} = data?.data || {};

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

  const {showActionModal, setShowActionModal} = useAppContext();

  return (
    <>
      <View
        style={[
          tw`flex-row  w-full items-center justify-between py-2 z-10`,
          containerStyle,
        ]}>
        <View style={tw`flex-row items-center`}>
          <TouchableWithoutFeedback
            style={[tw``, imageContainer]}
            onPress={() => {
              if (IconRouteName) {
                if (isIcon) {
                  navigation?.navigate(IconRouteName);
                } else {
                  // navigation?.goBack();
                  setShowActionModal(!showActionModal);
                }
              } else {
                navigation?.goBack();
              }
            }}>
            {isIcon ? (
              <TouchableOpacity
                onPress={() => navigation?.goBack()}
                style={tw`h-12 w-12 rounded-full bg-white dark:bg-darkBg items-center justify-center border border-gray90 dark:border-darkBg`}>
                <SvgXml xml={leftIcon || IconLeftArrow} />
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  source={
                    image
                      ? {uri: baseUrl + image}
                      : require('../../assets/images/user.png')
                  }
                  style={tw`h-12 w-12 rounded-full`}
                />
                <View
                  style={tw`h-2 w-2 bg-red rounded-full absolute bottom-0 left-9`}
                />

                {showActionModal && (
                  <Pressable
                    onPress={() => setShowActionModal(false)}
                    style={tw`h-[800px] w-[500px] absolute`}>
                    <View
                      style={[
                        tw`w-56 absolute top-13 left-0 p-4 bg-white dark:bg-secDarkBg  shadow-xl rounded-2xl`,
                      ]}>
                      <Pressable
                        style={tw`w-full flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          <Image
                            source={require('../../assets/images/level.png')}
                          />
                          <View>
                            <Text
                              style={tw`text-black dark:text-white text-base font-WorkBold font-700`}>
                              {level || '1'}
                            </Text>
                            <Text
                              style={tw`text-gray100 text-xs font-WorkMedium font-500`}>
                              level
                            </Text>
                          </View>
                        </View>
                        <View style={tw`flex-row items-center`}>
                          <Image
                            source={require('../../assets/images/badges.png')}
                          />
                          <View>
                            <Text
                              style={tw`text-black dark:text-white text-base font-WorkBold font-700`}>
                              {badges || '0'}
                            </Text>
                            <Text
                              style={tw`text-gray100 text-xs font-WorkMedium font-500`}>
                              Badges
                            </Text>
                          </View>
                        </View>
                      </Pressable>

                      <View style={tw`mt-2`}>
                        <TouchableOpacity
                          style={tw`py-2`}
                          onPress={() => {
                            navigation?.navigate('Profile');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Profile
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={tw`py-2`}
                          onPress={() => {
                            navigation?.navigate('Shop');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Collections
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={tw`py-2`}
                          onPress={() => {
                            navigation?.navigate('Friends');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Add Friend
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={tw`py-2 flex-row items-center justify-between`}
                          onPress={() => {
                            navigation?.navigate('Notifications');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Notifications
                          </Text>
                          <View style={tw`h-2 w-2 bg-red rounded-full`} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={tw`py-2`}
                          onPress={() => {
                            navigation?.navigate('Subscription');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Upgrade to premium
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={tw`py-2`}
                          onPress={() => {
                            navigation?.navigate('Settings');
                            setShowActionModal(false);
                          }}>
                          <Text
                            style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}>
                            Settings
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Pressable>
                )}
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
        <View style={[tw`flex-1 items-center`, titleContainer]}>
          {middleComponent || (
            <Text
              // numberOfLines={1}
              style={[
                tw`text-black  dark:text-white text-xl font-WorkMedium capitalize`,
                titleStyle,
              ]}>
              {title}
            </Text>
          )}
        </View>
        <View style={tw`items-end`}>
          {rightComponent || !hideRightIcon ? (
            <TouchableOpacity
              style={[
                tw`flex-row gap-1 items-center justify-center `,
                IconContainer,
              ]}
              onPress={() => navigation?.navigate('Shop')}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-gold text-lg font-WorkSemiBold font-600`}>
                {coins || '0'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`opacity-0`}>
              <SvgXml xml={IconSearch} />
            </View>
          )}
        </View>
      </View>

      {searchBarShow && (
        <View
          style={tw`bg-gray80 dark:bg-darkBg rounded-full flex-row items-center p-1`}>
          <View
            style={tw`bg-white dark:bg-secDarkBg rounded-full flex-row items-center gap-4 flex-1 pl-4`}>
            <SvgXml xml={IconSearch} />
            <TextInput
              placeholder="Search"
              style={tw`w-[85%]`}
              onEndEditing={e => {
                navigation?.navigate('Search', {search: e.nativeEvent.text});
              }}
              placeholderTextColor={`${
                colorScheme === 'dark' ? '#9A9C9D' : '#000000'
              }`}
            />
          </View>
          <View>
            {!hideFilterIcon && (
              <TouchableOpacity
                style={tw`h-12 w-12 flex items-center justify-center rounded-full ml-2 bg-white dark:bg-secDarkBg`}
                onPress={() => setFilterModal(true)}>
                <SvgXml xml={IconFilter} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <NormalModal
        visible={filterModal}
        setVisible={setFilterModal}
        disabled
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white dark:bg-darkBg p-4 rounded-2xl h-[80%]`}>
        <View style={tw`pb-6`}>
          {/* header */}
          <View style={tw`flex-row items-center justify-between w-full pb-1`}>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkSemiBold`}>
              Filters
            </Text>
            <TouchableOpacity onPress={() => setFilterModal(false)}>
              <SvgXml xml={IconClose} />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            {/* location type */}
            {!hideDestination && (
              <View style={tw`mt-2`}>
                <Text
                  style={tw`text-lg text-black dark:text-white font-WorkMedium`}>
                  Destination
                </Text>
                <RadioGroup
                  onValueChange={(value: any) => setLocationType(value)}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Cities"
                    value="cities"
                    labelStyle={tw`text-black dark:text-white`}
                    color="#8C78EA"
                  />

                  <RadioButton
                    label="Attractions"
                    value="attractions"
                    labelStyle={tw`text-black dark:text-white`}
                    color="#8C78EA"
                  />

                  <RadioButton
                    label="Countries"
                    value="countries"
                    labelStyle={tw`text-black dark:text-white`}
                    color="#8C78EA"
                  />
                </RadioGroup>
              </View>
            )}

            {/* Experience type */}
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-lg text-black dark:text-white font-WorkMedium`}>
                Experience type
              </Text>
              <View style={tw`flex-row flex-wrap gap-3 mt-1`}>
                {experienceType.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`${
                      visitedStatus.includes(type?.label)
                        ? 'bg-violet100'
                        : 'bg-white dark:bg-darkBg'
                    } py-2 flex-row gap-1 rounded-full justify-center items-center border-[2px] border-violet100 px-2`}
                    onPress={() => toggleVisitedStatus(type?.label)}>
                    <SvgXml xml={type?.icon} />
                    <Text
                      style={tw`${
                        visitedStatus.includes(type?.label)
                          ? 'text-white'
                          : 'text-violet100'
                      } font-WorkMedium text-sm capitalize`}>
                      {type?.label.replace('_', '-')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Best travel time */}
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-lg text-black dark:text-white font-WorkMedium`}>
                Best travel time
              </Text>
              <View style={tw`flex-row flex-wrap gap-3 mt-1`}>
                {bestTravelTime.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`${
                      visitedStatus.includes(type?.label)
                        ? 'bg-violet100'
                        : 'bg-white dark:bg-darkBg'
                    } py-2 flex-row gap-1 rounded-full justify-center items-center border-[2px] border-violet100 px-2`}
                    onPress={() => toggleVisitedStatus(type?.label)}>
                    <SvgXml xml={type?.icon} />
                    <Text
                      style={tw`${
                        visitedStatus.includes(type?.label)
                          ? 'text-white'
                          : 'text-violet100'
                      } font-WorkMedium text-sm capitalize`}>
                      {type?.label.replace('_', '-')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* activity type */}
            <View style={tw`gap-y-3 mt-5`}>
              <Text
                style={tw`text-black dark:text-white text-base font-WorkSemiBold`}>
                Activity level
              </Text>

              {activityType.map(item => (
                <Checkbox
                  key={item.id}
                  color={'#8C78EA'}
                  labelStyle={tw`text-black dark:text-white`}
                  value={selectedItems.includes(item.label)}
                  label={item.label}
                  onValueChange={() => handleCheckboxChange(item.label)}
                />
              ))}
            </View>

            <View style={tw`flex-row gap-6 mt-5`}>
              <TouchableOpacity
                style={tw`bg-white dark:bg-darkBg py-2 rounded-full justify-center items-center border-[2px] border-violet100 flex-1`}
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
          </ScrollView>
        </View>
      </NormalModal>
    </>
  );
};

export default Header;
