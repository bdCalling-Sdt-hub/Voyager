import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import users from '../../utils/json/users.json';
const Request = () => {
  return (
    <View style={tw`gap-y-2`}>
      {users?.map((item: any) => (
        <TouchableOpacity
          style={tw`px-2 py-1 rounded-3xl border border-gray80 flex-row items-center gap-4`}
          key={item?.id}>
          <Image
            source={{
              uri: item?.avatar,
            }}
            style={tw`w-16 h-16 rounded-full`}
          />
          <View style={tw`flex-shrink gap-y-1.5`}>
            <Text style={tw`text-black text-base font-600 font-WorkSemiBold`}>
              {item?.name}
            </Text>
            {item?.isAcceptedRequest ? (
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`border-[2px] border-violet100 w-full pt-1 pb-2 justify-center rounded-full items-center`}>
                  <Text
                    style={tw`text-violet100 text-base font-000 font-WorkSemiBold`}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-2`}>
                <TouchableOpacity
                  style={tw`bg-violet100 border-[2px] border-violet100 w-20 pt-1 pb-2 justify-center rounded-full items-center`}>
                  <Text
                    style={tw`text-white text-base font-000 font-WorkSemiBold`}>
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`w-20 pt-1 border-[2px] border-transparent pb-2 justify-center rounded-full items-center`}>
                  <Text
                    style={tw`text-black text-base font-000 font-WorkSemiBold`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* <View style={tw`flex-row items-center gap-2`}>
              <TouchableOpacity
                style={tw`bg-violet100 w-20 pt-1 pb-2 justify-center rounded-full items-center`}>
                <Text
                  style={tw`text-white text-base font-000 font-WorkSemiBold`}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-20 pt-1 pb-2 justify-center rounded-full items-center`}>
                <Text
                  style={tw`text-black text-base font-000 font-WorkSemiBold`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Request;
