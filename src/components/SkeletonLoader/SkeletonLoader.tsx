import React from 'react';
import { View, Animated } from 'react-native';
import { styles } from './SkeletonLoader.styles';

interface SkeletonLoaderProps {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height,
  borderRadius = 8,
  style,
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0.3));

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity: fadeAnim,
        },
        style,
      ]}
    />
  );
};

interface SkeletonCommunityCardProps {
  style?: any;
}

export const SkeletonCommunityCard: React.FC<SkeletonCommunityCardProps> = ({ style }) => {
  return (
    <View style={[styles.card, style]}>
      <SkeletonLoader height={80} borderRadius={12} />
      <View style={styles.cardContent}>
        <SkeletonLoader height={16} width="60%" style={styles.mb} />
        <SkeletonLoader height={12} width="80%" />
      </View>
    </View>
  );
};
