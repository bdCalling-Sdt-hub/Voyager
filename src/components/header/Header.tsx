import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
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
import ActionModal from '../modals/ActionModal';
import {useAppContext} from '../../utils/context/AppContext';

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
  hideFilterIcon,
  hideRightIcon,
  leftIcon,
  middleComponent,
  searchBarShow,
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
          tw`flex-row items-center justify-between py-2 z-10`,
          containerStyle,
        ]}>
        <View style={tw`w-1/6`}>
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
              <View
                style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}>
                <SvgXml xml={leftIcon || IconLeftArrow} />
              </View>
            ) : (
              <View>
                <Image
                  source={require('../../assets/images/user.png')}
                  style={tw`h-12 w-12 rounded-full`}
                />
                <View
                  style={tw`h-2 w-2 bg-red rounded-full absolute bottom-0 right-[30%]`}
                />

                {showActionModal && (
                  <Pressable
                    onPress={() => setShowActionModal(false)}
                    style={tw`h-[800px] w-[500px] absolute`}>
                    <View
                      style={[
                        tw`w-56 absolute top-13 left-0 p-4 bg-white  shadow-xl rounded-2xl`,
                      ]}>
                      <Pressable
                        style={tw`w-full flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          <Image
                            source={require('../../assets/images/level.png')}
                          />
                          <View>
                            <Text
                              style={tw`text-black text-base font-WorkBold font-700`}>
                              5
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
                              style={tw`text-black text-base font-WorkBold font-700`}>
                              12
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
                            style={tw`text-black text-base font-WorkMedium font-500`}>
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
        <View style={[tw`w-4/6 items-center`, titleContainer]}>
          {middleComponent || (
            <Text
              style={[
                tw`text-black text-2xl font-WorkMedium capitalize`,
                titleStyle,
              ]}>
              {title}
            </Text>
          )}
        </View>
        <View style={tw`w-1/6 items-end`}>
          {!hideRightIcon ? (
            <TouchableOpacity
              style={[
                tw`flex-row gap-1 items-center justify-center`,
                IconContainer,
              ]}
              onPress={onPressSearch}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-gold text-lg font-WorkSemiBold font-600`}>
                400
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
  <View style={tw`bg-gray80 rounded-full flex-row items-center p-1`}>
  <View
    style={tw`bg-white rounded-full flex-row items-center gap-4 flex-1 pl-4`}>
    <SvgXml xml={IconSearch} />
    <TextInput placeholder="Search" style={tw`w-[85%]`} />
  </View>
  <View>
    {!hideFilterIcon && (
      <TouchableOpacity
        style={tw`h-12 w-12 flex items-center justify-center rounded-full ml-2 bg-white`}
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
            <View style={tw`flex-row flex-wrap gap-3 mt-1`}>
              {['visited', 'not_visited', 'in_progress'].map(type => (
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
              ))}
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
