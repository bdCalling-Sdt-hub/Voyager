import {Wander} from 'react-native-animated-spinkit';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import React from 'react';
import {Modal} from 'react-native';
import tw from '../../lib/tailwind';

interface LoadingModalProps {
  visible: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingModal = ({setVisible, visible}: LoadingModalProps) => {
  return (
    <Modal
      transparent
      //   statusBarTranslucent
      visible={visible}
      onDismiss={() => setVisible && setVisible(!visible)}
      animationType={'fade'}>
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(1000)}
        style={[
          tw` absolute z-50  h-full w-full items-center justify-center gap-4`,
          {backgroundColor: 'rgba(123, 99, 235,0.3)'},
        ]}>
        <Wander size={30} color={'white'} />
        {/* <Bounce size={30} color={'white'} /> */}
        {/* <Chase size={30} color={'white'} /> */}
        {/* <Circle size={30} color={'white'} /> */}
        {/* <CircleFade size={30} color={'white'} /> */}
        {/* <Flow size={30} color={'white'} /> */}
        {/* <Fold size={30} color={'white'} /> */}
        {/* <Grid size={30} color={'white'} /> */}
        {/* <Pulse size={30} color={'white'} /> */}
        {/* <Plane size={30} color={'white'} /> */}
        {/* <Swing size={30} color={'white'} /> */}
        {/* <Wave size={35} color={'white'} /> */}
      </Animated.View>
    </Modal>
  );
};

export default LoadingModal;
