import {View, Text, Image} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconSearch} from '../../assets/icons/Icons';

interface Props {
  title: string;
  imageContainer?: any;
  titleContainer?: any;
  IconContainer?: any;
  titleStyle?: any;
  containerStyle?: any;
  icon?: any;
}
const Header = ({
  title,
  imageContainer,
  titleContainer,
  IconContainer,
  titleStyle,
  containerStyle,
  icon,
}: Props) => {
  return (
    <View
      style={[tw`flex-row items-center justify-between py-2`, containerStyle]}>
      <View style={[tw``, imageContainer]}>
        <Image
          source={require('../../assets/images/user.png')}
          style={tw`h-12 w-12 rounded-full`}
        />
      </View>
      <View style={[tw``, titleContainer]}>
        <Text style={[tw`text-black text-2xl font-WorkMedium`, titleStyle]}>
          {title}
        </Text>
      </View>
      <View
        style={[
          tw`border border-gray90 rounded-full h-10 w-10 flex items-center justify-center`,
          IconContainer,
        ]}>
        <SvgXml xml={icon || IconSearch} />
      </View>
    </View>
  );
};

export default Header;
