import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconClose,
  IconColoredTik,
  IconFilledHeart,
  IconFilter,
  IconSearch,
  IconTikWithCircle,
} from '../../assets/icons/Icons';
import desticaions from '../../utils/json/destinations.json';
import {NavigProps} from '../../utils/interface/NaviProps';
import NormalModal from '../../components/modals/NormalModal';
import {Checkbox, RadioButton, RadioGroup} from 'react-native-ui-lib';

const activityType = [
  {id: 1, label: 'Adventure'},
  {id: 2, label: 'Historical'},
  {id: 3, label: 'Cultural'},
  {id: 4, label: 'Nature'},
  {id: 5, label: 'Relaxation'},
];
const Places = ({navigation, route}: NavigProps<null>) => {
  const [activePlace, setActivePlace] = useState('attractions');
  const [filterModal, setFilterModal] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [visitedStatus, setVisitedStatus] = useState<string>('');
  const {title}: any = route?.params || '';

  const destinationData = (() => {
    switch (activePlace) {
      case 'cities':
        return desticaions?.data?.cities || null;
      case 'countries':
        return desticaions?.data?.countries || null;
      case 'attractions':
        return desticaions?.data?.attractions || null;
      default:
        return null;
    }
  })();

  const handleCheckboxChange = value => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  return (
    <View style={tw`px-[4%] bg-white h-full`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
      />
      <View style={tw`bg-gray80 rounded-full flex-row items-center p-1`}>
        <View
          style={tw`bg-white rounded-full flex-row items-center gap-4 flex-1 pl-4`}>
          <SvgXml xml={IconSearch} />
          <TextInput placeholder="Search" />
        </View>
        <View>
          <TouchableOpacity
            style={tw`h-12 w-12 flex items-center justify-center rounded-full ml-2 bg-white`}
            onPress={() => setFilterModal(true)}>
            <SvgXml xml={IconFilter} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-row bg-gray80 p-1 rounded-full mt-4`}>
        <TouchableOpacity
          style={tw`${
            activePlace === 'attractions' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('attractions')}>
          <Text
            style={tw`${
              activePlace === 'attractions' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Attractions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            activePlace === 'cities' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('cities')}>
          <Text
            style={tw`${
              activePlace === 'cities' ? 'text-white' : 'text-gray100'
            } text-xs font-WorkMedium`}>
            Cities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${
            activePlace === 'countries' ? 'bg-violet100' : ''
          } py-4 rounded-full flex-1 justify-center items-center`}
          onPress={() => setActivePlace('countries')}>
          <Text
            style={tw`${
              activePlace === 'countries' ? 'text-white' : 'text-gray100'
            }  text-xs font-WorkMedium`}>
            Countries
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={tw`gap-y-4 mt-6`}
        showsVerticalScrollIndicator={false}>
        {destinationData?.map((item: any, index: number) => (
          <TouchableOpacity
            style={tw`flex-row items-center gap-4`}
            key={index}
            onPress={() => navigation?.navigate('DestinationDetails', {item})}>
            <Image
              source={require('../../assets/images/explore-card-2.png')}
              style={tw`rounded-2xl w-4/12 h-24`}
            />
            <View
              style={tw`flex-1 justify-between flex-row items-center gap-2`}>
              <View style={tw`gap-y-1`}>
                <View style={tw``}>
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-black font-WorkSemiBold text-[20px]`}>
                      {item?.name}
                    </Text>
                  </View>
                  <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
                    {item?.location || 'Location'}
                  </Text>
                </View>
                <View style={tw`flex-row gap-4`}>
                  <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                    <Image
                      source={require('../../assets/images/coin.png')}
                      style={tw`h-6 w-6`}
                    />
                    <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                      50 coins
                    </Text>
                  </View>

                  {title === undefined ? (
                    <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                      <Image
                        source={require('../../assets/images/trophy.png')}
                        style={tw`h-6 w-6`}
                      />
                      <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                        100 XP
                      </Text>
                    </View>
                  ) : (
                    <SvgXml
                      xml={
                        title === 'visited' ? IconColoredTik : IconTikWithCircle
                      }
                    />
                  )}
                </View>
              </View>
            </View>
            <SvgXml xml={IconFilledHeart} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <NormalModal
        visible={filterModal}
        setVisible={setFilterModal}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}>
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
        </View>
      </NormalModal>
    </View>
  );
};

export default Places;
