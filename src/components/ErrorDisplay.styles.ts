import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/index';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.feedback.errorLight,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: spacing.md,
    marginVertical: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
  },
  content: {
    alignItems: 'flex-start',
  },
  title: {
    ...typography.label,
    color: colors.feedback.error,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  message: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  retryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.feedback.error,
    borderRadius: spacing.sm,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    ...typography.button,
    color: 'white',
    fontSize: 12,
  },
});
