import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconAdd, IconClose} from '../../assets/icons/Icons';
import users from '../../utils/json/users.json';

const AddFriends = ({navigation}: any) => {
  return (
    <View style={tw`flex-row flex-wrap mt-2 justify-between`}>
      {users?.map((item: any) => (
        <TouchableOpacity
          style={tw`w-[48%] dark:bg-darkBg dark:border-darkBg items-center bg-white p-4 rounded-2xl mb-2.5 border border-gray90`}
          key={item?.id}
          onPress={() => {
            navigation?.navigate('OthersProfile');
          }}>
          <TouchableOpacity style={tw`items-end w-full`}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/avatar5.png')}
            style={tw`w-14 h-14 rounded-full`}
          />
          <Text style={tw`text-black dark:text-white text-sm font-WorkMedium font-500 my-1`}>
            {item?.name}
          </Text>

          <TouchableOpacity
            style={tw`flex-row w-full justify-center items-center gap-2 border border-violet100 rounded-full py-1.5 px-2`}>
            <SvgXml xml={IconAdd} />
            <Text style={tw`text-violet100 text-base font-WorkMedium font-500`}>
              Add
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AddFriends;
