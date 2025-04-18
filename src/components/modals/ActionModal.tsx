import React, {SetStateAction} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import tw from '../../lib/tailwind';

export interface IActionModalDataProp {
  title?: string;
  icon?: React.ReactNode;
  titleStyle?: any;
  enableBoth?: boolean;
  customComponent?: React.ReactNode;
  onPress?: () => void;
}

interface IActionModalProps {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  actionData?: Array<IActionModalDataProp>;
  containerStyle?: any;
}

const ActionModal = ({
  setVisible,
  visible,
  actionData,
  containerStyle,
}: IActionModalProps) => {
  return (
    <>
      {visible && (
        <Pressable
          onPress={() => setVisible(!visible)}
          style={[
            tw`absolute w-full h-full z-10`,
            {
              // backgroundColor: 'rgba(0,0,0,0.2)',
            },
          ]}>
          <Pressable
            onPress={e => e.stopPropagation()} // Prevent closing modal when clicking inside
            style={[
              tw`absolute shadow-lg bg-white w-[55%] top-[5%] left-[4%] rounded-3xl px-5 py-4 pt-7 z-20 gap-3`,
              containerStyle,
            ]}>
            {actionData?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <>
                    {item.enableBoth ? (
                      <>
                        <View style={tw`pb-4 flex-row justify-between`}>
                          <Text
                            style={[
                              tw`text-violet100 font-WorkBold text-sm`,
                              item.titleStyle,
                            ]}>
                            {item.title}
                          </Text>
                          <View>{item.customComponent}</View>
                        </View>
                      </>
                    ) : (
                      <>
                        {item.customComponent ? (
                          <View style={tw`pb-4`}>{item.customComponent}</View>
                        ) : (
                          <TouchableOpacity
                            style={tw`pb-4`}
                            onPress={item.onPress}>
                            <Text
                              style={[
                                tw`text-primaryBase font-LexDecaSemiBold text-sm`,
                                item.titleStyle,
                              ]}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </>
                </React.Fragment>
              );
            })}
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default React.memo(ActionModal);
