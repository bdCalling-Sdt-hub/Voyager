import {Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {IconDashboard, IconLocation} from '../assets/icons/Icons';
import Dashboard from '../screens/dashboard/Dashboard';
import Home from '../screens/home/Home';
import NextDestination from '../screens/home/NextDestination';

const Tab = createBottomTabNavigator();

function BottomRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: tw`h-16 bg-white shadow-none border border-white`,
        tabBarItemStyle: {
          marginVertical: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'NunitoSansBold',
          fontSize: 14,
          textTransform: 'capitalize',
        },
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused}) => {
          let icon: any;

          switch (route.name) {
            case 'Dashboard':
              icon = IconDashboard;
              break;
            case 'Home':
              icon = IconLocation;
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
        tabBarLabel: () => null, // Hides the title
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export default BottomRoutes;
