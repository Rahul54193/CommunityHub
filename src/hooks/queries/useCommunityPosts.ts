import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/client';

interface Post {
  id: number;
  communityId: number;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

const fetchCommunityPosts = async (communityId: number): Promise<Post[]> => {
  const response = await apiClient.get('/posts', {
    params: {
      communityId,
      _sort: 'createdAt',
      _order: 'desc',
    },
  });

  return response.data;
};

export const useCommunityPosts = (communityId: number) => {
  return useQuery({
    queryKey: ['communityPosts', communityId],
    queryFn: () => fetchCommunityPosts(communityId),
    enabled: !!communityId,
    staleTime: 3 * 60 * 1000,
  });
};
