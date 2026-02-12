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
    console.log('Join response----->>>>:', response);
  } catch (error) {
    console.error('Error joining community:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
console.log('useJoinCommunity user:', user);
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
