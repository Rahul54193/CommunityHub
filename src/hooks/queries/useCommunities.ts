import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../../api/client';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

interface CommunitiesResponse {
  data: Community[];
  total: number;
}

const fetchCommunities = async (
  page: number = 1,
  limit: number = 10
): Promise<CommunitiesResponse> => {
  const response = await apiClient.get('/communities', {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0', 10),
  };
};

export const useCommunities = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['communities'],
    queryFn: ({ pageParam = 1 }) => fetchCommunities(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap(p => p.data).length;
      return totalLoaded < lastPage.total ? allPages.length + 1 : undefined;
    },
    select: (data) => ({
      data: data.pages.flatMap(p => p.data),
      total: data.pages[0]?.total || 0,
    }),
  });
};