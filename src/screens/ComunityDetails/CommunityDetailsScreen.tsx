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
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { colors } from '../../styles/tokens';
import { Header } from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  communityId: number;
  createdAt: string;
}

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

interface CommunityDetailsScreenProps {
  navigation: any;
  route: any;
}

export const CommunityDetailsScreen: React.FC<CommunityDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { communityId, community: initialCommunity, members } = route.params;
  const { user } = useAuthStore();
  const [isMember, setIsMember] = useState(false);
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

  const handleJoinToggle = () => {
    if (isMember) {
      leaveCommunity(
        { communityId },
        {
          onSuccess: () => {
            setIsMember(false);
            refetch();
          },
          onError: error => {
            setIsMember(true);
          },
        },
      );
    } else {
      joinCommunity(
        { communityId },
        {
          onSuccess: () => {
            setIsMember(true);
            refetch();
          },
          onError: error => {
            setIsMember(false);
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
          <SkeletonLoader height={20} width="80%" style={styles.mb} />
          <SkeletonLoader height={16} width="100%" style={styles.mb} />
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
              (isJoining || isLeaving) && styles.disabledButton,
            ]}
            onPress={handleJoinToggle}
            disabled={isJoining || isLeaving}
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
    </View>
  );
};
