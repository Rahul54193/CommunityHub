import React, { useCallback, memo } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { styles } from './CommunityListScreen.styles';
import { useCommunities } from '../../hooks/queries/useCommunities';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { SkeletonCommunityCard } from '../../components/SkeletonLoader';
import { colors } from '../../styles/tokens';
import { Header } from '../../components/Header/Header';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  memberId?: number[];   
}

interface CommunityListScreenProps {
  navigation: any;
}

const _ITEMS_PER_PAGE = 10;
const _ITEM_HEIGHT = 100;

const RenderSkeleton = memo(() => (
  <>
    {[1, 2, 3, 4].map(key => (
      <SkeletonCommunityCard key={key} />
    ))}
  </>
));

const MemoizedHeader = memo(() => (
  <Header
    Title="Communities"
    LeftIcon={null}
    LeftAction={() => {}}
    RightIcon={null}
    RightAction={() => {}}
  />
));

const RenderEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No communities found</Text>
  </View>
)

export const CommunityListScreen: React.FC<CommunityListScreenProps> = ({
  navigation,
}) => {
  const {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunities(_ITEMS_PER_PAGE);

  const communities = data?.data || [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    if (isFetching) return;
    refetch();
  }, [isFetching, refetch]);

  const renderCommunityCard = useCallback(
    ({ item }: { item: Community }) => (
      <TouchableOpacity
        style={styles.communityCard}
        onPress={() =>
          navigation.navigate('CommunityDetails', {
            communityId: item.id,
            community: item,
            members: item?.memberId || [], 
          })
        }
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.communityName}>{item.name}</Text>
          <Text style={styles.memberBadge}>{item.memberCount}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }
    return null;
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback((item: Community) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: _ITEM_HEIGHT,
      offset: _ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (isLoading && communities.length === 0) {
    return (
      <View style={styles.container}>
        <RenderSkeleton />
      </View>
    );
  }

  if (error && communities.length === 0) {
    return (
      <ErrorDisplay
        title="Error fetching communities"
        message={error.message || "Please try again"}
        onRetry={() => {
          refetch();
        }}
        visible={true}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MemoizedHeader />
      <FlatList
        data={communities}
        renderItem={renderCommunityCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isLoading && communities.length === 0 ? (
            <RenderEmptyComponent />
          ) : null
        }
      />
    </View>
  );
};