import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { getDetailsProfile } from '../../service/profile';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import IconA from 'react-native-vector-icons/EvilIcons';
import { useEffect, useState } from 'react';
import styles from './styles';
import { getPopularSeries } from '../../service/series';
import { ResultSeries } from '../../types/seriesDTO';

export default function TvShows() {
  const [seriesList, setSeriesList] = useState<ResultSeries[]>([]);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data: dataProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['details-profile'],
    queryFn: getDetailsProfile,
  });

  const {
    data: dataPopularSeries,
    isLoading: loadingPopularSeries,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['popular-series', page],
    queryFn: () => getPopularSeries(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => getPopularSeries(page + 1),
      });
    }
  }, [dataPopularSeries, isPlaceholderData, page, queryClient]);

  useEffect(() => {
    if (dataPopularSeries?.results) {
      setSeriesList(prev => {
        const ids = new Set(prev.map(item => item.id));
        const newItems = dataPopularSeries.results.filter(
          item => !ids.has(item.id),
        );
        return [...prev, ...newItems];
      });
    }
  }, [dataPopularSeries]);

  if (loadingProfile || loadingPopularSeries) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          dataProfile?.avatar?.tmdb.avatar_path
            ? {
                uri: `https://image.tmdb.org/t/p/w500/${dataProfile?.avatar?.tmdb.avatar_path}`,
              }
            : require('../../images/avatar.png')
        }
        style={styles.userAvatar}
      />
      <View style={styles.userContainer}>
        <Text style={styles.welcomeText}>Olá, </Text>
        <Text style={styles.userText}>{dataProfile?.username}!</Text>
      </View>
      <Text style={styles.white}>
        Reveja ou acompanhe as séries que você assistiu...
      </Text>
      <Text style={styles.popularText}>Series populares este mês</Text>
      <FlatList
        data={seriesList}
        numColumns={3}
        onEndReached={() => setPage(page + 1)}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.listImage}
            />
            <View style={styles.ratedContainer}>
              <IconA name={'star'} color={'#EC2626'} size={24} />

              <Text style={styles.ratedText}>
                {item?.vote_average?.toFixed(1)}/10.0
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
