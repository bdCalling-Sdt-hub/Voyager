import React, {useState} from 'react';
import Video from 'react-native-video';
import tw from '../../lib/tailwind';

const Splash = ({navigation}: any) => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const onError = (error: any) => {
    console.error('Video Error:', error);
  };

  return (
    <Video
      source={require('../../assets/videos/SplashScreen.mp4')}
      onError={onError}
      resizeMode="cover"
      paused={isVideoPaused}
      onEnd={() => {
        navigation.navigate('Registration');
        setIsVideoPaused(true);
      }}
      style={tw`h-full w-full`}
    />
  );
};

export default Splash;
