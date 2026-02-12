import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { queryClient } from '../../utils/queryClient';

interface CreatePostPayload {
  title: string;
  body: string;
}

interface Post {
  id: number;
  communityId: number;
  title: string;
  body: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}

const createPost = async (
  communityId: number,
  payload: CreatePostPayload
): Promise<Post> => {
  const response = await apiClient.post('/posts', {
    ...payload,
    communityId,
    authorId: 1, // Currently hardcoded - can be updated from auth store
    authorName: 'Current User',
    createdAt: new Date().toISOString(),
  });

  return response.data;
};

export const useCreatePost = (communityId: number) => {

  return useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      createPost(communityId, payload),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ['communityPosts', communityId],
      });

      const previousPosts = queryClient.getQueryData<Post[]>([
        'communityPosts',
        communityId,
      ]);

      const tempPost: Post = {
        id: -1,
        communityId,
        title: newPost.title,
        body: newPost.body,
        authorId: 1,
        authorName: 'Current User',
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ['communityPosts', communityId],
        (old: Post[] = []) => [tempPost, ...old]
      );

      return { previousPosts };
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData(
        ['communityPosts', communityId],
        (old: Post[] = []) => {
          return old.map(post => (post.id === -1 ? newPost : post));
        }
      );
    },
    onError: (error, newPost, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ['communityPosts', communityId],
          context.previousPosts
        );
      }
    },
  });
};
