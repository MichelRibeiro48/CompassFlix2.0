import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import {
  getDetailsProfile,
  getFavoritedMovies,
  getFavoritedTvShows,
  getRatedMovies,
  getRatedTvShows,
} from '../../service/profile';
import { useQuery } from '@tanstack/react-query';
import Icon from '@react-native-vector-icons/fontawesome6';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import IconA from 'react-native-vector-icons/EvilIcons';
import { GetMoviesDTO } from '../../types/userDTO';
import styles from './styles';
import { RootStackParamList } from '../../types/routes';

type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ProfileSeeAll'
>;
export default function ProfileSeeAll({ route }: any) {
  const params = route.params;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  console.log('teste', params);
  const { data: dataProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['details-profile'],
    queryFn: getDetailsProfile,
  });

  const {
    data: dataProfileFavoriteMovies,
    isLoading: loadingProfileFavoriteMovies,
  } = useQuery({
    queryKey: ['details-profile-favorite-movies'],
    queryFn: getFavoritedMovies,
  });

  const { data: dataProfileRatedMovies, isLoading: loadingProfileRatedMovies } =
    useQuery({
      queryKey: ['details-profile-rated-movies'],
      queryFn: getRatedMovies,
    });

  const {
    data: dataProfileFavoriteTvShows,
    isLoading: loadingProfileFavoriteTvShows,
  } = useQuery({
    queryKey: ['details-profile-favorite-TvShows'],
    queryFn: getFavoritedTvShows,
  });

  const {
    data: dataProfileRatedTvShows,
    isLoading: loadingProfileRatedTvShows,
  } = useQuery({
    queryKey: ['details-profile-rated-TvShows'],
    queryFn: getRatedTvShows,
  });

  const actualData = (): GetMoviesDTO | undefined => {
    const key = `${params.typeMode}_${params.typeContent}`;

    switch (key) {
      case 'movies_favorite':
        return dataProfileFavoriteMovies;
      case 'movies_rated':
        return dataProfileRatedMovies;
      case 'series_favorite':
        return dataProfileFavoriteTvShows;
      case 'series_rated':
        return dataProfileRatedTvShows;
      default:
        return undefined;
    }
  };

  const label = () => {
    const key = `${params.typeMode}_${params.typeContent}`;

    switch (key) {
      case 'movies_favorite':
        return 'Filmes Favoritos';
      case 'movies_rated':
        return 'Filmes avaliados';
      case 'series_favorite':
        return 'Séries favoritas';
      case 'series_rated':
        return 'Séries avaliadas';
      default:
        return [];
    }
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
    <View style={styles.buttonBackContainer}>
      <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={16} color={'#000'} iconStyle="solid" />
      </Pressable>
      <View style={styles.userContainer}>
        <Text style={styles.preferText}>{label()} de </Text>
        <Text style={styles.userText}>{dataProfile?.username}!</Text>
      </View>
      <FlatList
        data={actualData() && actualData()?.results}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listContainer}
            onPress={() =>
              navigation.navigate('Details', {
                id: item.id,
                type: params.typeMode,
              })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.listImage}
            />
            <View style={styles.ratedContainer}>
              {params.typeContent === 'rated' && (
                <>
                  <IconA name={'star'} color={'#EC2626'} size={24} />

                  <Text style={styles.ratedText}>
                    {item?.rating?.toFixed(1)}/10.0
                  </Text>
                </>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
