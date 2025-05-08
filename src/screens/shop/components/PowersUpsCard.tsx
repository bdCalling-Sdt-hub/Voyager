import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useBuyPowerUpsMutation,
  useEquipPowerUpsMutation,
} from '../../../redux/apiSlices/equipmentSlice';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconLock2} from '../../../assets/icons/Icons';
import tw from '../../../lib/tailwind';
import {makeImage} from '../../../redux/api/baseApi';
import {PrimaryColor} from '../../utils/utils';

const PowersUpsCard = ({item}: {item: any}) => {
  const [equipPowerUps, {isLoading: isLoadingEquip}] =
    useEquipPowerUpsMutation();
  const [buyPowerUps, {isLoading: isLoadingBuy}] = useBuyPowerUpsMutation();
  return (
    <TouchableOpacity
      disabled={true}
      style={[
        tw`border flex-row items-center  border-gray90 dark:border-darkBg rounded-2xl p-4`,
        {
          borderColor: 'rgba(0,0,0,.1)',
          borderWidth: 1,
          opacity: item?.status === 'locked' ? 0.5 : 1,
        },
      ]}>
      <View style={tw`flex-1`}>
        <View style={tw`  h-4`}>
          {item?.status === 'locked' && <SvgXml xml={IconLock2} />}
        </View>
        <View style={tw`flex-row items-center  gap-2`}>
          <Image
            source={{
              uri: makeImage(item?.avatar),
            }}
            style={tw`w-18 h-18`}
          />
          <View>
            <Text
              style={tw`text-black dark:text-white text-base font-WorkSemiBold font-600`}>
              {item?.option}
            </Text>
            <Text style={tw`text-gray100 text-sm font-WorkRegular font-400`}>
              {item?.short_description}
            </Text>
          </View>
        </View>
      </View>
      <View style={tw``}>
        {item?.purchage_status === true ? (
          <>
            {item?.equip_status ? (
              <TouchableOpacity
                disabled
                style={[
                  tw`flex-row  items-center gap-2 border border-gray-200 rounded-full py-0.5 px-3`,
                ]}>
                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  Equipped
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  equipPowerUps({
                    id: item?.id,
                    _method: 'PUT',
                  });
                }}
                style={[
                  tw`flex-row items-center gap-2 border border-gray-200 rounded-full py-0.5 px-3`,
                ]}>
                {isLoadingEquip ? (
                  <ActivityIndicator color={PrimaryColor} size={'small'} />
                ) : (
                  <Text
                    style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                    Equip
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity
            disabled={item?.status === 'locked'}
            onPress={() => {
              buyPowerUps({
                id: item?.id,
                _method: 'PUT',
              });
              // equipitem(item?.id);
            }}
            style={[
              tw`flex-row items-center gap-2 border border-gold rounded-full py-0.5 px-2`,
            ]}>
            {isLoadingBuy ? (
              <ActivityIndicator color={PrimaryColor} size={'small'} />
            ) : (
              <>
                <Image
                  source={require('../../../assets/images/coin.png')}
                  style={tw`h-7 w-7`}
                />

                <Text
                  style={tw`text-black dark:text-white text-sm font-WorkMedium font-500`}>
                  {item?.cost}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PowersUpsCard;
