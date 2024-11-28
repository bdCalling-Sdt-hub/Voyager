import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from '../../../lib/tailwind';
import users from '../../../utils/json/users.json';
const FriendsList = ({navigation}: any) => {
  return (
    <View style={tw`gap-y-2`}>
      {users?.map((item: any) => (
        <TouchableOpacity
          style={tw`px-2 py-1 rounded-3xl border border-gray80 flex-row items-center gap-4`}
          key={item?.id}
          onPress={() => {
            navigation?.navigate('OthersProfile');
            console.log("object")
          }}>
          <Image
            source={{
              uri: item?.avatar,
            }}
            style={tw`w-16 h-16 rounded-full`}
          />
          <View style={tw`flex-shrink`}>
            <Text style={tw`text-black dark:text-white text-base font-600 font-WorkSemiBold`}>
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FriendsList;
