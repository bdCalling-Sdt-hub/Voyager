import {Dimensions} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';

export const LStorage = new MMKVLoader().initialize();

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
