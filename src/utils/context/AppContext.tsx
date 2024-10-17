import React, {createContext, useState, useContext, ReactNode} from 'react';

// Create a Context
const AppContext = createContext<any>(null);

// Create a Provider component
export const AppProvider = ({children}: {children: ReactNode}) => {
  const [showActionModal, setShowActionModal] = useState<string>('');

  return (
    <AppContext.Provider value={{showActionModal, setShowActionModal}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
