import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {IconSearch} from '../../assets/icons/Icons';

const Settings = ({title = 'Settings', navigation}: any) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  return (
    <View style={tw`px-[4%]`}>
      <Header
        title={title || 'Bucket List'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        IconContainer={tw`${isSearchVisible ? 'bg-black' : ''}`}
        icon={IconSearch}
        onPressSearch={() => setSearchVisible(!isSearchVisible)}
        isSearchVisible={isSearchVisible}
      />
    </View>
  );
};

export default Settings;
