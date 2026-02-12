import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { queryClient } from '../../utils/queryClient';

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

export const useCommunities = (page: number = 1, limit: number = 10) => {

  return useQuery({
    queryKey: ['communities', page, limit],
    queryFn: () => fetchCommunities(page, limit),
    select: (data) => {
      let allCommunities: Community[] = [];
      
      for (let p = 1; p <= page; p++) {
        const cachedData = queryClient.getQueryData<CommunitiesResponse>(['communities', p, limit]);
        if (cachedData?.data) {
          allCommunities = [...allCommunities, ...cachedData.data];
        }
      }
      
      return {
        data: allCommunities.length > 0 ? allCommunities : data.data,
        total: data.total,
      };
    },
  });
};