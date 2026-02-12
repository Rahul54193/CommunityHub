import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  formContainer: {
    padding: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  bodyLabel: {
    marginTop: spacing.xl,
  },
  titleInput: {
    backgroundColor: colors.background.primary,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.text.primary,
    minHeight: 50,
  },
  bodyInput: {
    backgroundColor: colors.background.primary,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.text.primary,
    minHeight: 200,
  },
  characterCount: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: colors.text.secondary,
    ...typography.button,
    fontWeight: '600',
  },
  publishButton: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonText: {
    color: '#fff',
    ...typography.button,
    fontWeight: '600',
  },
});
