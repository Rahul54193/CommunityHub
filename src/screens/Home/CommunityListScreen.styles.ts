import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  listContent: {
    padding: spacing.md,
  },
  communityCard: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  communityName: {
    ...typography.h5,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.lg,
  },
  memberBadge: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    color: colors.text.inverse,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.primary,
  },
  loadMoreButton: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingFooter: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
