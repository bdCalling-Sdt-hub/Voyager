import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {ExpandableSection} from 'react-native-ui-lib';

import {
  IconBottomArrow,
  IconBottomArrowDark,
} from '../../../assets/icons/Icons';
import tw from '../../../lib/tailwind';

const Expend = () => {
  const [expend, setExpended] = React.useState(false);
  return (
    <View style={tw`mx-[4%] gap-2 py-6 border-b border-b-gray90`}>
      <ExpandableSection
        expanded={expend}
        sectionHeader={
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`text-black dark:text-white font-WorkBold text-base`}>
              What is the purpose of this app?
            </Text>
            <SvgXml xml={IconBottomArrowDark} style={tw`pr-4`} />
          </View>
        }
        onPress={() => setExpended(!expend)}>
        <View style={tw`my-2`}>
          <Text style={tw`text-white font-WorkRegular text-sm`}>
            This app allows users to transfer funds between wallets securely and
            efficiently. It simplifies peer-to-peer financial transactions with
            minimal fees and maximum security.
          </Text>
        </View>
      </ExpandableSection>
    </View>
  );
};

export default Expend;
