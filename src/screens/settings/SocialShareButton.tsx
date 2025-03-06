import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import tw from '../../lib/tailwind';

const SocialShareButton = () => {
  const viewShotRef = useRef();

  const captureAndShare = async () => {
    try {
      // Capture the UI as an image
      const uri = await viewShotRef.current.capture();
      console.log('Image saved to', uri);

      // Share the captured image
      const shareOptions = {
        title: 'Share via',
        url: uri, // Use the captured image URI
        subject: 'Check out this design!', // Subject for email or message apps
      };

      await Share.open(shareOptions);
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  };

  return (
    <View>
      {/* Use ViewShot to capture the UI */}
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <View>
          <Text style={tw`text-center font-bold text-3xl mb-2 text-blue-400`}>🎉 Congratulations! 🎉</Text>
          <Text>
            You've achieved something amazing! Share this moment with your friends.
          </Text>
        </View>
      </ViewShot>

      {/* Share Button */}
      <TouchableOpacity onPress={captureAndShare}>
        <Text>Share this Design</Text>
      </TouchableOpacity>
    </View>
  );
};



export default SocialShareButton;