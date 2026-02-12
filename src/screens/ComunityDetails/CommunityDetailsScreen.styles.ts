import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  headerContainer: {
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  communityName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.h5,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.tertiary,
    borderRadius: spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...typography.label,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border.light,
  },
  memberButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberButtonActive: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  memberButtonText: {
    color: colors.text.inverse,
    ...typography.button,
  },
  memberButtonTextActive: {
    color: colors.primary,
  },
  postsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  postsTitle: {
    ...typography.h5,
    color: colors.text.primary,
  },
  createPostButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
  },
  createPostButtonText: {
    color: colors.text.inverse,
    ...typography.label,
  },
  postsList: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  postCard: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  postTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  postBody: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  postDate: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  postsLoadingContainer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyPostsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyPostsText: {
    ...typography.body,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },
  emptyCreateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: spacing.sm,
  },
  emptyCreateButtonText: {
    color: colors.text.inverse,
    ...typography.label,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
