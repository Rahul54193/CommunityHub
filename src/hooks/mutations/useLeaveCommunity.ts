import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { useAuthStore } from '../../store/authStore';

interface LeaveCommunityParams {
  communityId: number;
}

const leaveCommunity = async (
  communityId: number,
  userId: number,
): Promise<void> => {
  try {
    const response = await apiClient.delete(`/communities/leave`, {
      data: {
        communityId,
        userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
    }
    throw error;
  }
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: ({ communityId }: LeaveCommunityParams) =>
      leaveCommunity(communityId, user?.id || 0),
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
