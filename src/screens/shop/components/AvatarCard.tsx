import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useBuyShopAvatarMutation,
  useEquipAvatarMutation,
} from '../../../redux/apiSlices/equipmentSlice';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconLock2} from '../../../assets/icons/Icons';
import tw from '../../../lib/tailwind';
import {makeImage} from '../../../redux/api/baseApi';
import {AvatarData} from '../../utils/types';
import {PrimaryColor} from '../../utils/utils';

const AvatarCard = ({avatar}: {avatar: AvatarData}) => {
  const [buyAvatar, {isLoading: isLoadingBuy}] = useBuyShopAvatarMutation();
  const [equipAvatar, {isLoading: isLoadingEquip}] = useEquipAvatarMutation();
  return (
    <Pressable
      // disabled={true}
      style={[
        tw`w-[48%] items-center bg-white dark:bg-primaryDark p-3 rounded-2xl `,
        {
          borderColor: 'rgba(0,0,0,.1)',
          borderWidth: 1,
          opacity: avatar?.status === 'locked' ? 0.5 : 1,
        },
      ]}>
      <View style={tw`w-full items-end justify-end h-4`}>
        {avatar?.status === 'locked' && <SvgXml xml={IconLock2} />}
      </View>
      <Image
        // tintColor={'rgba(0,0,0,.1)'}
        // blurRadius={100}

        resizeMode="contain"
        source={{uri: makeImage(avatar?.avatar)}}
        style={tw`h-16 aspect-square rounded-full`}
      />
      <Text
        style={tw`text-black dark:text-white text-base font-WorkMedium font-500 my-1`}>
        {avatar?.name || 'No Name Available'}
      </Text>

      {avatar?.purchase_status === true ? (
        <>
          {avatar?.equip_status ? (
            <TouchableOpacity
              disabled
              style={[
                tw`flex-row items-center gap-2 border border-gray-200 rounded-full py-0.5 px-3`,
              ]}>
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                Equipped
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                equipAvatar({
                  id: avatar?.id,
                  _method: 'PUT',
                });
              }}
              style={[
                tw`flex-row items-center gap-2 border border-gray-200 rounded-full py-0.5 px-3`,
              ]}>
              {isLoadingEquip && (
                <ActivityIndicator color={PrimaryColor} size={'small'} />
              )}
              <Text
                style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                Equip
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity
          disabled={avatar?.status === 'locked'}
          onPress={() => {
            buyAvatar({
              id: avatar?.id,
              _method: 'PUT',
            });
            // equipAvatar(avatar?.id);
          }}
          style={[
            tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`,
          ]}>
          {isLoadingBuy && (
            <ActivityIndicator color={PrimaryColor} size={'small'} />
          )}
          <Image
            source={require('../../../assets/images/coin.png')}
            style={tw`h-7 w-7`}
          />

          <Text
            style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
            {avatar?.cost}
          </Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default AvatarCard;
