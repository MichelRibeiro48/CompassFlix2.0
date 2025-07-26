import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  getDetailsProfile,
  getFavoritedMovies,
  getFavoritedTvShows,
  getRatedMovies,
  getRatedTvShows,
} from '../../service/profile';
import { useState } from 'react';
import IconA from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import { RootStackParamList } from '../../types/routes';

type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ProfileSeeAll'
>;

export default function Profile() {
  const storage = new MMKV();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [viewMode, setViewMode] = useState<'movies' | 'series'>('movies');
  const { data: dataProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['details-profile'],
    queryFn: getDetailsProfile,
  });

  const {
    data: dataProfileFavoriteMovies,
    isLoading: loadingProfileFavoriteMovies,
    refetch: refetchFavoriteMovies,
  } = useQuery({
    queryKey: ['details-profile-favorite-movies'],
    queryFn: getFavoritedMovies,
  });

  const {
    data: dataProfileRatedMovies,
    isLoading: loadingProfileRatedMovies,
    refetch: refetchRatedMovies,
  } = useQuery({
    queryKey: ['details-profile-rated-movies'],
    queryFn: getRatedMovies,
  });

  const {
    data: dataProfileFavoriteTvShows,
    isLoading: loadingProfileFavoriteTvShows,
    refetch: refetchFavoriteTvShows,
  } = useQuery({
    queryKey: ['details-profile-favorite-TvShows'],
    queryFn: getFavoritedTvShows,
  });

  const {
    data: dataProfileRatedTvShows,
    isLoading: loadingProfileRatedTvShows,
    refetch: refetchRatedTvShows,
  } = useQuery({
    queryKey: ['details-profile-rated-TvShows'],
    queryFn: getRatedTvShows,
  });

  const handleLogout = () => {
    storage.clearAll();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  const updateList = () => {
    refetchFavoriteMovies();
    refetchRatedMovies();
    refetchFavoriteTvShows();
    refetchRatedTvShows();
  };
  if (
    loadingProfile ||
    loadingProfileFavoriteMovies ||
    loadingProfileRatedMovies ||
    loadingProfileRatedTvShows ||
    loadingProfileFavoriteTvShows
  ) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.headerButtonContainer}>
          <Pressable style={styles.headerButton} onPress={() => updateList()}>
            <Text style={styles.refreshListText}>Atualizar lista</Text>
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => handleLogout()}>
            <Text style={styles.headerButtonText}>Sair</Text>
          </Pressable>
        </View>
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
        <Text style={styles.userName}>{dataProfile?.username}</Text>
        <Pressable
          style={styles.movieListButton}
          onPress={() =>
            navigation.navigate('ProfileList', { typeMode: viewMode })
          }
        >
          <Text style={styles.movieListButtonText}>
            Ver listas de {viewMode === 'movies' ? 'filmes' : 'séries'}
          </Text>
        </Pressable>
        <View style={styles.totalRatedContainer}>
          <Text style={styles.totalRatedNumber}>
            {(dataProfileRatedMovies?.total_results ?? 0) +
              (dataProfileRatedTvShows?.total_results ?? 0)}
          </Text>
          <Text style={styles.totalRatedText}>Avaliaçoes</Text>
        </View>
      </View>
      <View style={styles.viewModeContainer}>
        <Pressable
          style={styles.viewModeButton}
          onPress={() => setViewMode('movies')}
        >
          <Image
            source={
              viewMode === 'movies'
                ? require('../../images/moviesOn.png')
                : require('../../images/moviesOff.png')
            }
            style={styles.viewModeIcon}
          />
        </Pressable>
        <Pressable
          style={styles.viewModeButton}
          onPress={() => setViewMode('series')}
        >
          <Image
            source={
              viewMode === 'series'
                ? require('../../images/seriesOn.png')
                : require('../../images/seriesOff.png')
            }
            style={styles.viewModeIcon}
          />
        </Pressable>
      </View>
      <View style={styles.movieFavoriteContainer}>
        <Text style={styles.movieFavoriteText}>
          {viewMode === 'movies' ? 'Filmes favoritos' : 'Séries favoritas'} de{' '}
          {dataProfile?.username}
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileSeeAll', {
              typeMode: viewMode,
              typeContent: 'favorite',
            })
          }
        >
          <Text style={styles.movieFavoriteButtonText}>Ver tudo</Text>
        </Pressable>
      </View>
      <FlatList
        data={
          viewMode === 'movies'
            ? dataProfileFavoriteMovies?.results
            : dataProfileFavoriteTvShows?.results
        }
        horizontal
        contentContainerStyle={styles.listContainerView}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listContainer}
            onPress={() =>
              navigation.navigate('Details', { id: item.id, type: viewMode })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.listImage}
            />
          </Pressable>
        )}
      />
      <View style={styles.lineSeparator} />
      <View style={styles.seriesContainer}>
        <Text style={styles.movieFavoriteText}>
          {viewMode === 'movies'
            ? 'Avaliações de filmes'
            : 'Avaliações de séries'}{' '}
          recentes de {dataProfile?.username}
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileSeeAll', {
              typeMode: viewMode,
              typeContent: 'rated',
            })
          }
        >
          <Text style={styles.movieFavoriteButtonText}>Ver tudo</Text>
        </Pressable>
      </View>
      <FlatList
        data={
          viewMode === 'movies'
            ? dataProfileRatedMovies?.results
            : dataProfileRatedTvShows?.results
        }
        horizontal
        contentContainerStyle={styles.listContainerView}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listContainer}
            onPress={() =>
              navigation.navigate('Details', { id: item.id, type: viewMode })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.listImage}
            />
            <View style={styles.seriesRatingContainer}>
              <IconA name={'star'} color={'#EC2626'} size={24} />

              <Text style={styles.seriesRatingNumber}>
                {item?.rating?.toFixed(1)}/10.0
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
