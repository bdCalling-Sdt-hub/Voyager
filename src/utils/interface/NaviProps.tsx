import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface NavigProps<RouteParamsDataType> {
  navigation?: NavigationProp<ParamListBase>;
  route?: RouteProp<{params: RouteParamsDataType | any}, 'params'>;
}
