import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import {IconClose, IconLightCamera} from '../../assets/icons/Icons';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../redux/apiSlices/authApiSlice';

import {SvgXml} from 'react-native-svg';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {useGetAvatarQuery} from '../../redux/apiSlices/equipmentSlice';
import AvatarCard from '../shop/components/AvatarCard';
import CountryDropdown from './CountryDropdown';

const ProfileSettings = ({navigation}: any) => {
  const {data: profileData, error} = useGetProfileQuery({});
  const [bucketlistPrivacy, setBucketlistPrivacy] = useState(
    profileData?.data?.bucketlist_privacy || 'public',
  );
  const [profilePrivacy, setProfilePrivacy] = useState(
    profileData?.data?.privacy || 'public',
  );
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  // rtk query hooks
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const {data: avatarData} = useGetAvatarQuery({});

  const [name, setName] = useState(profileData?.data?.full_name || '');
  const [country, setCounty] = useState({
    country: profileData?.data?.country || '',
    code: profileData?.data?.country_abbreviated || '',
  });
  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        full_name: name,
        country: country.country,
        country_abbreviated: country.code,
        privacy: profilePrivacy,
        bucketlist_privacy: bucketlistPrivacy,
      }).unwrap();
      // console.log('response of update profile: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Updating profile failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        navigation?.navigate('Settings');
      }
    } catch (err: any) {
      Alert.alert(
        'Updating profile Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  // console.log(country);

  return (
    <View style={tw`h-full bg-white dark:bg-primaryDark px-[4%] pb-2`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={'Profile Settings'}
          containerStyle={tw`mt-2`}
          isIcon={true}
          hideRightIcon={true}
        />

        {/* body */}
        <View>
          <View style={tw`items-center`}>
            <TouchableOpacity>
              <Image
                source={{uri: makeImage(profileData?.data?.image)}}
                style={tw`h-18 w-18 rounded-full`}
              />
              <TouchableOpacity
                style={tw`bg-violet100 w-8 h-8 items-center justify-center rounded-full absolute bottom-1 right-[-2]`}
                onPress={() => setAvatarModalVisible(true)}>
                <SvgXml xml={IconLightCamera} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text
              style={tw`text-gray100 text-sm font-WorkRegular font-400 mt-2`}>
              Upload profile picture or choose avatar
            </Text>
          </View>

          {/* General Information */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
            <Text
              style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
              General Information
            </Text>
            <View style={tw`gap-y-2`}>
              <View style={tw`h-12`}>
                <InputText
                  placeholder="Your Name"
                  placeholderTextColor={'#9ba5b2'}
                  value={name}
                  onChangeText={text => setName(text)}
                  style={tw`text-black dark:text-white text-base font-WorkMedium font-500`}
                />
              </View>
              <CountryDropdown
                placeholderText={country.country}
                searchPlaceholder={country.code}
                setCountry={setCounty}
              />
            </View>
          </View>

          {/* Social Links */}
          {/* <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
            <Text
              style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
              Social Links
            </Text>
            <View style={tw`gap-y-2`}>
              <View style={tw`h-12`}>
                <InputText
                  svgFirstIcon={IconFacebook}
                  placeholder="Facebook Profile Link"
                  placeholderTextColor={'#BBBCBD'}
                  style={tw`text-black text-base font-WorkMedium font-500`}
                />
              </View>
              <View style={tw`h-12`}>
                <InputText
                  svgFirstIcon={IconInstagram}
                  placeholder="Instagram Profile Link"
                  placeholderTextColor={'#BBBCBD'}
                  style={tw`text-black text-base font-WorkMedium font-500`}
                />
              </View>
            </View>
          </View> */}

          {/* privacy */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
            <Text
              style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
              Privacy
            </Text>
            <View style={tw`gap-y-2`}>
              <View style={tw`mt-2`}>
                <Text
                  style={tw`text-lg text-black dark:text-white font-WorkMedium mb-2`}>
                  Who can see your bucketlist?
                </Text>
                <RadioGroup
                  initialValue={bucketlistPrivacy}
                  onValueChange={(value: any) => {
                    setBucketlistPrivacy(value);
                  }}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Public"
                    value="public"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Friends Only"
                    value="friends_only"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Private"
                    value="private"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                </RadioGroup>
              </View>
              <View style={tw`mt-2`}>
                <Text
                  style={tw`text-lg text-black dark:text-white font-WorkMedium mb-2`}>
                  Who can see your profile information?
                </Text>
                <RadioGroup
                  initialValue={profilePrivacy}
                  onValueChange={(value: any) => setProfilePrivacy(value)}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Public"
                    value="public"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Friends Only"
                    value="friends_only"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Private"
                    value="private"
                    color="#8C78EA"
                    labelStyle={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}
                  />
                </RadioGroup>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={tw`bg-violet100 rounded-full p-3 mt-2`}
        onPress={handleUpdateProfile}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          {isLoading ? 'Updating...' : 'Update'}
        </Text>
      </TouchableOpacity>
      <NormalModal
        setVisible={setAvatarModalVisible}
        visible={avatarModalVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-gray80 p-4 h-4/5 rounded-2xl dark:bg-black`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text
            style={tw`text-black dark:text-white text-lg font-WorkSemiBold font-600`}>
            Choose your avatar
          </Text>
          <TouchableOpacity
            style={tw`p-2`}
            onPress={() => {
              setAvatarModalVisible(false);
            }}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={avatarData?.data?.avatars}
          numColumns={2}
          contentContainerStyle={tw`gap-2 mt-2`}
          columnWrapperStyle={tw`justify-between`}
          renderItem={({item, index}) => {
            return <AvatarCard avatar={item} />;
          }}
        />
      </NormalModal>
    </View>
  );
};

export default ProfileSettings;
