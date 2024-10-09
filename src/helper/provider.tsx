'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/components/theme'
import { Provider as ProviderRedux } from 'react-redux';
import { persistor, store } from '@/redux/store';
// import { PersistGate } from 'redux-persist/integration/react';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProviderRedux store={store}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    </ProviderRedux>
  );
}