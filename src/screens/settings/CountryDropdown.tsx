import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../utils/utils';

// countries json
const countries = [
  {label: 'Argentina', value: 'AR'},
  {label: 'Australia', value: 'AU'},
  {label: 'Bangladesh', value: 'BD'},
  {label: 'Belgium', value: 'BE'},
  {label: 'Brazil', value: 'BR'},
  {label: 'Canada', value: 'CA'},
  {label: 'Chile', value: 'CL'},
  {label: 'China', value: 'CN'},
  {label: 'Czech Republic', value: 'CZ'},
  {label: 'Egypt', value: 'EG'},
  {label: 'Finland', value: 'FI'},
  {label: 'France', value: 'FR'},
  {label: 'Germany', value: 'DE'},
  {label: 'Greece', value: 'GR'},
  {label: 'Hungary', value: 'HU'},
  {label: 'India', value: 'IN'},
  {label: 'Indonesia', value: 'ID'},
  {label: 'Ireland', value: 'IE'},
  {label: 'Italy', value: 'IT'},
  {label: 'Japan', value: 'JP'},
  {label: 'Kenya', value: 'KE'},
  {label: 'Malaysia', value: 'MY'},
  {label: 'Mexico', value: 'MX'},
  {label: 'Morocco', value: 'MA'},
  {label: 'Nigeria', value: 'NG'},
  {label: 'New Zealand', value: 'NZ'},
  {label: 'Peru', value: 'PE'},
  {label: 'Philippines', value: 'PH'},
  {label: 'Russia', value: 'RU'},
  {label: 'Saudi Arabia', value: 'SA'},
  {label: 'Singapore', value: 'SG'},
  {label: 'South Africa', value: 'ZA'},
  {label: 'South Korea', value: 'KR'},
  {label: 'Spain', value: 'ES'},
  {label: 'Sweden', value: 'SE'},
  {label: 'Switzerland', value: 'CH'},
  {label: 'Thailand', value: 'TH'},
  {label: 'United Arab Emirates', value: 'AE'},
  {label: 'United Kingdom', value: 'GB'},
  {label: 'United States', value: 'US'},
  {label: 'Vietnam', value: 'VN'},
];

const CountryDropdown = ({
  placeholderText,
  searchPlaceholder,
  setCountry,
}: {
  placeholderText?: string;
  searchPlaceholder?: string;
  setCountry?: any;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    searchPlaceholder || null,
  );
  const renderItem = (item: any) => {
    return (
      <View style={tw`flex-row items-center p-2`}>
        <Text style={tw`text-base`}>{item.label}</Text>
      </View>
    );
  };

  const getFlagUrl = (countryCode: string) => {
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  return (
    <View
      style={tw`flex-row items-center border border-gray90 dark:border-primaryDark bg-white dark:bg-primaryDark h-12 rounded-2xl p-2`}>
      {selectedCountry && (
        <Image
          source={{uri: getFlagUrl(selectedCountry)}}
          style={tw`w-6 h-6 mr-3 ml-2`}
        />
      )}
      {/* Dropdown */}
      <Dropdown
        style={tw`flex-1`}
        data={countries}
        labelField="label"
        containerStyle={tw`dark:bg-darkBg bg-white `}
        selectedTextStyle={tw`dark:text-white text-black text-base font-WorkMedium font-500`}
        valueField="value"
        placeholder={placeholderText || 'Select a country'}
        value={selectedCountry}
        onChange={item => {
          setSelectedCountry(item.value);
          setCountry &&
            setCountry({
              code: item.value,
              country: item.label,
            });
        }}
        renderItem={renderItem}
        search
        activeColor={PrimaryColor}
        searchPlaceholder={placeholderText || 'Search country'}
        placeholderStyle={tw`text-gray50 dark:text-gray100 text-base font-WorkMedium font-500 pl-2`}
      />
    </View>
  );
};

export default CountryDropdown;
