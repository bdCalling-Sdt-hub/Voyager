import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconAdd,
  IconNotification,
  IconSettings,
} from '../../assets/icons/Icons';
import Achievements from './components/Achievements';

const Profile = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ScrollView style={tw`px-[4%] pt-2 bg-white h-full`}>
      <View>
        <View style={tw`flex-row items-start justify-between py-2`}>
          <TouchableOpacity style={[tw``]}>
            <View
              style={tw`h-12 w-12 rounded-full bg-white items-center justify-center border border-gray90`}>
              <SvgXml xml={IconSettings} />
            </View>
          </TouchableOpacity>
          <View style={[tw``]}>
            <Image
              source={require('../../assets/images/user.png')}
              style={tw`h-24 w-24 rounded-full`}
            />
          </View>
          <TouchableOpacity
            style={[
              tw`border border-gray90 rounded-full h-10 w-10 flex items-center justify-center`,
            ]}
            onPress={() => {
              navigation?.navigate('Notifications');
            }}>
            <SvgXml xml={IconNotification} />
            <View
              style={tw`bg-gold h-4 w-4 rounded-full items-center justify-center absolute top-1 right-1`}>
              <Text style={tw`text-white text-[8px] text-center`}>12</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={tw`text-black text-2xl font-WorkMedium text-center`}>
          Henry William
        </Text>
        <View style={tw`flex-row items-center mt-6`}>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Joined</Text>
            <Text style={tw`text-black text-lg font-WorkSemiBold`}>2024</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Friends</Text>
            <Text style={tw`text-black text-lg font-WorkSemiBold`}>10</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-gray70 text-sm font-WorkMedium`}>Coutnry</Text>
            <Image
              source={{uri: 'https://flagsapi.com/US/flat/64.png'}}
              style={tw`h-5 w-7 mt-1`}
            />
          </View>
        </View>
        <View style={tw`items-center mt-6 gap-y-4`}>
          <TouchableOpacity
            style={tw`border-violet100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}>
            <SvgXml xml={IconAdd} />
            <Text style={tw`text-sm font-WorkMedium text-violet100 font-500`}>
              Add Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`border-pink100 bg-pink100 border py-3 rounded-full flex-row items-center justify-center gap-3 w-full`}>
            <Text style={tw`text-sm font-WorkSemibold text-white font-600`}>
              Upgrade to Premium
            </Text>
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <View style={tw`mt-12 mb-6 flex-row items-center gap-4`}>
          <TouchableOpacity
            style={tw`${
              activeTab === 0 ? 'border-b-[2px] border-b-violet100' : ''
            }  pb-2`}
            onPress={() => setActiveTab(0)}>
            <Text
              style={tw` ${
                activeTab === 0 ? 'text-violet100' : 'text-gray100'
              } text-sm font-WorkBold font-700`}>
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activeTab === 1 ? 'border-b-[2px] border-b-violet100' : ''
            }  pb-2`}
            onPress={() => setActiveTab(1)}>
            <Text
              style={tw` ${
                activeTab === 1 ? 'text-violet100' : 'text-gray100'
              } text-sm font-WorkBold font-700`}>
              Visited
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`${
              activeTab === 2 ? 'border-b-[2px] border-b-violet100' : ''
            }  pb-2`}
            onPress={() => setActiveTab(2)}>
            <Text
              style={tw` ${
                activeTab === 2 ? 'text-violet100' : 'text-gray100'
              } text-sm font-WorkBold font-700`}>
              Friends
            </Text>
          </TouchableOpacity>
        </View>
        {/* achievements */}
        <Achievements />
      </View>
    </ScrollView>
  );
};

export default Profile;
