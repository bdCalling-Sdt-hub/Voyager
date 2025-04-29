import {Dimensions} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';

export const LStorage = new MMKVLoader().initialize();
export const PrimaryColor = '#8c78ea';

export const HIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

export const injectURLParams = (
  url: string,
  params: Record<string, any> = {},
) => {
  let queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${url}${queryParams ? `?${queryParams}` : ''}`;
};

export const makeColor = (type: 'city' | 'country' | 'attraction') => {
  switch (type) {
    case 'city':
      return '#FC5D88BF';
    case 'country':
      return '#FFA94DBF';
    case 'attraction':
      return '#8C78EABF';
    default:
      return '#000000'; // Default color if none match
  }
};
