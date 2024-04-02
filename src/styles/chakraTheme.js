import { extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
  colors: {
    primary: {
      100: '#E2E3FE',
      200: '#B6B7FD',
      300: '#888BFC',
      400: '#575DFB',
      500: '#1026F2',
      600: '#06149A',
      700: '#010548',
    },
    secondary: {
      50: '#E2E1FA',
      100: '#C4C2F7',
      200: '#A6A4F4',
      300: '#8886F1',
      400: '#6A68EE',
      500: '#575DFB',
      600: '#4F52F2',
      700: '#4548EA',
      800: '#3D3DE2',
      900: '#2F2EB8',
    },
    grey: {
      100: '#F1F1F1',
      200: '#D6D6D6',
      300: '#AFAFAF',
      400: '#898989',
      500: '#656565',
      600: '#434343',
      700: '#242424',
    },
  },

  breakpoints: {
    SE: '20em', // 320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    xxl: '96em', // 1536px
  },
});

export default chakraTheme;
