import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useBuyDigitalSouvenirMutation,
  useEquipDigitalSouvenirMutation,
} from '../../../redux/apiSlices/equipmentSlice';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconLock2} from '../../../assets/icons/Icons';
import tw from '../../../lib/tailwind';
import {makeImage} from '../../../redux/api/baseApi';
import {PrimaryColor} from '../../utils/utils';

const SouvenirsCard = ({digital}: {digital: any}) => {
  const [buySouvenir, {isLoading: isLoadingBuy}] =
    useBuyDigitalSouvenirMutation();
  const [equipSouvenir, {isLoading: isLoadingEquip}] =
    useEquipDigitalSouvenirMutation();

  return (
    <TouchableOpacity
      disabled={true}
      style={[
        tw`w-[48%] items-center bg-white dark:bg-primaryDark p-3 rounded-2xl `,
        {
          borderColor: 'rgba(0,0,0,.1)',
          borderWidth: 1,
          opacity: digital?.status === 'locked' ? 0.5 : 1,
        },
      ]}>
      <View style={tw`w-full items-end justify-end h-4`}>
        {digital?.status === 'locked' && <SvgXml xml={IconLock2} />}
      </View>
      <Image
        // tintColor={'rgba(0,0,0,.1)'}
        // blurRadius={100}

        resizeMode="contain"
        source={{uri: makeImage(digital?.avatar)}}
        style={tw`h-16 aspect-square rounded-full`}
      />
      <Text
        style={tw`text-black dark:text-white text-base font-WorkMedium font-500 my-1`}>
        {digital?.name || 'No Name Available'}
      </Text>

      {digital?.purchase_status === true ? (
        <>
          {digital?.equip_status ? (
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
                equipSouvenir({
                  id: digital?.id,
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
          disabled={digital?.status === 'locked'}
          onPress={() => {
            buySouvenir({
              id: digital?.id,
              _method: 'PUT',
            });
            // equipdigital(avatar?.id);
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
            {digital?.cost}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SouvenirsCard;
