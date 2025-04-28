import React, {useState} from 'react';

import Video from 'react-native-video';
import tw from '../../lib/tailwind';
import {useValidateTokenQuery} from '../../redux/apiSlices/authApiSlice';

const Splash = ({navigation}: any) => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const onError = (error: any) => {
    console.error('Video Error:', error);
  };

  const {data} = useValidateTokenQuery({});

  return (
    <>
      <Video
        source={require('../../assets/videos/SplashScreen.mp4')}
        onError={onError}
        resizeMode="cover"
        paused={isVideoPaused}
        onEnd={() => {
          data?.token_status
            ? navigation.replace('BottomRoutes')
            : navigation.replace('Login');
          setIsVideoPaused(true);
        }}
        style={tw`h-full w-full`}
      />
    </>
  );
};

export default Splash;
