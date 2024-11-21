import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import tw from '../../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconBottomArrow,
  IconClock,
  IconColoredHeart,
  IconColoredLocation,
  IconCongrats,
  IconLeftArrow,
  IconLogout,
  IconMuseum,
  IconTicket,
  IconTik,
  IconTopArrow,
} from '../../../assets/icons/Icons';
import {NavigProps} from '../../../utils/interface/NaviProps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {ExpandableSection, Fader} from 'react-native-ui-lib';
import Test from './Test';
import Swiper from 'react-native-swiper';
import NormalModal from '../../../components/modals/NormalModal';

const DestinationDetails = ({navigation}: NavigProps<null>) => {
  const [expanded, setExpanded] = useState(false);
  const [saveBucketListModalVisible, setSaveBucketListModalVisible] =
    useState(false);
  const [addOnBucketListModalVisible, setAddOnBucketListModalVisible] =
    useState(false);
  const fullText =
    'The Book of Kells Experience is housed in the Grand Library at Trinity College, Dublin. This exhibition features illuminated illustrations of the Christian Gospels dating back to 800 AD, offering a glimpse into Ireland’s medieval artistry and religious heritage.';

  const words = fullText.split(' ');

  const initialText = expanded ? fullText : words.slice(0, 25).join(' ');

  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`h-66`}>
        <Swiper
          dot={<View style={tw`bg-white w-2 h-2 rounded-full mx-1`} />} // Dot styling
          activeDot={
            <View style={tw`bg-violet100 w-2 h-2 rounded-full mx-1`} />
          }
          paginationStyle={tw`bottom-2`}
          loop={false}>
          <View style={tw`flex-1`}>
            <Image
              source={require('../../../assets/images/explore-card-3.png')}
              style={tw`w-full h-66`}
              resizeMode="cover"
            />
          </View>

          <View style={tw`flex-1`}>
            <Image
              source={require('../../../assets/images/explore-card-2.png')} // Use a different image for the second slide if needed
              style={tw`w-full h-66`}
              resizeMode="cover"
            />
          </View>

          <View style={tw`flex-1`}>
            <Image
              source={require('../../../assets/images/explore-card-1.png')} // Use a different image for the second slide if needed
              style={tw`w-full h-66`}
              resizeMode="cover"
            />
          </View>
        </Swiper>
        <>
          <TouchableOpacity
            style={tw`bg-white h-10 w-10 rounded-full items-center justify-center absolute top-4 right-[4%]`}>
            <SvgXml xml={IconLogout} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white h-10 w-10 rounded-full items-center justify-center absolute top-4 left-[4%]`}
            onPress={() => navigation?.goBack()}>
            <SvgXml xml={IconLeftArrow} />
          </TouchableOpacity>
        </>
      </View>
      <ScrollView style={tw`px-[4%] pt-6`}>
        <Text style={tw`text-black text-[20px] font-WorkMedium`}>
          The Book of Kells Experience
        </Text>
        <View style={tw`flex-row items-center gap-2 mt-2`}>
          <SvgXml xml={IconColoredLocation} />
          <Text style={tw`text-gray100 font-WorkRegular text-sm`}>
            Dublin, Ireland
          </Text>
        </View>
        <View style={tw`flex-row gap-4 mt-2`}>
          <View style={tw`flex-row items-center gap-1 flex-shrink`}>
            <Image
              source={require('../../../assets/images/coin.png')}
              style={tw`h-6 w-6`}
            />
            <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
              50 coins
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-1 flex-shrink`}>
            <Image
              source={require('../../../assets/images/trophy.png')}
              style={tw`h-6 w-6`}
            />
            <Text style={tw`text-gray100 text-xs font-WorkRegular`}>75 XP</Text>
          </View>
        </View>
        <View>
          <Text style={tw`text-sm font-WorkRegular text-black leading-6`}>
            {initialText}
          </Text>
          <Fader
            visible={true}
            position={Fader.position.BOTTOM}
            size={130}
            tintColor="#ffffff"
          />
          <TouchableOpacity
            style={tw`flex-row gap-2 items-center justify-center mt-2`}
            onPress={() => setExpanded(!expanded)}>
            <Text
              style={tw`text-violet100
            `}>
              {expanded ? 'See Less' : 'See More'}
            </Text>
            <SvgXml xml={!expanded ? IconBottomArrow : IconTopArrow} />
          </TouchableOpacity>
        </View>

        <View style={tw`bg-gray80 p-4 rounded-2xl mt-6`}>
          <View
            style={tw`flex-row items-center gap-4 border-b border-b-gray90 py-4`}>
            <SvgXml xml={IconMuseum} style={tw`flex-shrink`} />
            <Text
              style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}>
              Historical Landmark, Cultural Attraction, Museum Exhibit
            </Text>
          </View>
          <View
            style={tw`flex-row items-center gap-4 border-b border-b-gray90 py-4`}>
            <SvgXml xml={IconClock} style={tw`flex-shrink`} />
            <Text
              style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}>
              Mon to Sat: 8:30 AM – 7:00 PM{'\n'}
              Sun: 9:30 AM – 6:30 PM
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-4 py-4`}>
            <SvgXml xml={IconTicket} style={tw`flex-shrink`} />
            <Text
              style={tw`text-sm text-gray100 font-WorkRegular leading-[20px] flex-wrap flex-1`}>
              €18.50 euros per adult{'\n'}
              €14 euros for youths 13-17{'\n'}
              €10 euros for children 6-12{'\n'}
            </Text>
          </View>
        </View>

        <View style={tw`mt-6`}>
          <Text style={tw`text-black text-[20px] font-WorkMedium mb-6`}>
            Location
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`w-full h-[300px]`}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: 37.78825, longitude: -122.4324}}
              title="Marker Title"
              description="Marker Description"
            />
          </MapView>
        </View>
      </ScrollView>

      <View style={tw`flex-row items-center gap-4 pb-4 pt-2 px-[4%]`}>
        <TouchableOpacity
          style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1`}
          onPress={() => setAddOnBucketListModalVisible(true)}>
          <SvgXml xml={IconColoredHeart} />
          <Text style={tw`text-sm font-WorkRegular text-violet100`}>
            Bucket List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSaveBucketListModalVisible(true)}}
          style={tw`border-violet100 bg-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 flex-1`}>
          <SvgXml xml={IconTik} />
          <Text style={tw`text-sm font-WorkRegular text-white`}>Visited</Text>
        </TouchableOpacity>
      </View>

      <NormalModal
        visible={addOnBucketListModalVisible}
        setVisible={setAddOnBucketListModalVisible}
        disabled
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`flex-col items-center justify-between`}>
          <Text style={tw`text-2xl text-black font-WorkBold font-bold mt-2 text-center`}>
            Added to bucket list successfully
          </Text>
          <Text
            style={tw`text-black text-base font-WorkRegular mt-2 text-center`}>
            This place has been added to your bucket list
          </Text>
          <TouchableOpacity
            onPress={() => setAddOnBucketListModalVisible(false)}
            style={tw`border-violet100 bg-violet100 border py-2 mt-2 w-full rounded-full flex-row items-center justify-center gap-3`}>
            <Text style={tw`text-sm font-WorkRegular text-white`}>Done</Text>
          </TouchableOpacity>
        </View>
      </NormalModal>

      <NormalModal
        visible={saveBucketListModalVisible}
        setVisible={setSaveBucketListModalVisible}
        disabled
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-white p-4 rounded-2xl`}>
        <View style={tw`flex-col items-center justify-between`}>
          <Text style={tw`text-4xl`}>🎉</Text>
          <Text style={tw`text-2xl text-black font-WorkBold font-bold mt-2`}>
            Congratulations!
          </Text>
          <View style={tw`flex-row items-center gap-3 mt-3`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Image
                source={require('../../../assets/images/coin.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                50 coins
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-1`}>
              <Image
                source={require('../../../assets/images/trophy.png')}
                style={tw`h-6 w-6`}
              />
              <Text style={tw`text-gray100 text-xs font-WorkRegular`}>
                100 XP
              </Text>
            </View>
          </View>
          <Text
            style={tw`text-black text-base font-WorkRegular mt-3 text-center`}>
            You’ve received 50 coins & {'\n'}100 XP{' '}
          </Text>
          <TouchableOpacity
            onPress={() => setSaveBucketListModalVisible(false)}
            style={tw`border-violet100 bg-violet100 border py-2 mt-2 w-full rounded-full flex-row items-center justify-center gap-3`}>
            <Text style={tw`text-sm font-WorkRegular text-white`}>Done</Text>
          </TouchableOpacity>
        </View>
      </NormalModal>

    </View>
  );
};

export default DestinationDetails;
