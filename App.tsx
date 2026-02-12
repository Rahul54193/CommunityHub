import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootNavigation } from './src/Navigation/RootNavigation';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { OfflineIndicator } from './src/components/OfflineIndicator';
import { queryClient } from './src/utils/queryClient';
import './src/hooks/useNetworkStatus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ErrorBoundary>
          <OfflineIndicator />
          <RootNavigation />
        </ErrorBoundary>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
