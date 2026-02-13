import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootNavigation } from './src/Navigation/RootNavigation';
import { ErrorBoundary } from './src/components/ErrorBoundry/ErrorBoundary';
import { OfflineIndicator } from './src/components/OfflineIndicator/OfflineIndicator';
import './src/hooks/useNetworkStatus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { queryClient } from './src/utils/queryClient';

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
