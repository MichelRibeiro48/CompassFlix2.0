/* eslint-disable react-native/no-inline-styles */
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
import { useNavigation } from '@react-navigation/native';
import IconA from 'react-native-vector-icons/EvilIcons';

export default function ProfileSeeAll({ route }: any) {
  const params = route.params;
  const navigation = useNavigation();

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

  const actualData = () => {
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
        return [];
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 12,
        paddingVertical: 48,
      }}
    >
      <Pressable
        style={{
          backgroundColor: '#fff',
          padding: 9,
          borderRadius: 100,
          width: 35,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 35,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={16} color={'#000'} iconStyle="solid" />
      </Pressable>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
          {label()} de{' '}
        </Text>
        <Text style={{ color: '#E9A6A6', fontWeight: 'bold', fontSize: 20 }}>
          {dataProfile?.username}!
        </Text>
      </View>
      <FlatList
        data={actualData() && actualData()?.results}
        numColumns={3}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 8,
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={{ width: 100, height: 140, borderRadius: 8 }}
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 4,
              }}
            >
              {params.typeContent === 'rated' && (
                <>
                  <IconA name={'star'} color={'#EC2626'} size={24} />

                  <Text style={{ fontWeight: '600', color: '#fff' }}>
                    {item?.rating?.toFixed(1)}/10.0
                  </Text>
                </>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
