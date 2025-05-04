import {Text, TouchableOpacity, View} from 'react-native';
import {
  IconDashboard,
  IconExplore,
  IconHeart,
  IconTrophy,
  IconUser,
} from '../assets/icons/Icons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import Dashboard from '../screens/dashboard/Dashboard';
import BucketList from '../screens/home/BucketList';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import WeeklyQuestions from '../screens/questions/WeeklyQuestions';

const Tab = createBottomTabNavigator();

function BottomRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: tw`h-20 bg-white dark:bg-primaryDark shadow-none border-t border-t-white dark:border-t-darkBg`,
        tabBarItemStyle: {
          marginVertical: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'NunitoSansBold',
          textTransform: 'capitalize',
        },
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused}) => {
          let icon;

          switch (route.name) {
            case 'Dashboard':
              icon = IconDashboard;
              break;
            case 'Home':
              icon = IconExplore;
              break;
            case 'Places':
              icon = IconHeart;
              break;
            case 'Quests':
              icon = IconTrophy;
              break;
            case 'Profile':
              icon = IconUser;
              break;
            default:
              icon = IconDashboard;
              break;
          }

          return (
            <View
              style={tw`${
                focused
                  ? 'bg-black h-12 w-12 rounded-full flex-row items-center justify-center'
                  : ''
              }`}>
              <SvgXml xml={icon} />
            </View>
          );
        },
        tabBarLabel: ({focused}) =>
          focused ? null : (
            <Text style={tw`text-black dark:text-white text-xs`}>
              {route.name === 'Home'
                ? 'Explore'
                : route.name === 'BucketList'
                ? 'Goals'
                : route.name}
            </Text>
          ),
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="BucketList" component={BucketList} />
      <Tab.Screen name="Quests" component={WeeklyQuestions} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomRoutes;
