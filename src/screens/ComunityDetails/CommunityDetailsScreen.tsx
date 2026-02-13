import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { styles } from './CommunityDetailsScreen.styles';
import { useCommunityPosts } from '../../hooks/queries/useCommunityPosts';
import { useJoinCommunity } from '../../hooks/mutations/useJoinCommunity';
import { useLeaveCommunity } from '../../hooks/mutations/useLeaveCommunity';
import { useAuthStore } from '../../state/store/authStore';
import { ErrorDisplay } from '../../components/ErrorDisplay/ErrorDisplay';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { Toast } from '../../components/Toast';
import { colors } from '../../styles/tokens';
import { Header } from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { queryClient } from '../../utils/queryClient';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  communityId: number;
  createdAt: string;
}



interface CommunityDetailsScreenProps {
  navigation: any;
  route: any;
}

export const CommunityDetailsScreen: React.FC<CommunityDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { isOnline } = useNetworkStatus();
  const { communityId, community: initialCommunity, members } = route.params;
  const { user } = useAuthStore();
  const [isMember, setIsMember] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    message: '',
    type: 'error' as 'error' | 'success' | 'warning' | 'info',
  });

  const showToast = (message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') => {
    setToastConfig({ visible: true, message, type });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (user && members) {
      setIsMember(members.includes(user.id));
    }
  }, [members, user]);
  const {
    data: posts = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useCommunityPosts(communityId);
  const { mutate: joinCommunity, isPending: isJoining } = useJoinCommunity();
  const { mutate: leaveCommunity, isPending: isLeaving } = useLeaveCommunity();

  const updateCommunityInCache = (
    communityId: number,
    updateFn: (community: any) => any,
  ) => {
    queryClient.setQueriesData(
      { queryKey: ['communities'], exact: false },
      (oldData: any) => {
        if (!oldData) return oldData;
        if (oldData.pages) {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.map((community: any) =>
                community.id === communityId ? updateFn(community) : community,
              ),
            })),
          };
        }
        if (oldData.data) {
          return {
            ...oldData,
            data: oldData.data.map((community: any) =>
              community.id === communityId ? updateFn(community) : community,
            ),
          };
        }
        
        return oldData;
      },
    );
  };

  const handleJoinToggle = () => {
    const previousMembershipStatus = isMember;
    setIsMember(!isMember);
    if (previousMembershipStatus) {
      leaveCommunity(
        { communityId },
        {
          onSuccess: async () => {
            updateCommunityInCache(communityId, (community) => ({
              ...community,
              memberId: community.memberId?.filter(
                (id: number) => id !== user?.id,
              ),
              memberCount: Math.max(0, (community.memberCount || 1) - 1),
            }));
            await queryClient.refetchQueries({
              queryKey: ['communities'],
              exact: false,
            });
          },
          onError: error => {
            setIsMember(previousMembershipStatus);
            showToast('Failed to leave community. Please try again.');
          },
        },
      );
    } else {
      joinCommunity(
        { communityId },
        {
          onSuccess: async () => {
            updateCommunityInCache(communityId, (community) => ({
              ...community,
              memberId: [...(community.memberId || []), user?.id],
              memberCount: (community.memberCount || 0) + 1,
            }));
            await queryClient.refetchQueries({
              queryKey: ['communities'],
              exact: false,
            });
          },
          onError: error => {
            setIsMember(previousMembershipStatus);
            showToast('Failed to join community. Please try again.');
          },
        },
      );
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={3}>
        {item.body}
      </Text>
      <Text style={styles.postDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  const renderPostSkeleton = () => (
    <>
      {[1, 2, 3].map(key => (
        <View key={key} style={styles.postCard}>
          <SkeletonLoader height={20} width="80%" />
          <SkeletonLoader height={16} width="100%" />
          <SkeletonLoader height={16} width="60%" />
        </View>
      ))}
    </>
  );

  if (error && posts.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.communityName}>{initialCommunity?.name}</Text>
            <Text style={styles.description}>
              {initialCommunity?.description}
            </Text>
          </View>
          <ErrorDisplay
            title="Failed to Load Posts"
            message={
              error instanceof Error
                ? error.message
                : 'Unable to fetch posts. Please try again.'
            }
            onRetry={() => refetch()}
            visible={true}
          />
        </ScrollView>
      </View>
    );
  }
  const MemomizedHeader = React.memo(() => (
    <Header
      Title={'Community Details'}
      LeftIcon={
        <Icon name="arrow-back" size={20} color={colors.text.primary} />
      }
      RightIcon={null}
      RightAction={() => {}}
      LeftAction={() => navigation.goBack()}
    />
  ));
  return (
    <View style={styles.container}>
      <MemomizedHeader />
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.communityName}>{initialCommunity?.name}</Text>
          <Text style={styles.description}>
            {initialCommunity?.description}
          </Text>

          <TouchableOpacity
            style={[
              styles.memberButton,
              isMember && styles.memberButtonActive,
              (!isOnline || isJoining || isLeaving) && styles.disabledButton,
            ]}
            onPress={handleJoinToggle}
            disabled={!isOnline || isJoining || isLeaving}
          >
            {isJoining || isLeaving ? (
              <ActivityIndicator
                color={isMember ? colors.primary : '#FFF'}
                size="small"
              />
            ) : (
              <Text
                style={[
                  styles.memberButtonText,
                  isMember && styles.memberButtonTextActive,
                ]}
              >
                {isMember ? 'Leave Community' : 'Join Community'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.postsHeaderContainer}>
          <Text style={styles.postsTitle}>Posts</Text>
          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => navigation.navigate('CreatePost', { communityId })}
          >
            <Text style={styles.createPostButtonText}>+ New Post</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          renderPostSkeleton()
        ) : posts.length > 0 ? (
          <FlatList
            data={posts || []}
            renderItem={renderPostItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            removeClippedSubviews
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            style={styles.postsList}
          />
        ) : (
          <View style={styles.emptyPostsContainer}>
            <Text style={styles.emptyPostsText}>No posts yet</Text>
            <TouchableOpacity
              style={styles.emptyCreateButton}
              onPress={() => navigation.navigate('CreatePost', { communityId })}
            >
              <Text style={styles.emptyCreateButtonText}>
                Be the first to post
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Toast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        onDismiss={hideToast}
      />
    </View>
  );
};
