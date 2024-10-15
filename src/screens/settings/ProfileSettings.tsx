import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import Header from '../../components/header/Header';
import InputText from '../../components/inputs/InputText';
import CountryDropdown from './CountryDropdown';
import {IconFacebook, IconInstagram} from '../../assets/icons/Icons';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';

const ProfileSettings = () => {
  const [bucketlistPrivacy, setBucketlistPrivacy] = useState('public');
  const [profilePrivacy, setProfilePrivacy] = useState('public');
  return (
    <View style={tw`h-full bg-white px-[4%] pb-2`}>
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
            </TouchableOpacity>
            <Text
              style={tw`text-gray100 text-sm font-WorkRegular font-400 mt-2`}>
              Upload profile picture or choose avatar
            </Text>
          </View>

          {/* General Information */}
          <View style={tw`bg-gray80 rounded-2xl p-4 mt-6`}>
            <Text
              style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
              General Information
            </Text>
            <View style={tw`gap-y-2`}>
              <View style={tw`h-12`}>
                <InputText
                  placeholder="You Name"
                  defaultValue="Henry William"
                  placeholderTextColor={'#BBBCBD'}
                  style={tw`text-black text-base font-WorkMedium font-500`}
                />
              </View>
              <CountryDropdown />
            </View>
          </View>

          {/* Social Links */}
          <View style={tw`bg-gray80 rounded-2xl p-4 mt-6`}>
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
          <View style={tw`bg-gray80 rounded-2xl p-4 mt-6`}>
            <Text
              style={tw`text-gray100 text-sm font-WorkMedium font-500 mb-3`}>
              Privacy
            </Text>
            <View style={tw`gap-y-2`}>
              <View style={tw`mt-2`}>
                <Text style={tw`text-lg text-black font-WorkMedium mb-2`}>
                  Who can see your bucketlist?
                </Text>
                <RadioGroup
                  onValueChange={(value: any) => setBucketlistPrivacy(value)}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Public"
                    value="public"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Friends Only"
                    value="friends_only"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Private"
                    value="private"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                </RadioGroup>
              </View>
              <View style={tw`mt-2`}>
                <Text style={tw`text-lg text-black font-WorkMedium mb-2`}>
                  Who can see your profile information?
                </Text>
                <RadioGroup
                  onValueChange={(value: any) => setProfilePrivacy(value)}
                  style={tw`gap-y-3 mt-1`}>
                  <RadioButton
                    label="Public"
                    value="public"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Friends Only"
                    value="friends_only"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                  <RadioButton
                    label="Private"
                    value="private"
                    color="#8C78EA"
                    labelStyle={tw`text-black text-sm font-WorkMedium font-500`}
                  />
                </RadioGroup>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={tw`bg-violet100 rounded-full p-3 mt-2`}>
        <Text
          style={tw`text-center text-white text-base font-WorkMedium font-500`}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettings;
