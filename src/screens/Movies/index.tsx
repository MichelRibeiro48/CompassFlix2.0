import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { getDetailsProfile } from '../../service/profile';
import styles from './styles';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getPopularMovies } from '../../service/movies';
import IconA from 'react-native-vector-icons/EvilIcons';
import { useEffect, useState } from 'react';
import { ResultMovies } from '../../types/moviesDTO';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/routes';

type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ProfileSeeAll'
>;
export default function Movies() {
  const [moviesList, setMoviesList] = useState<ResultMovies[]>([]);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { data: dataProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['details-profile'],
    queryFn: getDetailsProfile,
  });

  const {
    data: dataPopularMovies,
    isLoading: loadingPopularMovies,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['popular-movies', page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => getPopularMovies(page + 1),
      });
    }
  }, [dataPopularMovies, isPlaceholderData, page, queryClient]);

  useEffect(() => {
    if (dataPopularMovies?.results) {
      setMoviesList(prev => {
        const ids = new Set(prev.map(item => item.id));
        const newItems = dataPopularMovies.results.filter(
          item => !ids.has(item.id),
        );
        return [...prev, ...newItems];
      });
    }
  }, [dataPopularMovies]);

  if (loadingProfile || loadingPopularMovies) {
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
        Reveja ou acompanhe os filmes que você assistiu...
      </Text>
      <Text style={styles.popularText}>Filmes populares este mês</Text>
      <FlatList
        data={moviesList}
        numColumns={3}
        onEndReached={() => setPage(page + 1)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listContainer}
            onPress={() =>
              navigation.navigate('Details', { id: item.id, type: 'movies' })
            }
          >
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
          </Pressable>
        )}
      />
    </View>
  );
}
