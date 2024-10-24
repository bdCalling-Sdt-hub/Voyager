import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import tw from 'twrnc'; // Ensure you have NativeWind set up

const Test = () => {
  return (
    <Swiper
      style={tw`h-72`} // Height of the swiper
      dot={<View style={tw`bg-white w-2 h-2 rounded-full mx-1`} />} // Dot styling
      activeDot={<View style={tw`bg-green-600 w-3 h-3 rounded-full mx-1`} />} // Active dot styling
      paginationStyle={tw`bottom-2`} // Position the pagination
      loop={false} // Disable looping for two slides
    >
      {/* Slide 1 */}
      <ImageBackground
        source={{ uri: 'https://i.pravatar.cc/150?img=3' }} // Background image for Slide 1
        style={tw`flex-1 justify-center items-center`}
      >
        <Text style={tw`text-white text-2xl`}>Welcome to the App!</Text>
      </ImageBackground>

      {/* Slide 2 */}
      <ImageBackground
        source={{ uri: 'https://i.pravatar.cc/150?img=4' }} // Background image for Slide 2
        style={tw`flex-1 justify-center items-center`}
      >
        <Text style={tw`text-white text-2xl`}>Enjoy your experience!</Text>
      </ImageBackground>
    </Swiper>
  );
};

export default Test;
