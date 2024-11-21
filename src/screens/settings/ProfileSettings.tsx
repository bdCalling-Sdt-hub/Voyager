import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import CountryDropdown from './CountryDropdown';
import {
  IconFacebook,
  IconInstagram,
  IconLightCamera,
} from '../../assets/icons/Icons';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import NormalModal from '../../components/modals/NormalModal';
import {SvgXml} from 'react-native-svg';

const ProfileSettings = ({navigation}: any) => {
  const [bucketlistPrivacy, setBucketlistPrivacy] = useState('public');
  const [profilePrivacy, setProfilePrivacy] = useState('public');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
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
                source={require('../../assets/images/avatar1.png')}
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
                  placeholder="You Name"
                  defaultValue="Henry William"
                  placeholderTextColor={'#9ba5b2'}
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
                <Text style={tw`text-lg text-black dark:text-white font-WorkMedium mb-2`}>
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
                <Text style={tw`text-lg text-black dark:text-white font-WorkMedium mb-2`}>
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
        onPress={() => {
          navigation?.navigate('Settings');
        }}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Update
        </Text>
      </TouchableOpacity>
      <NormalModal
        setVisible={setAvatarModalVisible}
        visible={avatarModalVisible}
        layerContainerStyle={tw`self-center items-center justify-center h-full w-[80%]`}
        containerStyle={tw`bg-gray80 p-4 rounded-2xl`}>
        <Text style={tw`text-black text-lg font-WorkSemiBold font-600`}>
          Choose your avatar
        </Text>

        <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
          <View
            style={tw`w-[48%] items-center bg-white p-4 rounded-2xl mb-2.5`}>
            <Image
              source={require('../../assets/images/avatar2.png')}
              style={tw`w-14 h-14 rounded-full`}
            />
            <Text
              style={tw`text-black text-base font-WorkMedium font-500 my-1`}>
              Adventurer
            </Text>

            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                300
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tw`w-[48%] items-center bg-white p-4 rounded-2xl mb-2.5`}>
            <Image
              source={require('../../assets/images/avatar3.png')}
              style={tw`w-14 h-14 rounded-full`}
            />
            <Text
              style={tw`text-black text-base font-WorkMedium font-500 my-1`}>
              Explorer
            </Text>

            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                200
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tw`w-[48%] items-center bg-white p-4 rounded-2xl mb-2.5`}>
            <Image
              source={require('../../assets/images/avatar4.png')}
              style={tw`w-14 h-14 rounded-full`}
            />
            <Text
              style={tw`text-black text-base font-WorkMedium font-500 my-1`}>
              Wanderer
            </Text>

            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                300
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tw`w-[48%] items-center bg-white p-4 rounded-2xl mb-2.5`}>
            <Image
              source={require('../../assets/images/avatar5.png')}
              style={tw`w-14 h-14 rounded-full`}
            />
            <Text
              style={tw`text-black text-base font-WorkMedium font-500 my-1`}>
              Jetsetter
            </Text>

            <TouchableOpacity
              style={tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`}>
              <Image
                source={require('../../assets/images/coin.png')}
                style={tw`h-7 w-7`}
              />
              <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                400
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default ProfileSettings;
