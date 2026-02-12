import React from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './OfflineIndicator.styles';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (!isOnline) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isOnline, fadeAnim]);

  if (isOnline) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>⚠️ You're offline. Some features may be limited.</Text>
    </Animated.View>
  );
};
