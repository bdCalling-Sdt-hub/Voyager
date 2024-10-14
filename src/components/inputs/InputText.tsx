import {Text, TouchableOpacity, View} from 'react-native';
import {TextField, TextFieldProps} from 'react-native-ui-lib';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface InputTextProps
  extends Omit<TextFieldProps, 'containerStyle' | 'fieldStyle'> {
  onPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string;
  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  focusStyle?: any;
}

const InputText = ({
  onPress,
  svgFirstIcon,
  svgSecondIcon,
  containerStyle,
  fieldStyle,
  focusStyle,
  Component,
  editable,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <View
      style={[
        tw`flex-1 rounded-2xl px-4 bg-white flex-row items-center gap-3 border border-gray90 h-14`,
        containerStyle,
        focus && focusStyle,
      ]}>
      {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}

      <TextField
        editable={editable}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        containerStyle={[tw`flex-1`]}
        fieldStyle={[
          tw`${inputProps?.floatingPlaceholder ? 'pb-4' : 'p-0'}`,
          fieldStyle,
        ]}
        {...inputProps} // Spread props here
      />
      {Component}
      {svgSecondIcon && (
        <TouchableOpacity onPress={onPress}>
          <SvgXml xml={svgSecondIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;
