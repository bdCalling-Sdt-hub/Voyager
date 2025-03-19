import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import CountryDropdown from './CountryDropdown';
import {
  IconFacebook,
  IconInstagram,
  IconLightCamera,
  IconLock,
  IconLock2,
} from '../../assets/icons/Icons';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import NormalModal from '../../components/modals/NormalModal';
import {SvgXml} from 'react-native-svg';
import {
  useBuyAvatarMutation,
  useEquipAvatarMutation,
  useGetAvatarQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../android/app/src/redux/slice/ApiSlice';
import {AvatarData} from '../utils/types';
import {baseUrl} from '../utils/exports';

const ProfileSettings = ({navigation}: any) => {
  const [bucketlistPrivacy, setBucketlistPrivacy] = useState('public');
  const [profilePrivacy, setProfilePrivacy] = useState('public');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [name, setName] = useState('');

  // rtk query hooks
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const {data} = useGetAvatarQuery({});
  const [equipAvatar, {isLoading: isLoadingEquip}] = useEquipAvatarMutation();
  const [buyAvatar, {isLoading: isLoadingBuy}] = useBuyAvatarMutation();
  const {data: profileData, error} = useGetProfileQuery({});
  const {full_name, email, image, user_name, signup_date} = profileData?.data || {};
  const avatars = data?.data?.avatars || [];
  console.log('avatars checking: ', avatars);

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        full_name: name,
      });
      console.log('response of update profile: ', response);
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

  const handleEquipAvatar = async (id: number) => {
    try {
      const response = await equipAvatar({id});
      console.log('response of equip avatar: ', response);
      if (response?.error?.success === false) {
        Alert.alert(
          'Equipping avatar failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        setAvatarModalVisible(false);
        Alert.alert(
          'Equipping avatar Success',
          'Your avatar has been successfully equipped.',
        )
      }
    } catch (err: any) {
      Alert.alert(
        'Equipping avatar Failed',
        err?.message || 'An error occurred.',
      );
    }
  };

  // handle buy avatar
  const handleBuyAvatar = async (id: number) => {
    try {
      const response = await buyAvatar({id});
      if (response?.error) {
        Alert.alert(
          'Buying avatar Failed',
          response?.error?.message || 'An error occurred.',
        );
        return;
      } else {
        Alert.alert(
          'Buying avatar Success',
          'Your avatar has been successfully bought.',
        );
      }
      console.log('buy avatar data: ', response);
    } catch (err: any) {
      Alert.alert('Buying avatar Failed', err?.message || 'An error occurred.');
    }
  };

  console.log('avatars: ', avatars);
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
                source={image ? {uri: baseUrl + image} : require('../../assets/images/avatar1.png')}
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
              <CountryDropdown />
            </View>
          </View>

          {/* Social Links */}
          <View style={tw`bg-gray80 dark:bg-darkBg rounded-2xl p-4 mt-6`}>
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
          </View>

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
                  onValueChange={(value: any) => setBucketlistPrivacy(value)}
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
        containerStyle={tw`bg-gray80 p-4 rounded-2xl dark:bg-black`}>
        <Text
          style={tw`text-black dark:text-white text-lg font-WorkSemiBold font-600`}>
          Choose your avatar
        </Text>

        <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
          {avatars?.map((avatar: AvatarData, index: number) => (
            <TouchableOpacity
              onPress={() => handleEquipAvatar(avatar?.id)}
              disabled={avatar?.status !== 'unlocked'}
              key={index}
              style={tw`w-[48%] items-center bg-white dark:bg-primaryDark p-4 rounded-2xl mb-2.5`}>
              <View style={tw`w-full items-end justify-end h-4`}>
                {avatar?.status === 'locked' && <SvgXml xml={IconLock2} />}
              </View>
              <Image
                source={
                  avatar?.avatar
                    ? {uri: baseUrl + avatar?.avatar}
                    : require('../../assets/images/avatar2.png')
                }
                style={tw`w-14 h-14 rounded-full`}
              />
              <Text
                style={tw`text-black dark:text-white text-base font-WorkMedium font-500 my-1`}>
                {avatar?.name || 'No Name Available'}
              </Text>

              <TouchableOpacity
                disabled={avatar?.status === 'locked' || avatar?.purchase_status}
                onPress={() => handleBuyAvatar(avatar?.id)}
                style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
                {avatar?.purchase_status === false && (
                  <Image
                    source={require('../../assets/images/coin.png')}
                    style={tw`h-7 w-7`}
                  />
                )}
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  {avatar?.purchase_status === false
                    ? avatar?.cost || 0
                    : 'Get Avatar'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </NormalModal>
    </View>
  );
};

export default ProfileSettings;
