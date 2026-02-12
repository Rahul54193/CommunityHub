import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
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
  const [page, setPage] = useState(1);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);

  const { data, isLoading, isRefetching, error, refetch, isFetching,isPending } =
    useCommunities(page, _ITEMS_PER_PAGE);

  const total = data?.total || 0;

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllCommunities(data.data);
      } else {
        setAllCommunities(prev => {
          const existingIds = new Set(prev.map(c => c.id));
          const newCommunities = data.data.filter(c => !existingIds.has(c.id));
          return [...prev, ...newCommunities];
        });
      }
    }
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (isFetching) return;
    const hasMoreData = allCommunities.length < total;
    const isCurrentlyLoading = isLoading || isFetching;

    if (hasMoreData && !isCurrentlyLoading) {
      setPage(prev => prev + 1);
    }
  }, [allCommunities.length, total, isLoading, isFetching]);

  const handleRefresh = useCallback(() => {
    if (isFetching) return;
    setPage(1);
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
    if (isFetching && page > 1 && allCommunities.length > 0) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }
    return null;
  }, [isFetching, page, allCommunities.length]);

  const keyExtractor = useCallback((item: Community) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: _ITEM_HEIGHT,
      offset: _ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (isLoading && allCommunities.length === 0) {
    return (
      <View style={styles.container}>
        <RenderSkeleton />
      </View>
    );
  }

  if (error && allCommunities.length === 0) {
    return (
      <ErrorDisplay
        error={error}
        title="Error fetching communities"
        message="Please try again"
        onRetry={() => {
          setPage(1);
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
        data={allCommunities}
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
            refreshing={isRefetching && page === 1}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isLoading &&
          !allCommunities.length ? (
            <RenderEmptyComponent />
          ) : null
        }
      />
    </View>
  );
};