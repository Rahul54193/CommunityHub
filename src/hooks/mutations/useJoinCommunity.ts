import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { useAuthStore } from '../../state/store/authStore';

interface JoinCommunityParams {
  communityId: number;
  userId?: number;
}

const joinCommunity = async (
  communityId: number,
  userId: number,
): Promise<void> => {
  try {

    const response = await apiClient.post(`/communities/join`, {
      communityId,
      userId,
    });
  } catch (error) {
    if (error instanceof Error) {
    }
    throw error;
  }
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: ({ communityId }: JoinCommunityParams) =>
      joinCommunity(communityId, user?.id || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['communities'],
      });
      queryClient.invalidateQueries({
        queryKey: ['userCommunities'],
      });
    },
  });
};
