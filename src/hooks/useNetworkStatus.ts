import { useEffect, useState } from 'react';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected ?? true;
      setIsOnline(online);
      onlineManager.setOnline(online);
    });

    return () => unsubscribe();
  }, []);

  return { isOnline };
};
