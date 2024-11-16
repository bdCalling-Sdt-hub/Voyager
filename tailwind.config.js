const {blue} = require('react-native-reanimated/lib/typescript/Colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    screens: {
      sm: '300px',
      md: '400px',
      lg: '880px',
      tablet: '1024px',
    },
    extend: {
      fontFamily: {
        // Work Sans
        WorkBold: 'WorkSans-Bold',
        WorkExtraBold: 'WorkSans-ExtraBold',
        WorkBold: 'WorkSans',
        WorkBold: 'WorkSans',
        WorkExtraLight: 'WorkSans-ExtraLight',
        WorkLight: 'WorkSans-Light',
        WorkMedium: 'WorkSans-Medium',
        WorkRegular: 'WorkSans-Regular',
        WorkSemiBold: 'WorkSans-SemiBold',
        WorkThin: 'WorkSans-Thin',
      },

      colors: {
        black: '#24272b',
        gray100: '#9ba5b2',
        gray90: '#EFEFEF',
        gray80: '#F9F8FF',
        gray70: '#6C6E71',
        gray60: '#A5A3A9',
        gray50: '#BBBCBD',
        red: '#d34635',
        violet100: '#8c78ea',
        violet90: '#e5d6fb',
        pink100: '#fc5d88',
        pink90: '#fadadb',
        pink80: '#FECDDA',
        blue100: '#32b1b4',
        blue90: '#ebf1ff',
        blue80: '#BFE7E8',
        green100: '#97c1a9',
        green90: '#f0ffec',
        brown100: '#cc7b70',
        brown90: '#f5c69b',
        brown80: '#fffdc7',
        brown70: '#FFF6ED',
        violet80: '#DBD5F8',
        gold: '#E89A46',
        dottedBorder: '#E9E9EA',
        radioBg: '#F4F2FD',
        tableBody: '#2C2C2C',
        placeholderColor: '#9A9C9D',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
