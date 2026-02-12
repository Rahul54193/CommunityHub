import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { useAuthStore } from '../../state/store/authStore';

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
    console.error('Error leaving community:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
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
};;
