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
        WorkRegular: 'WorkSans-Regular',
        WorkSemiBold: 'WorkSans-SemiBold',
        WorkThin: 'WorkSans-Thin',
      },

      colors: {
        black: '#24272b',
        gray100: '#9ba5b2',
        gray90: '#EFEFEF',
        gray80: '#F9F8FF',
        red: '#d34635',
        violet100: '#8c78ea',
        violet90: '#e5d6fb',
        pink100: '#fc5d88',
        pink90: '#fadadb',
        blue100: '#32b1b4',
        blue90: '#ebf1ff',
        green100: '#97c1a9',
        green90: '#f0ffec',
        brown100: '#cc7b70',
        brown90: '#f5c69b',
        brown80: '#fffdc7',
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
