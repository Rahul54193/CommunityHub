import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles/index';

export const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.background.secondary,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    marginBottom: spacing.md,
    padding: spacing.md,
    overflow: 'hidden',
  },
  cardContent: {
    marginTop: spacing.md,
  },
  mb: {
    marginBottom: spacing.sm,
  },
});
