import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({percentage}) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Thickness of the stroke
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={tw`justify-center items-center my-5`}>
      <Svg
        width={radius * 1.2}
        height={radius * 1.2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#F4F2FD"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#8C78EA"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View style={tw`absolute justify-center items-center`}>
        <Text
          style={tw`text-xs font-WorkMedium text-black dark:text-white`}>{`${progress}%`}</Text>
      </View>
    </View>
  );
};

export default CircularProgress;
