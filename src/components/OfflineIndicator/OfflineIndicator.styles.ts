import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../styles/index';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.feedback.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '500',
  },
});