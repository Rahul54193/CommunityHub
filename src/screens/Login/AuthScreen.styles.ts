import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.background.primary,
    borderRadius: spacing.sm,
    padding: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: colors.background.tertiary,
    borderColor: colors.border.light,
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    ...typography.body,
    color: colors.text.primary,
  },
  loginButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: colors.text.inverse,
    ...typography.button,
  },
  demoContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  demoText: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  demoEmail: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: 'Courier New',
  },
  demoPassword: {
    ...typography.body,
    color: colors.text.primary,
    fontFamily: 'Courier New',
  },
});
