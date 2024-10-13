// import React from 'react';
// import {View, Text} from 'react-native';
// import tw from '../../../lib/tailwind';

// const ProgressBar = ({percentage}: any) => {
//   const progressWidth = `${percentage}%`;
//   return (
//     <View style={tw`w-full h-6 bg-pink-100 rounded-full relative`}>
//       <View
//         style={[tw`h-full bg-pink-500 rounded-full`, {width: progressWidth}]}
//       />
//       <View
//         style={[
//           tw`absolute h-6 w-6 bg-pink-500 rounded-full border-2 border-white`,
//           {left: `calc(${progressWidth} - 12px)`}, // Center the circle on the edge
//         ]}
//       />
//       <Text style={tw`absolute text-pink-500 right-0 mr-2`}>{percentage}%</Text>
//     </View>
//   );
// };

// export default ProgressBar;
