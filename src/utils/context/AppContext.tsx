import React, {createContext, useContext, useState} from 'react';
import {RnColorScheme, useAppColorScheme} from 'twrnc';

import {useColorScheme} from 'react-native';
import tw from '../../lib/tailwind';
import {LStorage} from '../../screens/utils/utils';

interface AppContextType {
  showActionModal: boolean;
  setShowActionModal: (value: boolean) => void;
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme: RnColorScheme) => void;
}

// Create a Context
const AppContext = createContext<AppContextType>({
  showActionModal: false,
  setShowActionModal: () => {},
  colorScheme: 'light',
  toggleColorScheme: () => {},
  setColorScheme: () => {},
} as AppContextType);

// Create a custom hook to use the AppContext

// Create a Provider component
export const AppProvider = ({children}: {children: any}) => {
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);
  const colorMode = useColorScheme();

  React.useEffect(() => {
    const mode = LStorage.getString('mode');
    setColorScheme(
      mode === 'dark' ? 'dark' : colorMode === 'dark' ? 'dark' : 'light',
    );
  }, [colorMode]);

  const values = {
    showActionModal,
    setShowActionModal,
    colorScheme,
    toggleColorScheme,
    setColorScheme,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return useContext(AppContext);
};
